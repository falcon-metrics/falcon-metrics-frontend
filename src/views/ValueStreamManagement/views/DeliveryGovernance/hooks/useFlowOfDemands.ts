import fetch, { useCustomSWR } from 'core/api/fetch';
import { useMemo } from 'react';
import { useFilterPanelContext } from 'views/Dashboard/views/Platform/views/FilterPanel/contexts/FilterPanelContext/useFilterPanelContext';
import {
  getFilterUrlSearchParams
} from 'views/Dashboard/views/Platform/views/FilterPanel/contexts/FilterPanelContext/utils';
import { parseFlowOfDemandsData } from '../utils/parsing/parseFlowOfDemandsData';
import { deflate } from 'utils/utils';

export function flowOfDemandsFetcher(uri: string) {
  return fetch.get(uri);
}

export function useFlowOfDemandsDeliveryGovernance(
  disabled = false,
  query?: string
) {
  const {
    appliedFilters,
    apiQueryParameters,
  } = useFilterPanelContext();
  const filters = useMemo(() => {
    return {
      ...appliedFilters,
      ...apiQueryParameters
    };
  }, [appliedFilters, apiQueryParameters]);

  const queryParamString = getFilterUrlSearchParams(filters);
  let url = `/value-stream-management/delivery-governance/flow-of-demands?${queryParamString}`;
  if (query) {
    url = url + '&query=' + query;
  }
  const { data: response, error, isValidating, mutate } = useCustomSWR<any>(
    disabled ? null : url,
    flowOfDemandsFetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false
    }
  );

  const isEmptyData = !isValidating && response && response.data && typeof response.data === 'object' && Object.keys(response.data).length === 0;

  // Deflate compressed data
  const data = !(response?.data?.response)
    ? {}
    : deflate(response.data.response);

  return {
    data: response && !isEmptyData ? parseFlowOfDemandsData(data) : null,
    error,
    isLoading: isValidating,
    isEmptyData,
    update: mutate,
  };
}