import { useForm } from "react-hook-form";
import { UpdateItem, addUpdateInfo, editUpdateInCache, saveUpdate } from "../../../../hooks/useUpdates";
import { useState } from "react";
import useAuthentication from "hooks/useAuthentication";
import { WrapperEditor } from "../../UpdateCard.styles";
import TextEditor from "../../../TextEditor";
import { Button } from "@material-ui/core";
import { DateTime } from "luxon";
import { getNewUpdate } from "../../../UpdateForm/utils";
import _ from "lodash";
import { useSWRConfig } from "swr";

type ReplyFormProps = {
    updateInfo: UpdateItem;
    replyId?: string;
    replyText?: string;
    afterSave?: any;
    submitLabel?: string;
};
type FormInputData = {
    updateText: string;
};


const buttonWrapper = {
    // Button overlaps the component above. 
    // Thats becuase of absolute positioning
    // This is a workaround. not good design
    paddingTop: '25px',
    display: "flex",
    justifyContent: "flex-end"
};

const ReplyForm = (props: ReplyFormProps) => {
    const formMethods = useForm<FormInputData>({
        defaultValues: {
            updateText: props.replyText || ''
        },
    });
    const [textEditorRef, setTextEditorRef] = useState<undefined | { current: any; }>();
    const { userInfo, user } = useAuthentication();
    const {
        handleSubmit, getValues, setValue
    } = formMethods;
    const { mutate, cache } = useSWRConfig();

    const onSubmitValues = (formData) => {
        console.log(formData);
        const roomId = props.updateInfo.initiativeId;
        const currentTime = DateTime.now().toISO();
        const updateItem = getNewUpdate();
        if (props.replyId) {
            updateItem.id = props.replyId;
            updateItem.new_id = props.replyId;
        }
        updateItem.initiativeId = roomId;
        updateItem.userId = user?.sub || '';
        updateItem.username = (user?.email ?? userInfo.userId) || '';
        updateItem.updateType = 'general';
        updateItem.createdAt = currentTime;
        updateItem.updatedAt = currentTime;
        updateItem.updateText = formData.updateText;
        updateItem.name = user?.name || '';
        updateItem.parentId = props.updateInfo.id;
        updateItem.updateNotes = undefined;

        const relevantKeysWithData: string[] = [];

        if (cache.get(`updates?initiativeId=${roomId}&updateType=all`)) {
            console.log("All cache found");
            relevantKeysWithData.push(`updates?initiativeId=${roomId}&updateType=all`);
        }
        if (props.updateInfo && cache.get(`updates?initiativeId=${roomId}&updateType=${props.updateInfo.updateType}`)) {
            console.log(`${props.updateInfo.updateType} cache found`);
            relevantKeysWithData.push(`updates?initiativeId=${roomId}&updateType=${props.updateInfo.updateType}`);
        }

        //Edit reply , no need to update the reply count in parent id.
        if (props.replyId) {
            console.log(props);
            if (cache.get(`updates/${props.updateInfo.id}?initiativeId=${roomId}`)) {
                console.log(cache.get(`updates/${props.updateInfo.id}?initiativeId=${roomId}`));
                const cacheCopy = _.cloneDeep(cache.get(`updates/${props.updateInfo.id}?initiativeId=${roomId}`));
                const replies = cacheCopy?.data.updateWithReplies[0].replies;
                const replyIdx = replies.findIndex(x => x.id === props.replyId);
                replies[replyIdx] = updateItem;
                mutate(
                    `updates/${props.updateInfo.id}?initiativeId=${roomId}`,
                    cacheCopy,
                    false
                );
                saveUpdate(updateItem);
            }
        } else {
            console.log(props);
            const updateCopy = _.cloneDeep(props.updateInfo);
            updateCopy.replies_count = (parseInt(updateCopy.replies_count as string) || 0) + 1;
            //change reply count in parent update , parent update might belong to multiple caches.
            relevantKeysWithData.forEach(key => {
                editUpdateInCache(
                    updateCopy,
                    cache.get(key),
                    mutate,
                    key
                );
            });
            addUpdateInfo(updateItem);
            //If replies already loaded for the parent , add the new update to the reply list.
            if (cache.get(`updates/${props.updateInfo.id}?initiativeId=${roomId}`)) {
                console.log(cache.get(`updates/${props.updateInfo.id}?initiativeId=${roomId}`));
                const cacheCopy = _.cloneDeep(cache.get(`updates/${props.updateInfo.id}?initiativeId=${roomId}`));
                if (cacheCopy) {
                    const replies = cacheCopy.data.updateWithReplies[0].replies;
                    if (!replies) {
                        cacheCopy.data.updateWithReplies[0].replies = [updateItem];
                    } else {
                        cacheCopy.data.updateWithReplies[0].replies?.unshift(updateItem);
                    }
                    mutate(
                        `updates/${props.updateInfo.id}?initiativeId=${roomId}`,
                        cacheCopy,
                        false
                    );
                } else {
                    console.error('cacheCopy is undefined');
                }
            }
        }
        textEditorRef?.current?.getEditor()?.clipboard.dangerouslyPasteHTML('');
        if (props.afterSave) {
            props.afterSave();
        }
    };
    const defaultDescription = getValues()?.updateText || '';

    const onAfterChange = (payload) => {
        setValue('updateText', payload);
    };

    const shouldReset = !defaultDescription;

    return (
        <form onSubmit={handleSubmit(onSubmitValues)}>
            <WrapperEditor>
                <TextEditor
                    maxLength={280}
                    activePlaceholder='Write a reply...'
                    setRef={setTextEditorRef}
                    shouldReset={!shouldReset}
                    onAfterChange={onAfterChange}
                    defaultContent={defaultDescription}
                />
                <div style={{ ...buttonWrapper }}>
                    <Button
                        size="small"
                        variant="contained"
                        color="primary"
                        type='submit'
                        style={{ height: 30 }}
                    >
                        <span>{props.submitLabel || 'Reply'}</span>
                    </Button>
                </div>
            </WrapperEditor>
        </form >
    );
};

export default ReplyForm;
