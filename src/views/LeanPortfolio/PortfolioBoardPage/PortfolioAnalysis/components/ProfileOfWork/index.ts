import { ProfileOfWorkDistributionData, HistoricalData } from "views/LeanPortfolio/interfaces/PortfolioAnalysis";
import ProfileOfWork from "./ProfileOfWork";

export type TabProps = {
    distributionData: ProfileOfWorkDistributionData[];
    historicalData: HistoricalData[];
    customConfig: any;
    customTheme: any;
    primaryValueKey: string;
    secondaryValueKey: string;
};

export default ProfileOfWork;