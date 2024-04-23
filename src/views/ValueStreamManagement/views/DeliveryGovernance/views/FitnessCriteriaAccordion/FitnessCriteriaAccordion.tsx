import { Box } from "@material-ui/core";
import { useValueStreamManagementStyles } from "views/ValueStreamManagement/ValueStreamManagement.styles";
import { FitnessCriteriaData } from "../../interfaces/fitnessCriteria";
import { AppliedFilters } from "views/Dashboard/views/Platform/views/FilterPanel/contexts/FilterPanelContext/useFilterPanelContext";
import { ApiQueryParameters } from "core/api/ApiClient/ApiClient";
import SpeedWrapper from "./components/Speed/SpeedWrapper";
import ServiceLevelExpectationWrapper from "./components/ServiceLevelExpectation/ServiceLevelExpectationWrapper";
import PredicabilityWrapper from "./components/Predicability/PredicabilityWrapper";
import ProductivityWrapper from "./components/Productivity/ProductivityWrapper";
import CustomerValueWrapper from "./components/CustomerValue/CustomerValueWrapper";
import FlowEfficiencyWrapper from "./components/FlowEfficiency/FlowEfficiencyWrapper";

const isDevelopmentEnv = process.env.NODE_ENV === "development";

type Props = {
  data?: FitnessCriteriaData;
  error?: Error;
  isLoading: boolean;
  isEmpty?: boolean;
  appliedFilters: AppliedFilters;
  apiQueryParameters: ApiQueryParameters;
  isObeya?: boolean;
};

const FitnessCriteriaAccordion = ({
  data,
  isLoading,
  error,
  isEmpty,
  appliedFilters,
  apiQueryParameters,
}: Props) => {
  const globalStyles = useValueStreamManagementStyles();

  //ERROR HANDLER
  if (error) {
    if (isDevelopmentEnv) {
      return (
        <Box
          display="flex"
          justifyContent="center"
          width="100%"
          padding="100px 0px"
        >
          <div style={{ color: "darkred" }}>Error: {error.message}</div>
        </Box>
      );
    }
    return (
      <Box
        display="flex"
        justifyContent="center"
        width="100%"
        padding="100px 0px"
      >
        <div style={{ color: "darkred" }}>
          There was an error while fetching data for this widget
        </div>
      </Box>
    );
  }

  const props = {
    data,
    appliedFilters,
    apiQueryParameters,
    error,
    isEmpty,
    isLoading,
  };

  return (
    <Box className={`fitness-criteria-page-grid ${globalStyles.threeColumns}}`}>
      <SpeedWrapper {...props} />
      <ServiceLevelExpectationWrapper {...props} />
      <PredicabilityWrapper {...props} />
      <ProductivityWrapper {...props} />
      <CustomerValueWrapper {...props} />
      <FlowEfficiencyWrapper {...props} />
    </Box>
  );
};

export default FitnessCriteriaAccordion;
