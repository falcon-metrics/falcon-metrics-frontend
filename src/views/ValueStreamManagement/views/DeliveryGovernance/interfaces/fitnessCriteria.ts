import { TrendAnalysisStructure } from 'views/ValueStreamManagement/interfaces/common';
import { HistoricalTabData, WidgetInformation } from './common';

export interface SpeedValues {
  percentile85th: number;
  median: number;
  average: number;
  tail: number;
}
export interface SpeedCriterion {
  portfolio: SpeedValues;
  team: SpeedValues;
  ic: SpeedValues;
  icPercentile85thChart?: HistoricalTabData;
  teamPercentile85thChart?: HistoricalTabData;
  portfolioPercentile85thChart?: HistoricalTabData;
  timeToCommit85thPercentileIC?: HistoricalTabData;
  timeToCommit85thPercentileTeam?: HistoricalTabData;
  timeToCommit85thPercentilePortfolio?: HistoricalTabData;
  industryStandardMessage?: string;
}

export interface PredictabilityCriterion {
  leadtime: string;
  throughput: string;
  leadTimeHistorical?: HistoricalTabData;
  throughputHistorical?: HistoricalTabData;
}

export interface ProductivityCriterion {
  mean: number;
  current: number;
  lastWeek: number;
  trendAnalysis: TrendAnalysisStructure;
  productivityLabel: string;
  productivityColor: string;
  historical?: HistoricalTabData;
}

export interface CustomerValueCriterion {
  customerValueWorkPercentage: number;
  historical?: HistoricalTabData;
  industryStandardMessage?: string;
}

export interface FlowEfficiencyCriterion {
  averageOfWaitingTime: number;
  industryStandardMessage?: string;
}

export interface ServiceLevelExpectationCriterion {
  serviceLevelExpectation: number;
  historical?: HistoricalTabData;
  grade?: string;
  industryStandardMessage?: string;
}

export interface FitnessCriteriaWidgetInformation {
  speed?: WidgetInformation[];
  serviceLevelExpectation?: WidgetInformation[];
  predictability?: WidgetInformation[];
  productivity?: WidgetInformation[];
  customerValue?: WidgetInformation[];
  flowEfficiency?: WidgetInformation[];
}

export type FitnessCriteriaData = {
  speed: SpeedCriterion | undefined;
  serviceLevelExpectation: ServiceLevelExpectationCriterion | undefined;
  predictability: PredictabilityCriterion | undefined;
  productivity: ProductivityCriterion | undefined;
  customerValue: CustomerValueCriterion | undefined;
  flowEfficiency: FlowEfficiencyCriterion | undefined;
  widgetInformation: FitnessCriteriaWidgetInformation | undefined;
};
