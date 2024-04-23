/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  AppliedFilters,
  useFilterPanelContext,
} from "views/Dashboard/views/Platform/views/FilterPanel/contexts/FilterPanelContext/useFilterPanelContext";
import { ApiQueryParameters } from "core/api/ApiClient/ApiClient";
import { useState } from "react";
import { useServiceLevelData } from "views/ValueStreamManagement/views/DeliveryManagement/views/AnalyticsView/hooks/useServiceLevelData";
import useNormalizationColors from "hooks/fetch/useNormalizationColors";
import { DrillDownTelemetryAction } from "core/api/telemetry/types";
import { useSendTelemetry } from "core/api/CustomerTelemetryClient";
import { FitnessCriteriaData } from "views/ValueStreamManagement/views/DeliveryGovernance/interfaces/fitnessCriteria";
import { useNormalisationCharts } from "views/ValueStreamManagement/views/DeliveryGovernance/hooks/useNormalisationCharts";
import { useNormalisationChartsOptions } from "views/ValueStreamManagement/views/DeliveryGovernance/hooks/useNormalisationChartsOptions";
import { CustomerValue } from "./CustomerValue";
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

const CustomerValueWrapper = (props: Props) => {
  const [shouldFetchFlowLens, setEnableFetchFlowLens] = useState(false);
  const [shouldFetchClassOfValue, setEnableFetchClassOfValue] = useState(false);

  const [fetchDrillDown, setFetchDrillDown] = useState(false);
  const { safeAggregation: currentDataAggregation } = useFilterPanelContext();
  const normalisationChartTag = "quality"; // for Class of Value

  const sendTelemetry = useSendTelemetry();

  /*
    Fitness Criteria data
  */
  const { customerValue } = props.data || {};

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
    Normalisation Chart hook
    for Class of Value
  */
  const {
    data: normalisationChartsData,
    error: normalisationChartsError,
    isEmptyData: normalisationChartsEmpty,
    isLoading: isLoadingNormalisationCharts,
  } = useNormalisationCharts(
    props.apiQueryParameters,
    normalisationChartTag,
    !shouldFetchClassOfValue
  );

  const {
    data: normalisationChartsOptions,
    error: normalisationChartsOptionsError,
  } = useNormalisationChartsOptions(
    props.apiQueryParameters,
    !shouldFetchClassOfValue
  );

  const { getColorByDisplayName, isValidating } = useNormalizationColors();

  const handleOnClick = (e) => {
    if (e === true) setFetchDrillDown(true);
    else setFetchDrillDown(false);
  };

  return (
    <CustomerValue
      {...props}
      customerValue={customerValue}
      widgetInfo={fitnessCriteriaTooltips?.customerValue}
      customProps={{
        aggregationProps: currentDataAggregation,
        chartTitle: "Process Value (%)",
        telemetrySource: "Process Value",
        telemetryAction:
          DrillDownTelemetryAction.accessFitnessCriteriaDrillDown,
        historicalData: fetchDrillDown ? customerValue?.historical : [],
        data: fetchDrillDown ? normalisationChartsData?.completedWork : [],
        error: normalisationChartsError ?? normalisationChartsOptionsError,
        isLoading: shouldFetchClassOfValue
          ? isLoadingNormalisationCharts
          : isValidatingServiceLevel,
        currentDataAggregation,
        isEmpty: normalisationChartsEmpty,
        normalisationChartsOptions: normalisationChartsOptions,
        normalisationChartTag: normalisationChartTag,
        getColorByDisplayName,
        isValidating,
      }}
      onClick={(e) => {
        handleOnClick(e);
        if (!shouldFetchClassOfValue) {
          setEnableFetchClassOfValue(true);
        }

        sendTelemetry(
          DrillDownTelemetryAction.accessFitnessCriteriaDrillDown,
          `Open Customer Value Drill Down ${props.isObeya ? "from obeya" : ""}`,
          { page: "Fitness Criteria Drill Down" }
        );
      }}
    />
  );
};

export default CustomerValueWrapper;
