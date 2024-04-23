import { memo } from "react";
import { Box } from "@material-ui/core";
import DashboardCard from "components/Charts/components/DashboardCard/DashboardCard";
import { ChartSizes } from "components/Charts/components/DashboardCard/interfaces/ChartSizes";
import TabView from "views/ValueStreamManagement/components/TabView";
import { usePortfolioBoardPageContext } from "views/LeanPortfolio/contexts/PortfolioBoardPageContext";
import { TabProps } from ".";
import { distributionChartConfig, zingChartTheme } from "../../charts/ChartConfig";
import DonutChart from "../../charts/DonutChart";
import DistributionBarChart from "../../charts/DistributionBarChart";
import Perspectives from "./Perspectives";
import { SpinnerComponent } from "views/LeanPortfolio/PortfolioBoardPage/PortfolioBoardAccordions";

const memoizedDistributionBarChart = memo(DistributionBarChart);
// const memoizedHistoricalBarChart = memo(HistoricalBarChart);
const tabViewTitles = ["Distribution"];
const tabComponents = [memoizedDistributionBarChart];

const customTheme = {
  graph: {
    plotarea: {
      ...zingChartTheme.graph.plotarea,
    },
    tooltip: {
      ...zingChartTheme.graph.tooltip,
      text: "%v items (%npv%) %t",
      thousandsSeparator: ','
    }
  },
};

const customConfig = {
  ...distributionChartConfig,
  tooltip: {
    text: "%v items (%data-percentage%) %t",
    thousandsSeparator: ','
  },
  scaleY: {
    label: {
      text: "Count",
    }
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
          unit: 'items',
          prefixUnit: false
        }} />
    </Box>
  );
};

const ProfileOfWork = () => {
  const { portfolioAnalysisData, isPortfolioAnalysisLoading } = usePortfolioBoardPageContext();
  const profileOfWork = portfolioAnalysisData?.profileOfWork;

  const distribution = profileOfWork && profileOfWork?.distribution || [];
  const historical = profileOfWork && profileOfWork?.historical || [];
  const perspectives = profileOfWork && profileOfWork?.perspectives || {};

  return (
    <Box display="flex" flexDirection="column" flexGrow={1} mt={2}>
      <DashboardCard title="" size={ChartSizes.full} fullScreen>
        {isPortfolioAnalysisLoading ? <SpinnerComponent /> :
          <Box display="flex" flexDirection="row">
            <Box flexBasis="30%">
              <DonutChart data={profileOfWork} customTheme={customTheme} />
            </Box>

            <Box flexBasis="67%">
              <Tabs
                distributionData={distribution}
                historicalData={historical}
                customTheme={customTheme}
                customConfig={customConfig}
                primaryValueKey="itemsUnderThisObeya"
                secondaryValueKey="totalItemsUnderAllObeyas" />
            </Box>
          </Box>
        }
      </DashboardCard>
      
      { perspectives &&
        <Perspectives
          isPortfolioAnalysisLoading={isPortfolioAnalysisLoading}
          data={perspectives}
          customTheme={customTheme}
          customConfig={customConfig} /> 
      }
    </Box>
  );
};

export default ProfileOfWork;
