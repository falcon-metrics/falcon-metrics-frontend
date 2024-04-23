import fetch, { useCustomSWR } from 'core/api/fetch';
import {
  AppliedFilters,
} from 'views/Dashboard/views/Platform/views/FilterPanel/contexts/FilterPanelContext/useFilterPanelContext';
import {
  getFilterUrlSearchParams,
} from 'views/Dashboard/views/Platform/views/FilterPanel/contexts/FilterPanelContext/utils';
import { parseFitnessCriteriaData } from '../utils/parsing/parseFitnessCriteriaData';



export function useFitnessCriteria(
  appliedFilters: AppliedFilters,
  disabled = false,
  query?: string
) {
  const fitnessCriteriaFetcher = (uri: string) => {
    return fetch.get(uri);
  };
  const queryParamString = getFilterUrlSearchParams(appliedFilters);
  let url = `/value-stream-management/delivery-governance/fitness-criteria?${queryParamString}`;
  if (query) {
    url = url + '&query=' + query;
  }
  const { data: response, error: swrError, isValidating, mutate } = useCustomSWR<any>(
    disabled ? null : url,
    fitnessCriteriaFetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false
    }
  );

  let errorMessage: string | null = null;
  if (swrError) {
    errorMessage = swrError.message;
  } else if (response?.data) {
    const received: any = response.data;
    if (typeof received.message === 'string') {
      errorMessage = received.message;
    } else if (typeof received.errorMessage === 'string') {
      errorMessage = received.errorMessage;
    } else if (typeof received.error === 'string') {
      errorMessage = received.error;
    } else if (typeof received.error === 'object') {
      if (typeof received.error.message === 'string') {
        errorMessage = received.error.message;
      } else {
        errorMessage = `Received an error object from the backend with keys ${Object.keys(received.error).join(',')}`;
      }
    }
  }

  const isEmptyData = !isValidating && response && response.data && typeof response.data === 'object' && Object.keys(response.data).length === 0;

  return {
    data: !isEmptyData && response ? parseFitnessCriteriaData(response.data) : null,
    error: errorMessage ? new Error(errorMessage) : null,
    isLoading: isValidating,
    isEmptyData,
    update: mutate,
  };
}
