export type CommonHistogramData = {
  bin: number;
  frequency: number;
  probability: number;
  accumulatedProbability: number;
};

export type DeliveryDateHistogramData = CommonHistogramData & {
  deliveryDate: string;
};
export type RemainingWorkItemsByLevel = {
  portfolio: number;
  team: number;
  individualContributor: number;
};
export type SimulationSummaryData = {
  adjustedRemainingWork: number;
  averageWeeklyDeliveryRate: number;
  originalRemainingWorkItemsByLevel: RemainingWorkItemsByLevel;
  adjustedRemainingWorkItemsByLevel: RemainingWorkItemsByLevel;
  deliveryRateByContext: DeliveryRateSummaryEachContext;
  simulationCount: number;
};
export type SimulationAdditionalInfo = {
  dateRangeValue: string;
  duration: number;
  dataSetSize: string;
  throughputDays: number;
};
export type DeliveryRateSummaryEachContext = {
  [key: string]: {
    original: number;
    adjusted: number;
  };
};

export type DeliveryRateSummaryEachContextDisplay = {
  contextId: string;
  contextName: string;
  original: number;
  adjusted: number;
};
export type Assumptions = {
  teamPerformance: string;
  workItemLevel: string;
  workExpansion: string;
  fullFocus: string;
  precision: string;
};
export type PredictiveAnalysisResponse = {
  deliveryDateAnalysis: {
    "50Percentile": string;
    "85Percentile": string;
    "98Percentile": string;
    desiredDeliveryDate: string;
    desiredDeliveryDateConfidenceLevelPercentage: number;
    histogramData: DeliveryDateHistogramData[];
  };
  throughputAnalysis: {
    "50Percentile": number;
    "85Percentile": number;
    "98Percentile": number;
    obeyaRemainingItem: number;
    obeyaRemainingItemConfidenceLevelPercentage: number;
    histogramData: CommonHistogramData[];
  };
  simulationSummary: SimulationSummaryData;
  simulationAdditionalInfo: SimulationAdditionalInfo;
  isEmpty?: boolean;
  message?: string;
  assumptions: Assumptions;
};

export type TeamFocusData = TeamFocusRowData[];

export type TeamFocusRowData = {
  contextId: string;
  contextName: string;
  capacityPercentage: number;
};
export type ObeyaContext = {
  contextId: string;
  contextName: string;
};
export type ForecastLevel = {
  forecastPortfolio: boolean;
  forecastTeam: boolean;
  forecastIndividualContributor: boolean;
};
export type SettingsData = ForecastLevel & {
  contextCapacity: TeamFocusData;
  teamPerformancePercentage: number;
  workExpansionPercentage?: number;
  predictiveAnalysisPrecision: "day" | "week";
  sampleStartDate?: string;
  sampleEndDate?: string;
};
export type SettingsDataRequest = SettingsData & {
  roomId: string;
};

export const DefaultTeamCapacityPercentage = 75;
