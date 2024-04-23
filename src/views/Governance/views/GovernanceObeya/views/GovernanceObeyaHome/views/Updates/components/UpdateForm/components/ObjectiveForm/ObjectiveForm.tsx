import { useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { OKRKeyResult, OKRObjective } from "views/Governance/views/GovernanceObeya/utils";
import { CustomMenuItem, CustomMenuItemTitle, CustomSelect, TitleWrapperSelect, WrapperButton, WrapperObjectives, WrapperObjectivesDropdwon } from "../../UpdateForm.styles";
import { RatingOptionsConstant } from "views/Governance/utils/constants";
import { Box, Button, Checkbox, IconButton } from "@material-ui/core";
import UpdateTextForm from "../UpdateTextForm/UpdateTextForm";
import NotesIcon from '@material-ui/icons/Notes';
import { getStatusStyles } from "../../../UpdateCard/utils";
import { useObeyaGoals } from "views/Governance/views/GovernanceObeya/hooks/useObeyaGoals";
import { DateTime } from "luxon";
import { getNewUpdate } from "../../utils";
import { useObeyaRoom } from "views/Governance/views/GovernanceObeya/hooks/useObeyaRoom";
import useAuthentication from "hooks/useAuthentication";
import { UpdateItem, addUpdateInfo, addUpdateToCache } from "../../../../hooks/useUpdates";
import { useSWRConfig } from "swr";
import _ from "lodash";


type FormInputType = {
    ratingId: string;
    achieved: boolean;
    updateText: string;
    updateNotes: string;
};
type ObjectiveFormProps = {
    placeholder: string;
    activePlaceholder: string;
    defaultRatingId: string;
    defaultAchieved: boolean;
    payload?: any;
    afterSubmit?: any;
    objective?: OKRObjective;
    action?: string;
};

const getKrUpdate = (updatedKr: any, currentKr: OKRKeyResult, action: string, activeObeyaRoomId: string,
    user: any, userInfo: any, formData: any, notesAdded: boolean) => {
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
        action: action,
        id: updatedKr.keyResultId,
        fields: []
    };
    if (currentKr.completed !== updatedKr.completed) {
        updateMetadata.fields.push({
            name: 'achieved',
            previousValue: currentKr.completed,
            value: updatedKr.completed || false
        });
    }
    ["ratingId", "childItemLevel", "includeChildren", "includeRelated", "keyResultDescription", "parentWorkItemId"].forEach(key => {
        if (currentKr[key] !== updatedKr[key]) {
            updateMetadata.fields.push({
                name: key,
                previousValue: currentKr[key],
                value: updatedKr[key]
            });
        }
    });
    const isUpdatedLinkTypesEmpty = updatedKr['linkTypes'] === null || updatedKr['linkTypes'] === undefined || (Array.isArray(updatedKr['linkTypes']) && updatedKr['linkTypes'].length === 0);
    const isCurrentLinkTypesEmpty = currentKr['linkTypes'] === null || currentKr['linkTypes'] === undefined || (Array.isArray(currentKr['linkTypes']) && currentKr['linkTypes'].length === 0);
    if (!(isUpdatedLinkTypesEmpty && isCurrentLinkTypesEmpty) &&
        JSON.stringify(currentKr['linkTypes']) !== JSON.stringify(updatedKr['linkTypes'])) {
        updateMetadata.fields.push({
            name: 'linkTypes',
            previousValue: currentKr['linkTypes'],
            value: updatedKr['linkTypes']
        });
    }
    updateItem.updateMetadata = updateMetadata;
    return updateItem;
};

