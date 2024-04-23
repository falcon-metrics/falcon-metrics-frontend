import { HexColor } from 'utils/colors';

export type TrendData = {
  percentage: number;
  text: string;
  arrowDirection: string;
  arrowColour: string;
};

export type TrendAnalysis = {
  lastWeek?: TrendData;
  lastTwoWeeks?: TrendData;
  lastFourWeeks?: TrendData;
};

const arrowColors = {
  green: '3252c',
  red: '7625c',
  yellow: '142c',
  grey: 'grey',
};

export function getTrendArrowImage(
  arrowDirection?: string,
  arrowColor?: string,
) {
  return `img/trend/${arrowDirection || 'stable'}_${
    arrowColors[arrowColor || 'grey'] ?? arrowColors.grey
  }.svg`;
}

export enum PredictabilityLevels {
  High = 'High',
  Stable = 'Stable',
  Low = 'Low',
}

const colorMap: Record<PredictabilityLevels, HexColor> = {
  [PredictabilityLevels.High]: '#2AD2C9',
  [PredictabilityLevels.Stable]: '#F5B24B',
  [PredictabilityLevels.Low]: '#E1523E',
};

export const getPredictabilityColor = (value: string) => {
  return colorMap[value] ?? '#000';
};

const reversePredictabilities: Record<
  PredictabilityLevels,
  PredictabilityLevels
> = {
  [PredictabilityLevels.High]: PredictabilityLevels.Low,
  [PredictabilityLevels.Stable]: PredictabilityLevels.Stable,
  [PredictabilityLevels.Low]: PredictabilityLevels.High,
};

export const getReverseLevel = (
  predictabilityLevel: string,
): PredictabilityLevels | undefined => {
  return reversePredictabilities[predictabilityLevel];
};
