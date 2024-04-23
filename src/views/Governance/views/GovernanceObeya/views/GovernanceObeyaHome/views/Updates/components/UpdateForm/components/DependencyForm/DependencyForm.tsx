import { Button, IconButton } from "@material-ui/core";
import { useState } from "react";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { TitleWrapperSelect, CustomSelect, CustomMenuItem, CustomMenuItemTitle, WrapperButton, WrapperDatePicker, WrapperObjectivesDropdwon, WrapperDropdown, WrapperObjectives } from "../../UpdateForm.styles";
import NotesIcon from '@material-ui/icons/Notes';
import UpdateTextForm from "../UpdateTextForm/UpdateTextForm";
import DatePicker from "views/Governance/views/GovernanceObeya/components/DatePicker";
import { DependencyItem } from "views/Governance/views/GovernanceObeya/hooks/useObeya";
import { DateTime } from "luxon";
import { getNewUpdate } from "../../utils";
import { useObeyaRoom } from "views/Governance/views/GovernanceObeya/hooks/useObeyaRoom";
import useAuthentication from "hooks/useAuthentication";
import { useSWRConfig } from "swr";
import { useCrud } from "hooks/useCrud";
import { addUpdateInfo, addUpdateToCache } from "../../../../hooks/useUpdates";
import _ from "lodash";
import { sortByString } from "utils/string";
import { getFilterUrlSearchParams } from "views/Dashboard/views/Platform/views/FilterPanel/contexts/FilterPanelContext/utils";
const statusOptions = [
    { value: 'open', label: 'Open' },
    { value: 'resolved', label: 'Resolved' },
    { value: 'blocked', label: 'Blocked' },
];
const severityOptions = [
    { value: 'high', label: 'High' },
    { value: 'medium', label: 'Medium' },
    { value: 'low', label: 'Low' },
];
type FormInputType = {
    dateOfImpact: Date;
    severity: string;
    status: string;
    updateText: string;
    updateNotes: string;
};
type DependencyFormProps = {
    placeholder: string;
    activePlaceholder: string;
    dependency: DependencyItem;
    defaultDateOfImpact: Date;
    defaultSeverity: string;
    defaultStatus: string;
    payload?: any;
    afterSubmit?: any;
    action?: any;
};
const defaultResources = {
    add: 'obeya/dependency',
    update: 'obeya/dependency',
};

