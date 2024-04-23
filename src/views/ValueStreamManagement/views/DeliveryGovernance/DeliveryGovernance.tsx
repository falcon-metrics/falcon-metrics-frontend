import { useCallback, useEffect, useMemo, useState } from "react";
import Box from "@material-ui/core/Box";

import useSharedState from "hooks/useSharedState";
import useFilterPanelContext from "views/Dashboard/views/Platform/views/FilterPanel/contexts/FilterPanelContext";
import { BaseAccordionWithData } from "views/ValueStreamManagement/components/BaseAccordionWithData";
import { useNormalisationChartsOptions as useNormalisationChartsOptions } from "views/ValueStreamManagement/views/DeliveryGovernance/hooks/useNormalisationChartsOptions";
import { useNormalisationCharts } from "views/ValueStreamManagement/views/DeliveryGovernance/hooks/useNormalisationCharts";
import { useFitnessCriteria } from "./hooks/useFitnessCriteria";

import { useValueStreamManagementStyles } from "../../ValueStreamManagement.styles";
import FitnessCriteriaAccordion from "./views/FitnessCriteriaAccordion/FitnessCriteriaAccordion";
import PerformanceCheckpointAccordion from "./views/PerformanceCheckpointAccordion/PerformanceCheckpointAccordion";
import PerformanceBenchmarkingAccordion from "./views/PerformanceBenchmarkingAccordion";
import NormalisationChartsAccordion from "./views/NormalisationChartsAccordion/NormalisationChartsAccordion";
import useNormalizationColors from "hooks/fetch/useNormalizationColors";
import ActionableInsightsAccordionContent from "../ContinuousImprovements/views/ActionableInsightsAccordionContent/ActionableInsightsAccordionContent";
import { useActionableInsightsData } from "../ContinuousImprovements/hooks/useActionableInsightsData";
import { useFlowAnalysisData } from "../ContinuousImprovements/hooks/useFlowAnalysisData";

// import NoDataPanel from "views/ValueStreamManagement/components/NoDataPanel";
// import { isFitnessCriteriaDataEmpty } from "./utils/validation/isFitnessCriteriaDataEmpty";

const isDevelopmentEnv = process.env.NODE_ENV === "development";

