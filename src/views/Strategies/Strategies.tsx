import { AppBar, Box } from "@material-ui/core";

import StrategiesPage from "./views/StrategiesPage";
import { useValueStreamManagementStyles } from "views/ValueStreamManagement/ValueStreamManagement.styles";
import Footer from "views/Dashboard/views/Platform/views/Footer";

const Strategy = () => {
  const classes = useValueStreamManagementStyles();

  return (
    <>
      <AppBar
        position="sticky"
        classes={{
          root: classes.navigationSection,
          colorPrimary: classes.navigationSectionColor,
        }}
      ></AppBar>

      <Box
        style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <StrategiesPage />
        <Footer />
      </Box>
    </>
  );
};

export default Strategy;
