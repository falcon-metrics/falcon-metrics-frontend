import {
  AppliedFilters,
  useFilterPanelContext,
} from "views/Dashboard/views/Platform/views/FilterPanel/contexts/FilterPanelContext/useFilterPanelContext";
import { ApiQueryParameters } from "core/api/ApiClient/ApiClient";
import { useState } from "react";
import { DrillDownTelemetryAction } from "core/api/telemetry/types";
import { useSendTelemetry } from "core/api/CustomerTelemetryClient";
import { FitnessCriteriaData } from "views/ValueStreamManagement/views/DeliveryGovernance/interfaces/fitnessCriteria";
import { Predicability } from "./Predicability";
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

const PredicabilityWrapper = (props: Props) => {
  const [fetchDrillDown, setFetchDrillDown] = useState(false);
  const { safeAggregation: currentDataAggregation } = useFilterPanelContext();

  const sendTelemetry = useSendTelemetry();

  /*
    Fitness Criteria data
  */
  const { predictability } = props.data || {};

  const handleOnClick = (e) => {
    if (e === true) setFetchDrillDown(true);
    else setFetchDrillDown(false);
  };

  return (
    <Predicability
      {...props}
      predictability={predictability}
      widgetInfo={fitnessCriteriaTooltips?.predictability}
      customProps={{
        aggregationProps: currentDataAggregation,
        telemetrySource: "Delievery Predictability",
        telemetryAction:
          DrillDownTelemetryAction.accessFitnessCriteriaDrillDown,
        leadTimeHistoricalChart: fetchDrillDown
          ? predictability?.leadTimeHistorical
          : [],
        throughputHistoricalChart: fetchDrillDown
          ? predictability?.throughputHistorical
          : [],
      }}
      onClick={(e) => {
        handleOnClick(e);

        sendTelemetry(
          DrillDownTelemetryAction.accessFitnessCriteriaDrillDown,
          `Open Delievery Predictability Drill Down ${
            props.isObeya ? "from obeya" : ""
          }`,
          { page: "Fitness Criteria Drill Down" }
        );
      }}
    />
  );
};

export default PredicabilityWrapper;
