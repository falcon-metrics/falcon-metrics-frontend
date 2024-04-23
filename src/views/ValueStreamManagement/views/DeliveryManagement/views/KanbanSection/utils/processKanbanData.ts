import { KanbanBoardData, KanbanBoardGroup } from '../interfaces/kanbanBoard';
import {
  KanbanStateGroup,
  KanbanStateSet
} from '../hooks/usePaginatedKanbanBoard';

const convertToStateGroups = ({
  groupName,
  workItems,
}: KanbanBoardGroup): KanbanStateGroup => ({
  groupName,
  workItems,
  totalItems: workItems.length,
});

export const processKanbanData = (data: KanbanBoardData): KanbanStateSet => {
  const {
    proposed,
    inProgress,
    completed,
  } = data;

  const proposedData = proposed || [];
  const inProgressData = inProgress || [];
  const completedData = completed || [];

  const statesByCategory: KanbanStateSet = {
    fullProposed: proposedData.map(convertToStateGroups),
    fullInProgress: inProgressData.map(convertToStateGroups),
    fullCompleted: completedData.map(convertToStateGroups),
  };

  return statesByCategory;
};
