import { useCallback, useEffect, useState } from "react";
import Box from "@material-ui/core/Box";

import { ApiQueryParameters } from "core/api/ApiClient/ApiClient";
import { BaseAccordionWithData } from "views/ValueStreamManagement/components/BaseAccordionWithData";
import { AppliedFilters } from "views/Dashboard/views/Platform/views/FilterPanel/contexts/FilterPanelContext/useFilterPanelContext";
import NoDataPanel from "views/ValueStreamManagement/components/NoDataPanel";

import { useValueStreamManagementStyles } from "../../../../ValueStreamManagement.styles";

import ServiceLevelSection from "./views/ServiceLevelSection/ServiceLevelSection";
import FlowItemsSection from "./views/FlowUnitsSection/FlowItemsSection";
import WorkCompletionThroughputAnalytics from "./views/RunChartSection/RunChartSection";

import { useServiceLevelData } from "./hooks/useServiceLevelData";
import { useRunChartData } from "./hooks/useRunChartData";
import { useFlowItemsData } from "./hooks/useFlowItemsData";
import { useProfileOfWorkData } from "./hooks/useProfileOfWorkData";
import { useTimeDistributionData } from "./hooks/useTimeDistributionData";
import ProfileOfWork from "./views/ProfileOfWorkSection/ProfileOfWorkSection";

const isDevelopmentEnv = process.env.NODE_ENV === "development";

export interface AnalyticsViewProps {
  appliedFilters: AppliedFilters;
  apiQueryParameters: ApiQueryParameters;
  perspective: string;
}

export const getThroughputAnalyticsTitle = (perspective: string): string => {
  // Titles
  const PAST_TITLE = "Work Completion & Throughput Analytics";
  const PRESENT_TITLE = "Work in Progress Analytics";
  const FUTURE_TITLE = "Upcoming Work Analytics";
  switch (perspective) {
    case "past":
      return PAST_TITLE;
    case "present":
      return PRESENT_TITLE;
    case "future":
      return FUTURE_TITLE;
    default:
      return PAST_TITLE; // Fallback for invalid perspective
  }
};

const getProfileOfWorkTitle = (perspective: string): string => {
  let title = "Summary - ";

  switch (perspective) {
    case "past":
      title += "Completed Work";
      break;
    case "present":
      title += "Work in Progress";
      break;
    case "future":
      title += "Upcoming Work";
      break;
    default:
      title += "Completed Work";
  }

  return title;
};

export const getDetailedReportTitle = (perspective: string): string => {
  // Titles
  const PAST_TITLE = "Completed Work Detailed Report";
  const PRESENT_TITLE = "Work in Progress Detailed Report";
  const FUTURE_TITLE = "Upcoming Work Detailed Report";

  switch (perspective) {
    case "past":
      return PAST_TITLE;
    case "present":
      return PRESENT_TITLE;
    case "future":
      return FUTURE_TITLE;
    default:
      return "Detailed Report"; // Fallback for invalid perspective
  }
};

