/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box } from "@material-ui/core";
import DashboardCard from "components/Charts/components/DashboardCard/DashboardCard";
import { ChartSizes } from "components/Charts/components/DashboardCard/interfaces/ChartSizes";
import { DEFAULT_DATE_FORMAT } from "utils/dateTime";
import IndicatorCard from "views/ValueStreamManagement/views/DeliveryGovernance/components/IndicatorCard/IndicatorCard";
import { CustomerValue } from "views/ValueStreamManagement/views/DeliveryGovernance/views/FitnessCriteriaAccordion/components/CustomerValue/CustomerValue";
import CustomerValueWrapper from "views/ValueStreamManagement/views/DeliveryGovernance/views/FitnessCriteriaAccordion/components/CustomerValue/CustomerValueWrapper";
import { FlowEfficiency } from "views/ValueStreamManagement/views/DeliveryGovernance/views/FitnessCriteriaAccordion/components/FlowEfficiency/FlowEfficiency";
import FlowEfficiencyWrapper from "views/ValueStreamManagement/views/DeliveryGovernance/views/FitnessCriteriaAccordion/components/FlowEfficiency/FlowEfficiencyWrapper";
import { Predicability } from "views/ValueStreamManagement/views/DeliveryGovernance/views/FitnessCriteriaAccordion/components/Predicability/Predicability";
import PredicabilityWrapper from "views/ValueStreamManagement/views/DeliveryGovernance/views/FitnessCriteriaAccordion/components/Predicability/PredicabilityWrapper";
import { Productivity } from "views/ValueStreamManagement/views/DeliveryGovernance/views/FitnessCriteriaAccordion/components/Productivity/Productivity";
import ProductivityWrapper from "views/ValueStreamManagement/views/DeliveryGovernance/views/FitnessCriteriaAccordion/components/Productivity/ProductivityWrapper";
import { ServiceLevelExpectation } from "views/ValueStreamManagement/views/DeliveryGovernance/views/FitnessCriteriaAccordion/components/ServiceLevelExpectation/ServiceLevelExpectation";
import ServiceLevelExpectationWrapper from "views/ValueStreamManagement/views/DeliveryGovernance/views/FitnessCriteriaAccordion/components/ServiceLevelExpectation/ServiceLevelExpectationWrapper";
import { Speed } from "views/ValueStreamManagement/views/DeliveryGovernance/views/FitnessCriteriaAccordion/components/Speed/Speed";
import SpeedWrapper from "views/ValueStreamManagement/views/DeliveryGovernance/views/FitnessCriteriaAccordion/components/Speed/SpeedWrapper";
import { AvgWipAge } from "views/ValueStreamManagement/views/DeliveryGovernance/views/FlowOfDemandsAccordion/components/AvgWipAge/AvgWipAge";
import AvgWipAgeWrapper from "views/ValueStreamManagement/views/DeliveryGovernance/views/FlowOfDemandsAccordion/components/AvgWipAge/AvgWipAgeWrapper";
import { CommitmentRate } from "views/ValueStreamManagement/views/DeliveryGovernance/views/FlowOfDemandsAccordion/components/CommitmentRate/CommitmentRate";
import CommitmentRateWrapper from "views/ValueStreamManagement/views/DeliveryGovernance/views/FlowOfDemandsAccordion/components/CommitmentRate/CommitmentRateWrapper";
import { DemandVsCapacity } from "views/ValueStreamManagement/views/DeliveryGovernance/views/FlowOfDemandsAccordion/components/DemandVsCapacity/DemandVsCapacity";
import DemandVsCapacityWrapper from "views/ValueStreamManagement/views/DeliveryGovernance/views/FlowOfDemandsAccordion/components/DemandVsCapacity/DemandVsCapacityWrapper";
import { InFlowOutFlow } from "views/ValueStreamManagement/views/DeliveryGovernance/views/FlowOfDemandsAccordion/components/InFlowOutFlow/InFlowOutFlow";
import InFlowVsOutFlowWrapper from "views/ValueStreamManagement/views/DeliveryGovernance/views/FlowOfDemandsAccordion/components/InFlowOutFlow/InFlowOutFlowWrapper";
import { InventorySize } from "views/ValueStreamManagement/views/DeliveryGovernance/views/FlowOfDemandsAccordion/components/InventorySize/InventorySize";
import InventorySizeWrapper from "views/ValueStreamManagement/views/DeliveryGovernance/views/FlowOfDemandsAccordion/components/InventorySize/InventorySizeWrapper";
import { Throughput } from "views/ValueStreamManagement/views/DeliveryGovernance/views/FlowOfDemandsAccordion/components/Throughput/Throughput";
import ThroughputWrapper from "views/ValueStreamManagement/views/DeliveryGovernance/views/FlowOfDemandsAccordion/components/Throughput/ThroughputWrapper";
import { TimeToCommit } from "views/ValueStreamManagement/views/DeliveryGovernance/views/FlowOfDemandsAccordion/components/TimeToCommit/TimeToCommit";
import TimeToCommitWrapper from "views/ValueStreamManagement/views/DeliveryGovernance/views/FlowOfDemandsAccordion/components/TimeToCommit/TimeToCommitWrapper";
import { WipCount } from "views/ValueStreamManagement/views/DeliveryGovernance/views/FlowOfDemandsAccordion/components/WipCount/WipCount";
import WipCountWrapper from "views/ValueStreamManagement/views/DeliveryGovernance/views/FlowOfDemandsAccordion/components/WipCount/WipCountWrapper";
import NormalisationChartsWrapper from "views/ValueStreamManagement/views/DeliveryGovernance/views/NormalisationChartsAccordion/NormalisationChartsWrapper";
import PerformanceBenchmarkingAccordion from "views/ValueStreamManagement/views/DeliveryGovernance/views/PerformanceBenchmarkingAccordion";
import PerformanceBenchmarkingPreview from "views/ValueStreamManagement/views/DeliveryGovernance/views/PerformanceBenchmarkingAccordion/PerformanceBenchmarkingPreview";
import PerformanceCheckpointAccordion from "views/ValueStreamManagement/views/DeliveryGovernance/views/PerformanceCheckpointAccordion/PerformanceCheckpointAccordion";
import PerformanceCheckpointPreview from "views/ValueStreamManagement/views/DeliveryGovernance/views/PerformanceCheckpointAccordion/PerformanceCheckpointPreview";
import Blockers from "views/ValueStreamManagement/views/DeliveryGovernance/views/SourcesOfDelayAndWasteAccordion/components/Blockers";
import BlockersWrapper from "views/ValueStreamManagement/views/DeliveryGovernance/views/SourcesOfDelayAndWasteAccordion/components/Blockers/BlockersWrapper";
import DelayedItems from "views/ValueStreamManagement/views/DeliveryGovernance/views/SourcesOfDelayAndWasteAccordion/components/DelayedItems";
import DelayedItemsWrapper from "views/ValueStreamManagement/views/DeliveryGovernance/views/SourcesOfDelayAndWasteAccordion/components/DelayedItems/DelayedItemsWrapper";
import DiscardedAfterStart from "views/ValueStreamManagement/views/DeliveryGovernance/views/SourcesOfDelayAndWasteAccordion/components/DiscardedAfterStart";
import DiscardedAfterStartWrapper from "views/ValueStreamManagement/views/DeliveryGovernance/views/SourcesOfDelayAndWasteAccordion/components/DiscardedAfterStart/DiscardedAfterStartWrapper";
import DiscardedBeforeStart from "views/ValueStreamManagement/views/DeliveryGovernance/views/SourcesOfDelayAndWasteAccordion/components/DiscardedBeforeStart";
import DiscardedBeforeStartWrapper from "views/ValueStreamManagement/views/DeliveryGovernance/views/SourcesOfDelayAndWasteAccordion/components/DiscardedBeforeStart/DiscardedBeforeStartWrapper";
import FlowDebt from "views/ValueStreamManagement/views/DeliveryGovernance/views/SourcesOfDelayAndWasteAccordion/components/FlowDebt";
import FlowDebtWrapper from "views/ValueStreamManagement/views/DeliveryGovernance/views/SourcesOfDelayAndWasteAccordion/components/FlowDebt/FlowDebtWrapper";
import KeySourcesOfDelay from "views/ValueStreamManagement/views/DeliveryGovernance/views/SourcesOfDelayAndWasteAccordion/components/KeySourcesOfDelay";
import KeySourcesOfDelayWrapper from "views/ValueStreamManagement/views/DeliveryGovernance/views/SourcesOfDelayAndWasteAccordion/components/KeySourcesOfDelay/KeySourcesOfDelayWrapper";
import StaleWork from "views/ValueStreamManagement/views/DeliveryGovernance/views/SourcesOfDelayAndWasteAccordion/components/StaleWork";
import StaleWorkWrapper from "views/ValueStreamManagement/views/DeliveryGovernance/views/SourcesOfDelayAndWasteAccordion/components/StaleWork/StaleWorkWrapper";
import FlowItemsWrapper from "views/ValueStreamManagement/views/DeliveryManagement/views/AnalyticsView/views/FlowUnitsSection/FlowItemsWrapper";
import { runChartPreviewData } from "views/ValueStreamManagement/views/DeliveryManagement/views/AnalyticsView/views/RunChartSection/RunChartSection";
import RunChartWrapper from "views/ValueStreamManagement/views/DeliveryManagement/views/AnalyticsView/views/RunChartSection/RunChartWrapper";
import RunChart from "views/ValueStreamManagement/views/DeliveryManagement/views/AnalyticsView/views/RunChartSection/views/RunChart";
import KanbanSection from "views/ValueStreamManagement/views/DeliveryManagement/views/KanbanSection";
import WorkflowBoardPreview from "views/ValueStreamManagement/views/DeliveryManagement/views/KanbanSection/views/WorkflowBoard/WorkflowBoardPreview";

