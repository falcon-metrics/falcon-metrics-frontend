import { ChartRecord, RunChartRawData } from '../views/DeliveryManagement/views/AnalyticsView/interfaces/runChart';

export const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

export const isNumber = (number: unknown): number is number => {
  return typeof number === 'number' || number instanceof Number;
};

export const isBoolean = (bool: unknown): bool is boolean => {
  return typeof bool === 'boolean'|| bool instanceof Boolean;
};

export const isObject = (obj: unknown): obj is object => {
  if (obj === null) {
    return false;
  }
  return typeof obj === 'object' || obj instanceof Object;
};

export const isObjectArray = (data: unknown): data is object[] => {
  const isObjArray = data && Array.isArray(data)
    ? data.every(isObject)
    : false;
  return isObjArray;
};

const isChartRecord = (entry: unknown): entry is ChartRecord => {
  const isArrayOfTwo = Array.isArray(entry) && entry.length === 2;

  return isArrayOfTwo && isString(entry[0]) && isNumber(entry[1]);
};

export const isRunChartRawData = (data: unknown): data is RunChartRawData => {
  if(!isObject(data)) {
    return false;
  }

  const newItemsData = data['newItemsData'];
  const totalItemsData = data['totalItemsData'];

  const areChildrenArrays: boolean =
    Array.isArray(newItemsData) && Array.isArray(totalItemsData);

  if (areChildrenArrays) {
    const areChildrensRecordsValid: boolean =
      newItemsData.every(isChartRecord) && totalItemsData.every(isChartRecord);

    return areChildrensRecordsValid;
  }
  return false;
};
