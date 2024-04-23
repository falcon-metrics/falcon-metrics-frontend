import { CognitiveDistributionData, HistoricalData } from "views/LeanPortfolio/interfaces/PortfolioAnalysis";
import CognitiveAnalysis from "./CognitiveAnalysis";

export type TabProps = {
    distributionData: CognitiveDistributionData[];
    historicalData: HistoricalData[];
    customConfig: any;
    customTheme: any;
    primaryValueKey: string;
    secondaryValueKey: string;
};

export default CognitiveAnalysis;