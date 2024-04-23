import useSWR from 'swr';
import { StringUnitLength } from 'luxon';

import fetch from 'core/api/fetch';
import { ApiQueryParameters } from 'core/api/ApiClient/ApiClient';
import {
  AppliedFilters
} from 'views/Dashboard/views/Platform/views/FilterPanel/contexts/FilterPanelContext/useFilterPanelContext';
import {
  getFilterUrlSearchParams
} from 'views/Dashboard/views/Platform/views/FilterPanel/contexts/FilterPanelContext/utils';

import { KanbanBoardData } from '../interfaces/kanbanBoard';
import { parseKanbanBoardData } from '../utils/parseKanbanBoardData';
import { ItemSelectionOptions } from '../KanbanSection';
import { WidgetInformation } from 'views/ValueStreamManagement/views/DeliveryGovernance/interfaces/common';

export interface KanbanBoardResponseData {
  kanbanBoardData: KanbanBoardData;
  widgetInfo?: WidgetInformation[];
  isValidating: boolean;
  isEmpty: boolean;
  error?: unknown;
};

const fetchKanbanData = (url: StringUnitLength) => {
  return fetch.get(`${url}`);
};

export const useKanbanBoardData = (
  appliedFilters: AppliedFilters,
  apiQueryParameters: ApiQueryParameters,
  selectionOperator: string,
  selectionOptions: ItemSelectionOptions,
): KanbanBoardResponseData => {
  // Prevent Reload by Ignoring Updates to Unused Filters
  const scrubbedAppliedFilters = {
    ...appliedFilters,
    currentDataAggregation: undefined,
    perspective: undefined,
  };

  const scrubbedApiQueryParamters = {
    ...apiQueryParameters,
    currentDataAggregation: undefined,
    perspective: undefined,
  };

  const allQueryParametersString = getFilterUrlSearchParams({
    ...scrubbedAppliedFilters,
    ...scrubbedApiQueryParamters,
    ...selectionOptions,
    ...{ selectionOperator },
  });
  const endpoint =
    '/value-stream-management/delivery-management/kanban';
  const url = `${endpoint}?${allQueryParametersString}`;

  const { data: response, error, isValidating } = useSWR(
		url,
		fetchKanbanData,
		{ revalidateOnFocus: false },
	)

  const emptyKanbanBoardData: KanbanBoardData = {
    proposed: [],
    inProgress: [],
    completed: [],
  }

  const emptyResponse: KanbanBoardResponseData = {
    kanbanBoardData: emptyKanbanBoardData,
    isValidating,
    isEmpty: true,
    error,
  };

  // Verify that Data Exists
  if(!response || !response?.data || !response.data?.kanbanBoardData) {
    return emptyResponse;
  }

  const { kanbanBoardData, widgetInfo } = response.data;

  const parsedData: KanbanBoardData = parseKanbanBoardData(
    kanbanBoardData
  );

  const isEmpty: boolean =
    parsedData.proposed.length === 0 &&
    parsedData.inProgress.length === 0 &&
    parsedData.completed.length === 0;

  return {
    kanbanBoardData: parsedData,
    widgetInfo,
    isValidating,
    isEmpty,
    error,
  };
}