export enum WidgetGroupKeys {
  FITNESS_CRITERIA = "fitness-criteria",
  SOURCE_OF_DELAY = "source-of-delay",
  WORK_OVERVIEW = "work-overview",
  FLOW_ITEMS = "flow-items",
  RUN_CHART = "run-chart",
  PERFORMANCE_COMPARISON_TIME = "performance-checkpoint-by-time",
  PERFORMANCE_COMPARISON_BOARDS = "performance-checkpoint-by-boards",
  FLOW_OF_DEMANDS = "flow-of-demands",
  SMART_BOARD = "smart-board",
}

export enum WidgetKeys {
  LEAD_TIME = "lead-time",
  SERVICE_LEVEL = "service-level",
  PREDICTABILITY = "predictability",
  DELIVERY_RATE = "delivery-rate",
  VALUE_DELIVERED = "value-delivered",
  FLOW_EFFICIENCY = "flow-efficiency",

  RETURNED_TO_BACKLOG = "delayed-items",
  CANCELLED_WORK = "cancelled-work",
  DISCONTINUED = "discontinued",
  PRODUCTIVITY_DEBT = "productivity-debt",
  STALE_WORK = "stale-work",
  IMPEDIMENTS = "impediments",
  TOP_WAIT_STEPS = "top-wait-steps",

