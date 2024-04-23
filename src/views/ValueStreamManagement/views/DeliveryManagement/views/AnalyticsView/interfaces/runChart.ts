import { DateTime } from 'luxon';

export type ChartRecord = [string, number];

export interface RunChartRawData {
  totalItemsData: ChartRecord[];
  newItemsData: ChartRecord[];
}

export type TimeSeriesEntry = [DateTime, number];
export type TimeSeries = TimeSeriesEntry[];

export interface RunChartData {
  totalItemsData: TimeSeries;
  newItemsData: TimeSeries;
}
