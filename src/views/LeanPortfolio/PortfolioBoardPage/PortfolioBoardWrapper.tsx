import { Box } from "@material-ui/core";
import React, { memo, useCallback } from "react";
import { PortfolioBoardPageContextProvider, usePortfolioBoardPageContext } from "../contexts/PortfolioBoardPageContext";
import LoadingScreen from "components/LoadingScreen";
import Footer from "views/Dashboard/views/Platform/views/Footer";

const LazyPortfolioBoardAccordions = React.lazy(() => import("./PortfolioBoardAccordions"));

const PortfolioBoardWrapper = () => {
  const contextValues = usePortfolioBoardPageContext();
  const renderPortfolioBoardAccordions = useCallback(() => (
    <React.Suspense fallback={<SpinnerComponent />}>
      <LazyPortfolioBoardAccordions />
    </React.Suspense>

  ), [contextValues]);

  return (
    <PortfolioBoardPageContextProvider>
      <Box style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        {renderPortfolioBoardAccordions()}
        <Footer />
      </Box>
    </PortfolioBoardPageContextProvider>
  );
};

const SpinnerComponent = () => (
  <Box display="flex" justifyContent="center" alignContent="center">
    <LoadingScreen />
  </Box>
);

export default memo(PortfolioBoardWrapper);
