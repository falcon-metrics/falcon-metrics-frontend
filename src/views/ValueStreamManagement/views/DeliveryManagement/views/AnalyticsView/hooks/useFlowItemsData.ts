import { StringUnitLength } from 'luxon';
import fetch, { useCustomSWR } from 'core/api/fetch';
import { ApiQueryParameters } from 'core/api/ApiClient/ApiClient';
import { getFilterUrlSearchParams } from 'views/Dashboard/views/Platform/views/FilterPanel/contexts/FilterPanelContext/utils';
import { AppliedFilters } from 'views/Dashboard/views/Platform/views/FilterPanel/contexts/FilterPanelContext/useFilterPanelContext';
import { parseFlowItemsData } from '../utils/parsing/parseFlowItemsData';
import { isFlowItemsDataEmpty } from '../utils/validation/isFlowItemsDataEmpty';
import { FlowItemsEntry } from '../interfaces/flowItems';
import { WidgetInformation } from 'views/ValueStreamManagement/views/DeliveryGovernance/interfaces/common';
import { deflate } from 'utils/utils';

export interface FlowItemsResponseData {
  flowItems: FlowItemsEntry[];
  flowItemsWidgetInfo: WidgetInformation[];
  isValidating: boolean;
  isEmpty: boolean;
  error?: unknown;
  update: () => void;
};

const fetchFlowItemsData = async (url: StringUnitLength) => {
  return fetch.get(`${url}`);
};

export const useFlowItemsData = (
  appliedFilters: AppliedFilters,
  apiQueryParameters: ApiQueryParameters,
  disabled = false,
): FlowItemsResponseData => {
  const allQueryParametersString = getFilterUrlSearchParams({
    ...appliedFilters,
    ...apiQueryParameters
  });
  const endpoint = '/value-stream-management/delivery-management/flow-items';
  const url = `${endpoint}?${allQueryParametersString}`;

  const {
    data: response,
    error,
    isValidating,
    mutate,
  } = useCustomSWR<any>(
    disabled ? null : url,
    fetchFlowItemsData,
  );

  const result: FlowItemsResponseData = {
    flowItems: [],
    flowItemsWidgetInfo: [],
    isValidating: isValidating,
    isEmpty: false,
    update: mutate ?? (() => true),
  };

  // Verify if the response is a client error (on swr)
  if (error) {
    result.error = error;
    result.isEmpty = true;
    return result;
  }

  // Verify that Data Exists
  if (!response || !response?.data || !response?.data?.flowItems) {
    result.isEmpty = true;
    return result;
  }

  const { flowItems, widgetInfo } = response.data;
  // flowItems is a base64 representation of a compressed string
  const inflated = deflate(flowItems);

  const parsedFlowItems: FlowItemsEntry[] = parseFlowItemsData(
    inflated
  );

  // Active time is not rounded at the backend. Rounding it here
  // Modifying the items in place for efficiency
  parsedFlowItems.forEach(item => item.activeTime = Math.round(item.activeTime ?? 0));

  result.flowItems = parsedFlowItems;
  result.flowItemsWidgetInfo = widgetInfo;
  result.isEmpty = isFlowItemsDataEmpty(parsedFlowItems);

  return result;
};
