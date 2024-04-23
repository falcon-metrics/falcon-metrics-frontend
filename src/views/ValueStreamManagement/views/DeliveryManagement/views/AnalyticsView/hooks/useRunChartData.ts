import { StringUnitLength } from 'luxon';
import { ApiQueryParameters } from 'core/api/ApiClient/ApiClient';
import fetch, { useCustomSWR } from 'core/api/fetch';
import {
  AppliedFilters,
} from 'views/Dashboard/views/Platform/views/FilterPanel/contexts/FilterPanelContext/useFilterPanelContext';
import { getUrlQueryParamsString } from 'views/ValueStreamManagement/utils/queryParams';

import { RunChartData } from '../interfaces/runChart';
import { parseRunChartData } from '../utils/parsing/parseRunChartData';
import { isRunChartDataEmpty } from '../utils/validation/isRunChartDataEmpty';
import { WidgetInformation } from 'views/ValueStreamManagement/views/DeliveryGovernance/interfaces/common';
import { getTimezone } from 'utils/utils';

export interface RunChartResponseData {
  runChartData: RunChartData;
  runChartWidgetInfo?: WidgetInformation[];
  isValidating: boolean;
  isEmpty: boolean;
  error?: unknown;
  update: () => void;
}

const fetchRunChartData = (url: StringUnitLength) => {
  return fetch.get(`${url}`);
};

export const useRunChartData = (
  appliedFilters: AppliedFilters,
  apiQueryParameters: ApiQueryParameters,
  disabled = false,
): RunChartResponseData => {
  const urlParameters = new URLSearchParams(window.location.search);
  const localizationParams = {
    tz: urlParameters.get('timezone') ?? getTimezone(),
    lang: urlParameters.get('lang') ?? navigator.language,
  };
  const allQueryParametersString = getUrlQueryParamsString({
    ...appliedFilters,
    ...apiQueryParameters,
    ...localizationParams
  });

  const endpoint = '/value-stream-management/delivery-management/run-chart';
  const url = `${endpoint}?${allQueryParametersString}`;

  const {
    data: response,
    error,
    isValidating,
    mutate,
  } = useCustomSWR<any>(
    disabled ? null : url,
    fetchRunChartData,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  );

  const emptyData: RunChartResponseData = {
    runChartData: {
      totalItemsData: [],
      newItemsData: [],
    },
    isValidating,
    isEmpty: true,
    error,
    update: () => true,
  };

  // Verify that Data Exists
  if (!response || !response?.data || !response?.data?.runChartData) {
    return emptyData;
  }

  const { runChartData, widgetInfo } = response.data;

  // Attempt to Parse Data
  try {
    const parsedRunChartData: RunChartData = parseRunChartData(
      runChartData
    );

    const isEmpty: boolean = isRunChartDataEmpty(parsedRunChartData);

    return {
      runChartData: parsedRunChartData,
      runChartWidgetInfo: widgetInfo,
      isValidating,
      isEmpty,
      error,
      update: mutate,
    };

  } catch (error: unknown) {
    const parsedError: Error = error instanceof Error
      ? error
      : new Error(
        `Unexpected error object of type "${typeof error} when parsing
              Run Chart response data."`,
      );

    return {
      runChartData: {
        totalItemsData: [],
        newItemsData: [],
      },
      runChartWidgetInfo: [],
      isValidating,
      isEmpty: true,
      error: parsedError.message,
      update: () => true,
    };
  }
};
