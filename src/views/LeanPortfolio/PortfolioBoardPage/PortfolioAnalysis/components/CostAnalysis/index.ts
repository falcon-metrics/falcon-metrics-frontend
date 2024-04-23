import { CostDistributionData, HistoricalData } from "views/LeanPortfolio/interfaces/PortfolioAnalysis";
import CostAnalysis from "./CostAnalysis";

export type TabProps = {
    distributionData: CostDistributionData[];
    historicalData: HistoricalData[];
    customConfig: any;
    customTheme: any;
    primaryValueKey: string;
    secondaryValueKey: string;
};

export default CostAnalysis;