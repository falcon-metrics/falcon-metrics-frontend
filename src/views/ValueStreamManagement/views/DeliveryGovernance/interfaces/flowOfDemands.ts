import { IndicatorPattern, WidgetInformation } from './common';
import { FlowItemsEntry } from '../../DeliveryManagement/views/AnalyticsView/interfaces/flowItems';

export type DemandVsCapacityWidgetData = {
  demand: number;
  capacity: number;
  demandOverCapacityPercent: number;
  inventoryGrowth: number;
  pattern: IndicatorPattern;
  widgetInfo?: WidgetInformation[];
};

export type InflowVsOutflowWidgetData = {
  inflow: number;
  outflow: number;
  inflowOverOutflowPercent: number;
  wipGrowth: number;
  pattern: IndicatorPattern;
  widgetInfo?: WidgetInformation[];
};

export type InventorySizeWidgetData = {
  inventoryCount: number;
  weeksWorthCount: number;
  widgetInfo?: WidgetInformation[];
  items?: FlowItemsEntry[];
};

export type CommitmentRateWidgetData = {
  commitmentRatePercent: number | null;
  pattern: IndicatorPattern;
  widgetInfo?: WidgetInformation[];
};

export type TimeToCommitWidgetData = {
  timeToCommit: number | null;
  pattern: IndicatorPattern;
  widgetInfo?: WidgetInformation[];
};

export type WipCountWidgetData = {
  count: number | null;
  assigneesCount: number | null;
  unassignedItems: number | null;
  avgWipCount: number | null;
  widgetInfo?: WidgetInformation[];
  items?: FlowItemsEntry[];
};

export type AvgWipAgeWidgetData = {
  averageAge: number | null;
  pattern: IndicatorPattern;
  widgetInfo?: WidgetInformation[];
};

export type ThroughputWidgetData = {
  count: number | null;
  avgThroughput: number | null;
  widgetInfo?: WidgetInformation[];
  items?: FlowItemsEntry[];
};

export interface FlowOfDemandsWidgetInformation {
  demandVsCapacity?: WidgetInformation[];
  inFlowVsOutFlow?: WidgetInformation[];
  inventorySize?: WidgetInformation[];
  commitmentRate?: WidgetInformation[];
  timeToCommit?: WidgetInformation[];
  wipCount?: WidgetInformation[];
  avgWipAge?: WidgetInformation[];
  throughput?: WidgetInformation[];
}

export type FlowOfDemandsData = {
  demandVsCapacity: DemandVsCapacityWidgetData | undefined;
  inflowVsOutflow: InflowVsOutflowWidgetData | undefined;
  inventorySize: InventorySizeWidgetData | undefined;
  commitmentRate: CommitmentRateWidgetData | undefined;
  timeToCommit: TimeToCommitWidgetData | undefined;
  wipCount: WipCountWidgetData | undefined;
  avgWipAge: AvgWipAgeWidgetData | undefined;
  throughput: ThroughputWidgetData | undefined;
  widgetInformation: FlowOfDemandsWidgetInformation | undefined;
};
