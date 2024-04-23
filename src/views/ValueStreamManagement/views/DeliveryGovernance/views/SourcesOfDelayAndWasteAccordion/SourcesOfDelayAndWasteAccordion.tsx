import Box from "@material-ui/core/Box";
import { useValueStreamManagementStyles } from "views/ValueStreamManagement/ValueStreamManagement.styles";
import DelayedItemsWrapper from "./components/DelayedItems/DelayedItemsWrapper";
import DiscardedBeforeStartWrapper from "./components/DiscardedBeforeStart/DiscardedBeforeStartWrapper";
import DiscardedAfterStartWrapper from "./components/DiscardedAfterStart/DiscardedAfterStartWrapper";
import FlowDebtWrapper from "./components/FlowDebt/FlowDebtWrapper";
import StaleWorkWrapper from "./components/StaleWork/StaleWorkWrapper";
import BlockersWrapper from "./components/Blockers/BlockersWrapper";
import KeySourcesOfDelayWrapper from "./components/KeySourcesOfDelay/KeySourcesOfDelayWrapper";
import { useSourceOfDelayAndWaste } from "../../hooks/useSourceOfDelay";

const SourcesOfDelayAndWasteAccordion = () => {
  const globalStyles = useValueStreamManagementStyles();
  const { data, isLoading, isEmptyData: isEmpty } = useSourceOfDelayAndWaste();

  const widgetInformation = data?.widgetInformation;

  const props = {
    data,
    isLoading,
    isEmpty,
    widgetInformation
  };

  return (
    <Box>
      <Box
        className={`sources-of-delay-page-grid ${globalStyles.threeColumns}}`}
      >
        {/* <TargetWip
          data={data?.targetWip}
          isLoading={isLoading}
          isEmpty={isEmpty}
          widgetInfo={widgetInformation?.wipExcess}
        /> */}
        <DelayedItemsWrapper {...props} />
        <DiscardedBeforeStartWrapper {...props} />
        <DiscardedAfterStartWrapper {...props} />
        {/* 
          keep this empty component to mimic 
          even distribution of widgets to prevent
          Flow Debt moving on first row
        */}
        <Box width="268px">&nbsp;</Box>
        <FlowDebtWrapper {...props} />
        <StaleWorkWrapper {...props} />
        <BlockersWrapper {...props} />
        <KeySourcesOfDelayWrapper {...props} />
      </Box>
    </Box>
  );
};

export default SourcesOfDelayAndWasteAccordion;