  WORK_OVERVIEW = "work-overview",

  FLOW_ITEMS = "flow-items",

  RUN_CHART = "run-chart",

  PERFORMANCE_COMPARISON_TIME = "performance-checkpoint-by-time",
  PERFORMANCE_COMPARISON_BOARDS = "performance-checkpoint-by-boards",

  DEMAND_VS_CAPACITY = "demand-vs-capacity",
  WORK_COMPLETED_STARTED = "work-completed-vs-started",
  TOTAL_UPCOMING_WORK = "total-upcoming-work",
  COMMITED_WORK_RATE = "committed-work-rate",
  TIME_TO_START = "time-to-start",
  WIP_COUNT = "wip-count",
  AVG_WIP_AGE = "avg-wip-age",
  TOTAL_COMPLETED_WORK = "total-completed-work",

  SMART_BOARD = "smart-board",
}

export const fitnessCriteriaQueryMapping = {
  [WidgetKeys.LEAD_TIME]: ["speed", "predictability", "widgetInformation"],
  [WidgetKeys.SERVICE_LEVEL]: ["serviceLevelExpectation", "predictability"],
  [WidgetKeys.PREDICTABILITY]: ["predictability"],
  [WidgetKeys.DELIVERY_RATE]: ["productivity"],
  [WidgetKeys.VALUE_DELIVERED]: ["customerValue"],
  [WidgetKeys.FLOW_EFFICIENCY]: ["flowEfficiency"],
};

