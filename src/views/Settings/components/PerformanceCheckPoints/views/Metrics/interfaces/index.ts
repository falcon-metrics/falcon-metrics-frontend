import { TrendComparison, Unit } from "views/ValueStreamManagement/views/DeliveryGovernance/views/PerformanceCheckpointAccordion/models";

export type GroupedFilter = {
  displayName: string;
  key: string;
  fields: FilterWithId[];
};

export type FilterWithId = {
  filter_displayName?: string;
  filter_id?: string | number;
  tag?: string;
  display_on_benchmarking: boolean;
  display_on_checkpoints: boolean;
};

export type MetricConfigResponse = {
  savedMetrics: {
    metrics: MetricItem[];
    customViews: FilterWithId[];
  },
  defaultCustomViews: GroupedFilter[];
};
export type MetricsConfig = MetricConfigResponse & {
  defaultMetrics: MetricItem[];
};

export type DefaultMetrics = {
  columnName: string;
  displayName: string;
  unit: Unit;
  isBenchmarkingRecommended: boolean;
  trendComparison: TrendComparison;
};

// Metric object info to be stored on database
export type MetricItem = DefaultMetrics & {
  id: number;
  display_on_benchmarking: boolean;
  display_on_checkpoints: boolean;
};


