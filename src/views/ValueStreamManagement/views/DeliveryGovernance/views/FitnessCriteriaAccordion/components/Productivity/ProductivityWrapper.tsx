/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  AppliedFilters,
  useFilterPanelContext,
} from "views/Dashboard/views/Platform/views/FilterPanel/contexts/FilterPanelContext/useFilterPanelContext";
import { ApiQueryParameters } from "core/api/ApiClient/ApiClient";
import { useState } from "react";
import { useServiceLevelData } from "views/ValueStreamManagement/views/DeliveryManagement/views/AnalyticsView/hooks/useServiceLevelData";
import { useFlowItemsData } from "views/ValueStreamManagement/views/DeliveryManagement/views/AnalyticsView/hooks/useFlowItemsData";
import { useRunChartData } from "views/ValueStreamManagement/views/DeliveryManagement/views/AnalyticsView/hooks/useRunChartData";
import { DrillDownTelemetryAction } from "core/api/telemetry/types";
import { useSendTelemetry } from "core/api/CustomerTelemetryClient";
import { FitnessCriteriaData } from "views/ValueStreamManagement/views/DeliveryGovernance/interfaces/fitnessCriteria";
import { Productivity } from "./Productivity";
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

const ProductivityWrapper = (props: Props) => {
  const [shouldFetchFlowItems, setEnableFetchFlowItems] = useState(false);
  const [shouldFetchFlowLens, setEnableFetchFlowLens] = useState(false);

  const [shouldFetchRunChart, setEnableFetchRunChart] = useState(false);

  const [fetchDrillDown, setFetchDrillDown] = useState(false);
  const { safeAggregation: currentDataAggregation } = useFilterPanelContext();

  const sendTelemetry = useSendTelemetry();

  /*
    Fitness Criteria data
  */
  const { productivity } = props.data || {};

  // HOOKS
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
    Flow Items hook
    for Flow Items
  */
  const { flowItems, isValidating: isValidatingFlowItems } = useFlowItemsData(
    props.appliedFilters,
    props.apiQueryParameters,
    !shouldFetchFlowItems
  );

  /*
    Run Chart hook
    for Run Chart
  */
  const { runChartData, isValidating: isValidatingRunChart } = useRunChartData(
    props.appliedFilters,
    props.apiQueryParameters,
    !shouldFetchRunChart
  );

  const handleOnClick = (e) => {
    if (e === true) setFetchDrillDown(true);
    else setFetchDrillDown(false);
  };

  return (
    <Productivity
      {...props}
      productivity={productivity}
      widgetInfo={fitnessCriteriaTooltips?.productivity}
      customProps={{
        aggregationProps: currentDataAggregation,
        telemetrySource: "Productivity",
        telemetryAction:
          DrillDownTelemetryAction.accessFitnessCriteriaDrillDown,
        productivityHistoricalChart: fetchDrillDown
          ? productivity?.historical
          : [],
        flowItems: fetchDrillDown ? flowItems : [],
        isValidating: shouldFetchFlowItems
          ? isValidatingFlowItems
          : isValidatingServiceLevel,
        filters: props.apiQueryParameters,
        perspective: "past",
        modalButtonDisabled: true,
        showAsDrillDown: true,
        isObeya: props.isObeya,
        runChartProps: {
          isValidatingRunChart: shouldFetchRunChart
            ? isValidatingRunChart
            : isValidatingServiceLevel,
          data: runChartData,
          perspective: "past",
        },
        // Only show run chart. We dont want to show time distribution widgets in the drill down
        // Run chart component has been refactored to display both run chart and throughput data
        displayTimeDistribution: false,
      }}
      onClick={(e) => {
        handleOnClick(e);
        if (!shouldFetchFlowItems) {
          setEnableFetchFlowItems(true);
        }
        if (!shouldFetchRunChart) {
          setEnableFetchRunChart(true);
        }

        sendTelemetry(
          DrillDownTelemetryAction.accessFitnessCriteriaDrillDown,
          `Open Productivity Drill Down ${props.isObeya ? "from obeya" : ""}`,
          { page: "Fitness Criteria Drill Down" }
        );
      }}
    />
  );
};

export default ProductivityWrapper;
