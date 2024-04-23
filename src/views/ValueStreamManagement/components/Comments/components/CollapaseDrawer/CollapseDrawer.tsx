import { useState, useEffect } from 'react';
import { DateTime } from 'luxon';
import {
  Typography,
  Box,
  Button,
  ButtonGroup,
} from '@material-ui/core';
import { v4 as uuidV4 } from 'uuid';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { styled } from '@material-ui/styles';
import { sortCommentsByAsc, sortCommentsByDesc } from '../utils';

import useProfile from 'hooks/useProfile';

import { useComments, CommentInfo } from '../../hooks/useComments';
import CommentCard from '../CommentCard';
import SkeletonCard from '../CommentCard/SkeletonCard';
import CommentsModal from '../CommentsModal';
import DeleteDialog from '../DeleteDialog/DeleteDialog';

import EmptyState from '../../../Events/components/EmptyState';

import { useStyles } from './CollapseDrawer.styles';

const messageEmptyStateComment = 'Add comments and engage in contextual discussion about specific items, metrics, periods, etc. E.g. Discussion around a flow item that took 246 days.';

const CustomAccordion = styled(AccordionItem)({
  marginTop: '6px !important',
  '& > .MuiAccordion-root.Mui-expanded': {
    marginTop: '6px !important',
    fontFamily: 'Open Sans'
  }
});

const CustomBoxAccordionContent = styled(Box)({
  '& > .makeStyles-wrapperSortedButton-118': {
    marginTop: 0,
  }
});

const CustomAccordionSummary = styled(AccordionSummary)({
  '& .MuiAccordionSummary-root.Mui-expanded': {
    height: 29
  },
  marginBottom: 22,
});

type AccordionItemsProps = {
  data: CommentInfo[],
  accordionIndex: string;
  isLoadingComments: boolean;
  title: string;
  deleteComment?: (commentId) => void;
  sortType: string;
  isDescActive: boolean;
  handleAscClick: () => void;
  handleDescClick: () => void;
};

export const Comments = () => {
  const {
    data: comments,
    isLoadingComments,
    removeComment,
    mutate,
  } = useComments();
  const [isDescActive, setIsDescActive] = useState(true);
  const [sortType, setSortType] = useState<'desc' | 'asc'>('desc');
  const [accordionKeys, setAccordionsKeys] = useState<string[]>([uuidV4(), uuidV4()]);
  const [sortedComment, setSortedComments] = useState<CommentInfo[]>(comments);

  useEffect(() => {
    if (comments?.length >= 0) {
      if (sortType === 'desc') {
        const sortedCommentByDesc = sortCommentsByDesc(comments);
        setSortedComments(sortedCommentByDesc);
        setAccordionsKeys([uuidV4(), uuidV4()]);
      } else if (sortType === 'asc') {
        const sortedCommentByAsc= sortCommentsByAsc(comments);
        setSortedComments(sortedCommentByAsc);
        setAccordionsKeys([uuidV4(), uuidV4()]);
      } else {
        const sortedCommentByDesc = sortCommentsByDesc(comments);
        setSortedComments(sortedCommentByDesc);
        setAccordionsKeys([uuidV4(), uuidV4()]);
      }
    }
  }, [sortType, comments]);

  const deleteComment = async (commentId) => {
    if (commentId) {
      try {
        const updatedList = {
          data: { comments: comments.filter(comment => comment.id !== commentId) }
        };
        mutate(
          updatedList,
          false
        );
        await removeComment(commentId);
      } catch(error) {
        console.log('error when delete comment', error);
      }
    }
  };

  const handleDescClick = () => {
    setIsDescActive(true);
    setSortType('desc');
  };

  const handleAscClick = () => {
    setIsDescActive(false);
    setSortType('asc');
  };

  return (
    <>
    {/* @ts-ignore */}
      <CustomAccordion
        sortType={'asc'}
        title='Comments'
        data={sortedComment}
        isLoadingComments={isLoadingComments}
        accordionIndex={accordionKeys[1]}
        deleteComment={deleteComment}
        isDescActive={isDescActive}
        handleAscClick={handleAscClick}
        handleDescClick={handleDescClick}
      />
    </>
  );
};

