import fetch from 'core/api/fetch';
import useSWR from 'swr';
import {
  AppliedFilters,
} from 'views/Dashboard/views/Platform/views/FilterPanel/contexts/FilterPanelContext/useFilterPanelContext';
import {
  getFilterUrlSearchParams,
} from 'views/Dashboard/views/Platform/views/FilterPanel/contexts/FilterPanelContext/utils';

function classOfServiceFetcher(uri: string) {
  return fetch.get(uri);
}

export function useNormalisationChartsOptions(
  appliedFilters: AppliedFilters,
  disabled = false,
) {
  const queryParamString = getFilterUrlSearchParams(appliedFilters);
  const url = `/value-stream-management/delivery-governance/normalisation-charts-options?${queryParamString}`;

  const { data: response, error: swrError, isValidating, mutate } = useSWR(
    disabled ? null : url,
    classOfServiceFetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false
    }
  );

  let error;
  if (swrError) {
    error = swrError;
  } else if (response?.data) {
    if (typeof response.data !== 'object' || !(response.data instanceof Array)) {
      error = new Error('Could not fetch normalisation categories as options due to invalid server response');
    } else if (response.data.length === 0) {
      error = new Error('There are no normalisation options configured');
    }
  }

  return {
    data: !error && response && response.data ? response.data : null,
    error,
    isLoading: (!response || !response.data) && isValidating,
    update: mutate,
  };
}
