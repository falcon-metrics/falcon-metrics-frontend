import fetch, { useCustomSWR } from 'core/api/fetch';
import { useFilterPanelContext } from 'views/Dashboard/views/Platform/views/FilterPanel/contexts/FilterPanelContext/useFilterPanelContext';
import { WidgetInformation } from '../../DeliveryGovernance/interfaces/common';

type Row = {
  state: string,
  timeInState: string,
  timeInStateDays: number;
  workItemCount: number;
  percentile85: number;
};

export type TimeInStageOption = {
  perspective: 'proposed' | 'inprogress' | 'completed';
  stepType: 'queue' | 'active';
  stepCategory: 'proposed' | 'inprogress' | 'completed';
  stages: Row[];
};

export type FlowAnalysisPeriodData = {
  startDate: string;
  endDate: string;
  workItemIds: string[];
  activeCount: number;
  waitingCount: number;
};

export type FlowEfficiencyOption = {
  perspective: 'inprogress' | 'completed';
  includeArrival: 'include' | 'exclude';
  totals: {
    activeTime: number;
    waitingTime: number;
  };
  aggregated: FlowAnalysisPeriodData[];
};

export type FlowAnalysisBodyResponse = {
  flowEfficiency: FlowEfficiencyOption[];
  timeInStage: TimeInStageOption[];
  flowEfficiencyWidgetInfo?: WidgetInformation[];
  timeInStageWidgetInfo?: WidgetInformation[];
};

const flowAnalysisAccordionFetcher = async (uri: string) => {
  return fetch.get<FlowAnalysisBodyResponse>(uri);
};

export function useFlowAnalysisData(
  disabled = false
) {
  const { queryParamsString } = useFilterPanelContext();
  const endpoint = '/value-stream-management/continuous-improvements/flow-analysis';
  const url = `${endpoint}?${queryParamsString}`;

  const { data: response, error: swrError, isValidating, mutate } = useCustomSWR<any>(
    disabled ? null : url,
    flowAnalysisAccordionFetcher,
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
  } else if (response && response.data && (response.data as any).message) {
    errorMessage = ((response.data as any).message);
  } else if (response && (response as any).errorMessage) {
    errorMessage = (response as any).errorMessage;
  }

  let error: Error | undefined;
  if (errorMessage) {
    error = new Error(errorMessage);
  } else if (swrError) {
    error = ((typeof swrError === 'object' && swrError instanceof Error) ? swrError : new Error("Data Fetch Error: " + JSON.stringify(swrError)));
  }

  const isEmptyData = response && !errorMessage && !swrError && typeof response.data === 'object' && Object.keys(response.data).length === 0;

  return {
    data: response && !errorMessage ? response.data : null,
    error,
    isLoading: isValidating,
    update: mutate,
    isEmptyData,
  };
}
