import { useState, useContext } from 'react';
import { DateTime } from 'luxon';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import { Box } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import Divider from '@material-ui/core/Divider';
import useAuthentication from 'hooks/useAuthentication';
import ReplyTextField from '../ReplyTextField';
import useProfile from 'hooks/useProfile';
import { SelectedContextIdContext } from 'components/UserStateProvider/UserStateProvider';
import { v4 as uuidV4 } from 'uuid';
import { useReplies, CommentInfoBase } from '../../hooks/useReplies';
import ButtonAction from './components/ButtonAction';
import ReplyForm from './components/ReplyForm';
import { useStyles } from './CommentCard.styles';

import SkeletonReplyCard from './SkeletonReplyCard';
import RelationshipsMinifiedDisplay from 'components/RelationsipsMinifiedDisplay';

const truncate = (words: string | undefined, maxlength: number): string => {
  return `${words?.slice(0, maxlength)}...`;
};

type Props = {
  title: string;
  description?: string;
  efectiveDate: string;
  authorName: string;
  userId?: string;
  ownerId?: string;
  commentId?: string | number;
  openEditModal?: (commentId?: number | string) => void;
  openDeleteConfirm: (commentId?: number | string) => void;
  repliesCount?: string;
  commentInfo?: any;
};

const LIMIT_OF_WORDS = 54;

