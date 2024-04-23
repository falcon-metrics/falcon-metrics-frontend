import { memo } from "react";
import { Box } from "@material-ui/core";
import DashboardCard from "components/Charts/components/DashboardCard/DashboardCard";
import { ChartSizes } from "components/Charts/components/DashboardCard/interfaces/ChartSizes";
import TabView from "views/ValueStreamManagement/components/TabView";
import { usePortfolioBoardPageContext } from "views/LeanPortfolio/contexts/PortfolioBoardPageContext";
import { TabProps } from ".";
import { zingChartTheme, distributionChartConfig } from "../../charts/ChartConfig";
import DistributionBarChart from "../../charts/DistributionBarChart";
import DonutChart from "../../charts/DonutChart";
import HistoricalBarChart from "../../charts/HistoricalBarChart";
import { SpinnerComponent } from "views/LeanPortfolio/PortfolioBoardPage/PortfolioBoardAccordions";

const memoizedDistributionBarChart = memo(DistributionBarChart);
const memoizedHistoricalBarChart = memo(HistoricalBarChart);
const tabViewTitles = ["Distribution", "Historical"];
const tabComponents = [memoizedDistributionBarChart, memoizedHistoricalBarChart];

const customTheme = {
  graph: {
    ...zingChartTheme.graph,
    tooltip: {
      ...zingChartTheme.graph.tooltip,
      text: "%v (%npv%) %t",
      thousandsSeparator: ',',
      decimals: 2,
    }
  },
};

const customConfig = {
  ...distributionChartConfig,
  tooltip: {
    text: "%v days (%data-percentage%) %t",
    thousandsSeparator: ','
  },
  scaleY: {
    label: {
      text: "Count by lead time",
    },
    minValue: 0,
    short: true
  },
};

const Tabs = (props: TabProps) => {
  return (
    <Box display="flex" flexDirection="column" flexGrow={1}>
      <TabView
        defaultActiveTab={0}
        tabTitles={tabViewTitles}
        tabContents={tabComponents}
        customProps={{
          distributionData: props.distributionData,
          historicalData: props.historicalData,
          customTheme: props.customTheme,
          customConfig: props.customConfig,
          primaryValueKey: props.primaryValueKey,
          secondaryValueKey: props.secondaryValueKey,
          unit: 'days',
          prefixUnit: false
        }} />
    </Box>
  );
};

const CognitiveAnalysis = () => {
  const { portfolioAnalysisData, isPortfolioAnalysisLoading } = usePortfolioBoardPageContext();
  const cognitiveLoad = portfolioAnalysisData?.cognitiveLoad;

  const distribution = cognitiveLoad && cognitiveLoad?.distribution || [];
  const historical = cognitiveLoad && cognitiveLoad?.historical || [];

  return (
    <Box display="flex" flexDirection="column" mt={2}>
      <DashboardCard title="" size={ChartSizes.fixed4} fullScreen matchHeight>
        {isPortfolioAnalysisLoading ? <SpinnerComponent /> :
          <Box display="flex" flexDirection="row">
            <Box flexBasis="30%">
              <DonutChart data={cognitiveLoad} customTheme={customTheme} />
            </Box>

            <Box flexBasis="67%">
              <Tabs
                distributionData={distribution}
                historicalData={historical}
                customTheme={customTheme}
                customConfig={customConfig}
                primaryValueKey="obeyaLeadTime"
                secondaryValueKey="totalLeadTime" />
            </Box>
          </Box>
        }
      </DashboardCard>
    </Box>
  );
};

export default CognitiveAnalysis;
