import { Box, Button, FormControl, IconButton, InputAdornment } from "@material-ui/core";
import { useState } from "react";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { RiskItem } from "../../../../../Risk/types";
import { TitleWrapperSelect, CustomSelect, CustomMenuItem, CustomMenuItemTitle, WrapperButton, CustomInput, useStyles } from "../../UpdateForm.styles";
import NotesIcon from '@material-ui/icons/Notes';
import UpdateTextForm from "../UpdateTextForm/UpdateTextForm";
import { DateTime } from "luxon";
import { getNewUpdate } from "../../utils";
import useAuthentication from "hooks/useAuthentication";
import { useSWRConfig } from "swr";
import { useObeyaRoom } from "views/Governance/views/GovernanceObeya/hooks/useObeyaRoom";
import { addUpdateToCache, addUpdateInfo } from "../../../../hooks/useUpdates";
import { getFilterUrlSearchParams } from "views/Dashboard/views/Platform/views/FilterPanel/contexts/FilterPanelContext/utils";
import { useCrud } from "hooks/useCrud";
import { sortByString } from "utils/string";
import _ from "lodash";
const statusRiskOptions = [
    { value: 'Open', label: 'Open' },
    { value: 'Mitigated', label: 'Mitigated' },
    { value: 'Resolved', label: 'Resolved' },
];
type FormInputType = {
    likelihood: number;
    impactOnSchedule: number;
    impactOnCost: number;
    status: string;
    updateText: string;
    updateNotes: string;
};
type RiskFormProps = {
    placeholder: string;
    activePlaceholder: string;
    risk: RiskItem;
    defaultLikelihood: number;
    defaultImpactOnSchedule: number;
    defaultImpactOnCost: number;
    defaultStatus: string;
    payload?: any;
    afterSubmit?: any;
    action?: string;
};

const defaultResources = {
    add: 'obeya/risk',
    update: 'obeya/risk',
};

