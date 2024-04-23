import Box from "@material-ui/core/Box";
import useSharedState from "hooks/useSharedState";
import { useEffect } from "react";
import { BaseAccordionWithData } from "views/ValueStreamManagement/components/BaseAccordionWithData";
import NoDataPanel from "views/ValueStreamManagement/components/NoDataPanel/NoDataPanel";
import { useValueStreamManagementStyles } from "../../ValueStreamManagement.styles";
import FlowOfDemandsAccordion from "../DeliveryGovernance/views/FlowOfDemandsAccordion/FlowOfDemandsAccordion";
import SourcesOfDelayAndWasteAccordion from "../DeliveryGovernance/views/SourcesOfDelayAndWasteAccordion/SourcesOfDelayAndWasteAccordion";
import CumulativeFlowDiagramAccordionContent from "./views/CumulativeFlowDiagramAccordionContent/CumulativeFlowDiagramAccordionContent";
import FlowAnalysisAccordionContent from "./views/FlowAnalysisAccordionContent/FlowAnalysisAccordionContent";
import BottleneckFinderChart from "./views/BottleneckFinder";

const ValueStreamManagementContinuousImprovements = () => {
  const globalStyles = useValueStreamManagementStyles();

  // Disable loading indicator on header by setting shared state to false
  const [sharedState, setSharedState] = useSharedState(
    "ANALYTICS_DASHBOARD_IS_LOADING"
  );

  useEffect(() => {
    if (sharedState) {
      setSharedState(false);
    }
  }, [sharedState]);

  // TODO: Pass down props to compute this.
  // OR use a Context here
  const isPageEmpty = false;

  return (
    <Box>
      {isPageEmpty ? (
        <Box className={globalStyles.noDataContainer}>
          <NoDataPanel />
        </Box>
      ) : (
        <>
          <Box className={globalStyles.groupContainer}>
            <BaseAccordionWithData
              title="Flow of Demands"
              Component={FlowOfDemandsAccordion}
              defaultExpanded={true}
            />
          </Box>

          <Box className={globalStyles.groupContainer}>
            <BaseAccordionWithData
              title="Sources of delay and waste"
              Component={SourcesOfDelayAndWasteAccordion}
              defaultExpanded={false}
            />
          </Box>

          <Box className={globalStyles.groupContainer}>
            <BaseAccordionWithData
              title="Efficiency Analytics"
              Component={FlowAnalysisAccordionContent}
              defaultExpanded={false}
            />
          </Box>

          <Box className={globalStyles.groupContainer}>
            <BaseAccordionWithData
              title="Cumulative Flow Diagram"
              Component={CumulativeFlowDiagramAccordionContent}
              defaultExpanded={false}
            />
          </Box>

          <Box className={globalStyles.groupContainer}>
            <BaseAccordionWithData
              badgeType={"BETA"}
              title="Workflow Lag Finder"
              Component={BottleneckFinderChart}
              defaultExpanded={false}
            />
          </Box>
        </>
      )}
    </Box>
  );
};

export default ValueStreamManagementContinuousImprovements;