function AccordionItem({
  sortType,
  data,
  accordionIndex,
  isLoadingComments,
  title,
  deleteComment,
  isDescActive,
  handleAscClick,
  handleDescClick
}: AccordionItemsProps) {
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const [isOpenEditModal, setOpenEditModal] = useState(false);
  const [currentcommentId, setCurrentcommentId] = useState<string | undefined | number>(-1);
  const [currentEventToEdit, setEventToEdit] = useState<CommentInfo | undefined>();
  const [dataList, setDataList] = useState<CommentInfo[]>([]);
  const [confirmDeleteAlertOpen, setconfirmDeleteAlertOpen] = useState<boolean>(
    false,
  );

  useEffect(() => {
    if (data) {
      setDataList(data);
    }
  }, [sortType, data, accordionIndex])

  const openEditModal = (commentId?: string | number) => {
    if (commentId) {
      const commentInfoToEdit = data.find(commentInfo => commentInfo?.id === commentId);
      setEventToEdit(commentInfoToEdit);
    }
    setOpenEditModal(true);
  };

  const openAccordion = (event) => {
    /**
     *  Should open accordion when click on chevron icon or on the accordion title
     *  this was necessary to prevent propagate event and close when EventModal is
     *  opened
     */
    if (
      event?.target?.classList?.contains('MuiAccordionSummary-content') ||
      // capture only clicks on expand drawer box
      event?.target?.classList?.contains('expand-drawer') ||
      // capture click on title of accordion
      event?.target?.classList?.contains('MuiTypography-root') && event?.target?.classList?.contains('accordion-title') ||
      event?.target?.classList?.contains('MuiAccordionSummary-root') ||
      // when click on chevron svg icon to open
      event?.target?.tagName === 'path' && event?.target?.parentNode?.classList.contains('expand-drawer')
    ) {
      setOpen(isOpen => !isOpen);
    }
  };

  const closeAlerts = () => {
    setconfirmDeleteAlertOpen(false);
  };

  const deleteConfirmEvent = () => {
    setconfirmDeleteAlertOpen(false);
    deleteComment?.(currentcommentId);
  };

  const openDeleteConfirm = (commentId?: string | number) => {
    setconfirmDeleteAlertOpen(true);
    setCurrentcommentId(commentId);
  };

  return(
    <Accordion 
      onClick={openAccordion}
      className={classes.accordion}
      expanded={open}
    >
      <CustomAccordionSummary
        expandIcon={<ExpandMoreIcon className='expand-drawer' />}
        aria-controls='panel1a-content'
        id='panel1a-header'
      >
        <Typography className={`${classes.heading} accordion-title`}>
          {title}
        </Typography>
        {/** Modal to Create Event and triggered by default + button */}
        <CommentsModal enableDefaultPlusButton title='Create Comment' />
        {/** Modal to Uodate Controlled and triggered by edit button */}
        <CommentsModal
          isOpen={isOpenEditModal}
          title='Edit Comment'
          setOpenEditModal={setOpenEditModal}
          commentInfo={currentEventToEdit}
        />
      </CustomAccordionSummary>
        <CustomBoxAccordionContent>
          {!data?.length && !isLoadingComments ? ''
            : title === 'Comments' &&
              <SortedEvent 
                isDescActive={isDescActive}
                handleAscClick={handleAscClick}
                handleDescClick={handleDescClick}
              />
          } 
          <ListAccordion
            data={dataList}
            isLoadingComments={isLoadingComments}
            openDeleteConfirm={openDeleteConfirm}
            openEditModal={openEditModal}
          />
        </CustomBoxAccordionContent>
        <DeleteDialog
          confirmDeleteAlertOpen={confirmDeleteAlertOpen}
          closeAlerts={closeAlerts}
          title={title}
          deleteConfirmEvent={deleteConfirmEvent}
        />
    </Accordion>
  );
}

function ListAccordion ({ data, isLoadingComments, openEditModal, openDeleteConfirm } : {
  data: CommentInfo[];
  isLoadingComments: boolean;
  openEditModal: (commentId?: string | number) => void;
  openDeleteConfirm: (commentId?: string | number) => void;
}) {
  const classes = useStyles();
  const { data: userInfo } = useProfile();

  return (
    <Box className={classes.wrapperAccordionContent}>
     <Box display='flex' flexDirection='column'>
      {data?.length ? data.map((commentInfo) => {
        const formattedData = commentInfo.effective_date
          ? DateTime.fromISO(commentInfo.effective_date).toFormat('LLLL dd yyyy') : '';
          return (
            <CommentCard
              commentInfo={commentInfo}
              key={commentInfo?.id || uuidV4()}
              title={commentInfo?.title}
              efectiveDate={formattedData}
              description={commentInfo?.comment}
              authorName={commentInfo?.username}
              ownerId={commentInfo?.user_id}
              userId={userInfo?.user_id}
              openDeleteConfirm={openDeleteConfirm}
              commentId={commentInfo?.id}
              openEditModal={openEditModal}
              repliesCount={commentInfo.replies_count}
            />
          );
      }) : null}
      {!data?.length && isLoadingComments ? <><SkeletonCard /> <SkeletonCard /></>: null}
      {!data?.length && !isLoadingComments ? (
        <Box className={classes.wrapperEmptyState}>
          <EmptyState message={messageEmptyStateComment} typeText="a comment" />
        </Box>
        ) : ''}
     </Box>
    </Box>
  )
};

function SortedEvent({ isDescActive, handleDescClick, handleAscClick }: {
  isDescActive: boolean,
  handleDescClick: () => void,
  handleAscClick: () => void
}) {
  const classes = useStyles();
  return (
    <Box className={classes.wrapperSortedButton}>
      <ButtonGroup disableElevation size='small' className={classes.buttonGroup}>
        <Button
          variant={isDescActive ? 'contained' : 'outlined'}
          color='primary'
          onClick={handleDescClick}
          className={classes.buttonSorted}
        >
          Desc
        </Button>
        <Button
          variant={!isDescActive ? 'contained' : 'outlined'}
          color='primary'
          onClick={handleAscClick}
          className={classes.buttonSorted}
        >
          Asc
        </Button>
      </ButtonGroup>
    </Box>
  )
};