const DependencyForm = (props: DependencyFormProps) => {
    const methods = useForm<FormInputType>({
        defaultValues: {
            dateOfImpact: props.defaultDateOfImpact,
            severity: props.defaultSeverity,
            status: props.defaultStatus,
            updateText: '',
            updateNotes: ''
        },
    });
    const [notesAdded, setNotesAdded] = useState<boolean>(false);
    const [textEditorRef, setTextEditorRef] = useState<undefined | { current: any; }>();
    const [notesTextEditorRef, setNotesTextEditorRef] = useState<undefined | { current: any; }>();
    const {
        control,
        register,
        handleSubmit,
        formState,
    } = methods;
    const { errors } = formState;


    const { activeObeyaRoomId, data, mutateObeyaData } = useObeyaRoom();
    const { userInfo, user } = useAuthentication();
    const { mutate, cache } = useSWRConfig();
    const resources = {
        ...defaultResources,
    };
    const { add, update, remove } = useCrud(resources, 'dependencies');

    const [saving, setSaving] = useState<boolean>(false);

    const onSubmitDependencyUpdate = async (formData) => {
        setSaving(true);
        console.log(props.payload);
        console.log(formData);
        const currentTime = DateTime.now().toISO();
        const updateItem = getNewUpdate();

        updateItem.initiativeId = activeObeyaRoomId || '';
        updateItem.userId = user?.sub || '';
        updateItem.username = (user?.email ?? userInfo.userId) || '';
        updateItem.updateType = 'dependency';
        updateItem.createdAt = currentTime;
        updateItem.updatedAt = currentTime;
        updateItem.updateText = formData.updateText;
        updateItem.name = user?.name || '';
        updateItem.updateNotes = notesAdded ? formData.updateNotes : undefined;
        const updateMetadata: any = {
            action: props.action || 'edit',
            id: props.dependency.dependencyId,
            fields: []
        };

        if (!props.action) {
            if (DateTime.fromISO(props.dependency.dateOfImpact).toMillis() !== DateTime.fromJSDate(formData.dateOfImpact).toMillis()) {
                updateMetadata.fields.push({
                    name: 'dateOfImpact',
                    previousValue: props.dependency.dateOfImpact,
                    value: DateTime.fromJSDate(formData.dateOfImpact).toISO()
                });
            }
            if (props.dependency.severity !== formData.severity) {
                updateMetadata.fields.push({
                    name: 'severity',
                    previousValue: props.dependency.severity,
                    value: formData.severity
                });
            }
            if (props.dependency.status !== formData.status) {
                updateMetadata.fields.push({
                    name: 'status',
                    previousValue: props.dependency.status,
                    value: formData.status
                });
            }
        } else {
            if (props.action === 'create' || props.action === 'delete') {
                ['blockedName', 'blockerName', 'name', 'severity', 'status', 'summary'].forEach(key => {
                    updateMetadata.fields.push({
                        name: key,
                        previousValue: '',
                        value: props.payload[key]
                    });
                });
                updateMetadata.fields.push({
                    name: 'dateOfImpact',
                    previousValue: '',
                    value: DateTime.fromJSDate(formData.dateOfImpact).toISO()
                });
            } else if (props.action === 'edit') {
                ['blockedName', 'blockerName', 'name', 'severity', 'status', 'summary'].forEach(key => {
                    if (props.dependency[key] !== props.payload[key])
                        updateMetadata.fields.push({
                            name: key,
                            previousValue: props.dependency[key],
                            value: props.payload[key]
                        });
                });
                if (DateTime.fromISO(props.dependency.dateOfImpact).toMillis() !== DateTime.fromJSDate(formData.dateOfImpact).toMillis()) {
                    updateMetadata.fields.push({
                        name: 'dateOfImpact',
                        previousValue: props.dependency.dateOfImpact,
                        value: DateTime.fromJSDate(formData.dateOfImpact).toISO()
                    });
                }
            }
        }
        console.log(updateMetadata);
        updateItem.updateMetadata = updateMetadata;
        const relevantKeysWithData: string[] = [];
        if (cache.get(`updates?initiativeId=${activeObeyaRoomId}&updateType=all`)) {
            console.log("All cache found");
            relevantKeysWithData.push(`updates?initiativeId=${activeObeyaRoomId}&updateType=all`);
        }
        if (cache.get(`updates?initiativeId=${activeObeyaRoomId}&updateType=dependency`)) {
            console.log("dependency cache found");
            relevantKeysWithData.push(`updates?initiativeId=${activeObeyaRoomId}&updateType=dependency`);
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
            // Payload is not passed only when this component is called from update form i.e edit of a dep , meaning dep is passed.
            if (!payloadToPost) {
                payloadToPost = _.cloneDeep(props.dependency);
                payloadToPost.dateOfImpact = formData.dateOfImpact;
                payloadToPost.severity = formData.severity;
                payloadToPost.status = formData.status;
            }
            console.log(payloadToPost);
            const params = getFilterUrlSearchParams({
                obeyaRoomId: activeObeyaRoomId,
                timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
            });
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
                                dependencies: data.dependencies.filter(d => d.dependencyId !== props.dependency.dependencyId)
                            },
                        }, false);
                    },
                    () => console.log("error while deleting dependency"),
                    `obeya/dependency/${props.dependency.dependencyId}`,
                );
            } else if (!props.dependency.dependencyId) {
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
                const newDependencies = data.dependencies.map((d) => {
                    if (d?.dependencyId === props.dependency.dependencyId) {
                        return {
                            ...d,
                            ...payloadToPost,
                            dateOfImpact: DateTime.fromJSDate(payloadToPost.dateOfImpact).toISO(),
                            blockerContextAddress: payloadToPost.blockerContextAddress?.inputValue
                                ? payloadToPost.blockerContextAddress?.teamId : payloadToPost.blockerContextAddress,
                            blockedContextAddress: payloadToPost.blockedContextAddress?.inputValue
                                ? payloadToPost.blockedContextAddress?.teamId : payloadToPost.blockedContextAddress,
                        };
                    }
                    return d;
                });
                const updatedDependency = newDependencies.find(d => d?.dependencyId === props.dependency.dependencyId);
                const newDependenciesList = sortByString(newDependencies, 'name');
                const nextObeyaData = {
                    ...data,
                    dependencies: newDependenciesList,
                };
                await update(
                    mutateObeyaKey,
                    updatedDependency,
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
                    handleSubmit(onSubmitDependencyUpdate)(event);
                }
            }}>
                {!props.action && (
                    <WrapperObjectives>
                        <WrapperDatePicker>
                            <TitleWrapperSelect>Date Of Impact</TitleWrapperSelect>
                            <DatePicker
                                {...register("dateOfImpact")}
                                name="dateOfImpact"
                                format="dd MMM yyyy"
                                placeholder=""
                                inputProps={{
                                    style: {
                                        fontFamily: 'Open Sans', fontSize: 14,
                                    }
                                }}
                                control={control}
                                errors={errors}
                            />
                        </WrapperDatePicker>
                        <WrapperObjectivesDropdwon>
                            <TitleWrapperSelect>Status</TitleWrapperSelect>
                            <WrapperDropdown>
                                <Controller
                                    name="status"
                                    render={({ field }) => {
                                        return (
                                            <CustomSelect
                                                labelId={"element-type-label"}
                                                id={"element-type-label"}
                                                inputProps={{ style: { fontFamily: 'Open Sans', fontSize: 12, } }}
                                                value={field.value}
                                                onChange={(event) => {
                                                    field.onChange(event);
                                                }}
                                            >
                                                {statusOptions.map((statusOption) => {
                                                    return (
                                                        <CustomMenuItem dense key={statusOption.value} value={statusOption.value}>
                                                            <CustomMenuItemTitle>{statusOption.label}</CustomMenuItemTitle>
                                                        </CustomMenuItem>
                                                    );
                                                })}
                                            </CustomSelect>
                                        );
                                    }}
                                    control={control}
                                />
                            </WrapperDropdown>
                        </WrapperObjectivesDropdwon>
                        <WrapperObjectivesDropdwon>
                            <TitleWrapperSelect>Severity</TitleWrapperSelect>
                            <WrapperDropdown>
                                <Controller
                                    name="severity"
                                    render={({ field }) => {
                                        return (
                                            <CustomSelect
                                                labelId={"element-type-label-severity"}
                                                id={"element-type-label-severity"}
                                                inputProps={{ style: { fontFamily: 'Open Sans', fontSize: 12, } }}
                                                value={field.value}
                                                onChange={(event) => {
                                                    field.onChange(event);
                                                }}
                                            >
                                                {severityOptions.map((severityOption) => {
                                                    return (
                                                        <CustomMenuItem dense key={severityOption.value} value={severityOption.value}>
                                                            <CustomMenuItemTitle>{severityOption.label}</CustomMenuItemTitle>
                                                        </CustomMenuItem>
                                                    );
                                                })}
                                            </CustomSelect>
                                        );
                                    }}
                                    control={control}
                                />
                            </WrapperDropdown>
                        </WrapperObjectivesDropdwon>
                    </WrapperObjectives>
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
        </FormProvider >
    );
};

export default DependencyForm;