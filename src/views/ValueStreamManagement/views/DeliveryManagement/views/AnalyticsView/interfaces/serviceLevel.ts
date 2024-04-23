export interface TrendAnalysisStructure {
  percentage: number;
  text: string;
  arrowDirection: string;
  arrowColour: string;
};

export interface ServiceLevelEntry {
  displayName: string;
  count: number;
  serviceLevelExpectationInDays: number;
  targetMet: number;
  trendAnalysisSLE: TrendAnalysisStructure;
  predictability: string;
  mode: number[] | null;
  median: number | null;
  average: number | null;
  min: number | null;
  max: number | null;
  percentile85: number | null;
  tail: number | null;
  projectId: string;
  serviceLevelExpectationInDaysByProject?: number[];
  targetMetByProject?: number[];
  id?: string;
}

export interface ServiceLevelData {
  normalisedDemands: ServiceLevelEntry[];
  workItemTypes: ServiceLevelEntry[];
}
