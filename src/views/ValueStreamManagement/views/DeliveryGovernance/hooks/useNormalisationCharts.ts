import fetch, { useCustomSWR } from 'core/api/fetch';
import { useMemo } from 'react';
import {
  AppliedFilters,
} from 'views/Dashboard/views/Platform/views/FilterPanel/contexts/FilterPanelContext/useFilterPanelContext';
import {
  getFilterUrlSearchParams,
} from 'views/Dashboard/views/Platform/views/FilterPanel/contexts/FilterPanelContext/utils';
import { parseDemandDistributionData } from '../utils/parsing/parseDemandDistribution';

export function useNormalisationCharts(
  appliedFilters: AppliedFilters,
  tag: string,
  disabled = false,
  query?: string
) {
  const urlOrNull = useMemo(() => {
    if (disabled) {
      return null;
    }
    const queryParamString = getFilterUrlSearchParams(appliedFilters);
    let url = `/value-stream-management/delivery-governance/normalisation-charts?${queryParamString}&tag=${tag}`;
    if (query) {
      url = url + '&query=' + query;
    }
    return url;
  }, [appliedFilters, tag, disabled, query]);

  const { data: response, error, isValidating, mutate } = useCustomSWR(
    urlOrNull,
    fetch.get,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false
    }
  );

  const isEmptyData = !isValidating && response && (response as any).data && typeof (response as any).data === 'object' && Object.keys((response as any).data).length === 0;

  return {
    data: response && !isEmptyData ? parseDemandDistributionData((response as any).data) : null,
    error,
    isLoading: isValidating,
    isEmptyData,
    update: mutate,
  };
}