export const sourcesOfDelayQueryMapping = {
  [WidgetKeys.RETURNED_TO_BACKLOG]: ["delayedItems", "widgetInformation"],
  [WidgetKeys.CANCELLED_WORK]: ["discardedBeforeStart"],
  [WidgetKeys.DISCONTINUED]: ["discardedAfterStart"],
  [WidgetKeys.PRODUCTIVITY_DEBT]: ["flowDebt"],
  [WidgetKeys.STALE_WORK]: ["staleWork"],
  [WidgetKeys.IMPEDIMENTS]: ["blockers"],
  [WidgetKeys.TOP_WAIT_STEPS]: ["keySourcesOfDelay"],
};

export const flowOfDemandsQueryMapping = {
  [WidgetKeys.DEMAND_VS_CAPACITY]: ["demandVsCapacity", "widgetInformation"],
  [WidgetKeys.WORK_COMPLETED_STARTED]: ["inflowVsOutflow"],
  [WidgetKeys.TOTAL_UPCOMING_WORK]: ["inventorySize"],
  [WidgetKeys.COMMITED_WORK_RATE]: ["commitmentRate"],
  [WidgetKeys.TIME_TO_START]: ["timeToCommit"],
  [WidgetKeys.WIP_COUNT]: ["wipCount"],
  [WidgetKeys.AVG_WIP_AGE]: ["avgWipAge"],
  [WidgetKeys.TOTAL_COMPLETED_WORK]: ["throughput"],
};

export const workOverviewQueryMapping = {
  [WidgetKeys.WORK_OVERVIEW]: [
    "upcomingWork",
    "workInProcess",
    "completedWork",
  ],
};

export const fitnessCriteriaPreviews = [
  {
    id: WidgetKeys.LEAD_TIME,
    preview: <Speed isLoading={false} isWidgetPreview />,
  },
  {
    id: WidgetKeys.SERVICE_LEVEL,
    preview: <ServiceLevelExpectation isLoading={false} isWidgetPreview />,
  },
  {
    id: WidgetKeys.PREDICTABILITY,
    preview: <Predicability isLoading={false} isWidgetPreview />,
  },
  {
    id: WidgetKeys.DELIVERY_RATE,
    preview: <Productivity isLoading={false} isWidgetPreview />,
  },
  {
    id: WidgetKeys.VALUE_DELIVERED,
    preview: <CustomerValue isLoading={false} isWidgetPreview />,
  },
  {
    id: WidgetKeys.FLOW_EFFICIENCY,
    preview: <FlowEfficiency isLoading={false} isWidgetPreview />,
  },
];

export const sourceOfDelayPreviews = [
  {
    id: WidgetKeys.RETURNED_TO_BACKLOG,
    preview: <DelayedItems isLoading={false} isWidgetPreview />,
  },
  {
    id: WidgetKeys.CANCELLED_WORK,
    preview: <DiscardedBeforeStart isLoading={false} isWidgetPreview />,
  },
  {
    id: WidgetKeys.PRODUCTIVITY_DEBT,
    preview: <FlowDebt isLoading={false} isWidgetPreview />,
  },
  {
    id: WidgetKeys.STALE_WORK,
    preview: <StaleWork isLoading={false} isWidgetPreview />,
  },
  {
    id: WidgetKeys.DISCONTINUED,
    preview: <DiscardedAfterStart isLoading={false} isWidgetPreview />,
  },
  {
    id: WidgetKeys.TOP_WAIT_STEPS,
    preview: <KeySourcesOfDelay isLoading={false} isWidgetPreview />,
  },
  {
    id: WidgetKeys.IMPEDIMENTS,
    preview: <Blockers isLoading={false} isWidgetPreview />,
  },
];

export const workOverviewPreview = [
  {
    id: WidgetGroupKeys.WORK_OVERVIEW,
    preview: (
      <NormalisationChartsWrapper
        isWidgetPreview
        data={{
          normalisationChartsData: null,
          normalisationChartsError: undefined,
          normalisationChartsEmpty: undefined,
          normalisationChartsOptions: undefined,
          normalisationChartsOptionsError: undefined,
          normalisationChartTag: "",
          setNormalisationChartTag: (str) => {
            return "";
          },
        }}
      />
    ),
  },
];

