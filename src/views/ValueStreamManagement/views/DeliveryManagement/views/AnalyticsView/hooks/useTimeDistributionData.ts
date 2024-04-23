import fetch, { useCustomSWR } from 'core/api/fetch';
import { ApiQueryParameters } from 'core/api/ApiClient/ApiClient';
import { AppliedFilters } from 'views/Dashboard/views/Platform/views/FilterPanel/contexts/FilterPanelContext/useFilterPanelContext';
import { getFilterUrlSearchParams } from 'views/Dashboard/views/Platform/views/FilterPanel/contexts/FilterPanelContext/utils';

import { parseTimeDistributionData } from '../utils/parsing/parseTimeDistributionData';
import { isTimeDistributionDataEmpty } from '../utils/validation/isTimeDistributionDataEmpty';
import { TimeDistributionData } from '../interfaces/timeDistribution';
import { WidgetInformation } from 'views/ValueStreamManagement/views/DeliveryGovernance/interfaces/common';

const timeDistributionFetcher = async (uri: string) => {
  return fetch.get(uri);
};

export interface TimeDistributionResponseData {
  data: TimeDistributionData;
  histogramWidgetInfo?: WidgetInformation[];
  scatterplotWidgetInfo?: WidgetInformation[];
  isValidating: boolean;
  isEmpty: boolean;
  error?: unknown;
  update: () => void;
};

export const useTimeDistributionData = (
  appliedFilters: AppliedFilters,
  apiQueryParameters: ApiQueryParameters,
  disabled: boolean,
): TimeDistributionResponseData => {
  const allQueryParametersString = getFilterUrlSearchParams({
    ...appliedFilters,
    ...apiQueryParameters
  });
  const endpoint = '/value-stream-management/delivery-management/time-distribution';
  const url = `${endpoint}?${allQueryParametersString}`;
  const {
    data: response,
    error: swrError,
    isValidating,
    mutate,
  } = useCustomSWR<any>(
    disabled ? null : url,
    timeDistributionFetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  );

  const emptyData: TimeDistributionResponseData = {
    data: {
      distribution: {
        minimum: null,
        maximum: null,
        modes: null,
        average: null,
        percentile50th: null,
        percentile85th: null,
        percentile95th: null,
        percentile98th: null,
        targetForPredictability: null,
      },
      histogram: [],
      boxPlot: null,
      scatterplot: [],
    },
    isValidating,
    isEmpty: true,
    error: swrError,
    update: () => true,
  };

  if (
    !response ||
    !response?.data
  ) {
    return emptyData;
  }

  const { data: timeDistributionData, histogramWidgetInfo, scatterplotWidgetInfo } = response.data;

  const parsedDistributionData: TimeDistributionData =
    parseTimeDistributionData(timeDistributionData);

  const isEmpty: boolean = isTimeDistributionDataEmpty(parsedDistributionData);

  return {
    data: parsedDistributionData,
    histogramWidgetInfo,
    scatterplotWidgetInfo,
    isValidating,
    isEmpty: isEmpty,
    error: swrError,
    update: mutate,
  };
};
