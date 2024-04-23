import {
  memo,
} from 'react';
import { AppBar, Box } from '@material-ui/core';
import { concat, maxBy } from 'lodash';

import { WorkflowColors } from '../../../../utils/constants';

import { KanbanBoardItem } from '../../interfaces/kanbanBoard';
import {
  KanbanDisplayGroup,
  KanbanDisplaySet
} from '../../hooks/usePaginatedKanbanBoard';

import ShowMoreButton from './components/ShowMoreButton';
import WorkflowCategoryColumns from './components/WorkflowCategoryColumns';
import WorkflowCategoryHeaders from './components/WorkflowCategoryHeaders';
import KanbanSkeleton from './components/KanbanSkeleton';
import { useStyles } from './WorkflowBoard.styles';

type Props = {
  paginatedStates: KanbanDisplaySet;
  isValidating: boolean;
  loadMore: () => void;
  isLoadingMore: boolean;
  maxDisplayedItems: number;
};

const getMaxItems = (
  proposedStates: KanbanDisplayGroup[],
  inProgressStates: KanbanDisplayGroup[],
  completedStates: KanbanDisplayGroup[],
) => {
  const allStates = concat(
    proposedStates,
    inProgressStates,
    completedStates,
  );

  const maxItems = maxBy(allStates, 'totalItems')?.totalItems;
    
  return maxItems ?? 0;
}

const WorkflowBoard = memo(({
  paginatedStates,
  isValidating,
  loadMore,
  isLoadingMore,
  maxDisplayedItems,
}: Props) => {
  const classes = useStyles();
  const {
    paginatedProposed,
    paginatedInProgress,
    paginatedCompleted,
  } = paginatedStates;

  const retrieveDisplayedItems =
    ({ displayedItems }: KanbanDisplayGroup) => displayedItems;

  const [
    itemsProposedStates,
    itemsInProgressStates,
    itemsCompletedStates
  ]: [
    Array<KanbanBoardItem[]>,
    Array<KanbanBoardItem[]>,
    Array<KanbanBoardItem[]>,
  ] = [
    paginatedProposed.map(retrieveDisplayedItems),
    paginatedInProgress.map(retrieveDisplayedItems),
    paginatedCompleted.map(retrieveDisplayedItems),
  ];

  const maxItemsAcrossStates: number = getMaxItems(
    paginatedProposed,
    paginatedInProgress,
    paginatedCompleted,
  );

  const enableLoadButton = maxDisplayedItems < maxItemsAcrossStates;

  return (
    <Box className={classes.container}>
      {isValidating ? (
        <KanbanSkeleton />
      ) : (
        <>
          <AppBar
            position="sticky"
            classes={{ 
              root: classes.navigationSection,
              colorPrimary: classes.navigationSectionColor,
            }}
          >
            <Box className={classes.headersContainer}>
              <WorkflowCategoryHeaders
                stateCategory='proposed'
                stateGroups={paginatedProposed}
                statusColor={WorkflowColors.proposed}
                textColor="#404040"
              />
              <WorkflowCategoryHeaders
                stateCategory='inProgress'
                stateGroups={paginatedInProgress}
                statusColor={WorkflowColors.inProgress}
                textColor="#FFFFFF"
              />
              <WorkflowCategoryHeaders
                stateCategory='completed'
                stateGroups={paginatedCompleted}
                statusColor={WorkflowColors.completed}
                textColor="#FFFFFF"
              />
            </Box>
          </AppBar>
          <Box className={classes.boardContainer}>
            <Box
              className={classes.columnsContainer}
            >
              <WorkflowCategoryColumns
                stateCategory='proposed'
                stateGroups={itemsProposedStates}
              />
              <WorkflowCategoryColumns
                stateCategory='inProgress'
                stateGroups={itemsInProgressStates}
              />
              <WorkflowCategoryColumns
                stateCategory='completed'
                stateGroups={itemsCompletedStates}
              />
            </Box>
            {enableLoadButton && (
            <ShowMoreButton
              isLoadingMore={isLoadingMore}
              onLoadMore={loadMore}
            />)}
          </Box>
        </>
      )}
    </Box>
  );
});

export default WorkflowBoard;
