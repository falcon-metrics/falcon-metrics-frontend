import { Box, Divider, Tooltip } from '@material-ui/core';
import { useState } from 'react';
import { DateTime } from 'luxon';
import useAuthentication from 'hooks/useAuthentication';
import { useStyles } from './ReplyForm.styles';
import { CommentInfoBase } from '../../../../hooks/useReplies';
import DeleteDialog from '../../../DeleteDialog/DeleteDialog';
import CommentsModal from '../../../CommentsModal';
import ButtonAction from '../ButtonAction';

export const ReplyForm = ({
  id, comment, title, username,
  date, ownerId, userId,
  mutate, removeComment, data, updateComment,
  setIsDirty
}:any) => {
  const classes = useStyles();
  const formattedData = date ? DateTime.fromISO(date).toFormat('LLLL dd yyyy') : '';
  const { isAdmin, isPowerUser } = useAuthentication();
  const [confirmDeleteAlertOpen, setconfirmDeleteAlertOpen] = useState<boolean>(
    false,
  );

  // Edit modal to reply
  const [isOpenEditModal, setOpenEditModal] = useState(false);
  const [currentcommentId, setCurrentcommentId] = useState<string | undefined | number>(-1);
  const [currentEventToEdit, setEventToEdit] = useState<CommentInfoBase | undefined>();

  const openEditModal = (commentId?: string | number) => {
    if (commentId) {
      const replyToEdit = data?.[0]?.replies.find(commentInfo => commentInfo?.id === commentId);
      setEventToEdit(replyToEdit);
    }
    setOpenEditModal(true);
  };

  const handleSubmitReply = async (values) => {
    setIsDirty(true);
    try {
      /**
      * Should format the payload to have the same fieldName of the database
      */
      const formattedPayload = {
        context_id: values.contextId,
        comment: values.comment,
        title: values.title,
        user_id: values.userId,
        username: values.username,
        // convert to ISO to keep this sorted rightly after added
        effective_date: DateTime.fromJSDate(new Date(values.effectiveDate))
          .set({ hour: 0, minute: 0, second: 0, millisecond: 0 }).toISO(),
      };
      
      /**
       * Should update cache on SWR to do a new fetch
       */
      if (values.id) {
        const updatedComment = {
          id: values.id,
          ...formattedPayload
        };

        // update the items on swr cache
        const updatedReplies = data?.[0]?.replies.map((reply) => {
          if (reply.id === values.id) {
            return updatedComment;
          }
          return reply;
        });

        const updatedCache = {
          data: {
            comment: [
              {
                ...data?.[0].replies,
                replies: updatedReplies,
              }
            ],
          },
        };

        mutate(
          updatedCache,
          false
        );

        setOpenEditModal?.(false);

        await updateComment(updatedComment);

        mutate(
          updatedCache,
          true
        );
      }
    } catch (error) {
      console.log(`error when update reply ==>`, error);
      setOpenEditModal?.(false);
    }
  };

  /**
   * Remove comment on replies cache level FROM SWR
   */
  const deleteReply = async (commentId) => {
    setIsDirty(true);
    if (commentId) {
      const newRepliesList = {
        ...data[0],
        replies: data[0]?.replies?.filter(
          (comment: CommentInfoBase) => comment.id !== commentId
        ),
      };
      try {
        mutate(
          {
            data: {
              comment: [newRepliesList],
            },
          },
          false
        );
        await removeComment(commentId);
      } catch(error) {
        console.log('error when delete comment', error);
      }
    }
  };

  const closeAlerts = () => {
    setconfirmDeleteAlertOpen(false);
  };

  const deleteConfirmEvent = () => {
    setconfirmDeleteAlertOpen(false);
    deleteReply?.(currentcommentId);
  };

  const openDeleteConfirm = (commentId?: string | number) => {
    setconfirmDeleteAlertOpen(true);
    setCurrentcommentId(commentId);
  };

  return (
    <>
      <Box>
        <Box className={classes.wrapperCard}>
          <Box className={classes.dividerAndDateCard}>
            <Divider
              light
              className={classes.divider}
            />
          </Box>
          <Box className={classes.dateCard}>
            {formattedData}
            {userId === ownerId && (isPowerUser || isAdmin) && id ? (
              <ButtonAction
                id={id}
                openEditModal={openEditModal}
                openDeleteConfirm={() => openDeleteConfirm(id)}
              />
            ): null}
          </Box>
          <Box className={classes.wrapperContent}>
            <Tooltip title={<Box className={classes.tooltipTitle}>{title}</Box>} arrow placement="top-start">
              <Box className={classes.titleCard}>
                {title}
              </Box>
            </Tooltip>
            <Box className={classes.wrapperComment}>
              <Box className={classes.wrapperDescription}>
                {comment}
              </Box>
            </Box>
            <Box className={classes.authorName}>
            {'  '} by {username}
            </Box>
          </Box>
        </Box>
      </Box>
      <DeleteDialog
        confirmDeleteAlertOpen={confirmDeleteAlertOpen}
        closeAlerts={closeAlerts}
        title={title}
        deleteConfirmEvent={deleteConfirmEvent}
      />
      <CommentsModal
        onSubmit={handleSubmitReply}
        isOpen={isOpenEditModal}
        title='Edit Comment'
        setOpenEditModal={setOpenEditModal}
        commentInfo={currentEventToEdit}
        isReply
      />
    </>
  );
};
