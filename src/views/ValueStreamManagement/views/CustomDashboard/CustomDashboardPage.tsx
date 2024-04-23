import { useEffect } from "react";
import Box from "@material-ui/core/Box";

import useSharedState from "hooks/useSharedState";

import { useValueStreamManagementStyles } from "../../ValueStreamManagement.styles";
import CustomDashboard from "./CustomDashboard";

const CustomDashboardPage = () => {
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

  return (
    <Box className={globalStyles.pageContainer}>
      <Box className={globalStyles.groupContainer}>
        <CustomDashboard />
      </Box>
    </Box>
  );
};

export default CustomDashboardPage;
