import { RunChartData, TimeSeriesEntry } from '../../interfaces/runChart';

const isEmptyEntry = ([_, count]: TimeSeriesEntry): boolean =>
      count === 0;

export const isRunChartDataEmpty = (data: RunChartData | undefined): boolean => {
  if (!data) {
    return true;
  }

  const { newItemsData, totalItemsData } = data;

  const isNewItemsDataEmpty: boolean =
    newItemsData.length === 0 || newItemsData.every(isEmptyEntry);
  
  const isTotalItemsDataEmpty: boolean = totalItemsData.every(isEmptyEntry);
    totalItemsData.length === 0 || totalItemsData.every(isEmptyEntry);

  return isNewItemsDataEmpty && isTotalItemsDataEmpty;
}
