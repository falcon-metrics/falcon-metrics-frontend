import { useEffect, useState } from 'react';
import { slice } from 'lodash';
import { KanbanBoardItem } from '../interfaces/kanbanBoard';

// Interfaces for Full Data
export interface KanbanStateGroup {
  groupName: string;
  workItems: KanbanBoardItem[];
  totalItems: number;
}

export interface KanbanStateSet {
  fullProposed: KanbanStateGroup[];
  fullInProgress: KanbanStateGroup[];
  fullCompleted: KanbanStateGroup[];
}

// Interfaces for Truncated Data
export interface KanbanDisplayGroup {
  groupName: string,
  displayedItems: KanbanBoardItem[],
  numDisplayedItems: number,
  totalItems: number,
}

export interface KanbanDisplaySet {
  paginatedProposed: KanbanDisplayGroup[];
  paginatedInProgress: KanbanDisplayGroup[];
  paginatedCompleted: KanbanDisplayGroup[];
}

const createDisplayGroup = (
  group: KanbanStateGroup,
  itemThreshold: number,
): KanbanDisplayGroup => {
  const { groupName, workItems, totalItems } = group;
  const displayedItems = slice(workItems, 0, itemThreshold);

  return {
    groupName,
    displayedItems,
    numDisplayedItems: displayedItems.length,
    totalItems,
  };
};

const usePaginatedKanbanBoard = (
  data: KanbanStateSet,
  isValidating: boolean,
  setLoadingMore: (arg: boolean) => void,
) => {
  const [
    fullStateGroups,
    setFullStateGroups
  ] = useState<KanbanStateSet>(data);

  const PAGE_SIZE = 30;
  const [maxDisplayedItems, setMaxDisplayedItems] = useState(PAGE_SIZE);

  const emptyDisplaySet: KanbanDisplaySet = {
    paginatedProposed: [],
    paginatedInProgress: [],
    paginatedCompleted: [],
  };
  const [
    paginatedStates,
    setPaginatedState
  ] = useState<KanbanDisplaySet>(emptyDisplaySet);

  // Store Full Data
  useEffect(() => {
    if (data) {
      setFullStateGroups(data);
    }
  }, [isValidating]);

  // Retrieve Paginated Data
  useEffect(() => {
    setLoadingMore(true);

    const {
      fullProposed,
      fullInProgress,
      fullCompleted,
    } = fullStateGroups;

    const buildPagination = (group: KanbanStateGroup): KanbanDisplayGroup =>
      createDisplayGroup(group, maxDisplayedItems);
    const newPagination: KanbanDisplaySet = {
      paginatedProposed: fullProposed.map(buildPagination),
      paginatedInProgress: fullInProgress.map(buildPagination),
      paginatedCompleted: fullCompleted.map(buildPagination),
    };

    setPaginatedState(newPagination);

    setLoadingMore(false);
  }, [maxDisplayedItems, fullStateGroups]);

  const loadMore = () => {
    setMaxDisplayedItems(maxDisplayedItems + PAGE_SIZE);
  };

  return {
    paginatedStates,
    loadMore,
    maxDisplayedItems,
  };
};

export default usePaginatedKanbanBoard;
