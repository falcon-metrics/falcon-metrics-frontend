import { Box, Button, Checkbox, IconButton } from "@material-ui/core";
import { useState } from "react";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { RatingOptionsConstant } from "views/Governance/utils/constants";
import { OKRKeyResult, OKRObjective } from "views/Governance/views/GovernanceObeya/utils";
import { getStatusStyles } from "../../../UpdateCard/utils";
import { WrapperObjectives, WrapperObjectivesDropdwon, TitleWrapperSelect, CustomSelect, CustomMenuItem, CustomMenuItemTitle, WrapperButton } from "../../UpdateForm.styles";
import UpdateTextForm from "../UpdateTextForm/UpdateTextForm";
import NotesIcon from '@material-ui/icons/Notes';
import { useObeyaGoals } from "views/Governance/views/GovernanceObeya/hooks/useObeyaGoals";
import { useObeyaRoom } from "views/Governance/views/GovernanceObeya/hooks/useObeyaRoom";
import useAuthentication from "hooks/useAuthentication";
import { useSWRConfig } from "swr";
import { DateTime } from "luxon";
import { getNewUpdate } from "../../utils";
import { addUpdateInfo, addUpdateToCache } from "../../../../hooks/useUpdates";
type FormInputType = {
    ratingId: string;
    achieved: boolean;
    updateText: string;
    updateNotes: string;
};
type KeyResultFormProps = {
    placeholder: string;
    activePlaceholder: string;
    defaultRatingId: string;
    defaultAchieved: boolean;
    payload?: any;
    afterSubmit?: any;
    keyResult?: OKRKeyResult;
    objective?: OKRObjective;
    action?: string;
};
const KeyResultForm = (props: KeyResultFormProps) => {
    const methods = useForm<FormInputType>({
        defaultValues: {
            ratingId: props.defaultRatingId,
            achieved: props.defaultAchieved,
            updateText: '',
            updateNotes: ''
        },
    });
    const [notesAdded, setNotesAdded] = useState<boolean>(false);
    const [textEditorRef, setTextEditorRef] = useState<undefined | { current: any; }>();
    const [notesTextEditorRef, setNotesTextEditorRef] = useState<undefined | { current: any; }>();
    const {
        getValues,
        control,
        handleSubmit,
        formState,
    } = methods;
    const { errors } = formState;

    const { activeObeyaRoomId } = useObeyaRoom();
    const { postAndMutateGoals } = useObeyaGoals(
        activeObeyaRoomId
    );
    const { userInfo, user } = useAuthentication();

    const { mutate, cache } = useSWRConfig();

    const onSubmitKeyResultUpdate = (formData) => {
        console.log(props);
        console.log(formData);
        const currentTime = DateTime.now().toISO();
        const updateItem = getNewUpdate();

        updateItem.initiativeId = activeObeyaRoomId || '';
        updateItem.userId = user?.sub || '';
        updateItem.username = (user?.email ?? userInfo.userId) || '';
        updateItem.updateType = 'key result';
        updateItem.createdAt = currentTime;
        updateItem.updatedAt = currentTime;
        updateItem.updateText = formData.updateText;
        updateItem.name = user?.name || '';
        updateItem.updateNotes = notesAdded ? formData.updateNotes : undefined;
        const updateMetadata: any = {
            fields: []
        };

        if (props.keyResult) {
            // console.log(props.keyResult.achieved);
            // console.log(formData.achieved);
            // console.log(props.keyResult.achieved !== formData.achieved);
            if (props.keyResult.completed !== formData.achieved) {
                updateMetadata.fields.push({
                    name: 'achieved',
                    previousValue: props.keyResult.completed,
                    value: formData.achieved
                });
            }
            if (props.keyResult.ratingId !== formData.ratingId) {
                updateMetadata.fields.push({
                    name: 'ratingId',
                    previousValue: props.keyResult.ratingId,
                    value: formData.ratingId
                });
            }
        }
        updateItem.updateMetadata = updateMetadata;
        const relevantKeysWithData: string[] = [];
        if (cache.get(`updates?initiativeId=${activeObeyaRoomId}&updateType=all`)) {
            console.log("All cache found");
            relevantKeysWithData.push(`updates?initiativeId=${activeObeyaRoomId}&updateType=all`);
        }
        if (cache.get(`updates?initiativeId=${activeObeyaRoomId}&updateType=key result`)) {
            console.log("Key result cache found");
            relevantKeysWithData.push(`updates?initiativeId=${activeObeyaRoomId}&updateType=key result`);
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
            // Payload is not passed only when this component is called from update form i.e edit of an objective , meaning objective is passed.
            if (!payloadToPost) {
                payloadToPost = props.objective;
                const krToModify = payloadToPost.keyResults.find(x => x.keyResultId);
                krToModify.completed = formData.achieved;
                krToModify.ratingId = formData.ratingId;
            }
            postAndMutateGoals(payloadToPost);
        }
        //Reset form after save
        textEditorRef?.current?.getEditor()?.clipboard.dangerouslyPasteHTML('');
        notesTextEditorRef?.current?.getEditor()?.clipboard.dangerouslyPasteHTML('');
        setNotesAdded(false);
        if (props.afterSubmit) {
            props.afterSubmit();
        }
    };
    return (
        <FormProvider {...methods}>
            <form onSubmit={(event) => {
                event.preventDefault();
                if (!Object.keys(errors).length) {
                    handleSubmit(onSubmitKeyResultUpdate)(event);
                }
            }}>
                {!props.action && (
                    <>
                        <WrapperObjectives>
                            <WrapperObjectivesDropdwon>
                                <TitleWrapperSelect>Rating</TitleWrapperSelect>
                                <Controller
                                    name="ratingId"
                                    control={control}
                                    render={({ field }) => {
                                        return (
                                            <CustomSelect
                                                label="Rating"
                                                inputProps={{ style: { fontFamily: 'Open Sans' } }}
                                                value={field.value}
                                                onChange={(event) => {
                                                    field.onChange(event);
                                                }}
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
                                                    background: getStatusStyles(getValues().ratingId).background,
                                                    color: getStatusStyles(getValues().ratingId).color
                                                }}
                                            >
                                                {RatingOptionsConstant.map((ratingOption) => {
                                                    return (
                                                        <CustomMenuItem dense key={ratingOption.value} value={ratingOption.value}>
                                                            <CustomMenuItemTitle>{ratingOption.label}</CustomMenuItemTitle>
                                                        </CustomMenuItem>
                                                    );
                                                })}
                                            </CustomSelect>
                                        );
                                    }}
                                />
                            </WrapperObjectivesDropdwon>
                        </WrapperObjectives>
                        <Box style={{ marginTop: 10 }}>
                            <Controller
                                name="achieved"
                                control={control}
                                render={({ field }) => {
                                    return (
                                        <label>
                                            <Checkbox
                                                color="default"
                                                checked={field.value}
                                                onChange={field.onChange}
                                                style={{ paddingLeft: 0 }}
                                            />
                                            <span>Achieved</span>
                                        </label>
                                    );
                                }}
                            />
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
                    >
                        post
                    </Button>
                </WrapperButton>
            </form>
        </FormProvider>
    );
};

export default KeyResultForm;