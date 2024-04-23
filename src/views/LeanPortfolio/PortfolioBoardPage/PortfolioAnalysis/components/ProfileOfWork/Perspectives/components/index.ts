import { PerspectivesHistoricalData, PortfolioAnalysisCounts } from "views/LeanPortfolio/interfaces/PortfolioAnalysis";
import DistributionBarChart from "./DistributionBarChart";
import HistoricalBarChart from "./HistoricalBarChart";

export type TabProps = {
    historicalData: PerspectivesHistoricalData[] | undefined;
    distributionData: PortfolioAnalysisCounts | undefined;
    customConfig: any;
    customTheme: any;
};

export default { DistributionBarChart, HistoricalBarChart };