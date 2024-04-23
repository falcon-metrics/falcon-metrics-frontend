import { useState, useEffect } from 'react';
import BaseModal from 'components/UI/BaseModal/BaseModal2';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import { DateTime } from 'luxon';
import { useStyles } from './CommentsModal.styles';
import { useComments, CommentInfo } from '../../hooks/useComments';
import { FormFields } from '../../interfaces';
import CommentForm from '../CommentForm';
import { sortCommentsByDesc } from '../utils';

const CommentsModal = ({
  isOpen,
  setOpenEditModal,
  enableDefaultPlusButton,
  title,
  commentInfo,
  onSubmit,
  isReply = false,
}: {
  isOpen?: boolean;
  enableDefaultPlusButton?: boolean;
  title?: string;
  setOpenEditModal?: any;
  commentInfo?: CommentInfo;
  onSubmit?: (values) => void;
  isReply?: boolean;
}) => {
  /**
  * default styles
  */
  const classes = useStyles();

  /**
  * get postFunction to create a event
  */
  const { postComment, mutate, updateComment, data } = useComments();

  /**
  * Should manage to close modal when create new comment
  */
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  const handleOpenModal = () => setModalIsOpen(true);
  /**
  * Submit function to create a new comment
  */
  const handleSubmitComment = async (
    values: FormFields,
    afterSuccess: any,
  ) => {

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
        elementFields: values?.elementFields ? values?.elementFields : '',
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
        const updatedList = data.map((commentInfo) => {
          if (commentInfo.id === values.id) {

            return {
              ...commentInfo,
              ...updatedComment,
              ...values
            };
          }
          return commentInfo;
        });

        mutate({ data: { comments: sortCommentsByDesc(updatedList) } }, false);

        setModalIsOpen?.(false);
        afterSuccess?.();
        setOpenEditModal?.(false);

        await updateComment(updatedComment);

        mutate({ data: { comments: updatedList } }, true);
      } else {
        const newCommentsList = [
          ...data,
          formattedPayload,
        ] as CommentInfo[];
        mutate(
          { data: { comments: newCommentsList } },
          false,
        );

        setModalIsOpen?.(false);
        afterSuccess?.();
        setOpenEditModal?.(false);

        await postComment(formattedPayload);

        mutate(
          { data: { comments: newCommentsList } },
          true,
        );
      }
    } catch (error) {
      console.log(`error when create/update comment ==>`, error);
      setOpenEditModal?.(false);
    }
  };

  const openEventModal = (event) => {
    event.preventDefault();
    handleOpenModal();
  };

  useEffect(() => {
    setModalIsOpen(!!isOpen);
  }, [isOpen]);

  return (
    <div className={classes.sm}>
      {enableDefaultPlusButton ? (
        <IconButton aria-label={`${commentInfo ? 'Add' : 'Edit'} Comment`} size="small" className={classes.createButton} onClick={openEventModal}>
          <AddIcon />
        </IconButton>
      ): null}
      <BaseModal
        maxWidth='xs'
        open={isOpen || modalIsOpen}
        setOpen={setOpenEditModal || setModalIsOpen}
        title={title}
      >
        <CommentForm onSubmit={onSubmit || handleSubmitComment} commentInfo={commentInfo} isReply={isReply} />
      </BaseModal>   
    </div>
  );
}

export default CommentsModal;
