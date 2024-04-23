import { AggregationKey } from 'views/ValueStreamManagement/views/DeliveryManagement/utils/aggregation';

export const getTrendChartTooltipDaysByAggregation = (
  aggregation: AggregationKey,
): string => {
  if (aggregation === "day")
    return "%vt days on %kt";
  else if (aggregation === "month")
    return "%vt days in %kt";
  else 
    return `%vt days in the ${aggregation} of %kt`;
}

export const getTrendChartTooltipPercentageByAggregation = (
  aggregation: AggregationKey,
): string => {
  if (aggregation === "day")
    return "%vt% on %kt";
  else if (aggregation === "month")
    return "%vt% in %kt";
  else 
    return `%vt% in the ${aggregation} of %kt`;
}

export const getProductivityTooltip = (
  aggregation: AggregationKey
): string => {
  if (aggregation === "day")
    return `%data-rating (Throughput: %v) <br>on %kt`;
  else if (aggregation === "month")
    return `%data-rating (Throughput: %v) <br>in %kt`;
  else 
    return `%data-rating (Throughput: %v) <br>in the ${aggregation} of %k`;
}

export const getPredictabilityTooltip = (
  aggregation: AggregationKey
): string => {
  if (aggregation === "day")
    return "%v on %kt";
  else if (aggregation === "month")
    return "%v in %kt";
  else 
    return `%v in the ${aggregation} of %kt`;
}