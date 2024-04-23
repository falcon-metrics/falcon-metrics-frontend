import { StringUnitLength } from 'luxon';
import fetch, { useCustomSWR } from 'core/api/fetch';
import { ApiQueryParameters } from 'core/api/ApiClient/ApiClient';
import { AppliedFilters } from 'views/Dashboard/views/Platform/views/FilterPanel/contexts/FilterPanelContext/useFilterPanelContext';
import { getFilterUrlSearchParams } from 'views/Dashboard/views/Platform/views/FilterPanel/contexts/FilterPanelContext/utils';

import { parseServiceLevelData } from '../utils/parsing/parseServiceLevelData';
import { isServiceLevelDataEmpty } from '../utils/validation/isServiceLevelDataEmpty';
import { ServiceLevelData } from '../interfaces/serviceLevel';
import { WidgetInformation } from 'views/ValueStreamManagement/views/DeliveryGovernance/interfaces/common';

export interface ServiceLevelResponseData {
  serviceLevelData: ServiceLevelData;
  serviceLevelWidgetInfo?: WidgetInformation[];
  isValidating: boolean;
  isEmpty: boolean;
  error?: unknown;
  update: () => void;
}

const fetchServiceLevelData = (url: StringUnitLength) => {
  return fetch.get(`${url}`);
};

export const useServiceLevelData = (
  appliedFilters: AppliedFilters,
  apiQueryParameters: ApiQueryParameters,
  disabled = false,
): ServiceLevelResponseData => {
  const allQueryParametersString = getFilterUrlSearchParams({
    ...appliedFilters,
    ...apiQueryParameters
  });
  const endpoint =
    '/value-stream-management/delivery-management/service-level';
  const url = `${endpoint}?${allQueryParametersString}`;

  const {
    data: response,
    error,
    isValidating,
    mutate,
  } = useCustomSWR<any>(
    disabled ? null : url,
    fetchServiceLevelData,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  );

  const emptyData: ServiceLevelResponseData = {
    serviceLevelData: {
      normalisedDemands: [],
      workItemTypes: [],
    },
    isValidating,
    isEmpty: true,
    error,
    update: () => true,
  };

  // Verify that Data Exists
  if (
    !response ||
    !response?.data ||
    !response?.data?.serviceLevelData
  ) {
    return emptyData;
  }

  const { serviceLevelData, widgetInfo } = response.data;

  const parsedServiceLevelData: ServiceLevelData =
    parseServiceLevelData(serviceLevelData);

  const isEmpty: boolean = isServiceLevelDataEmpty(parsedServiceLevelData);

  return {
    serviceLevelData: parsedServiceLevelData,
    serviceLevelWidgetInfo: widgetInfo,
    isValidating,
    isEmpty,
    error,
    update: mutate,
  };
};
