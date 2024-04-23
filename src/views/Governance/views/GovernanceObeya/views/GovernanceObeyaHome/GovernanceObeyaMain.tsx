import Box from "@material-ui/core/Box";
import React, { memo, useCallback } from "react";

import DashboardCard from "components/Charts/components/DashboardCard/DashboardCard";
import { useValueStreamManagementStyles } from "views/ValueStreamManagement/ValueStreamManagement.styles";
import { BaseAccordionWithData } from "views/ValueStreamManagement/components/BaseAccordionWithData";
import SpinnerFullSize from "components/SpinnerFullSize";
import FluentUIToolTip from "components/UI/FluentUI/InfoIconWithTooltip/InfoIconWithTooltip";
import Highlights from "./views/Highlights";
import Objectives from "./views/Objectives";
import SkeletonLoader from "./views/Roadmap/components/SkeletonLoader/SkeletonLoader";
import { useObeyaRoom } from "../../hooks/useObeyaRoom";

const LazyScope = React.lazy(() => import("./views/Workflow"));
const LazyProgress = React.lazy(() => import("./views/Progress"));
const LazyRoadmap = React.lazy(() => import("./views/Roadmap"));
const LazyPredictiveAnalysis = React.lazy(
  () => import("./views/PredictiveAnalysis")
);
const LazyFocus = React.lazy(() => import("./views/Focus"));
const LazyScopeBurn = React.lazy(() => import("./views/ScopeBurn"));
const LazyRisksAndDependencies = React.lazy(
  () => import("./views/RisksAndDependencies/RisksAndDependencies")
);
const LazyRelationships = React.lazy(() => import("./views/Relationships"));
const LazyFitnessCriteria = React.lazy(() => import("./views/FitnessCriteria"));

