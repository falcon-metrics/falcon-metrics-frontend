import { useContext, useEffect, useState } from "react";
import { Box } from "@material-ui/core";

import useFilterPanelContext from "views/Dashboard/views/Platform/views/FilterPanel/contexts/FilterPanelContext";
import {
  AggregationKey,
  getAggregationQueryParam,
} from "views/ValueStreamManagement/views/DeliveryManagement/utils/aggregation";

import { RunChartData } from "../../interfaces/runChart";
import { getRunChartTitleByPerspective } from "./utils/customLabels";
import RunChartSelectionPanel from "./views/RunChartSelectionPanel";
import { WidgetInformation } from "views/ValueStreamManagement/views/DeliveryGovernance/interfaces/common";
import { SelectedTabInAccordionContext } from "components/UserStateProvider/UserStateProvider";
import { useSendTelemetry } from "core/api/CustomerTelemetryClient";
import { DrillDownTelemetryAction } from "core/api/telemetry/types";
import { DataAggregations } from "views/Dashboard/views/Platform/views/FilterPanel/contexts/FilterPanelContext/interfaces";
import TimeDistributionSection from "../TimeDistributionSection";
import { TimeDistributionProps } from "../TimeDistributionSection/TimeDistributionSection";
import RunChart from "./views/RunChart";
import { DEFAULT_DATE_FORMAT } from "utils/dateTime";
import IndicatorCard from "views/ValueStreamManagement/views/DeliveryGovernance/components/IndicatorCard/IndicatorCard";

export const runChartPreviewData: any = [
  ["01 Jan 2024", 0],
  ["08 Jan 2024", 11],
  ["15 Jan 2024", 5],
  ["22 Jan 2024", 4],
  ["29 Jan 2024", 4],
];

export interface RunChartProps {
  changeLoading?: (_: boolean) => void;
  showAsDrillDown?: boolean;
  modalButtonDisabled?: boolean;
  telemetryAction?: string;
  telemetrySource?: string;
  aggregationProps?: DataAggregations;
  isObeya?: boolean;
  timeDistributionProps: TimeDistributionProps;
  runChartProps: {
    perspective: string;
    widgetInfo?: WidgetInformation[];
    data: RunChartData;
    isValidatingRunChart: boolean;
  };
  displayTimeDistribution: boolean;
  isWidgetPreview?: boolean;
  isDashboardEdit?: boolean;
}

const WorkCompletionThroughputAnalytics = ({
  changeLoading,
  showAsDrillDown,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  modalButtonDisabled = false,
  telemetryAction,
  telemetrySource,
  aggregationProps,
  isObeya,
  timeDistributionProps,
  runChartProps,
  displayTimeDistribution = true,
  isWidgetPreview,
}: RunChartProps) => {
  let aggregation;
  const { selectedFilters } = useFilterPanelContext();
  if (aggregationProps) {
    aggregation = aggregationProps;
  } else {
    aggregation = selectedFilters["currentDataAggregation"];
  }
  const aggregationQueryParam: AggregationKey = getAggregationQueryParam(
    aggregation
  );

  useEffect(() => {
    if (!changeLoading) return;
    changeLoading(runChartProps.isValidatingRunChart ?? false);
  }, [runChartProps.isValidatingRunChart]);

  const runChartTitle = showAsDrillDown
    ? ""
    : getRunChartTitleByPerspective(runChartProps.perspective);
  const { selectedTab, setSelectedTab: setSelectedTabInUserState } = useContext(
    SelectedTabInAccordionContext
  );
  const RUN_CHART = "run-chart";
  let savedValue = 0;
  if (!isObeya) {
    savedValue = selectedTab[RUN_CHART];
  }
  // Storing the selected tab at the saved user state level makes
  // this component's local state redundant. But I dont want to remove it
  const [tabSelection, setTabSelection] = useState(savedValue ?? 0);
  // Render this component only if the saved value changes.
  // We need a useMemo because this context is used by multiple accordions
  // We dont want this component to re-render when the value required
  // by this accordion doesnt change

  /*
   * Telemetry Action
   */
  const sendTelemetry = useSendTelemetry();
  useEffect(() => {
    if (
      telemetryAction ===
      DrillDownTelemetryAction.accessFitnessCriteriaDrillDown
    )
      sendTelemetry(
        DrillDownTelemetryAction.accessFitnessCriteriaDrillDown,
        `${telemetrySource} -> Throughput Run Chart tab`,
        { page: "Run Chart" }
      );
  }, [sendTelemetry]);

  if (!isWidgetPreview) {
    return (
      <Box className="full-width-chart">
        <IndicatorCard title={runChartTitle}>
          <RunChartSelectionPanel
            data={runChartProps.data}
            isValidatingRunChart={runChartProps.isValidatingRunChart}
            tabSelection={tabSelection}
            aggregation={aggregationQueryParam}
            perspective={runChartProps.perspective}
            setTabSelection={(tab) => {
              setTabSelection(tab);
              if (!isObeya) {
                setSelectedTabInUserState(RUN_CHART, tab);
              }
            }}
            widgetInfo={runChartProps.widgetInfo}
          />
        </IndicatorCard>

        {/* <DefaultDashboardCard
          title={runChartTitle}
          Component={RunChartSelectionPanel}
          data={runChartProps.data}
          dataIsUnavailable={isRunChartDataEmpty}
          isLoading={runChartProps.isValidatingRunChart}
          hideDefaultLoadingAnimation={true}
          modalButtonDisabled={modalButtonDisabled}
          size={ChartSizes.large}
          additionalProps={{
            isValidatingRunChart: runChartProps.isValidatingRunChart,
            tabSelection,
            aggregation: aggregationQueryParam,
            perspective: runChartProps.perspective,
            setTabSelection: (tab) => {
              setTabSelection(tab);
              if (!isObeya) {
                setSelectedTabInUserState(RUN_CHART, tab);
              }
            },
            widgetInfo: runChartProps.widgetInfo,
          }}
        /> */}
        {/*
        This is a separate component because this was in a separate
        accordion before. Its easier to keep it as a separate component and
        pass props instead of a big refactor to follow the pattern
      */}
        {displayTimeDistribution ? (
          <TimeDistributionSection {...timeDistributionProps} />
        ) : (
          <></>
        )}
      </Box>
    );
  } else {
    return (
      <Box className="full-width-chart">
        <RunChart
          runChartSeries={[
            ["2024-01-01T00:00:00.000+11:00", 0],
            ["2024-01-08T00:00:00.000+11:00", 11],
            ["2024-01-15T00:00:00.000+11:00", 5],
            ["2024-01-22T00:00:00.000+11:00", 4],
            ["2024-01-29T00:00:00.000+11:00", 4],
          ]}
          chartType={"bar"}
          customXAxisLabel={"Work Items Count"}
          customDateFormat={DEFAULT_DATE_FORMAT}
          customTooltipLabel={"%vt total work items on %kt"} // customTooltipLabel={tooltipLabel}
        />
      </Box>
    );
  }
};

export default WorkCompletionThroughputAnalytics;
