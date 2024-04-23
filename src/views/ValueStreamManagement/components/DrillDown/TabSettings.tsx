import FlowEfficiencyWrapper from "views/ValueStreamManagement/views/ContinuousImprovements/views/FlowAnalysisAccordionContent/components/FlowEfficiency/FlowEfficiencyWrapper";
import TimeInStageWrapper from "views/ValueStreamManagement/views/ContinuousImprovements/views/FlowAnalysisAccordionContent/components/TimeInStage/TimeInStageWrapper";
import DemandCapacityWrapper from "views/ValueStreamManagement/views/ContinuousImprovements/views/FlowOfDemandsAccordionContent/components/DemandCapacity/DemandCapacityWrapper";
import InflowOutflowWrapper from "views/ValueStreamManagement/views/ContinuousImprovements/views/FlowOfDemandsAccordionContent/components/InflowOutflow/InflowOutflowWrapper";
import DistributionTabView from "views/ValueStreamManagement/views/DeliveryGovernance/components/DistributionTabView";
import { LeadTimeMaxHistoricalView } from "views/ValueStreamManagement/views/DeliveryGovernance/views/FitnessCriteriaAccordion/components/Predicability/components/LeadTimeMaxHistoricalView";
import { ThroughputMaxHistoricalView } from "views/ValueStreamManagement/views/DeliveryGovernance/views/FitnessCriteriaAccordion/components/Predicability/components/ThroughputMaxHistoricalView";
import { ProductivityMaxHistoricalView } from "views/ValueStreamManagement/views/DeliveryGovernance/views/FitnessCriteriaAccordion/components/Productivity/components/HistoricalViewMaximized";
import HistoricalView from "views/ValueStreamManagement/views/DeliveryGovernance/views/FitnessCriteriaAccordion/components/Speed/components/HistoricalView";
import PieChartDrillDown from "views/ValueStreamManagement/views/DeliveryGovernance/views/SourcesOfDelayAndWasteAccordion/components/PieChartDrillDown/PieChartDrillDown";
import FlowItemsSection from "views/ValueStreamManagement/views/DeliveryManagement/views/AnalyticsView/views/FlowUnitsSection/FlowItemsSection";
import RunChartSection from "views/ValueStreamManagement/views/DeliveryManagement/views/AnalyticsView/views/RunChartSection/RunChartSection";
import ServiceLevelTable from "views/ValueStreamManagement/views/DeliveryManagement/views/AnalyticsView/views/ServiceLevelSection/views/ServiceLevelTable/ServiceLevelTable";
import ItemTimeHistogram from "views/ValueStreamManagement/views/DeliveryManagement/views/AnalyticsView/views/TimeDistributionSection/components/ItemTimeHistogram/ItemTimeHistogram";
import ItemTimeScatterplot from "views/ValueStreamManagement/views/DeliveryManagement/views/AnalyticsView/views/TimeDistributionSection/components/ItemTimeScatterplot/ItemTimeScatterplot";
import HistoricalTrendChart from "../HistoricalTrendChart";
import FlowEfficiencyHistorical from "views/ValueStreamManagement/views/DeliveryGovernance/views/FitnessCriteriaAccordion/components/FlowEfficiency/FlowEfficiencyHistorical";

export const LeadTimeTabs = [
    "Historical View",
    "Predictability",
    "Histogram",
    "Scatterplot",
    "Work Type Overview",
    "Completed Work Detailed Report",
];

export const FitnessCriteriaTabs = [
    "Historical View",
    "Work Type Overview",
    "Scatterplot",
    "Histogram",
    "Completed Work Detailed Report",
];

export const CustomerSatisfactionTabs = LeadTimeTabs;

export const PredictabilityTabs = [
    "Lead Time Historical View",
    "Delivery Rate Historical View"
];

export const ProductivityTabs = [
    "Historical View",
    "Throughput Run Chart",
    "Completed Work Detailed Report"
];

export const CustomerValueTabs = [
    "Historical View",
    "Class of Value"
];

export const FlowEfficiencyTabs = [
    "Historical View",
    "Process Flow Efficiency",
    "Time in Stage Analytics"
];

export const FlowOfDemandsTabs = [
    "Historical View"
];

export const BlockersTabs = [
    "Detailed report",
    "Reasons distribution"
];

export const BlockersTabsWithoutReason = [
    "Detailed report"
];

export const StaleWorkTabs = [
    "Detailed report"
];

export const DelayedTabs = [
    "Detailed report"
];

export const DiscardedAfterStartTabs = [
    "Detailed report",
    "Reasons distribution"
];

export const DiscardedAfterStartTabsWithoutReason = [
    "Detailed report"
];

export const DiscardedBeforeStartTabs = [
    "Detailed report",
    "Reasons distribution"
];

export const DiscardedBeforeStartTabsWithoutReason = [
    "Detailed report"
];

export const InventoryTabs = [
    "Inventory items"
];

export const WipTabs = [
    "Work in progress items"
];

export const ThroughputTabs = [
    "Completed Items"
];
// --------------------------------------

export const CommonComponents = [
    LeadTimeMaxHistoricalView,
    ItemTimeHistogram,
    ItemTimeScatterplot,
    ServiceLevelTable,
    FlowItemsSection
];

export const LeadTimeTabComponents = [
    HistoricalView,
    ...CommonComponents
];

export const FitnessLevelTabComponents = [
    HistoricalTrendChart,
    ServiceLevelTable,
    ItemTimeScatterplot,
    ItemTimeHistogram,
    FlowItemsSection,
];

export const ProductivityTabComponents = [
    ProductivityMaxHistoricalView,
    RunChartSection,
    FlowItemsSection
];

export const PredictabilityTabComponents = [
    LeadTimeMaxHistoricalView,
    ThroughputMaxHistoricalView
];

export const CustomerValueTabComponents = [
    HistoricalTrendChart,
    DistributionTabView
];

export const FlowEfficiencyTabComponents = [
    FlowEfficiencyHistorical,
    FlowEfficiencyWrapper,
    TimeInStageWrapper
];

export const DemandVsCapacityTabComponents = [
    DemandCapacityWrapper
];

export const InflowVsOutflowTabComponents = [
    InflowOutflowWrapper
];

export const BlockersTabComponents = [
    FlowItemsSection,
    PieChartDrillDown
];

export const BlockersTabComponentsWithoutReason = [
    FlowItemsSection
];

export const StaleWorkTabComponents = [
    FlowItemsSection
];

export const DelayedTabComponents = [
    FlowItemsSection
];

export const DiscardedAfterStartTabComponents = [
    FlowItemsSection,
    PieChartDrillDown
];

export const DiscardedAfterStartTabComponentsWithoutReason = [
    FlowItemsSection
];


export const DiscardedBeforeStartTabComponents = [
    FlowItemsSection,
    PieChartDrillDown
];

export const DiscardedBeforeStartTabComponentsWithoutReason = [
    FlowItemsSection
];

export const InventoryTabComponents = [
    FlowItemsSection
];

export const WipTabComponents = [
    FlowItemsSection
];

export const ThroughputTabComponents = [
    FlowItemsSection
];