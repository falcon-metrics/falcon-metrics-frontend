import { values } from 'lodash';
import {
  DistributionHistoricalWidgetData,
  DistributionRecords,
  HistoricalTabData,
  HistoricalTabEntry,
} from '../../interfaces/common';

const areDistributionRecordsEmpty = (records: DistributionRecords): boolean => {
  const itemCounts: number[] = values(records);

  const areCountsAllZero: boolean = itemCounts.every((count) => count === 0);

  return areCountsAllZero;
}

const isHistoricalEntryEmpty = ({ values }: HistoricalTabEntry): boolean => {
  return areDistributionRecordsEmpty(values);
}

const isHistoricalDataEmpty = (data: HistoricalTabData): boolean => {
  const areCountsAllZero: boolean = data.every(isHistoricalEntryEmpty);

  return areCountsAllZero;
}

export const isDistributionHistoricalDataEmpty = (
  data: DistributionHistoricalWidgetData | undefined,
): boolean => {
  if (!data || !data.distribution || !data.historical) {
    return true;
  }

  const { distribution, historical } = data;

  const isDataEmpty: boolean =
    areDistributionRecordsEmpty(distribution) ||
    isHistoricalDataEmpty(historical);

  return isDataEmpty;
}
