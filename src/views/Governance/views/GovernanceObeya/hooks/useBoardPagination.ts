import {
  useEffect,
  useState,
} from 'react';

const ITEMS_PER_PAGE = 5;

function getPaginatedItems(offset: number, items = []) {
  return items.slice(offset, offset + ITEMS_PER_PAGE);
}

export type WorkFlowItem = {
  title?: string;
  workItemId?: string;
  state?: string;
  stateCategory?: string;
  workItemType?: string;
  arrivalDate?: string;
  commitmentDate?: string;
  departureDate?: string;
  flagged?: boolean;
};

const getCountLabels = (currentPage: number, rawItems?: any[]) => {
  const paginatedItems = currentPage + ITEMS_PER_PAGE;
  const itemsCount =
    rawItems && paginatedItems > rawItems?.length
      ? rawItems?.length
      : paginatedItems;
  return rawItems?.length
    ? `${itemsCount}/${rawItems?.length}`
    : '0/0';
};

export const useBoardPagination = (
  selectedWorkItemType,
  objectiveOrKrFilter,
  rawCompleted,
  rawInProgress,
  rawProposed,
  setIsLoadingMore,
) => {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [prevCompleted, setPrevCompleted] = useState([]);
  const [prevInProgress, setPrevInProgress] = useState([]);
  const [prevProposed, setPrevProposed] = useState([]);
  const [prevFilter, setPrevFilter] = useState([]);
  const [prevKrFilter, setPrevKrFilter] = useState([]);
  const [paginatedCompletedItems, setPaginatedCompletedItems] = useState<
    WorkFlowItem[]
  >([]);
  const [paginatedInProgressItems, setPaginatedInProgressItems] = useState<
    WorkFlowItem[]
  >([]);
  const [paginatedProposedItems, setPaginatedProposedItems] = useState<
    WorkFlowItem[]
  >([]);

  useEffect(() => {
    if (selectedWorkItemType !== prevFilter || objectiveOrKrFilter !== prevKrFilter) {
      setPaginatedCompletedItems([]);
      setPaginatedInProgressItems([]);
      setPaginatedProposedItems([]);
      setPrevFilter(selectedWorkItemType);
      setPrevKrFilter(objectiveOrKrFilter);
    }
  }, [selectedWorkItemType, objectiveOrKrFilter]);

  const getInProgressCountLabel = () =>
    getCountLabels(currentPage, rawInProgress);
  const getCompletedCountLabel = () =>
    getCountLabels(currentPage, rawCompleted);
  const getProposedCountLabel = () =>
    getCountLabels(currentPage, rawProposed);

  useEffect(() => {
    if (rawCompleted.length && !paginatedCompletedItems.length) {
      setPrevCompleted(rawCompleted);
      setPaginatedCompletedItems(rawCompleted?.slice(0, ITEMS_PER_PAGE));
    }
    if (rawInProgress.length && !paginatedInProgressItems.length) {
      setPrevInProgress(rawInProgress);
      setPaginatedInProgressItems(rawInProgress?.slice(0, ITEMS_PER_PAGE));
    }
    if (rawProposed.length && !paginatedProposedItems.length) {
      setPrevProposed(rawProposed);
      setPaginatedProposedItems(rawProposed?.slice(0, ITEMS_PER_PAGE));
    }
  }, [
    rawProposed,
    rawInProgress,
    rawCompleted,
    paginatedInProgressItems,
    paginatedCompletedItems,
    paginatedProposedItems,
  ]);

  useEffect(() => {
    if (prevCompleted.length !== rawCompleted.length) {
      setPrevCompleted(rawCompleted);
      setPaginatedCompletedItems(rawCompleted?.slice(0, ITEMS_PER_PAGE));
    }
    if (prevInProgress.length !== rawInProgress.length) {
      setPrevInProgress(rawInProgress);
      setPaginatedInProgressItems(rawInProgress?.slice(0, ITEMS_PER_PAGE));
    }
    if (prevProposed.length !== rawProposed.length) {
      setPrevProposed(rawProposed);
      setPaginatedProposedItems(rawProposed?.slice(0, ITEMS_PER_PAGE));
    }
  }, [
    rawProposed,
    rawInProgress,
    rawCompleted,
    paginatedInProgressItems,
    paginatedCompletedItems,
    paginatedProposedItems,
  ]);

  const offset = currentPage ? currentPage : 0;

  const loadMoreItems = () => {
    setIsLoadingMore(true);
    const nextOffset = offset + ITEMS_PER_PAGE;

    // Done
    const prevDoneItems = [...paginatedCompletedItems];
    setCurrentPage(nextOffset);
    const newDonePaginatedItems = getPaginatedItems(nextOffset, rawCompleted);
    setPaginatedCompletedItems([...prevDoneItems, ...newDonePaginatedItems]);

    // InProgress
    const prevInProgressItems = [...paginatedInProgressItems];
    const newInProgressPaginatedItems = getPaginatedItems(
      nextOffset,
      rawInProgress,
    );
    setPaginatedInProgressItems([
      ...prevInProgressItems,
      ...newInProgressPaginatedItems,
    ]);

    // Proposed
    const prevProposedItems = [...paginatedProposedItems];
    const newProposedPaginatedItems = getPaginatedItems(
      nextOffset,
      rawProposed,
    );
    setPaginatedProposedItems([
      ...prevProposedItems,
      ...newProposedPaginatedItems,
    ]);

    setCurrentPage(nextOffset);
    setIsLoadingMore(false);
  };

  const resetPagination = () => {
    setCurrentPage(0);
    setPaginatedCompletedItems([]);
    setPaginatedInProgressItems([]);
    setPaginatedProposedItems([]);
  };

  return {
    resetPagination,
    currentPage,
    setCurrentPage,
    offset,
    loadMoreItems,
    getCompletedCountLabel,
    paginatedCompletedItems,
    getInProgressCountLabel,
    paginatedInProgressItems,
    getProposedCountLabel,
    paginatedProposedItems,
  };
};