const DeliveryGovernance = () => {
  const globalStyles = useValueStreamManagementStyles();
  const [
    shouldFetchNormalisationCharts,
    setEnableFetchDemandDistribution,
  ] = useState(false);
  const [shouldFetchClassOfService, setEnableFetchClassOfService] = useState(
    false
  );

  const { apiQueryParameters } = useFilterPanelContext();
  const currentDataAggregation =
    apiQueryParameters?.currentDataAggregation?.toLowerCase() || "weeks";

  // Disable loading indicator on header by setting shared state to false
  const [sharedState, setSharedState] = useSharedState(
    "ANALYTICS_DASHBOARD_IS_LOADING"
  );
  useEffect(() => {
    if (sharedState) {
      setSharedState(false);
    }
  }, [sharedState]);

  const {
    data: fitnessCriteriaData,
    error: fitnessCriteriaError,
    isLoading: isLoadingFitnessCriteria,
    isEmptyData: fitnessCriteriaEmpty,
    update: updateFitnessCriteria,
  } = useFitnessCriteria(apiQueryParameters, false);

  const [normalisationChartTag, setNormalisationChartTag] = useState("demand");

  const {
    data: normalisationChartsData,
    error: normalisationChartsError,
    isEmptyData: normalisationChartsEmpty,
    isLoading: isLoadingNormalisationCharts,
    update: updateNormalisationCharts,
  } = useNormalisationCharts(
    apiQueryParameters,
    normalisationChartTag,
    !shouldFetchNormalisationCharts
  );

  const {
    data: normalisationChartsOptions,
    error: normalisationChartsOptionsError,
    isLoading: isLoadingNormalisationChartsOptions,
    update: updateNormalisationChartsOptions,
  } = useNormalisationChartsOptions(
    apiQueryParameters,
    !shouldFetchNormalisationCharts
  );

  // Allow developer to update accordion data at will with digit keys
  if (isDevelopmentEnv) {
    const onKeyUp = useCallback(
      function (event) {
        if (event.code === "Digit1" && !isLoadingFitnessCriteria) {
          updateFitnessCriteria();
        } else if (
          event.code === "Digit2" &&
          !isLoadingNormalisationCharts &&
          !isLoadingNormalisationChartsOptions
        ) {
          updateNormalisationCharts();
          updateNormalisationChartsOptions();
        }
      },
      [isLoadingFitnessCriteria, isLoadingNormalisationCharts]
    );
    useEffect(() => {
      window.addEventListener("keyup", onKeyUp);
      return () => {
        window.removeEventListener("keyup", onKeyUp);
      };
    }, [isLoadingFitnessCriteria, isLoadingNormalisationCharts]);
  }


  // Disable empty page for now. 
  // We might have to enable this later. That's why leaving this commented

  // const validationStatusFlags: boolean[] = [
  //   isLoadingFitnessCriteria,
  //   isLoadingNormalisationCharts,
  // ];

  // code here
  // const isPageEmpty: boolean = emptyStatusFlags.every(
  //   (flag: boolean) => flag === true
  // );

  // const isNotValidating: boolean = validationStatusFlags.every(
  //   (flag: boolean) => flag === false
  // );

  // Empty Data Behavior
  // const emptyStatusFlags: boolean[] = [
  //   fitnessCriteriaEmpty || isFitnessCriteriaDataEmpty(fitnessCriteriaData),
  // ];


  useEffect(() => {
    if (isLoadingFitnessCriteria === false) {
      if (!shouldFetchNormalisationCharts) {
        setEnableFetchDemandDistribution(true);
      }
      if (!shouldFetchClassOfService) {
        setEnableFetchClassOfService(true);
      }
    }
  }, [isLoadingFitnessCriteria]);

  const { getColorByDisplayName, isValidating } = useNormalizationColors();

  const [
    shouldFetchActionableInsights,
    setEnableFetchActionableInsights,
  ] = useState(false);

  const { appliedFilters } = useFilterPanelContext();

  const filters = useMemo(() => {
    return {
      ...appliedFilters,
      apiQueryParameters,
    };
  }, [appliedFilters, apiQueryParameters]);

  const { isLoading: isLoadingFlowAnalysis } = useFlowAnalysisData(
    false
  );

  const {
    data: actionableInsightsData,
    isLoading: isLoadingActionableInsights,
    error: actionableInsightsError,
    update: actionableInsightsUpdate,
  } = useActionableInsightsData(
    apiQueryParameters,
    !shouldFetchActionableInsights
  );

  return (
    <Box className={globalStyles.pageContainer}>
      <>
        <Box className={globalStyles.groupContainer}>
          <BaseAccordionWithData
            title="Fitness Criteria"
            Component={FitnessCriteriaAccordion}
            defaultExpanded={true}
            customProps={{
              data: fitnessCriteriaData,
              error: fitnessCriteriaError,
              isLoading: isLoadingFitnessCriteria,
              isEmpty: fitnessCriteriaEmpty,
              appliedFilters,
              apiQueryParameters,
            }}
          />
        </Box>
        <Box className={globalStyles.groupContainer}>
          <BaseAccordionWithData
            title="Work Overview"
            Component={NormalisationChartsAccordion}
            defaultExpanded={true}
            customProps={{
              data: normalisationChartsData,
              error:
                normalisationChartsError ?? normalisationChartsOptionsError,
              isLoading: shouldFetchNormalisationCharts
                ? isLoadingNormalisationCharts
                : true,
              currentDataAggregation,
              isEmpty: normalisationChartsEmpty,
              normalisationChartsOptions: normalisationChartsOptions,
              normalisationChartTag: normalisationChartTag,
              setNormalisationChartTag,
              getColorByDisplayName,
              isValidating,
            }}
            afterOpen={() => {
              if (!shouldFetchNormalisationCharts) {
                setEnableFetchDemandDistribution(true);
              }
              updateNormalisationChartsOptions();
            }}
          />
        </Box>
        <Box className={globalStyles.groupContainer}>
          <BaseAccordionWithData
            title="Performance Comparison by Time Phases"
            Component={PerformanceCheckpointAccordion}
            defaultExpanded={false}
            customProps={{
              apiQueryParameters,
              additionalProps: {
                errorMessages: [],
                seriesOrder: [],
              },
            }}
          />
        </Box>

        <Box className={globalStyles.groupContainer}>
          <BaseAccordionWithData
            title="Performance Comparison by Boards & Aggregations"
            Component={PerformanceBenchmarkingAccordion}
            defaultExpanded={false}
            customProps={{
              apiQueryParameters,
              additionalProps: {
                errorMessages: [],
                seriesOrder: [],
              },
            }}
          />
        </Box>

        <Box className={globalStyles.groupContainer}>
          <BaseAccordionWithData
            title="Actionable Insights"
            badgeType={"BETA"}
            Component={ActionableInsightsAccordionContent}
            customProps={{
              refresh: isDevelopmentEnv
                ? actionableInsightsUpdate
                : undefined,
              isLoading: shouldFetchActionableInsights
                ? isLoadingActionableInsights
                : isLoadingFlowAnalysis,
              data: actionableInsightsData,
              error: actionableInsightsError,
              showInsightsOnly: true,
              filters,
            }}
            afterOpen={() => {
              if (!shouldFetchActionableInsights) {
                setEnableFetchActionableInsights(true);
              }
            }}
            defaultExpanded={false}
          />
        </Box>
      </>
      {
        // Disable empty page for now. 
        // We might have to enable this later. That's why leaving this commented
        // code here

        /* 
        {isPageEmpty && isNotValidating
        ? (
          <Box className={globalStyles.noDataContainer}>
            <NoDataPanel />
          </Box>
        )
        : (
         
        )} 
        */
      }
    </Box>
  );
};

export default DeliveryGovernance;
