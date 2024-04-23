import {
  Box,
} from "@material-ui/core";
import TabView from "views/ValueStreamManagement/components/TabView";
import { memo } from "react";
import PortfolioAnalysisDatePicker from "./components/DateRangePicker/DateRangePicker";
import { DateRangeProvider } from "views/LeanPortfolio/contexts/DateRangeContext";
import CostAnalysis from "./components/CostAnalysis";
import ProfileOfWork from "./components/ProfileOfWork";
import CognitiveAnalysis from "./components/CognitiveAnalysis";
import { AccordionKeys, useBaseAccordionContext } from "views/Dashboard/views/AnalyticsDashboard/components/BaseAccordion/BaseAccordionContext";

const memoizedCognitiveTab = memo(CognitiveAnalysis);
const memoizedProfileOfWorkTab = memo(ProfileOfWork);
const memoizedCostTab = memo(CostAnalysis);

const tabTitles = [
  "Profile of Work",
  "Cognitive Load",
  "Activity-based Costing"
];

const tabComponents = [
  memoizedProfileOfWorkTab,
  memoizedCognitiveTab,
  memoizedCostTab
];

const PortfolioAnalysis = () => {
  // This code handles the visibility of the datepicker along with the open state of the accordion
  // Without this, when the accordion closes,it leaves the datepicker momentarily visible
  const { activeAccordions } = useBaseAccordionContext();
  const isActive = activeAccordions.includes(AccordionKeys.PortfolioAnalysisKey);
  
  return (
    <DateRangeProvider>
      <Box display="flex" flexDirection="column" flexGrow={1} mt={1}>
        {isActive && <PortfolioAnalysisDatePicker />}
        <TabView
          tabTitles={tabTitles}
          tabContents={tabComponents}
          // not at all needed but customProps cannot be undefined
          customProps={{ isActive }} />
      </Box>
    </DateRangeProvider>
  );
};

export default PortfolioAnalysis;
