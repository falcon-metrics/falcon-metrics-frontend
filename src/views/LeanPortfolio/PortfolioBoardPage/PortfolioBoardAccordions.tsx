/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { memo, useCallback } from "react";
import { Box, Typography } from "@material-ui/core";
import { useValueStreamManagementStyles } from "views/ValueStreamManagement/ValueStreamManagement.styles";
import SkeletonLoader from "./Roadmap/components/SkeletonLoader";
import SpinnerFullSize from "components/SpinnerFullSize";
import DonutChartSkeleton from "views/ValueStreamManagement/views/DeliveryManagement/views/AnalyticsView/views/ProfileOfWorkSection/components/DonutChartSkeleton";
import { usePortfolioBoardPageContext } from "../contexts/PortfolioBoardPageContext";
import PortfolioBoard from "./PortfolioBoard";
import BaseAccordion from "views/Dashboard/views/AnalyticsDashboard/components/BaseAccordion";
import {
  AccordionKeys,
  BaseAccordionProvider,
} from "views/Dashboard/views/AnalyticsDashboard/components/BaseAccordion/BaseAccordionContext";
import TopBar from "../components/TopBar";

const LazyRoadmap = React.lazy(() => import("./Roadmap"));
const LazyPortfolioAnalysis = React.lazy(() => import("./PortfolioAnalysis"));

const PortfolioBoardAccordions = () => {
  const globalStyles = useValueStreamManagementStyles();

  const contextValues = usePortfolioBoardPageContext();

  const renderRoadmap = useCallback(
    () => (
      <React.Suspense fallback={<SkeletonLoader />}>
        <LazyRoadmap />
      </React.Suspense>
    ),
    [contextValues]
  );

  const renderPortfolioAnalysis = useCallback(
    () => (
      <React.Suspense fallback={<SpinnerComponent />}>
        <LazyPortfolioAnalysis />
      </React.Suspense>
    ),
    [contextValues]
  );

  const customStyle = { justifyContent: "center" };

  return (
    <BaseAccordionProvider>
      <TopBar
        showIncludeChildren={true}
        showContext={true}
        showChildren={contextValues.showChildren}
        setShowChildren={contextValues.setShowChildren}
      />

      <Box className={globalStyles.generalContainer}>
        {!contextValues.contextId && !contextValues.obeyaRoomData ? (
          <SpinnerFullSize />
        ) : (
          <div>
            <Box className={globalStyles.groupContainer}>
              <BaseAccordion
                id={AccordionKeys.PortfolioBoardKey}
                title="Portfolio Board"
                defaultExpanded={true}
              >
                <PortfolioBoard />
              </BaseAccordion>
            </Box>

            <Box className={globalStyles.groupContainer}>
              <BaseAccordion
                id={AccordionKeys.RoadmapKey}
                title="Roadmap"
                badgeType="BETA"
                defaultExpanded={false}
              >
                {/* {renderRoadmap()} */}
                <Box display="flex" width="100%" padding={16} justifyContent={"center"}>
                  <Typography
                    style={{
                      fontFamily: "Open Sans",
                      fontSize: 18,
                      color: "#8B9091",
                      textAlign: "center"
                    }}
                  >
                    This widget uses a licensed component. For more details, visit <br /><a href="https://bryntum.com/products/react-gantt-chart/">https://bryntum.com/products/react-gantt-chart/</a>
                  </Typography>
                </Box>
              </BaseAccordion>
            </Box>

            <Box className={globalStyles.groupContainer}>
              <BaseAccordion
                id={AccordionKeys.PortfolioAnalysisKey}
                title="Portfolio Analysis"
                badgeType="BETA"
                defaultExpanded={false}
                customStyle={customStyle}
              >
                {renderPortfolioAnalysis()}
              </BaseAccordion>
            </Box>
          </div>
        )}
      </Box>
    </BaseAccordionProvider>
  );
};

export const SpinnerComponent = () => (
  <Box display="flex" justifyContent="center" alignContent="center">
    <DonutChartSkeleton />
  </Box>
);

export default memo(PortfolioBoardAccordions);