export const flowItemPreview = [
  {
    id: WidgetGroupKeys.FLOW_ITEMS,
    preview: <FlowItemsWrapper isWidgetPreview />,
  },
];

export const runChartPreview = [
  {
    id: WidgetGroupKeys.RUN_CHART,
    preview: (
      <DashboardCard
        size={ChartSizes.full}
        title={"Throughput"}
        isWidgetPreview
      >
        <Box width={875}>
          <RunChart
            runChartSeries={runChartPreviewData}
            chartType={"bar"}
            customXAxisLabel={"Work Items Count"}
            customDateFormat={DEFAULT_DATE_FORMAT}
            customTooltipLabel={"%vt total work items on %kt"}
            isWidgetPreview={true}
          />
        </Box>
      </DashboardCard>
    ),
  },
];

export const performanceComparisonByTimePreview = [
  {
    id: WidgetGroupKeys.PERFORMANCE_COMPARISON_TIME,
    preview: <PerformanceCheckpointPreview />,
  },
];

export const performanceComparisonByBoardsPreview = [
  {
    id: WidgetGroupKeys.PERFORMANCE_COMPARISON_BOARDS,
    preview: <PerformanceBenchmarkingPreview />,
  },
];

export const smartBoardPreview = [
  {
    id: WidgetGroupKeys.SMART_BOARD,
    preview: (
      <DashboardCard title="Smart Board" isWidgetPreview>
        <WorkflowBoardPreview />
      </DashboardCard>
    ),
  },
];

export const flowOfDemandsPreviews = [
  {
    id: WidgetKeys.DEMAND_VS_CAPACITY,
    preview: <DemandVsCapacity isLoading={false} isWidgetPreview />,
  },
  {
    id: WidgetKeys.TOTAL_UPCOMING_WORK,
    preview: <InventorySize isLoading={false} isWidgetPreview />,
  },
  {
    id: WidgetKeys.TIME_TO_START,
    preview: <TimeToCommit isLoading={false} isWidgetPreview />,
  },
  {
    id: WidgetKeys.WORK_COMPLETED_STARTED,
    preview: <InFlowOutFlow isLoading={false} isWidgetPreview />,
  },
  {
    id: WidgetKeys.COMMITED_WORK_RATE,
    preview: <CommitmentRate isLoading={false} isWidgetPreview />,
  },
  {
    id: WidgetKeys.WIP_COUNT,
    preview: <WipCount isLoading={false} isWidgetPreview />,
  },
  {
    id: WidgetKeys.AVG_WIP_AGE,
    preview: <AvgWipAge isLoading={false} isWidgetPreview />,
  },
  {
    id: WidgetKeys.TOTAL_COMPLETED_WORK,
    preview: <Throughput isLoading={false} isWidgetPreview />,
  },
];

export const widgetItems = [
  {
    id: WidgetGroupKeys.FITNESS_CRITERIA,
    label: "Fitness Criteria",
    description: "",
    widgets: fitnessCriteriaPreviews,
  },
  {
    id: WidgetGroupKeys.SOURCE_OF_DELAY,
    label: "Source of Delay and Waste",
    description: "",
    widgets: sourceOfDelayPreviews,
  },
  {
    id: WidgetGroupKeys.WORK_OVERVIEW,
    label: "Work Overview",
    description: "",
    widgets: workOverviewPreview,
  },
  {
    id: WidgetGroupKeys.FLOW_ITEMS,
    label: "Flow Items",
    description: "",
    widgets: flowItemPreview,
  },
  {
    id: WidgetGroupKeys.RUN_CHART,
    label: "Run Chart",
    description: "",
    widgets: runChartPreview,
  },
  {
    id: WidgetGroupKeys.PERFORMANCE_COMPARISON_TIME,
    label: "Performance Comparison by Time Phases",
    description: "",
    widgets: performanceComparisonByTimePreview,
  },
  {
    id: WidgetGroupKeys.PERFORMANCE_COMPARISON_BOARDS,
    label: "Performance Comparison by Boards & Aggregations",
    description: "",
    widgets: performanceComparisonByBoardsPreview,
  },
  {
    id: WidgetGroupKeys.FLOW_OF_DEMANDS,
    label: "Flow of Demands",
    description: "",
    widgets: flowOfDemandsPreviews,
  },
  {
    id: WidgetGroupKeys.SMART_BOARD,
    label: "Smart Board",
    description: "",
    widgets: smartBoardPreview,
  },
];