const RiskForm = (props: RiskFormProps) => {
    const classes = useStyles();
    const methods = useForm<FormInputType>({
        defaultValues: {
            likelihood: props.defaultLikelihood,
            impactOnSchedule: props.defaultImpactOnSchedule,
            impactOnCost: props.defaultImpactOnCost,
            status: props.defaultStatus,
            updateText: '',
            updateNotes: ''
        },
    });
    const [notesAdded, setNotesAdded] = useState<boolean>(false);
    const [textEditorRef, setTextEditorRef] = useState<undefined | { current: any; }>();
    const [notesTextEditorRef, setNotesTextEditorRef] = useState<undefined | { current: any; }>();
    const [saving, setSaving] = useState<boolean>(false);
    const {
        control,
        register,
        handleSubmit,
        formState,
    } = methods;
    const { errors } = formState;

    const { activeObeyaRoomId, data, mutateObeyaData } = useObeyaRoom();
    const { userInfo, user } = useAuthentication();
    const resources = {
        ...defaultResources,
    };
    const { mutate, cache } = useSWRConfig();
    const { add, update, remove } = useCrud(resources, 'risks');


    const onSubmitRiskUpdate = async (formData) => {
        setSaving(true);
        console.log(props.payload);
        console.log(formData);
        const currentTime = DateTime.now().toISO();
        const updateItem = getNewUpdate();

        updateItem.initiativeId = activeObeyaRoomId || '';
        updateItem.userId = user?.sub || '';
        updateItem.username = (user?.email ?? userInfo.userId) || '';
        updateItem.updateType = 'risk';
        updateItem.createdAt = currentTime;
        updateItem.updatedAt = currentTime;
        updateItem.updateText = formData.updateText;
        updateItem.name = user?.name || '';
        updateItem.updateNotes = notesAdded ? formData.updateNotes : undefined;
        const updateMetadata: any = {
            action: props.action || 'edit',
            id: props.risk.riskId,
            fields: []
        };

        if (!props.action) {
            if (props.risk.likelihood?.toString() !== formData.likelihood.toString()) {
                updateMetadata.fields.push({
                    name: 'likelihood',
                    previousValue: props.risk.likelihood?.toString(),
                    value: formData.likelihood.toString()
                });
            }
            if (props.risk.impactOnSchedule?.toString() !== formData.impactOnSchedule.toString()) {
                updateMetadata.fields.push({
                    name: 'impactOnSchedule',
                    previousValue: props.risk.impactOnSchedule?.toString(),
                    value: formData.impactOnSchedule.toString()
                });
            }
            if (props.risk.impactOnCost?.toString() !== formData.impactOnCost.toString()) {
                updateMetadata.fields.push({
                    name: 'impactOnCost',
                    previousValue: props.risk.impactOnCost?.toString(),
                    value: formData.impactOnCost.toString()
                });
            }
            if (props.risk.status !== formData.status) {
                updateMetadata.fields.push({
                    name: 'status',
                    previousValue: props.risk.status,
                    value: formData.status
                });
            }
        } else {
            if (props.action === 'create' || props.action === 'delete') {
                ['description', 'impactOnCost', 'impactOnSchedule', 'likelihood', 'status', 'name', 'ownerName'].forEach(key => {
                    updateMetadata.fields.push({
                        name: key,
                        previousValue: '',
                        value: props.payload[key].toString()
                    });
                });
            } else if (props.action === 'edit') {
                ['description', 'impactOnCost', 'impactOnSchedule', 'likelihood', 'status', 'name', 'ownerName'].forEach(key => {
                    if (props.risk[key] !== props.payload[key])
                        updateMetadata.fields.push({
                            name: key,
                            previousValue: props.risk[key].toString(),
                            value: props.payload[key].toString()
                        });
                });
            }
        }
        console.log(updateMetadata);
        updateItem.updateMetadata = updateMetadata;
        const relevantKeysWithData: string[] = [];
        if (cache.get(`updates?initiativeId=${activeObeyaRoomId}&updateType=all`)) {
            console.log("All cache found");
            relevantKeysWithData.push(`updates?initiativeId=${activeObeyaRoomId}&updateType=all`);
        }
        if (cache.get(`updates?initiativeId=${activeObeyaRoomId}&updateType=risk`)) {
            console.log("Risk cache found");
            relevantKeysWithData.push(`updates?initiativeId=${activeObeyaRoomId}&updateType=risk`);
        }
        relevantKeysWithData.forEach(key => {
            addUpdateToCache(
                updateItem,
                cache.get(key),
                mutate,
                key
            );
        });
        addUpdateInfo(updateItem);
        if (updateMetadata.fields.length > 0) {
            let payloadToPost = props.payload || undefined;
            // Payload is not passed only when this component is called from update form i.e edit of a risk , meaning risk is passed.
            if (!payloadToPost) {
                payloadToPost = _.cloneDeep(props.risk);
                payloadToPost.likelihood = formData.likelihood;
                payloadToPost.impactOnSchedule = formData.impactOnSchedule;
                payloadToPost.impactOnCost = formData.impactOnCost;
                payloadToPost.status = formData.status;
            }
            const params = getFilterUrlSearchParams({
                obeyaRoomId: activeObeyaRoomId,
                timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
            });
            console.log(payloadToPost);
            const mutateObeyaKey = `obeya?${params}`;
            if (props.action === 'delete') {
                remove(
                    `obeya/?obeyaRoomId=${activeObeyaRoomId}`,
                    undefined,
                    undefined,
                    'delete',
                    () => {
                        mutateObeyaData({
                            data: {
                                ...data,
                                risks: data.risks.filter(d => d.riskId !== props.risk.riskId)
                            },
                        }, false);
                    },
                    () => console.log("error deleting risk"),
                    `obeya/risk/${props.risk.riskId}`,
                );
            } else if (!props.risk.riskId) {
                await add(
                    mutateObeyaKey,
                    payloadToPost,
                    data,
                    undefined,
                    undefined,
                    false,
                    undefined,
                    true
                );
            } else {
                const newRisks = data.risks.map((d) => {
                    if (d?.riskId === props.risk.riskId) {
                        return {
                            ...d,
                            ...payloadToPost,
                            impactOnSchedule: Number(payloadToPost?.impactOnSchedule),
                            riskExposureDays: Number(payloadToPost?.riskExposureDays),
                            roomId: activeObeyaRoomId,
                        };
                    }
                    return d;
                });
                const updatedRisk = newRisks.find(d => d?.riskId === props.risk.riskId);

                const newRisksSorted = sortByString(newRisks, 'name');
                const nextObeyaData = {
                    ...data,
                    risks: newRisksSorted,
                };
                await update(
                    mutateObeyaKey,
                    updatedRisk,
                    nextObeyaData,
                    undefined,
                    undefined,
                    true,
                    false
                );
            }
        }
        //Reset form after save
        textEditorRef?.current?.getEditor()?.clipboard.dangerouslyPasteHTML('');
        notesTextEditorRef?.current?.getEditor()?.clipboard.dangerouslyPasteHTML('');
        setNotesAdded(false);
        if (props.afterSubmit) {
            setSaving(false);
            props.afterSubmit();
        }
        setSaving(false);
    };
    return (
        <FormProvider {...methods}>
            <form onSubmit={(event) => {
                event.preventDefault();
                if (!Object.keys(errors).length) {
                    handleSubmit(onSubmitRiskUpdate)(event);
                }
            }}>
                {!props.action && (
                    <>
                        <Box style={{ marginTop: 14 }}>
                            <TitleWrapperSelect>Likelihood</TitleWrapperSelect>
                            <CustomInput
                                {...register('likelihood')}
                                required
                                placeholder=""
                                style={{ margin: 0 }}
                                control={control}
                                type="number"
                                errors={errors}
                                inputProps={{
                                    style: { fontFamily: 'Open Sans', fontSize: 14 },
                                    inputProps: { min: 0, max: 100 },
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <span className={classes.percentSymbol}>%</span>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Box>
                        <Box style={{ marginTop: 14 }}>
                            <TitleWrapperSelect>Impact on Schedule (in days)</TitleWrapperSelect>
                            <CustomInput
                                {...register('impactOnSchedule')}
                                required
                                placeholder=""
                                style={{ margin: 0 }}
                                control={control}
                                type="number"
                                inputProps={{ style: { fontFamily: 'Open Sans', fontSize: 14 } }}
                                errors={errors}
                            />
                        </Box>
                        <Box style={{ marginTop: 14 }}>
                            <TitleWrapperSelect>Impact on Cost (amount)</TitleWrapperSelect>
                            <CustomInput
                                {...register('impactOnCost')}
                                required
                                placeholder=""
                                style={{ margin: 0 }}
                                inputProps={{
                                    style: {
                                        fontFamily: 'Open Sans',
                                        fontSize: 14
                                    }
                                }}
                                control={control}
                                type="number"
                                errors={errors}
                            />
                        </Box>
                        <Box>
                            <TitleWrapperSelect>Status</TitleWrapperSelect>
                            <FormControl
                                error={!!errors?.status}
                            >
                                <Controller
                                    name="status"
                                    render={({ field }) => {
                                        return (
                                            <CustomSelect
                                                labelId={"element-type-label"}
                                                id={"element-type-label"}
                                                className={`${classes.riskInput}`}
                                                inputProps={{ style: { fontFamily: 'Open Sans', fontSize: 12, } }}
                                                value={field.value}
                                                onChange={(event) => {
                                                    field.onChange(event);
                                                }}
                                                error={!!errors?.status}
                                            >
                                                {(statusRiskOptions || []).map((statusRiskOption) => {
                                                    return (
                                                        <CustomMenuItem dense key={statusRiskOption.label} value={statusRiskOption.value}>
                                                            <CustomMenuItemTitle>{statusRiskOption.label}</CustomMenuItemTitle>
                                                        </CustomMenuItem>
                                                    );
                                                })}
                                            </CustomSelect>
                                        );
                                    }}
                                    control={control}
                                />
                            </FormControl>
                        </Box>
                    </>
                )}
                <UpdateTextForm
                    placeholder={props.placeholder}
                    activePlaceholder={props.activePlaceholder}
                    setTextEditorRef={setTextEditorRef}
                    setNotesTextEditorRef={setNotesTextEditorRef}
                    notesAdded={notesAdded}
                />
                <WrapperButton>
                    <IconButton
                        size="small"
                        style={{ color: 'black' }}
                        onClick={() => {
                            setNotesAdded(true);
                        }}>
                        {!notesAdded &&
                            <NotesIcon />
                        }
                    </IconButton>
                    <Button
                        size="small"
                        variant="contained"
                        color="primary"
                        type='submit'
                        style={{ height: 30 }}
                        disabled={saving}
                    >
                        {saving ? 'saving...' : 'post'}
                    </Button>
                </WrapperButton>
            </form>
        </FormProvider>
    );
};

export default RiskForm;