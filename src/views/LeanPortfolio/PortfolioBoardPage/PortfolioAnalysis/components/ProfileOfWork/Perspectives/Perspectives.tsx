import { Box } from "@material-ui/core";
import DashboardCard from "components/Charts/components/DashboardCard/DashboardCard";
import { ChartSizes } from "components/Charts/components/DashboardCard/interfaces/ChartSizes";
import { memo } from "react";
import TabView from "views/ValueStreamManagement/components/TabView";
import { TabProps } from "./components";
import DistributionBarChart from "./components/DistributionBarChart";
import HistoricalBarChart from "./components/HistoricalBarChart";
import SkeletonBarChart from "views/ValueStreamManagement/components/SkeletonBarChart";
import { PerspectivesData } from "views/LeanPortfolio/interfaces/PortfolioAnalysis";

interface Props {
    isPortfolioAnalysisLoading: boolean;
    data: PerspectivesData | undefined;
    customConfig: any;
    customTheme: any;
}

const memoizedDistributionBarChart = memo(DistributionBarChart);
const memoizedHistoricalBarChart = memo(HistoricalBarChart);
const tabViewTitles = ["Distribution", "Historical"];
const tabComponents = [memoizedDistributionBarChart, memoizedHistoricalBarChart];

const Tabs = ({ distributionData, historicalData, customConfig, customTheme }: TabProps) => {
    return (
        <Box display="flex" flexDirection="column" flexGrow={1}>
            <TabView
                defaultActiveTab={1}
                tabTitles={tabViewTitles}
                tabContents={tabComponents}
                customProps={{
                    distributionData,
                    historicalData,
                    customConfig,
                    customTheme
                }} />
        </Box>
    );
};

const Perspectives = (props: Props) => {

    return (
        <Box style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(480px, auto))",
            gap: "1rem",
            marginTop: "1rem"
        }}>
            <DashboardCard title="Upcoming Work" size={ChartSizes.small}>
                {!props.data || props.isPortfolioAnalysisLoading ? <SkeletonBarChart /> : <Tabs {...props}
                    distributionData={props.data?.upcomingWork.distribution || []}
                    historicalData={props.data?.upcomingWork.historical || []} />}
            </DashboardCard>

            <DashboardCard title="Work in Progress" size={ChartSizes.small}>
                {!props.data || props.isPortfolioAnalysisLoading  ? <SkeletonBarChart /> : <Tabs {...props}
                    distributionData={props.data?.workInProcess.distribution || []}
                    historicalData={props.data?.workInProcess.historical || []} />}
            </DashboardCard>

            <DashboardCard title="Completed Work" size={ChartSizes.small}>
                {!props.data || props.isPortfolioAnalysisLoading ? <SkeletonBarChart /> : <Tabs {...props}
                    distributionData={props.data?.completedWork.distribution || []}
                    historicalData={props.data?.completedWork.historical || []} />}
            </DashboardCard>
        </Box>
    );
};

export default Perspectives;