const compareKrs = (kr1: any, kr2: OKRKeyResult) => {
    const obj1 = _.pick(kr1, ["completed", "ratingId", "childItemLevel", "includeChildren", "includeRelated", "keyResultDescription", "parentWorkItemId", "linkTypes"]);
    const obj2 = _.pick(kr2, ["completed", "ratingId", "childItemLevel", "includeChildren", "includeRelated", "keyResultDescription", "parentWorkItemId", "linkTypes"]);
    return JSON.stringify(obj1) === JSON.stringify(obj2);
};
const ObjectiveForm = (props: ObjectiveFormProps) => {
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
    const { postAndMutateGoals, deleteAndMutateGoals } = useObeyaGoals(
        activeObeyaRoomId
    );
    const { userInfo, user } = useAuthentication();

    const { mutate, cache } = useSWRConfig();

    const onSubmitObjectiveUpdate = (formData) => {
        console.log(props);
        console.log(formData);
        const currentTime = DateTime.now().toISO();
        const updateItem = getNewUpdate();

        updateItem.initiativeId = activeObeyaRoomId || '';
        updateItem.userId = user?.sub || '';
        updateItem.username = (user?.email ?? userInfo.userId) || '';
        updateItem.updateType = 'objective';
        updateItem.createdAt = currentTime;
        updateItem.updatedAt = currentTime;
        updateItem.updateText = formData.updateText;
        updateItem.name = user?.name || '';
        updateItem.updateNotes = notesAdded ? formData.updateNotes : undefined;
        const updateMetadata: any = {
            action: props.action || 'edit',
            id: props.objective?.objectiveId,
            fields: []
        };

        let submitUpdate = false;
        // Submit update form for objective , objective will be passed.
        if (!props.action) {
            if (props.objective) {
                if (props.objective.achieved !== formData.achieved) {
                    updateMetadata.fields.push({
                        name: 'achieved',
                        previousValue: props.objective.achieved,
                        value: formData.achieved
                    });
                }
                if (props.objective.ratingId !== formData.ratingId) {
                    updateMetadata.fields.push({
                        name: 'ratingId',
                        previousValue: props.objective.ratingId,
                        value: formData.ratingId
                    });
                }
            }
            submitUpdate = true;
        } else {
            // Create action from manage objective form
            if (props.action === 'create') {
                updateMetadata.fields.push({
                    name: 'achieved',
                    previousValue: '',
                    value: formData.achieved || false
                });
                updateMetadata.fields.push({
                    name: 'ratingId',
                    previousValue: '',
                    value: formData.ratingId
                });
                updateMetadata.fields.push({
                    name: 'objectiveDescription',
                    previousValue: '',
                    value: props.payload?.objectiveDescription || ''
                });
                // Edit action from manage objective form
            } else if (props.action === 'edit' && props.objective) {
                if (props.objective.achieved !== formData.achieved) {
                    updateMetadata.fields.push({
                        name: 'achieved',
                        previousValue: props.objective.achieved,
                        value: formData.achieved
                    });
                }
                if (props.objective.ratingId !== formData.ratingId) {
                    updateMetadata.fields.push({
                        name: 'ratingId',
                        previousValue: props.objective.ratingId,
                        value: formData.ratingId
                    });
                }
                if (props.objective.objectiveDescription !== props.payload.objectiveDescription) {
                    updateMetadata.fields.push({
                        name: 'objectiveDescription',
                        previousValue: props.objective.objectiveDescription || '',
                        value: props.payload?.objectiveDescription || ''
                    });
                }
            } else if (props.action === 'delete') {
                updateMetadata.fields.push({
                    name: 'achieved',
                    previousValue: '',
                    value: formData.achieved
                });
                updateMetadata.fields.push({
                    name: 'ratingId',
                    previousValue: '',
                    value: formData.ratingId
                });
                updateMetadata.fields.push({
                    name: 'objectiveDescription',
                    previousValue: '',
                    value: props.objective?.objectiveDescription || ''
                });
            }
            if (updateMetadata.fields.length > 0)
                submitUpdate = true;
        }
        updateItem.updateMetadata = updateMetadata;
        if (submitUpdate) {
            const relevantKeysWithData: string[] = [];
            if (cache.get(`updates?initiativeId=${activeObeyaRoomId}&updateType=all`)) {
                console.log("All cache found");
                relevantKeysWithData.push(`updates?initiativeId=${activeObeyaRoomId}&updateType=all`);
            }
            if (cache.get(`updates?initiativeId=${activeObeyaRoomId}&updateType=objective`)) {
                console.log("Objective cache found");
                relevantKeysWithData.push(`updates?initiativeId=${activeObeyaRoomId}&updateType=objective`);
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
        }
        // Create KR updates if krs were edited/created/deleted during the creation or edition of objective through manage objective form.
        const krUpdates: UpdateItem[] = [];
        if (props.action === 'edit' && props.payload && props.objective) {
            const updatedKrs = props.payload.keyResults;
            const currentKrs = (props.objective.keyResults || []);
            updatedKrs.filter(kr => {
                const matchingKr = currentKrs.find(x => x.keyResultId === kr.keyResultId);
                //edited krs
                kr.id = undefined;
                if (kr.includeChildren === undefined)
                    kr.includeChildren = null;
                if (kr.includeRelated === undefined)
                    kr.includeRelated = null;
                if (matchingKr && !compareKrs(kr, matchingKr)) {
                    krUpdates.push(getKrUpdate(kr, matchingKr, 'edit', activeObeyaRoomId || '', user, userInfo, formData, notesAdded));
                }
                //added krs
                if (!matchingKr) {
                    krUpdates.push(getKrUpdate(kr, {}, 'create', activeObeyaRoomId || '', user, userInfo, formData, notesAdded));
                }
            });
            //Deleted krs
            currentKrs.filter(kr => {
                const matchingKr = updatedKrs.find(x => x.keyResultId === kr.keyResultId);
                if (!matchingKr) {
                    krUpdates.push(getKrUpdate(kr, {}, 'delete', activeObeyaRoomId || '', user, userInfo, formData, notesAdded));
                }
            });
        } else if (props.action === 'create' && props.payload) {
            props.payload.keyResults.forEach(kr => {
                krUpdates.push(getKrUpdate(kr, {}, 'create', activeObeyaRoomId || '', user, userInfo, formData, notesAdded));
            });
        }
        const relevantKeysWithDataForKrs: string[] = [];
        if (cache.get(`updates?initiativeId=${activeObeyaRoomId}&updateType=all`)) {
            console.log("All cache found");
            relevantKeysWithDataForKrs.push(`updates?initiativeId=${activeObeyaRoomId}&updateType=all`);
        }
        if (cache.get(`updates?initiativeId=${activeObeyaRoomId}&updateType=key result`)) {
            console.log("Key result cache found");
            relevantKeysWithDataForKrs.push(`updates?initiativeId=${activeObeyaRoomId}&updateType=key result`);
        }
        krUpdates.forEach(updateItem => {
            relevantKeysWithDataForKrs.forEach(key => {
                addUpdateToCache(
                    updateItem,
                    cache.get(key),
                    mutate,
                    key
                );
            });
            addUpdateInfo(updateItem);
        });
        console.log(krUpdates);
        if (updateMetadata.fields.length > 0 || krUpdates.length > 0) {
            let payloadToPost = props.payload || undefined;
            // Payload is not passed only when this component is called from update form i.e edit of an objective , meaning objective is passed.
            if (!payloadToPost) {
                payloadToPost = props.objective;
                payloadToPost.achieved = formData.achieved;
                payloadToPost.ratingId = formData.ratingId;
            }
            if (props.action === 'delete') {
                try {
                    deleteAndMutateGoals(props.objective);
                } catch (e) {
                    console.log("Error deleting objective", e);
                }
            } else {
                try {
                    postAndMutateGoals(payloadToPost);
                } catch (e) {
                    console.log("Error updating/creating objective", e);
                }
            }
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
                    handleSubmit(onSubmitObjectiveUpdate)(event);
                }
            }}>
                {!props.action &&
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
                }
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

export default ObjectiveForm;