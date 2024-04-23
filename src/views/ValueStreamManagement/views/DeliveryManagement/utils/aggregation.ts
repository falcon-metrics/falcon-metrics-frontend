import { DEFAULT_DATE_FORMAT, DEFAULT_MONTH_YEAR_FORMAT } from 'utils/dateTime';
import { DataAggregations } from 'views/Dashboard/views/Platform/views/FilterPanel/contexts/FilterPanelContext/interfaces';

export const AGGREGATION_QUERY_PARAMS = [
  'day',
  'week',
  'month',
  'quarter',
  'year',
] as const;
export type AggregationKey = typeof AGGREGATION_QUERY_PARAMS[number];

export const getAggregationQueryParam = (
  filterAggregation: DataAggregations | undefined
): AggregationKey => {
  const lowerCaseAggregation = filterAggregation
    ? filterAggregation.toLowerCase()
    : '';

  switch (lowerCaseAggregation) {
    case 'years':
      return 'year';
    case 'quarters':
      return 'quarter';
    case 'months':
      return 'month';
    case 'weeks':
      return 'week';
    case 'days':
      return 'day';
    default:
      return 'day';
  }
};

export const getDateFormatByAggregation = (
  aggregation: AggregationKey
): string => {
  // Luxon Date Formats
  switch(aggregation) {
    case 'year':
      return 'yyyy';
    case 'quarter':
      return 'Qq yyyy';
    case 'month':
      return DEFAULT_MONTH_YEAR_FORMAT;
    case 'week':
      return DEFAULT_DATE_FORMAT; //'dd MMM';
    case 'day':
      // Currently no way to escape apostrophes
      return DEFAULT_DATE_FORMAT;
    default:
      return DEFAULT_DATE_FORMAT;
  }
};

export const getXAxisLabelByAggregation = (
  aggregation: AggregationKey
): string => {
  switch(aggregation) {
    case 'year':
      return 'Year';
    case 'quarter':
      return 'Quarter';
    case 'month':
      return 'Month';
    case 'week':
      return "Week Starting";
    case 'day':
      return 'Day';
    default:
      return 'Day';
  }
};

export function removePluralityFromAggregation(agg: string): 'day' | 'week' | 'month' | 'quarter' | 'year' {
  if (agg[agg.length-1] === 's') {
    agg = agg.substring(0, agg.length-1);
  }
  return agg as any;
}