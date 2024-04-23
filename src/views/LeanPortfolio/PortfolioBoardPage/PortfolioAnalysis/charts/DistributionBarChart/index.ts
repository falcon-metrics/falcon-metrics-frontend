import { CognitiveDistributionData, CostDistributionData, ProfileOfWorkDistributionData } from "views/LeanPortfolio/interfaces/PortfolioAnalysis";
import DistributionBarChart from "./DistributionBarChart";

export type TabProps = {
    distributionData: CognitiveDistributionData[] | CostDistributionData[] | ProfileOfWorkDistributionData[];
    customConfig: any;
    customTheme: any;
    primaryValueKey: string;
    secondaryValueKey: string;
};

export default DistributionBarChart;