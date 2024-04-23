import fetch, { useCustomSWR } from 'core/api/fetch';
import { useFilterPanelContext } from 'views/Dashboard/views/Platform/views/FilterPanel/contexts/FilterPanelContext/useFilterPanelContext';
import { getFilterUrlSearchParams } from 'views/Dashboard/views/Platform/views/FilterPanel/contexts/FilterPanelContext/utils';
import { WidgetInformation } from '../../DeliveryGovernance/interfaces/common';
export type CFDNewDataItem = {
  stateName: string;
  cumulativeFlowData: {
    [date: string]: number;
  };
};

export type CFDSummaryItem = {
  arrivalRate?: number;
  departureRate?: number;
  dailyAverage?: number;
  averageCycleTime?: number;
};

export type FlowDiagramResponse = {
  cfdData: {
    [state: string]: CFDNewDataItem;
  };
  summaryData: {
    [state: string]: CFDSummaryItem;
  };
  widgetInfo?: WidgetInformation[];
};

const cfdAccordionFetcher = async (uri: string) => {
  const response = await fetch.get<FlowDiagramResponse>(uri);
  return response;
};

export function useCumulativeFlowDiagramData(
  cfdFilters: Record<string, string> = {},
  disabled = false
) {
  const { allFilters } = useFilterPanelContext();
  const filters = {
    ...allFilters,
    ...cfdFilters
  };
  const queryParamsString = getFilterUrlSearchParams(filters);
  const endpoint = '/value-stream-management/continuous-improvements/cfd';
  const url = `${endpoint}?${queryParamsString}`;
  const { data: response, error: swrError, isValidating, mutate } = useCustomSWR<any>(
    disabled ? null : url,
    cfdAccordionFetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  let errorMessage: string | null = null;
  if (response && typeof (response as any).message === 'string') {
    errorMessage = (response as any).message;
  } else if (response && response.data && (response.data as any).errorMessage) {
    errorMessage = (response.data as any).errorMessage;
  } else if (response && response.data && (response.data as any).message) {
    errorMessage = (response.data as any).message;
  } else if (response && response.data && (response.data as any).error) {
    const error: any = (response.data as any).error;
    if (typeof error === 'string') {
      errorMessage = error;
    } else if (typeof error === 'object' && typeof error.message === 'string') {
      errorMessage = error.message;
    } else {
      errorMessage = `Got unknown error object: ${JSON.stringify(error)}`;
    }
  } else if (response && (response as any).errorMessage) {
    errorMessage = (response as any).errorMessage;
  }

  let error: Error | undefined;
  if (errorMessage) {
    error = new Error(errorMessage);
  } else if (swrError) {
    error =
      typeof swrError === 'object' && swrError instanceof Error
        ? swrError
        : new Error('Data Fetch Error: ' + JSON.stringify(swrError));
  }

  const isEmpty =
    response &&
    !errorMessage &&
    !swrError &&
    typeof response.data === 'object' &&
    Object.keys(response.data.cfdData ?? {}).length === 0;

  return {
    data: response && response.data && !error ? response.data : null,
    error,
    isLoading: isValidating,
    update: mutate,
    isEmpty,
  };
}
