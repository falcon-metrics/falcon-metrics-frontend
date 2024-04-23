import { AppliedFilters } from 'views/Dashboard/views/Platform/views/FilterPanel/contexts/FilterPanelContext/useFilterPanelContext';
import { ApiQueryParameters } from 'core/api/ApiClient/ApiClient';
import { getFilterUrlSearchParams } from 'views/Dashboard/views/Platform/views/FilterPanel/contexts/FilterPanelContext/utils';
import fetch, { useCustomSWR } from 'core/api/fetch';
import { WidgetInformation } from '../../DeliveryGovernance/interfaces/common';

export type ActionableInsightsBodyResponse = {
  patterns: {
    title: string;
    descriptives: {
      title: string;
      evidence: {
        description: string;
      }[];
    }[];
    diagnostics: {
      title: string;
      evidence: {
        description: string;
      }[];
    }[];
    prescriptions: {
      title: string;
    }[];
    widgetInfo?: WidgetInformation[];
  }[];
};

const actionableInsightsAccordionFetcher = async (uri: string) => {
  return fetch.get<ActionableInsightsBodyResponse>(uri);
};

export function useActionableInsightsData(
  filters: AppliedFilters & ApiQueryParameters,
  disabled = false
) {
  const queryParamsString = getFilterUrlSearchParams(filters);
  const endpoint = '/value-stream-management/continuous-improvements/actionable-insights';
  const url = `${endpoint}?${queryParamsString}`;
  const { data: response, error: swrError, isValidating, mutate } = useCustomSWR<any>(
    disabled ? null : url,
    actionableInsightsAccordionFetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false
    }
  );

  let errorMessage: string | null = null;
  if (response && typeof ((response as any).message) === 'string') {
    errorMessage = ((response as any).message);
  } else if (response && response.data && (response.data as any).errorMessage) {
    errorMessage = ((response.data as any).errorMessage);
  } else if (response && response.data && (response.data as any).message && (typeof ((response.data as any).message)) === 'string') {
    errorMessage = ((response.data as any).message);
  } else if (response && response.data && (typeof ((response.data as any).error)) === 'string') {
    errorMessage = ((response.data as any).error);
  } else if (response && (response as any).errorMessage) {
    errorMessage = (response as any).errorMessage;
  }


  let error: Error | undefined;
  if (errorMessage) {
    error = new Error(errorMessage);
  } else if (swrError) {
    error = ((typeof swrError === 'object' && swrError instanceof Error) ? swrError : new Error(`Data fetch failed: ${JSON.stringify(swrError)}`));
  }

  return {
    data: response && !error ? response.data : null,
    error,
    isLoading: isValidating,
    update: mutate,
  };
}
