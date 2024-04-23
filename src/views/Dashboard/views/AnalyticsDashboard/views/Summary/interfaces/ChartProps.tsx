import { AggregationPeriod } from 'core/api/ApiClient/SummaryClient';
import { WithFilterColorsProps } from '../utils/withFilterColors';

export interface ChartProps<T> {
  data: T;
  currentDataAggregation: AggregationPeriod;
  seriesOrder: string[];
}

export type ChartPropsWithFilterColors<T = any> = ChartProps<T> &
  WithFilterColorsProps;
