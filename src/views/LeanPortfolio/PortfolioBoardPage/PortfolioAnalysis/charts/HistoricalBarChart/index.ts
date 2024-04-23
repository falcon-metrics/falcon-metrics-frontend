import { HistoricalData } from "views/LeanPortfolio/interfaces/PortfolioAnalysis";
import HistoricalBarChart from "../HistoricalBarChart/HistoricalBarChart";

export type TabProps = {
    historicalData: HistoricalData[];
    customConfig: any;
    customTheme: any;
    unit?: string;
    prefixUnit?: boolean;
};

export default HistoricalBarChart;