import useProfile from "hooks/useProfile";
import { TitleEdit, WrapperEllipse, useStyles } from "./ReplyCard.styles";
import { UpdateItem, editUpdateInCache, removeUpdate } from "../../../../hooks/useUpdates";
import { Box, Typography } from "@material-ui/core";
import Author from "./components/Author";
import ReplyForm from "../ReplyForm/ReplyForm";
import { Ellipse } from "../../UpdateCard.styles";
import { useState } from "react";
import { useConfirm } from "material-ui-confirm";
import { useSWRConfig } from "swr";
import _, { noop } from "lodash";
type ReplyCardProps = {
    reply: UpdateItem;
    updateInfo: UpdateItem;
};
const ReplyCard = (props: ReplyCardProps) => {
    const classes = useStyles();
    const { data: profile } = useProfile();
    const currentPicture = props.reply?.userId === profile?.user_id ? profile?.picture : '';
    const [isReadOnly, setIsReadOnly] = useState<boolean>(true);

    const confirm = useConfirm();
    const { mutate, cache } = useSWRConfig();
    const queryParams = new URLSearchParams(window.location.search);
    const obeyaRoomId = queryParams.get("roomId");
    const deleteReply = () => {
        confirm({
            title: "Are you sure you want to delete this reply?",
            description: (
                <Typography>This reply will be deleted.</Typography>
            ),
            cancellationText: "Cancel",
            confirmationText: "Delete"
        }).then(() => {
            const relevantKeysWithData: string[] = [];
            if (cache.get(`updates?initiativeId=${obeyaRoomId}&updateType=all`)) {
                console.log("All cache found");
                relevantKeysWithData.push(`updates?initiativeId=${obeyaRoomId}&updateType=all`);
            }
            if (props.updateInfo && cache.get(`updates?initiativeId=${obeyaRoomId}&updateType=${props.updateInfo.updateType}`)) {
                console.log(`${props.updateInfo.updateType} cache found`);
                relevantKeysWithData.push(`updates?initiativeId=${obeyaRoomId}&updateType=${props.updateInfo.updateType}`);
            }
            const updateCopy = _.cloneDeep(props.updateInfo);
            updateCopy.replies_count = (parseInt(updateCopy.replies_count as string) || 1) - 1;
            //change reply count in parent update , parent update might belong to multiple caches.
            relevantKeysWithData.forEach(key => {
                editUpdateInCache(
                    updateCopy,
                    cache.get(key),
                    mutate,
                    key
                );
            });
            if (cache.get(`updates/${props.updateInfo.id}?initiativeId=${obeyaRoomId}`)) {
                console.log(cache.get(`updates/${props.updateInfo.id}?initiativeId=${obeyaRoomId}`));
                const cacheCopy = _.cloneDeep(cache.get(`updates/${props.updateInfo.id}?initiativeId=${obeyaRoomId}`));
                if (cacheCopy) {
                    const replies = cacheCopy.data.updateWithReplies[0].replies;

                    if (replies) {
                        cacheCopy.data.updateWithReplies[0].replies = cacheCopy.data.updateWithReplies[0].replies.filter(reply => reply.id !== props.reply.id);
                    }
                }
                mutate(
                    `updates/${props.updateInfo.id}?initiativeId=${obeyaRoomId}`,
                    cacheCopy,
                    false
                );
            }
            removeUpdate(props.reply.id);
        }).catch(noop);
    };
    return (
        <Box style={{ marginTop: 10 }}>
            <Author
                photo={currentPicture}
                name={props.reply?.name || ''}
                views={12}
                listCard={true}
            />
            <Box className={classes.wrapperText}>
                {
                    isReadOnly ?
                        <div dangerouslySetInnerHTML={{
                            __html: props.reply.updateText
                        }} />
                        :
                        <ReplyForm
                            updateInfo={props.updateInfo}
                            replyId={props.reply.id?.toString() || ''}
                            replyText={props.reply.updateText}
                            afterSave={() => setIsReadOnly(true)}
                            submitLabel="Save"
                        />
                }
                {props.reply.userId === profile?.user_id && isReadOnly ? (
                    <Box style={{ display: 'flex', alignItems: 'center', marginTop: 25 }}>
                        <Box style={{ marginLeft: 10, marginBottom: 5, width: 25, display: 'inline-flex' }}>
                            <TitleEdit onClick={() => setIsReadOnly(false)}>Edit</TitleEdit>
                        </Box>
                        <WrapperEllipse>
                            <Ellipse />
                        </WrapperEllipse>
                        <Box style={{ marginLeft: 10, marginBottom: 5, width: 25, display: 'inline-flex' }}>
                            <TitleEdit onClick={deleteReply}>Delete</TitleEdit>
                        </Box>
                    </Box>
                ) : null}

            </Box>
        </Box>
    );
};

export default ReplyCard;