const AnalyticsView = ({
  appliedFilters,
  apiQueryParameters,
  perspective,
}: AnalyticsViewProps) => {
  const currentDataAggregation =
    apiQueryParameters?.currentDataAggregation?.toLowerCase() || "weeks";

  // Accordion Expansion Behavior
  const [isFlowLensExpanded, setFlowLensExpanded] = useState(true);
  const [isFlowItemsExpanded, setFlowItemsExpanded] = useState(false);
  const [isRunChartExpanded, setRunChartExpanded] = useState(false);
  const [isProfileOfWorkExpanded, setProfileOfWorkExpanded] = useState(false);

  // Data Loading Behavior
  const [shouldFetchRunChart, setEnableFetchRunChart] = useState(false);
  const [shouldFetchFlowItems, setEnableFetchFlowItems] = useState(false);
  const [shouldFetchProfileOfWork, setEnableFetchProfileOfWork] = useState(
    false
  );
  const [
    shouldFetchTimeDistribution,
    setEnableFetchTimeDistribution,
  ] = useState(false);

  // Data Retrieval Hooks
  const {
    serviceLevelData,
    serviceLevelWidgetInfo,
    isValidating: isValidatingServiceLevel,
    isEmpty: isServiceLevelEmpty,
    update: updateServiceLevel,
  } = useServiceLevelData(appliedFilters, apiQueryParameters);

  const {
    flowItems,
    flowItemsWidgetInfo,
    isValidating: isValidatingFlowItems,
    isEmpty: isFlowItemsEmpty,
    update: updateFlowItems,
    error: flowItemError,
  } = useFlowItemsData(
    appliedFilters,
    apiQueryParameters,
    shouldFetchFlowItems ? !shouldFetchFlowItems : isValidatingServiceLevel
  );

  const {
    runChartData,
    runChartWidgetInfo,
    isValidating: isValidatingRunChart,
    isEmpty: isRunChartEmpty,
    update: updateRunChart,
  } = useRunChartData(
    appliedFilters,
    apiQueryParameters,
    shouldFetchRunChart ? !shouldFetchRunChart : isValidatingServiceLevel
  );

  const {
    data: timeDistributionData,
    histogramWidgetInfo,
    scatterplotWidgetInfo,
    isValidating: isValidatingTimeDistribution,
    isEmpty: isTimeDistributionEmpty,
    update: updateTimeDistribution,
  } = useTimeDistributionData(
    appliedFilters,
    apiQueryParameters,
    shouldFetchTimeDistribution
      ? !shouldFetchTimeDistribution
      : isValidatingServiceLevel
  );

  const {
    profileOfWorkData,
    isValidating: isValidatingProfileOfWork,
    isEmpty: isProfileOfWorkEmpty,
    update: updateProfileOfWork,
  } = useProfileOfWorkData(
    appliedFilters,
    apiQueryParameters,
    shouldFetchProfileOfWork
      ? !shouldFetchProfileOfWork
      : isValidatingServiceLevel
  );

  // Allow developer to update accordion data at will with digit keys
  if (isDevelopmentEnv) {
    const onKeyUp = useCallback(
      function (event) {
        if (event.code === "Digit1" && !isValidatingServiceLevel) {
          updateServiceLevel();
        } else if (event.code === "Digit2" && !isValidatingFlowItems) {
          updateFlowItems();
        } else if (event.code === "Digit3" && !isValidatingRunChart) {
          updateRunChart();
        } else if (event.code === "Digit4" && !isValidatingTimeDistribution) {
          updateTimeDistribution();
        } else if (event.code === "Digit5" && !isValidatingProfileOfWork) {
          updateProfileOfWork();
        }
      },
      [
        isValidatingServiceLevel,
        isValidatingFlowItems,
        isValidatingRunChart,
        isValidatingTimeDistribution,
        isValidatingProfileOfWork,
      ]
    );
    useEffect(() => {
      window.addEventListener("keyup", onKeyUp);
      return () => {
        window.removeEventListener("keyup", onKeyUp);
      };
    }, [
      isValidatingServiceLevel,
      isValidatingFlowItems,
      isValidatingRunChart,
      isValidatingTimeDistribution,
      isValidatingProfileOfWork,
    ]);
  }

  const globalStyles = useValueStreamManagementStyles();

  // Empty Data Behavior
  const emptyStatusFlags: boolean[] = [
    isServiceLevelEmpty,
    isFlowItemsEmpty,
    isRunChartEmpty,
    isTimeDistributionEmpty,
    isProfileOfWorkEmpty,
  ];

  const validationStatusFlags: boolean[] = [
    isValidatingServiceLevel,
    isValidatingFlowItems,
    isValidatingRunChart,
    isValidatingTimeDistribution,
    isValidatingProfileOfWork,
  ];

  const isPageEmpty: boolean = emptyStatusFlags.every(
    (flag: boolean) => flag === true
  );
  const isNotValidating: boolean = validationStatusFlags.every(
    (flag: boolean) => flag === false
  );

  return (
    <Box className={globalStyles.generalContainer}>
      {isPageEmpty && isNotValidating ? (
        <Box className={globalStyles.noDataContainer}>
          <NoDataPanel />
        </Box>
      ) : (
        <>
          <Box className={globalStyles.groupContainer}>
            <BaseAccordionWithData
              title="Work Type Overview"
              Component={ServiceLevelSection}
              defaultExpanded={isFlowLensExpanded}
              customProps={{
                perspective,
                data: serviceLevelData,
                isValidating: isValidatingServiceLevel,
                widgetInfo: serviceLevelWidgetInfo,
              }}
              afterOpen={() => setFlowLensExpanded(true)}
              afterClose={() => setFlowLensExpanded(false)}
            />
          </Box>
          <Box className={globalStyles.groupContainer}>
            <BaseAccordionWithData
              title={getDetailedReportTitle(perspective)}
              Component={FlowItemsSection}
              defaultExpanded={isFlowItemsExpanded}
              customProps={{
                perspective,
                flowItems,
                isValidating: shouldFetchFlowItems
                  ? isValidatingFlowItems
                  : isValidatingServiceLevel,
                widgetInfo: flowItemsWidgetInfo,
                error: flowItemError,
              }}
              afterOpen={() => {
                setEnableFetchFlowItems(true);
                setFlowItemsExpanded(true);
              }}
              afterClose={() => setFlowItemsExpanded(false)}
            />
          </Box>
          <Box className={globalStyles.groupContainer}>
            {/*
                This accordion contains both the Run Chart and Throughput Analysis widgets. 
                These widgets were separate before. But we changed the design 
                to combine the two accordions
              */}
            <BaseAccordionWithData
              title={getThroughputAnalyticsTitle(perspective)}
              Component={WorkCompletionThroughputAnalytics}
              defaultExpanded={isRunChartExpanded}
              customProps={{
                runChartProps: {
                  perspective,
                  data: runChartData,
                  isValidatingRunChart: shouldFetchRunChart
                    ? isValidatingRunChart
                    : isValidatingServiceLevel,
                  widgetInfo: runChartWidgetInfo,
                },
                timeDistributionProps: {
                  data: timeDistributionData,
                  isValidatingTimeDistribution: shouldFetchTimeDistribution
                    ? isValidatingTimeDistribution
                    : isValidatingServiceLevel,
                  perspective,
                  histogramWidgetInfo,
                  scatterplotWidgetInfo,
                  apiQueryParameters,
                },
              }}
              afterOpen={() => {
                setEnableFetchRunChart(true);
                setRunChartExpanded(true);
                setEnableFetchTimeDistribution(true);
              }}
              afterClose={() => {
                setRunChartExpanded(false);
              }}
            />
          </Box>
          <Box className={globalStyles.groupContainer}>
            <BaseAccordionWithData
              title={getProfileOfWorkTitle(perspective)}
              Component={ProfileOfWork as any}
              customProps={{
                data: profileOfWorkData,
                isValidating: shouldFetchProfileOfWork
                  ? isValidatingProfileOfWork
                  : isValidatingServiceLevel,
                currentDataAggregation,
              }}
              defaultExpanded={isProfileOfWorkExpanded}
              afterOpen={() => {
                setEnableFetchProfileOfWork(true);
                setProfileOfWorkExpanded(true);
              }}
              afterClose={() => setProfileOfWorkExpanded(false)}
              customStyle={{ justifyContent: "center" }}
            />
          </Box>
        </>
      )}
    </Box>
  );
};

export default AnalyticsView;
