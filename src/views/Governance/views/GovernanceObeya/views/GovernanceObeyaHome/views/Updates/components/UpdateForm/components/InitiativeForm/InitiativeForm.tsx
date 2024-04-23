import { MenuItem, Box, IconButton, Button } from "@material-ui/core";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { RatingOptionsConstant } from "views/Governance/utils/constants";
import { CustomSelect } from "../../../InitiativeActions/InitiativeActions";
import { getStatusStyles } from "../../../UpdateCard/utils";
import { WrapperDatePicker, TitleWrapperSelect, WrapperButton, WrapperInitiative } from "../../UpdateForm.styles";
import DatePicker from 'views/Governance/views/GovernanceObeya/components/DatePicker';
import { useEffect, useState } from "react";
import NotesIcon from '@material-ui/icons/Notes';
import UpdateTextForm from "../UpdateTextForm/UpdateTextForm";
import { useObeyaRoom } from "views/Governance/views/GovernanceObeya/hooks/useObeyaRoom";
import { DateTime } from "luxon";
import { getNewUpdate } from "../../utils";
import useAuthentication from "hooks/useAuthentication";
import { addUpdateInfo, addUpdateToCache } from "../../../../hooks/useUpdates";
import { useSWRConfig } from "swr";
import _ from "lodash";
type InitiativeFormProps = {
    defaultDate?: Date;
    defaultStatus?: string;
    placeholder: string;
    activePlaceholder: string;
    afterSave?: any;

};
type FormInputType = {
    targetDate: Date;
    status: string;
    updateText: string;
    updateNotes: string;
};
const InitiativeForm = (props: InitiativeFormProps) => {
    useEffect(() => {
        console.log("init form mounted");
    }, []);
    const methods = useForm<FormInputType>({
        defaultValues: {
            targetDate: props.defaultDate || new Date(),
            status: props.defaultStatus || '4',
            updateText: '',
            updateNotes: ''
        },
    });

    const { mutateObeyaData, updateObeyaRoom, activeObeyaRoomId, activeRoom, data } = useObeyaRoom();
    const { userInfo, user } = useAuthentication();

    const [notesAdded, setNotesAdded] = useState<boolean>(false);
    const [textEditorRef, setTextEditorRef] = useState<undefined | { current: any; }>();
    const [notesTextEditorRef, setNotesTextEditorRef] = useState<undefined | { current: any; }>();
    const {
        getValues,
        control,
        register,
        handleSubmit,
        formState,
    } = methods;
    const { errors } = formState;

    const { mutate, cache } = useSWRConfig();

    const onSumbitInitiativeUpdate = (formData) => {
        console.log(formData);
        const currentTime = DateTime.now().toISO();
        const updateItem = getNewUpdate();

        updateItem.initiativeId = activeObeyaRoomId || '';
        updateItem.userId = user?.sub || '';
        updateItem.username = (user?.email ?? userInfo.userId) || '';
        updateItem.updateType = 'initiative';
        updateItem.createdAt = currentTime;
        updateItem.updatedAt = currentTime;
        updateItem.updateText = formData.updateText;
        updateItem.name = user?.name || '';
        updateItem.updateNotes = notesAdded ? formData.updateNotes : undefined;
        const updateMetadata: any = {
            fields: []
        };
        if (!activeRoom.endDate || (DateTime.fromISO(activeRoom.endDate).toMillis() !== DateTime.fromJSDate(formData.targetDate).toMillis())) {
            updateMetadata.fields.push({
                name: 'endDate',
                previousValue: activeRoom.endDate,
                value: DateTime.fromJSDate(formData.targetDate).toISO()
            });
        }
        if (activeRoom.ratingId !== formData.status) {
            updateMetadata.fields.push({
                name: 'ratingId',
                previousValue: activeRoom.ratingId,
                value: formData.status
            });
        }
        updateItem.updateMetadata = updateMetadata;
        const relevantKeysWithData: string[] = [];
        if (cache.get(`updates?initiativeId=${activeObeyaRoomId}&updateType=all`)) {
            console.log("All cache found");
            relevantKeysWithData.push(`updates?initiativeId=${activeObeyaRoomId}&updateType=all`);
        }
        if (cache.get(`updates?initiativeId=${activeObeyaRoomId}&updateType=initiative`)) {
            console.log("Initiative cache found");
            relevantKeysWithData.push(`updates?initiativeId=${activeObeyaRoomId}&updateType=initiative`);
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
            const updatedRoomData = _.cloneDeep(data.obeyaRoom);
            updatedRoomData.endDate = DateTime.fromJSDate(formData.targetDate).toISO();
            updatedRoomData.ratingId = formData.status;
            console.log(updatedRoomData);
            mutateObeyaData({ data: { ...data, obeyaRoom: updatedRoomData, } }, false);
            updateObeyaRoom(updatedRoomData);
        }

        //Reset form after save
        textEditorRef?.current?.getEditor()?.clipboard.dangerouslyPasteHTML('');
        notesTextEditorRef?.current?.getEditor()?.clipboard.dangerouslyPasteHTML('');
        setNotesAdded(false);
        if (props.afterSave) {
            props.afterSave();
        }
    };
    return (
        <FormProvider {...methods}>
            <form onSubmit={(event) => {
                event.preventDefault();
                if (!Object.keys(errors).length) {
                    handleSubmit(onSumbitInitiativeUpdate)(event);
                }
            }}>
                <WrapperInitiative>
                    <WrapperDatePicker>
                        <TitleWrapperSelect>Target Date</TitleWrapperSelect>
                        <DatePicker
                            {...register("targetDate")}
                            name="targetDate"
                            format="dd MMM yyyy"
                            placeholder=""
                            inputProps={{ style: { fontFamily: 'Open Sans', fontSize: 14, } }}
                            control={control}
                            errors={errors}
                        />
                    </WrapperDatePicker>
                </WrapperInitiative>
                <WrapperInitiative>
                    <TitleWrapperSelect>Status</TitleWrapperSelect>
                    <Controller
                        name="status"
                        control={control}
                        render={({ field }) => {
                            return (
                                <CustomSelect
                                    labelId={"element-type-label"}
                                    id={"element-type-label"}
                                    value={field.value}
                                    renderValue={(value: any) => {
                                        const item = RatingOptionsConstant.find(x => x.value === value);
                                        if (item)
                                            return <p>{item.label}</p>;
                                        else
                                            return <p>Not Rated</p>;
                                    }}
                                    style={{
                                        marginRight: 10,
                                        fontSize: 14,
                                        background: getStatusStyles(getValues().status).background,
                                        color: getStatusStyles(getValues().status).color
                                    }}
                                    onChange={(event) => {
                                        field.onChange(event);
                                    }}
                                >
                                    {RatingOptionsConstant.map((option) => {
                                        return (
                                            <MenuItem dense key={option.label} value={option.value}>
                                                <Box>{option.label}</Box>
                                            </MenuItem>
                                        );
                                    })}
                                </CustomSelect>
                            );
                        }}
                    />
                </WrapperInitiative>
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
                    >
                        post
                    </Button>
                </WrapperButton>
            </form>
        </FormProvider>
    );
};
export default InitiativeForm;