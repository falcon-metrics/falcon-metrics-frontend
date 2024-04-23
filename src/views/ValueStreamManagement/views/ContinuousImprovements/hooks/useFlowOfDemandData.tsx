import fetch, { useCustomSWR } from "core/api/fetch";
import { useMemo } from "react";
import { useFilterPanelContext } from "views/Dashboard/views/Platform/views/FilterPanel/contexts/FilterPanelContext/useFilterPanelContext";
import { getFilterUrlSearchParams } from "views/Dashboard/views/Platform/views/FilterPanel/contexts/FilterPanelContext/utils";
import { WidgetInformation } from "../../DeliveryGovernance/interfaces/common";

export type OldFlowOfDemandDayItem = {
  date: string;
  amount: number;
};

export type OldCapacityDemandGraphData = {
  demand: number;
  demandByDay: OldFlowOfDemandDayItem[];
  capacity: number;
  capacityByDay: OldFlowOfDemandDayItem[];
};

export type OldInflowOutflowGraphData = {
  inflow: number;
  inflowByDay: OldFlowOfDemandDayItem[];
  outflow: number;
  outflowByDay: OldFlowOfDemandDayItem[];
};

export type OldFlowOfDemandsBodyResponse = {
  demandCapacity: OldCapacityDemandGraphData;
  inflowOutflow: OldInflowOutflowGraphData;
  demandVsCapacityVariability: {
    predictability: "higher" | string;
    unit: string;
    value: number;
  };
  inventoryGrew: {
    startDate: "2022-02-07T15:58:19.106-03:00" | string;
    endDate: "2022-03-10T19:19:51.164-03:00" | string;
    value: number;
  };

  inOutFlowVariability: {
    predictability: "higher" | string;
    unit: string;
    value: number;
  };
  wipGrew: {
    startDate: "2022-02-07T15:58:19.106-03:00" | string;
    endDate: "2022-03-10T19:19:51.164-03:00" | string;
    value: number;
  };
};

export type FlowOfDemandsLeftWidgetData = {
  totalDemand: number;
  totalCapacity: number;
  demandOverCapacityPercent: number;
  inventoryGrowth: number;
  demandOverTime: {
    date: string;
    demand: number;
  }[];
  capacityOverTime: {
    date: string;
    capacity: number;
  }[];
};

export type FlowOfDemandsRightWidgetData = {
  totalInflow: number;
  totalOutflow: number;
  inflowOverOutflowPercent: number;
  wipGrowth: number;
  inflowOverTime: {
    date: string;
    inflow: number;
  }[];
  outflowOverTime: {
    date: string;
    outflow: number;
  }[];
};

export type FlowOfDemandsBodyResponse = {
  demandVsCapacity: FlowOfDemandsLeftWidgetData;
  inflowVsOutflow: FlowOfDemandsRightWidgetData;
  demandVsCapacityWidgetInfo?: WidgetInformation[];
  inflowVsOutflowWidgetInfo?: WidgetInformation[];
};

const flowOfDemandAccordionFetcher = async (uri: string) => {
  return fetch.get<FlowOfDemandsBodyResponse>(uri);
};

export function useFlowOfDemandsContinuousImprovements(
  disabled = false,
  query?: string
) {
  const { appliedFilters, apiQueryParameters } = useFilterPanelContext();
  const filters = useMemo(() => {
    return {
      ...appliedFilters,
      ...apiQueryParameters,
    };
  }, [appliedFilters, apiQueryParameters]);

  const queryParamsString = getFilterUrlSearchParams(filters);
  const endpoint =
    "/value-stream-management/continuous-improvements/flow-of-demands";
  let url = `${endpoint}?${queryParamsString}`;
  if (query) {
    url = url + "&query=" + query;
  }
  const {
    data: response,
    error: swrError,
    isValidating,
    mutate,
  } = useCustomSWR<any>(disabled ? null : url, flowOfDemandAccordionFetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  let errorMessage: string | null = null;
  if (response && typeof (response as any).message === "string") {
    errorMessage = (response as any).message;
  } else if (response && response.data && (response.data as any).errorMessage) {
    errorMessage = (response.data as any).errorMessage;
  } else if (response && (response as any).errorMessage) {
    errorMessage = (response as any).errorMessage;
  }

  let error: Error | undefined;
  if (errorMessage) {
    error = new Error(errorMessage);
  } else if (swrError) {
    error =
      typeof swrError === "object" && swrError instanceof Error
        ? swrError
        : new Error("Data Fetch Error: " + JSON.stringify(swrError));
  }

  const isEmptyData =
    response &&
    !errorMessage &&
    !swrError &&
    typeof response.data === "object" &&
    Object.keys(response.data).length === 0;

  return {
    data: response && !error ? response.data : null,
    error,
    isLoading: isValidating,
    update: mutate,
    isEmptyData,
  };
}
