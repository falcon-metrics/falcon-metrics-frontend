import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import UpdateTextForm from "../UpdateTextForm/UpdateTextForm";
import { WrapperButton } from "../../UpdateForm.styles";
import NotesIcon from '@material-ui/icons/Notes';
import { Button, IconButton } from "@material-ui/core";
import { getNewUpdate } from "../../utils";
import { useObeyaRoom } from "views/Governance/views/GovernanceObeya/hooks/useObeyaRoom";
import useAuthentication from "hooks/useAuthentication";
import { DateTime } from "luxon";
import { useSWRConfig } from "swr";
import { UpdateItem, addUpdateInfo, addUpdateToCache, editUpdateInCache, saveUpdate } from "../../../../hooks/useUpdates";
import _ from "lodash";

type FormInputType = {
    updateText: string;
    updateNotes: string;
};
type GeneralFormProps = {
    placeholder: string;
    activePlaceholder: string;
    updateTextDefaultValue?: string;
    updateNotesDefaultValue?: string;
    submitButtonText?: string;
    afterSave?: any;
    isNotesPresent?: boolean;
    update?: UpdateItem;
};
const GeneralForm = (props: GeneralFormProps) => {
    const methods = useForm<FormInputType>({
        defaultValues: {
            updateText: props.updateTextDefaultValue || '',
            updateNotes: props.updateNotesDefaultValue || ''
        },
    });
    const [notesAdded, setNotesAdded] = useState<boolean>(props.isNotesPresent || false);
    const [textEditorRef, setTextEditorRef] = useState<undefined | { current: any; }>();
    const [notesTextEditorRef, setNotesTextEditorRef] = useState<undefined | { current: any; }>();
    const {
        handleSubmit,
        formState,
    } = methods;
    const { errors } = formState;

    const { activeObeyaRoomId } = useObeyaRoom();
    const { userInfo, user } = useAuthentication();
    const { mutate, cache } = useSWRConfig();

    const onSubmitGeneralUpdate = (formData) => {
        console.log(formData);

        const relevantKeysWithData: string[] = [];
        if (cache.get(`updates?initiativeId=${activeObeyaRoomId}&updateType=all`)) {
            console.log("All cache found");
            relevantKeysWithData.push(`updates?initiativeId=${activeObeyaRoomId}&updateType=all`);
        }
        if (props.update && cache.get(`updates?initiativeId=${activeObeyaRoomId}&updateType=${props.update.updateType}`)) {
            console.log(`${props.update.updateType} cache found`);
            relevantKeysWithData.push(`updates?initiativeId=${activeObeyaRoomId}&updateType=${props.update.updateType}`);
        }
        console.log(props);
        const currentTime = DateTime.now().toISO();

        if (props.update) {
            const updateItem = _.cloneDeep(props.update);
            updateItem.updatedAt = currentTime;
            updateItem.updateText = formData.updateText;
            updateItem.updateNotes = notesAdded ? formData.updateNotes : undefined;
            relevantKeysWithData.forEach(key => {
                editUpdateInCache(
                    updateItem,
                    cache.get(key),
                    mutate,
                    key
                );
            });
            saveUpdate(updateItem);
        } else {
            const updateItem = getNewUpdate();
            updateItem.initiativeId = activeObeyaRoomId || '';
            updateItem.userId = user?.sub || '';
            updateItem.username = (user?.email ?? userInfo.userId) || '';
            updateItem.updateType = 'general';
            updateItem.createdAt = currentTime;
            updateItem.updatedAt = currentTime;
            updateItem.updateText = formData.updateText;
            updateItem.name = user?.name || '';
            updateItem.updateNotes = notesAdded ? formData.updateNotes : undefined;
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
                    handleSubmit(onSubmitGeneralUpdate)(event);
                }
            }}>
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
                        disabled={!!Object.keys(errors)?.length}
                    >
                        {props.submitButtonText || 'post'}
                    </Button>
                </WrapperButton>
            </form>
        </FormProvider>
    );
};

export default GeneralForm;