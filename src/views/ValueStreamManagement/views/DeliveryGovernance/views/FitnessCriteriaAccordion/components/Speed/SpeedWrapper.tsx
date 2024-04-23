import { Box } from "@material-ui/core";
import { useTimeDistributionData } from "views/ValueStreamManagement/views/DeliveryManagement/views/AnalyticsView/hooks/useTimeDistributionData";
import {
  AppliedFilters,
  useFilterPanelContext,
} from "views/Dashboard/views/Platform/views/FilterPanel/contexts/FilterPanelContext/useFilterPanelContext";
import { ApiQueryParameters } from "core/api/ApiClient/ApiClient";
import { useState } from "react";
import { useServiceLevelData } from "views/ValueStreamManagement/views/DeliveryManagement/views/AnalyticsView/hooks/useServiceLevelData";
import { useFlowItemsData } from "views/ValueStreamManagement/views/DeliveryManagement/views/AnalyticsView/hooks/useFlowItemsData";
import { DrillDownTelemetryAction } from "core/api/telemetry/types";
import { useSendTelemetry } from "core/api/CustomerTelemetryClient";
import { Speed } from "./Speed";
import { FitnessCriteriaData } from "views/ValueStreamManagement/views/DeliveryGovernance/interfaces/fitnessCriteria";
import { fitnessCriteriaTooltips } from "views/ValueStreamManagement/components/ExtendedTooltip/contents/fitnessCriteriaTooltips";

const isDevelopmentEnv = process.env.NODE_ENV === "development";

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

const SpeedWrapper = ({
  data,
  isLoading,
  error,
  isEmpty,
  appliedFilters,
  apiQueryParameters,
  isObeya,
  isDashboardEdit,
}: Props) => {
  const [shouldFetchFlowItems, setEnableFetchFlowItems] = useState(false);
  const [shouldFetchFlowLens, setEnableFetchFlowLens] = useState(false);
  const [
    shouldFetchTimeDistribution,
    setEnableFetchTimeDistribution,
  ] = useState(false);

  const [fetchDrillDown, setFetchDrillDown] = useState(false);
  const { safeAggregation: currentDataAggregation } = useFilterPanelContext();

  const sendTelemetry = useSendTelemetry();

  /*
    Fitness Criteria data
  */
  const { speed, predictability } = data || {};

  // HOOKS
  /*
    Service Level hook
    for Flow Lens 
  */
  const {
    serviceLevelData,
    isValidating: isValidatingServiceLevel,
  } = useServiceLevelData(
    appliedFilters,
    apiQueryParameters,
    !shouldFetchFlowLens
  );

  /*
    Time Distribution hook
    for Histogram and Scatterplot
  */
  const {
    data: timeDistributionData,
    isValidating: isValidatingTimeDistribution,
  } = useTimeDistributionData(
    appliedFilters,
    apiQueryParameters,
    !shouldFetchTimeDistribution
  );

  /*
    Flow Items hook
    for Flow Items
  */
  const { flowItems, isValidating: isValidatingFlowItems } = useFlowItemsData(
    appliedFilters,
    apiQueryParameters,
    !shouldFetchFlowItems
  );

  const handleOnClick = (e) => {
    if (e === true) setFetchDrillDown(true);
    else setFetchDrillDown(false);
  };

  const commonDrillDownProps = {
    leadTimeHistoricalChart: fetchDrillDown
      ? predictability?.leadTimeHistorical
      : [],
    histogram: fetchDrillDown ? timeDistributionData.histogram : [],
    boxPlot: fetchDrillDown ? timeDistributionData.boxPlot : [],
    targetForPredictability: fetchDrillDown
      ? timeDistributionData.distribution.targetForPredictability
      : [],
    percentile50th: fetchDrillDown
      ? timeDistributionData.distribution.percentile50th
      : [],
    percentile85th: fetchDrillDown
      ? timeDistributionData.distribution.percentile85th
      : [],
    percentile98th: fetchDrillDown
      ? timeDistributionData.distribution.percentile98th
      : [],
    scatterplot: fetchDrillDown ? timeDistributionData.scatterplot : [],
    upperOutliers:
      fetchDrillDown && timeDistributionData.boxPlot
        ? timeDistributionData.boxPlot.upperOutliers
        : [],
    flowLens: fetchDrillDown ? serviceLevelData : [],
    flowItems: fetchDrillDown ? flowItems : [],
    isValidating: shouldFetchFlowItems
      ? isValidatingFlowItems
      : isValidatingServiceLevel,
    isValidatingTimeDistribution: shouldFetchTimeDistribution
      ? isValidatingTimeDistribution
      : isValidatingServiceLevel,
    filters: apiQueryParameters,
    perspective: "past",
    modalButtonDisabled: true,
    isObeya,
  };

  //ERROR HANDLER
  if (error) {
    if (isDevelopmentEnv) {
      return (
        <Box
          display="flex"
          justifyContent="center"
          width="100%"
          padding="100px 0px"
        >
          <div style={{ color: "darkred" }}>Error: {error.message}</div>
        </Box>
      );
    }
    return (
      <Box
        display="flex"
        justifyContent="center"
        width="100%"
        padding="100px 0px"
      >
        <div style={{ color: "darkred" }}>
          There was an error while fetching data for this widget
        </div>
      </Box>
    );
  }
  //----------------------------------------------------------------------------------

  return (
    <Speed
      isDashboardEdit={isDashboardEdit}
      isLoading={isLoading}
      speed={speed}
      isEmpty={isEmpty}
      widgetInfo={fitnessCriteriaTooltips?.speed}
      customProps={{
        aggregationProps: currentDataAggregation,
        telemetrySource: "Lead Time",
        telemetryAction:
          DrillDownTelemetryAction.accessFitnessCriteriaDrillDown,

        portfolio85thChart: fetchDrillDown
          ? speed?.portfolioPercentile85thChart
          : [],
        team85thChart: fetchDrillDown ? speed?.teamPercentile85thChart : [],
        ic85thChart: fetchDrillDown ? speed?.icPercentile85thChart : [],

        timeToCommit85thPercentilePortfolio: fetchDrillDown
          ? speed?.timeToCommit85thPercentilePortfolio
          : [],
        timeToCommit85thPercentileTeam: fetchDrillDown
          ? speed?.timeToCommit85thPercentileTeam
          : [],
        timeToCommit85thPercentileIC: fetchDrillDown
          ? speed?.timeToCommit85thPercentileIC
          : [],

        ...commonDrillDownProps,
      }}
      onClick={(e) => {
        handleOnClick(e);
        if (!shouldFetchFlowItems) {
          setEnableFetchFlowItems(true);
        }
        if (!shouldFetchFlowLens) {
          setEnableFetchFlowLens(true);
        }
        if (!shouldFetchTimeDistribution) {
          setEnableFetchTimeDistribution(true);
        }

        sendTelemetry(
          DrillDownTelemetryAction.accessFitnessCriteriaDrillDown,
          `Open Lead Time Drill Down ${isObeya ? "from obeya" : ""}`,
          { page: "Fitness Criteria Drill Down" }
        );
      }}
    />
  );
};

export default SpeedWrapper;
