import { DateTime } from "luxon";

export interface PortfolioAnalysisData extends PortfolioAnalysisCounts {
  profileOfWork: {
    distribution: ProfileOfWorkDistributionData[];
    historical: HistoricalData[];
    perspectives: PerspectivesData;
  } & PortfolioAnalysisCounts,
  cost: {
    distribution: CostDistributionData[];
    historical: HistoricalData[];
  } & PortfolioAnalysisCounts,
  cognitiveLoad: {
    distribution: CognitiveDistributionData[];
    historical: HistoricalData[];
  } & PortfolioAnalysisCounts,
}

export interface PortfolioAnalysisCounts {

  strategic: number;
  operational: number;
}


export interface PerspectivesData {
  [perspective: string]: {
    distribution: PortfolioAnalysisCounts;
    historical: PerspectivesHistoricalData[];
  };
}

export interface ProfileOfWorkDistributionData {
  contextId: string;
  roomId: string;
  roomName: string;
  totalItemsUnderAllObeyas: number;
  itemsUnderThisObeya: number;
}


export interface CostDistributionData {
  contextId: string;
  roomId: string;
  roomName: string;
  allObeyaCost: number;
  obeyaCost: number;
}

export interface CognitiveDistributionData {
  contextId: string;
  roomId: string;
  roomName: string;
  obeyaLeadTime: number;
  totalLeadTime: number;
}

export interface HistoricalData {
  dateStart: DateTime | string;
  dateEnd: DateTime | string;
  weekNumber: number;
  values: {
    [roomName: string]: number;
  };
}

export interface PerspectivesHistoricalData {
  dateStart: DateTime | string;
  dateEnd: DateTime | string;
  weekNumber: number;
  values: PortfolioAnalysisCounts;
}