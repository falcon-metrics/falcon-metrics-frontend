/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  AppliedFilters,
  useFilterPanelContext,
} from "views/Dashboard/views/Platform/views/FilterPanel/contexts/FilterPanelContext/useFilterPanelContext";
import { ApiQueryParameters } from "core/api/ApiClient/ApiClient";
import { useState } from "react";
import { useServiceLevelData } from "views/ValueStreamManagement/views/DeliveryManagement/views/AnalyticsView/hooks/useServiceLevelData";
import { useFlowAnalysisData } from "views/ValueStreamManagement/views/ContinuousImprovements/hooks/useFlowAnalysisData";
import { DrillDownTelemetryAction } from "core/api/telemetry/types";
import { useSendTelemetry } from "core/api/CustomerTelemetryClient";
import { FitnessCriteriaData } from "views/ValueStreamManagement/views/DeliveryGovernance/interfaces/fitnessCriteria";
import { FlowEfficiency } from "./FlowEfficiency";
import { fitnessCriteriaTooltips } from "views/ValueStreamManagement/components/ExtendedTooltip/contents/fitnessCriteriaTooltips";

type Props = {
  data?: FitnessCriteriaData | null;
  error?: Error;
  isLoading: boolean;
  isEmpty?: boolean;
  appliedFilters: AppliedFilters;
  apiQueryParameters: ApiQueryParameters;
  isObeya?: boolean;
  isDashboardEdit?: boolean;
};

const FlowEfficiencyWrapper = (props: Props) => {
  const [shouldFetchFlowLens, setEnableFetchFlowLens] = useState(false);
  const [shouldFetchFlowAnalysis, setEnableFetchFlowAnalysis] = useState(false);

  const [fetchDrillDown, setFetchDrillDown] = useState(false);
  const { safeAggregation: currentDataAggregation } = useFilterPanelContext();

  const sendTelemetry = useSendTelemetry();

  /*
    Fitness Criteria data
  */
  const { flowEfficiency } = props.data || {};

  /*
    Service Level hook
    for Flow Lens 
  */
  const { isValidating: isValidatingServiceLevel } = useServiceLevelData(
    props.appliedFilters,
    props.apiQueryParameters,
    !shouldFetchFlowLens
  );

  /*
    Flow Analysis hook
    for Flow Efficiency and Time in Stage
  */
  const {
    data: flowAnalysisData,
    isLoading: isLoadingFlowAnalysis,
    error: flowAnalysisError,
    isEmptyData: flowAnalysisEmpty,
  } = useFlowAnalysisData(!shouldFetchFlowAnalysis);

  const handleOnClick = (e) => {
    if (e === true) setFetchDrillDown(true);
    else setFetchDrillDown(false);
  };

  return (
    <FlowEfficiency
      {...props}
      flowEfficiency={flowEfficiency}
      widgetInfo={fitnessCriteriaTooltips?.flowEfficiency}
      customProps={{
        aggregationProps: currentDataAggregation,
        chartTitle: "Process Flow Efficiency (%)",
        telemetrySource: "Process Flow Efficiency",
        telemetryAction:
          DrillDownTelemetryAction.accessFitnessCriteriaDrillDown,
        isLoading: shouldFetchFlowAnalysis
          ? isLoadingFlowAnalysis
          : isValidatingServiceLevel,
        timeInStageData: fetchDrillDown ? flowAnalysisData?.timeInStage : [],
        flowEfficiencyData: fetchDrillDown
          ? flowAnalysisData?.flowEfficiency
          : [],
        error: flowAnalysisError,
        currentDataAggregation: currentDataAggregation,
        isEmpty: flowAnalysisEmpty,
      }}
      onClick={(e) => {
        handleOnClick(e);
        if (!shouldFetchFlowAnalysis) {
          setEnableFetchFlowAnalysis(true);
        }

        sendTelemetry(
          DrillDownTelemetryAction.accessFitnessCriteriaDrillDown,
          `Open Flow Efficiency Drill Down ${
            props.isObeya ? "from obeya" : ""
          }`,
          { page: "Fitness Criteria Drill Down" }
        );
      }}
    />
  );
};

export default FlowEfficiencyWrapper;