export const renderWidgetComponent = (widget, props) => {
  switch (widget.id) {
    case WidgetKeys.LEAD_TIME:
      return <SpeedWrapper {...props} />;
    case WidgetKeys.SERVICE_LEVEL:
      return <ServiceLevelExpectationWrapper {...props} />;
    case WidgetKeys.PREDICTABILITY:
      return <PredicabilityWrapper {...props} />;
    case WidgetKeys.DELIVERY_RATE:
      return <ProductivityWrapper {...props} />;
    case WidgetKeys.VALUE_DELIVERED:
      return <CustomerValueWrapper {...props} />;
    case WidgetKeys.FLOW_EFFICIENCY:
      return <FlowEfficiencyWrapper {...props} />;
    case WidgetKeys.RETURNED_TO_BACKLOG:
      return <DelayedItemsWrapper {...props} />;
    case WidgetKeys.CANCELLED_WORK:
      return <DiscardedBeforeStartWrapper {...props} />;
    case WidgetKeys.DISCONTINUED:
      return <DiscardedAfterStartWrapper {...props} />;
    case WidgetKeys.PRODUCTIVITY_DEBT:
      return <FlowDebtWrapper {...props} />;
    case WidgetKeys.STALE_WORK:
      return <StaleWorkWrapper {...props} />;
    case WidgetKeys.IMPEDIMENTS:
      return <BlockersWrapper {...props} />;
    case WidgetKeys.TOP_WAIT_STEPS:
      return <KeySourcesOfDelayWrapper {...props} />;
    case WidgetKeys.WORK_OVERVIEW:
      return (
        <DashboardCard title={""} size={ChartSizes.large}>
          <NormalisationChartsWrapper {...props} isDashboard={true} />
        </DashboardCard>
      );
    case WidgetKeys.FLOW_ITEMS:
      return <FlowItemsWrapper {...props} />;
    case WidgetKeys.RUN_CHART:
      return <RunChartWrapper {...props} />;
    case WidgetKeys.PERFORMANCE_COMPARISON_TIME:
      return (
        <IndicatorCard
          title="Performance Comparison by Time Phases"
          hideWidgetInfo
        >
          <Box paddingTop={3}>
            <PerformanceCheckpointAccordion />
          </Box>
        </IndicatorCard>
      );
    case WidgetKeys.PERFORMANCE_COMPARISON_BOARDS:
      return (
        <IndicatorCard
          title="Performance Comparison by Boards & Aggregations"
          hideWidgetInfo
        >
          <Box paddingTop={3}>
            <PerformanceBenchmarkingAccordion />
          </Box>
        </IndicatorCard>
      );
    case WidgetKeys.DEMAND_VS_CAPACITY:
      return <DemandVsCapacityWrapper {...props} />;
    case WidgetKeys.WORK_COMPLETED_STARTED:
      return <InFlowVsOutFlowWrapper {...props} />;
    case WidgetKeys.TOTAL_UPCOMING_WORK:
      return <InventorySizeWrapper {...props} />;
    case WidgetKeys.COMMITED_WORK_RATE:
      return <CommitmentRateWrapper {...props} />;
    case WidgetKeys.TIME_TO_START:
      return <TimeToCommitWrapper {...props} />;
    case WidgetKeys.WIP_COUNT:
      return <WipCountWrapper {...props} />;
    case WidgetKeys.AVG_WIP_AGE:
      return <AvgWipAgeWrapper {...props} />;
    case WidgetKeys.TOTAL_COMPLETED_WORK:
      return <ThroughputWrapper {...props} />;
    case WidgetKeys.SMART_BOARD:
      return <KanbanSection {...props} />;
    default:
      return null;
  }
};