export const CommentCard = ({
  title, description, efectiveDate, authorName,
  userId, ownerId, commentId, openEditModal, openDeleteConfirm,
  repliesCount, commentInfo
}: Props) => {
  const classes = useStyles();
  const [isSeeMore, setIsSeeMore] = useState(false);
  const { isAdmin, isPowerUser } = useAuthentication();

  const onClickSeeMore = () => {
    setIsSeeMore(!isSeeMore);
  };

  const [isOpenRepĺies, setIsOpenReplies] = useState(false);

  /*
  * After the user removes the items we need to show
  * data.length instead the amount int repliesCount
  * because the cache will be updated
  */
  const [dirty, setIsDirty] = useState(false);
  const {
    data, isLoadingReplies, mutate,
    removeComment, updateComment, postComment
  } = useReplies(
    isOpenRepĺies || !isOpenRepĺies && dirty ? commentId : undefined
  );

  const { data: user } = useProfile();
  const { contextId } = useContext(SelectedContextIdContext);

  const onSubmitReply = async (comment) => {
    afterChangeReply();
    setIsDirty(true);
    try {
      const replyInfoComment = {
        effective_date: DateTime.fromJSDate(new Date())
          .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
          .toISO(),
        title: '',
        context_id: contextId,
        comment: comment?.trim(),
        user_id: user?.user_id,
        username: user?.name,
        parentId: commentId,
      };

      const updatedList = {
        data: {
          comment: [
            {
              ...commentInfo,
              ...data?.[0],
              replies: [
                ...(data?.[0]?.replies || []),
                replyInfoComment,
              ],
            }
          ],
        }
      };

      mutate(updatedList, false);

      await postComment(replyInfoComment);

      mutate(updatedList, true);
    } catch (e) {
      console.log('error when crate reply comment ==>', e);
    }
  };

  // toggle replies
  const onToggleReplies = () => {
    setIsOpenReplies((currentToggleReplies) => !currentToggleReplies);
  };

  // truncate text with length above 59 (more than 2 lines on the description)
  const formattedDescription = commentInfo && commentInfo?.comment ? commentInfo?.comment?.trim() : '';
  const isLongDescription = formattedDescription?.length > LIMIT_OF_WORDS;
  const maxTextDescription = isLongDescription
    ? truncate(formattedDescription, LIMIT_OF_WORDS) : commentInfo?.comment;

  // show amount of the cache when a reply is removed
  const repliesInCache = data?.[0]?.replies?.length || 0;

  // const amountOfReplies = repliesInCache || repliesCount;
  const amountOfReplies = repliesInCache || (!repliesInCache && dirty ? 0 : repliesInCache) || (!repliesInCache && !dirty) ? repliesCount : 0;
  // force pre-fetch replies to mutate the list after submit new first reply
  const afterChangeReply = () => {
    if (!isOpenRepĺies) {
      setIsOpenReplies(true);
    }
  };

  return (
    <>
      <Box
        className={classes.wrapperCard}
        style={isSeeMore ?
          { height: 'auto', paddingBottom: 20, borderBottom: '1px solid #d4d4d4', minHeight: isOpenRepĺies ? 208 : 195 } :
          { paddingBottom: 20, borderBottom: '1px solid #d4d4d4', minHeight: isOpenRepĺies ? 208 : 195 }}
      >
        <Box className={classes.dateCard}>
          <Box style={{ display: 'flex' }}>
            {efectiveDate}
            <Box style={{ marginLeft: 20 }}>
              <RelationshipsMinifiedDisplay elementId={commentId?.toString() || ''} elementType="comment" elementName={title} />
            </Box>
          </Box>
          {/** When user is seeing his comment they are able to see the actions */}
          {userId === ownerId && (isPowerUser || isAdmin) && commentId ? (
            <ButtonAction
              openEditModal={openEditModal}
              openDeleteConfirm={(commentId) => openDeleteConfirm(commentId)}
              id={commentId}
            />
          ) : null}
        </Box>
        <Box className={classes.wrapperContent} style={isSeeMore ? { minHeight: 150 } : {}}>
          <Tooltip title={<Box className={classes.tooltipTitle}>{title}</Box>} arrow placement="top-start">
            <Box className={classes.titleCard}>
              {title}
            </Box>
          </Tooltip>
          <Box style={{ display: 'flex', flexDirection: 'column' }}>
            <Box className={classes.wrapperDescription} style={isSeeMore ? { height: 'auto' } : {}}>
              {isSeeMore ? description : maxTextDescription}
            </Box>
            <Box>
              {
                isLongDescription
                  ? <Button className={classes.seeMoreButton} onClick={onClickSeeMore}>{isSeeMore ? 'See less' : 'See more'}</Button>
                  : null
              }
            </Box>
            {isOpenRepĺies && amountOfReplies ? <Box style={{ paddingTop: 30 }}><Divider light /></Box> : null}
          </Box>
        </Box>
        {!amountOfReplies && !isOpenRepĺies ? (
          <Box
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'flex-end',
              textAlign: 'right',
              paddingRight: 10
            }}
          >
            <Box className={classes.mainCardAuthorName}>
              by {authorName}
            </Box>
          </Box>
        ) : null}
        {
          (data?.[0]?.replies?.length || amountOfReplies)
            ? <Box style={{ height: isOpenRepĺies ? 'auto' : 0, border: '1px solid none' }}>
              <Box
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'space-between'
                }}
              >
                <Box
                  style={{
                    display: 'flex',
                    width: 300,
                    cursor: 'pointer',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingLeft: 10,
                    paddingRight: 10,
                  }}
                >
                  <Box onClick={onToggleReplies} style={{ display: 'flex', fontFamily: 'Open Sans', alignItems: 'center' }}>
                    <Box style={{ margin: '10px 5px 0px 0px' }}>
                      <ChatBubbleOutlineIcon style={{ color: '#b0b4b6', width: 16, height: 16 }} />
                    </Box>
                    <Box style={{ color: '#999ea0', fontFamily: 'Open Sans', display: 'flex' }}>
                      <Box>
                        {
                          isOpenRepĺies && (data?.[0]?.replies?.length || amountOfReplies)
                            ? `Hide ` : (data?.[0]?.replies?.length || amountOfReplies) === '1' ? `${data?.[0]?.replies?.length || amountOfReplies} reply` : `${data?.[0]?.replies?.length || amountOfReplies} replies`
                        }
                      </Box>
                    </Box>
                  </Box>
                  <Box className={classes.mainCardAuthorName}>
                    by {authorName}
                  </Box>
                </Box>
              </Box>
              <Box style={{ display: isOpenRepĺies ? 'flex' : 'none', height: 'auto', border: '1px solid none' }}>
                {isLoadingReplies ? (
                  <Box style={{
                    backgroundColor: '#f3f3f3',
                    height: 'auto',
                    width: 270,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    marginLeft: 0,
                    boxShadow: 'none'
                  }}>
                    <SkeletonReplyCard />
                    <SkeletonReplyCard />
                  </Box>
                ) : null}
                {!isLoadingReplies ? (
                  <Box style={{ background: '#fff', height: 'auto', width: 270, display: 'flex', flexDirection: 'column', justifyContent: 'center', marginLeft: 0, marginTop: 0, boxShadow: 'none' }}>
                    {data?.[0]?.replies?.map((reply: CommentInfoBase) => {
                      return (
                        <ReplyForm
                          setIsDirty={setIsDirty}
                          updateComment={updateComment}
                          userId={userId}
                          ownerId={ownerId}
                          key={reply.id || uuidV4()}
                          id={reply.id}
                          comment={reply.comment}
                          title={reply.title}
                          username={reply.username}
                          date={reply.effective_date}
                          openEditModal={openEditModal}
                          mutate={mutate}
                          removeComment={removeComment}
                          data={data}
                        />
                      );
                    })}
                  </Box>
                ) : null}
              </Box>
              <Box marginTop={repliesCount && isOpenRepĺies ? '8px' : 0}>
                <ReplyTextField onSubmitReply={onSubmitReply} />
              </Box>
            </Box>
            :
            <Box marginTop="7px"><ReplyTextField onSubmitReply={onSubmitReply} /></Box>
        }
      </Box>
    </>
  );
};
