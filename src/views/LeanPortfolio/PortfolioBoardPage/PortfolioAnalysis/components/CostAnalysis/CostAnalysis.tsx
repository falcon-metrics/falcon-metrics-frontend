import { memo } from "react";
import { Box } from "@material-ui/core";
import DashboardCard from "components/Charts/components/DashboardCard/DashboardCard";
import { ChartSizes } from "components/Charts/components/DashboardCard/interfaces/ChartSizes";
import TabView from "views/ValueStreamManagement/components/TabView";
import { usePortfolioBoardPageContext } from "views/LeanPortfolio/contexts/PortfolioBoardPageContext";
import { TabProps } from ".";
import { distributionChartConfig, zingChartTheme } from "../../charts/ChartConfig";
import HistoricalBarChart from "../../charts/HistoricalBarChart";
import DistributionBarChart from "../../charts/DistributionBarChart";
import TwoBarChart from "../../charts/TwoBarChart";
import SkeletonBarChart from "views/ValueStreamManagement/components/SkeletonBarChart";
import { NoDataAvailable } from "../NoDataAvailable";

const memoizedDistributionBarChart = memo(DistributionBarChart);
const memoizedHistoricalBarChart = memo(HistoricalBarChart);
const tabViewTitles = ["Distribution", "Historical"];
const tabComponents = [memoizedDistributionBarChart, memoizedHistoricalBarChart];

const customTheme = {
  graph: {
    ...zingChartTheme.graph,
    tooltip: {
      ...zingChartTheme.graph.tooltip,
      text: "$%v (%npv%) %t",
      thousandsSeparator: ',',
      decimals: 2
    }
  },
};

const customConfig = {
  ...distributionChartConfig,
  tooltip: {
    text: "$%v (%data-percentage%) %t",
    thousandsSeparator: ','
  },
  scaleY: {
    label: {
      text: "Cost",
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
          unit: '$',
          prefixUnit: true
        }} />
    </Box>
  );
};

const CostAnalysis = () => {
  const { portfolioAnalysisData, isPortfolioAnalysisLoading } = usePortfolioBoardPageContext();
  const cost = portfolioAnalysisData?.cost;

  const distribution = cost && cost?.distribution || [];
  const historical = cost && cost?.historical || [];

  return (
    <Box display="flex" flexDirection="column" flexGrow={1} mt={2}>
      {cost && Object.keys(cost).length > 0 ?
        <DashboardCard title="" size={ChartSizes.full} fullScreen>
          {isPortfolioAnalysisLoading ? <SkeletonBarChart /> :
            <Box display="flex" flexDirection="row">
              <Box flexBasis="30%">
                <TwoBarChart
                  strategicValue={cost?.strategic}
                  operationalValue={cost?.operational}
                  customConfig={customConfig}
                  customTheme={customTheme} />
              </Box>

              <Box flexBasis="67%">
                <Tabs
                  distributionData={distribution}
                  historicalData={historical}
                  customTheme={customTheme}
                  customConfig={customConfig}
                  primaryValueKey="obeyaCost"
                  secondaryValueKey="allObeyaCost" />
              </Box>
            </Box>
          }
        </DashboardCard>
        : <NoDataAvailable>Cost has not yet been configured for this context.</NoDataAvailable>
      }
    </Box>
  );
};

export default CostAnalysis;
