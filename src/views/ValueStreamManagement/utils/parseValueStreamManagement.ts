import { TrendAnalysisStructure } from '../interfaces/common';
import { parseNumberProperty, parseTextProperty } from './parsing';
import { isObject } from './validation';

export const parseTrendAnalysisStructure = (entry: object, propertyName: string): TrendAnalysisStructure => {
  const emptyTrendAnalysis: TrendAnalysisStructure = {
    percentage: 0,
    text: '',
    arrowDirection: '',
    arrowColour: '',
  };

  const trendAnalysis: unknown = entry[propertyName];

  if (!isObject(trendAnalysis)) {
    return emptyTrendAnalysis;
  }

  const parsedTrendAnalysis: TrendAnalysisStructure = {
    percentage: parseNumberProperty(trendAnalysis, 'percentage'),
    text: parseTextProperty(trendAnalysis, 'text'),
    arrowDirection: parseTextProperty(trendAnalysis, 'arrowDirection'),
    arrowColour: parseTextProperty(trendAnalysis, 'arrowColour'),
  };

  return parsedTrendAnalysis;
}