const ObeyaMainPage = () => {
  const globalStyles = useValueStreamManagementStyles();

  const {
    data: obeyaRoomData,
    isLoadingObeyaData,
    activeObeyaRoomId: obeyaRoomId,
    activeRoom,
  } = useObeyaRoom();

  const {
    obeyaRoom,
    scopeBoards,
    highlights,
    progressBoards,
    individualContributors,
    predictiveAnalysis,
    forecastingSettings,
    roadmapResult,
    burnData,
    focus,
    flowMetrics,
  } = obeyaRoomData;

  const renderProgress = useCallback(
    () => (
      <React.Suspense fallback={<SpinnerComponent />}>
        <LazyProgress
          individualContributors={individualContributors}
          progressBoards={progressBoards}
          isLoadingObeyaData={isLoadingObeyaData}
        />
      </React.Suspense>
    ),
    [individualContributors, progressBoards, isLoadingObeyaData]
  );

  const renderScope = useCallback(
    () => (
      <React.Suspense fallback={<SpinnerComponent />}>
        <LazyScope
          scopeBoards={scopeBoards}
          objectives={obeyaRoomData.objectives}
          isLoadingObeyaData={isLoadingObeyaData}
        />
      </React.Suspense>
    ),
    [scopeBoards, obeyaRoomData.objectives, isLoadingObeyaData]
  );

  const renderRoadmap = useCallback(
    () => (
      <React.Suspense fallback={<SkeletonLoader />}>
        <LazyRoadmap
          obeyaRoomId={obeyaRoomId || undefined}
          obeyaObjectives={obeyaRoomData.objectives}
          roadmapResult={roadmapResult}
          initiativeStart={obeyaRoom.beginDate}
          initiativeEnd={obeyaRoom.endDate}
        />
      </React.Suspense>
    ),
    [obeyaRoomId, obeyaRoomData.objectives, roadmapResult, obeyaRoom]
  );

  const renderPredictiveAnalysis = useCallback(
    () => (
      <React.Suspense fallback={<SpinnerComponent />}>
        <LazyPredictiveAnalysis
          obeyaRoomId={obeyaRoomId || undefined}
          predictiveAnalysis={predictiveAnalysis}
          progressBoards={progressBoards}
          forecastingSettings={forecastingSettings}
          isLoadingObeyaData={isLoadingObeyaData}
          focus={focus}
        />
      </React.Suspense>
    ),
    [
      obeyaRoomId,
      predictiveAnalysis,
      progressBoards,
      forecastingSettings,
      focus,
      isLoadingObeyaData,
    ]
  );

  const renderFocus = useCallback(
    () => (
      <React.Suspense fallback={<SpinnerComponent />}>
        <LazyFocus focus={focus} isLoadingObeyaData={isLoadingObeyaData} />
      </React.Suspense>
    ),
    [obeyaRoomId, isLoadingObeyaData, focus]
  );

  const renderScopeBurn = useCallback(
    () => (
      <React.Suspense fallback={<SpinnerComponent />}>
        <LazyScopeBurn
          isLoadingObeyaData={isLoadingObeyaData}
          burnData={burnData}
        />
      </React.Suspense>
    ),
    [isLoadingObeyaData, burnData]
  );

  const renderRisksAndDependencies = useCallback(
    () => (
      <React.Suspense fallback={<SpinnerComponent />}>
        <LazyRisksAndDependencies obeyaRoomId={obeyaRoomId || undefined} />
      </React.Suspense>
    ),
    [obeyaRoomId]
  );

  const renderRelationships = useCallback(
    () => (
      <React.Suspense fallback={<SpinnerComponent />}>
        <LazyRelationships
          obeyaRoomId={obeyaRoomId ?? ""}
          obeyaRoomName={activeRoom.roomName ?? ""}
        />
      </React.Suspense>
    ),
    [obeyaRoomId, activeRoom.roomName]
  );

  const renderFitnessCriteria = useCallback(
    () => (
      <React.Suspense fallback={<SpinnerComponent />}>
        <LazyFitnessCriteria
          flowMetrics={flowMetrics}
          isLoadingObeyaData={isLoadingObeyaData}
        />
      </React.Suspense>
    ),
    [flowMetrics, isLoadingObeyaData, obeyaRoomId]
  );

  const customStyle = { justifyContent: "center" };

  return (
    <Box className={globalStyles.generalContainer}>
      {isLoadingObeyaData && !obeyaRoomData ? (
        <SpinnerFullSize />
      ) : (
        <div>
          <Box className={globalStyles.groupContainer}>
            <Box
              className="obeya-container charts-page-grid"
              style={{ gridTemplateColumns: "repeat(2, 1fr)" }}
            >
              <DashboardCard title={"Objectives"} fullScreen={true}>
                {/* No need to be lazy loaded */}
                <Objectives />
              </DashboardCard>
              <DashboardCard title={"Highlights"} fullScreen={true}>
                {/* No need to be lazy loaded */}
                <Highlights
                  highlights={highlights}
                  objectives={obeyaRoomData.objectives}
                  progressBoards={progressBoards}
                  activeRoom={activeRoom}
                />
              </DashboardCard>
            </Box>
          </Box>

          <Box className={globalStyles.groupContainer}>
            <BaseAccordionWithData
              title="Progress"
              Component={() => renderProgress()}
              customStyle={customStyle}
            />
          </Box>

          <Box className={globalStyles.groupContainer}>
            <BaseAccordionWithData
              title="Scope"
              Component={() => renderScope()}
              defaultExpanded={false}
              customStyle={customStyle}
            />
          </Box>

          <Box className={globalStyles.groupContainer}>
            <BaseAccordionWithData
              title="Roadmap"
              Component={() => renderRoadmap()}
              badgeType="BETA"
              defaultExpanded={false}
            />
          </Box>

          <Box className={globalStyles.groupContainer}>
            <BaseAccordionWithData
              title="Focus"
              Component={() => renderFocus()}
              badgeType="BETA"
              defaultExpanded={false}
              customStyle={customStyle}
            />
          </Box>

          <Box className={globalStyles.groupContainer}>
            <BaseAccordionWithData
              title="Predictive Analysis"
              Component={() => renderPredictiveAnalysis()}
              defaultExpanded={false}
              customStyle={customStyle}
            />
          </Box>

          <Box className={globalStyles.groupContainer}>
            <BaseAccordionWithData
              title="Remaining Work"
              Component={() => renderScopeBurn()}
              tooltip={<FluentUIToolTip contentId="scope-burn" />}
              defaultExpanded={false}
              customStyle={customStyle}
            />
          </Box>

          <Box className={globalStyles.groupContainer}>
            <BaseAccordionWithData
              title="Risks & Dependencies"
              Component={() => renderRisksAndDependencies()}
              customProps={{
                obeyaRoomId,
              }}
              customStyle={customStyle}
            />
          </Box>

          <Box className={globalStyles.groupContainer}>
            <BaseAccordionWithData
              title="Links"
              Component={() => renderRelationships()}
              customProps={{
                obeyaRoomId,
                obeyaRoomName: activeRoom.roomName || "",
              }}
              customStyle={customStyle}
            />
          </Box>

          <Box className={globalStyles.groupContainer}>
            <BaseAccordionWithData
              title="Flow Metrics"
              Component={() => renderFitnessCriteria()}
              badgeType="BETA"
            />
          </Box>

          {/* Add space between the last accordion and the footer */}
          <div style={{ paddingBottom: 10 }} />
        </div>
      )}
    </Box>
  );
};

export const SpinnerComponent = () => (
  <Box display="flex" justifyContent="center" alignContent="center">
    <SpinnerFullSize />
  </Box>
);

export default memo(ObeyaMainPage);
