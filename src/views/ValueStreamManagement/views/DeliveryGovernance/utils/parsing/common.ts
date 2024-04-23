import { fromPairs, isUndefined, toPairs } from 'lodash';
import {
  parseNumber,
  parseString,
} from 'views/ValueStreamManagement/utils/parsing';
import {
  isObject,
  isObjectArray,
  isString,
} from 'views/ValueStreamManagement/utils/validation';
import {
  DistributionHistoricalWidgetData,
  DistributionRecords,
  HistoricalTabData,
  HistoricalTabEntry,
  IndicatorPattern,
  INDICATOR_PATTERNS,
  WidgetInformation,
} from '../../interfaces/common';

export const isIndicatorPattern = (value: unknown): value is IndicatorPattern => {
  const isValidPattern: boolean = isString(value)
    ? INDICATOR_PATTERNS.includes(value as IndicatorPattern)
    : false;
  
  return isValidPattern;
}

// May throw errors when given invalid data. Handle appropriately.
export const parsePattern = (value: unknown): IndicatorPattern => {
  if (!isIndicatorPattern(value)) {
    throw new Error('Parsing failed. Invalid indicator pattern.');
  }

  return value;
}

const parseDistributionRecords = (entry: object): DistributionRecords => {
  const records = toPairs(entry);

  const parsedRecords = records.map(
    ([normalizedDisplayName, value]: [string, unknown]) =>
      ([normalizedDisplayName, parseNumber(value)]),
  );

  const demandDistributionData: DistributionRecords = fromPairs(
    parsedRecords
  );

  return demandDistributionData;
}

// May throw errors when given invalid data. Handle appropriately.
const parseHistoricalEntry = (entry: object): HistoricalTabEntry => {
  const dateStart: unknown = entry['dateStart'];
  const dateEnd: unknown = entry['dateEnd'];
  const values: unknown = entry['values'];

  const dateProperties = [
    dateStart,
    dateEnd,
  ];

  if (dateProperties.some(isUndefined) || !isObject(values)) {
    throw new Error(
      'Demand Distribution parsing failed. Incorrect HistoricalTabEntry properties.',
    );
  }

  const parsedEntry: HistoricalTabEntry = {
    dateStart: parseString(dateStart),
    dateEnd: parseString(dateEnd),
    values: parseDistributionRecords(values)
  };

  return parsedEntry;
}

const parseHistoricalData = (entries: object[]): HistoricalTabData | undefined => {
  try {
    const parsedEntries: HistoricalTabData = entries.map(
      parseHistoricalEntry
    );

    return parsedEntries;
  } catch (error) {
    return undefined;
  }
}

export const parseDistributionHistoricalWidgetData = (
  entry: object,
): DistributionHistoricalWidgetData | undefined => {
  const distribution: unknown = entry['distribution'];
  const historical: unknown = entry['historical'];
  const widgetInfo: WidgetInformation[] = entry['widgetInfo'];

  if (!isObject(distribution) || !isObjectArray(historical)) {
    return undefined;
  }

  const parsedDistribution: DistributionRecords = parseDistributionRecords(distribution);
  const parsedHistorical = parseHistoricalData(historical);

  if (!parsedHistorical) {
    return undefined;
  }

  const parsedEntry: DistributionHistoricalWidgetData = {
    distribution: parsedDistribution,
    historical: parsedHistorical,
    widgetInfo: widgetInfo
  };

  return parsedEntry;
}