export const widgetDimensions = [
  {
    id: WidgetKeys.WORK_OVERVIEW,
    dimensions: {
      w: 9,
      minW: 8,
      h: 6,
      minH: 6,
    },
  },
  {
    id: WidgetKeys.LEAD_TIME,
    dimensions: {
      w: 3,
      minW: 3,
      h: 2,
      minH: 2,
    },
  },
  {
    id: WidgetKeys.SERVICE_LEVEL,
    dimensions: {
      w: 3,
      minW: 3,
      h: 2,
      minH: 2,
    },
  },
  {
    id: WidgetKeys.PREDICTABILITY,
    dimensions: {
      w: 3,
      minW: 3,
      h: 2,
      minH: 2,
    },
  },
  {
    id: WidgetKeys.DELIVERY_RATE,
    dimensions: {
      w: 3,
      minW: 3,
      h: 2,
      minH: 2,
    },
  },
  {
    id: WidgetKeys.VALUE_DELIVERED,
    dimensions: {
      w: 3,
      minW: 3,
      h: 2,
      minH: 2,
    },
  },
  {
    id: WidgetKeys.FLOW_EFFICIENCY,
    dimensions: {
      w: 3,
      minW: 3,
      h: 2,
      minH: 2,
    },
  },
  {
    id: WidgetKeys.RETURNED_TO_BACKLOG,
    dimensions: {
      w: 3,
      minW: 3,
      h: 2,
      minH: 2,
    },
  },
  {
    id: WidgetKeys.CANCELLED_WORK,
    dimensions: {
      w: 3,
      minW: 3,
      h: 2,
      minH: 2,
    },
  },
  {
    id: WidgetKeys.PRODUCTIVITY_DEBT,
    dimensions: {
      w: 3,
      minW: 3,
      h: 2,
      minH: 2,
    },
  },
  {
    id: WidgetKeys.STALE_WORK,
    dimensions: {
      w: 3,
      minW: 3,
      h: 2,
      minH: 2,
    },
  },
  {
    id: WidgetKeys.IMPEDIMENTS,
    dimensions: {
      w: 3,
      minW: 3,
      h: 2,
      minH: 2,
    },
  },
  {
    id: WidgetKeys.DISCONTINUED,
    dimensions: {
      w: 4,
      minW: 4,
      h: 2,
      minH: 2,
    },
  },
  {
    id: WidgetKeys.TOP_WAIT_STEPS,
    dimensions: {
      w: 4,
      minW: 4,
      h: 2,
      minH: 2,
    },
  },
  {
    id: WidgetKeys.FLOW_ITEMS,
    dimensions: {
      w: 8,
      minW: 8,
      h: 5,
      minH: 5,
    },
  },
  {
    id: WidgetKeys.RUN_CHART,
    dimensions: {
      w: 7,
      minW: 7,
      h: 4,
      minH: 4,
    },
  },
  {
    id: WidgetKeys.PERFORMANCE_COMPARISON_BOARDS,
    dimensions: {
      w: 11,
      minW: 8,
      h: 4,
      minH: 4,
    },
  },
  {
    id: WidgetKeys.PERFORMANCE_COMPARISON_TIME,
    dimensions: {
      w: 11,
      minW: 10,
      h: 6,
      minH: 6,
    },
  },
  {
    id: WidgetKeys.DEMAND_VS_CAPACITY,
    dimensions: {
      w: 4,
      minW: 4,
      h: 2,
      minH: 2,
    },
  },
  {
    id: WidgetKeys.WORK_COMPLETED_STARTED,
    dimensions: {
      w: 4,
      minW: 4,
      h: 2,
      minH: 2,
    },
  },
  {
    id: WidgetKeys.COMMITED_WORK_RATE,
    dimensions: {
      w: 3,
      minW: 3,
      h: 2,
      minH: 2,
    },
  },
  {
    id: WidgetKeys.TIME_TO_START,
    dimensions: {
      w: 3,
      minW: 3,
      h: 2,
      minH: 2,
    },
  },
  {
    id: WidgetKeys.WIP_COUNT,
    dimensions: {
      w: 3,
      minW: 3,
      h: 2,
      minH: 2,
    },
  },
  {
    id: WidgetKeys.AVG_WIP_AGE,
    dimensions: {
      w: 3,
      minW: 3,
      h: 2,
      minH: 2,
    },
  },
  {
    id: WidgetKeys.TOTAL_COMPLETED_WORK,
    dimensions: {
      w: 3,
      minW: 3,
      h: 2,
      minH: 2,
    },
  },
  {
    id: WidgetKeys.SMART_BOARD,
    dimensions: {
      w: 12,
      minW: 12,
      h: 6,
      minH: 6,
    },
  },
];
