import { FlowItemsEntry } from '../../DeliveryManagement/views/AnalyticsView/interfaces/flowItems';
import { WorkItemGroupCount } from '../../DeliveryManagement/views/AnalyticsView/interfaces/profileOfWork';
import { IndicatorPattern, WidgetInformation } from './common';

export type TargetWipWidgetData = {
  wipExcessValue: number | null;
  wipExcessTitle: string;
  currentWip: number;
  targetWip: number;
  pattern: IndicatorPattern;
  widgetInfo?: WidgetInformation[];
};

export type StaleWorkWidgetData = {
  stalePercent: number;
  staleCount: number;
  pattern: IndicatorPattern;
  widgetInfo?: WidgetInformation[];
  items?: FlowItemsEntry[];
};

export type BlockersWidgetData = {
  count: number;
  pattern: IndicatorPattern;
  items?: FlowItemsEntry[];
  distribution?: WorkItemGroupCount[] | null;
  widgetInfo?: WidgetInformation[];
};

export type DiscardedBeforeStartWidgetData = {
  discardedCount: number;
  widgetInfo?: WidgetInformation[];
  items?: FlowItemsEntry[];
  distribution?: WorkItemGroupCount[] | null;
};

export type DiscardedAfterStartWidgetData = {
  discardedCount: number;
  activeDaysSpent: number;
  widgetInfo?: WidgetInformation[];
  items?: FlowItemsEntry[];
  distribution?: WorkItemGroupCount[] | null;
};

export type FlowDebtWidgetData = {
  value: number;
  leadtimePercentile85th: number;
  wipAgePercentile85th: number;
  pattern: IndicatorPattern;
  widgetInfo?: WidgetInformation[];
};

export type DelayedItemsWidgetData = {
  count: number;
  widgetInfo?: WidgetInformation[];
  items?: FlowItemsEntry[];
};

export type SourceOfDelayEntry = {
  state: string;
  count: number;
  countOfDelays: number;
  averageOfDays: number;
  percentage: number;
};

export type KeySourcesOfDelayWidgetData = {
  keySourcesOfDelayData: SourceOfDelayEntry[];
  widgetInfo?: WidgetInformation[];
};

export interface SourcesOfDelayWidgetInformation {
  wipExcess?: WidgetInformation[];
  staleWork?: WidgetInformation[];
  blockers?: WidgetInformation[];
  discardedBeforeStart?: WidgetInformation[];
  discardedAfterStart?: WidgetInformation[];
  flowDebt?: WidgetInformation[];
  delayedItems?: WidgetInformation[];
  keySourcesOfDelay?: WidgetInformation[];
}

export type SourcesOfDelayAndWasteData = {
  targetWip: TargetWipWidgetData | undefined;
  staleWork: StaleWorkWidgetData | undefined;
  blockers: BlockersWidgetData | undefined;
  discardedBeforeStart: DiscardedBeforeStartWidgetData | undefined;
  discardedAfterStart: DiscardedAfterStartWidgetData | undefined;
  flowDebt: FlowDebtWidgetData | undefined;
  delayedItems: DelayedItemsWidgetData | undefined;
  keySourcesOfDelay: KeySourcesOfDelayWidgetData | undefined;
  widgetInformation: SourcesOfDelayWidgetInformation | undefined;
};
