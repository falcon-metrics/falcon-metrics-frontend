import useFilterPanelContext from "views/Dashboard/views/Platform/views/FilterPanel/contexts/FilterPanelContext";
import { useRunChartData } from "../../hooks/useRunChartData";
import WorkCompletionThroughputAnalytics from "./RunChartSection";
import { useTimeDistributionData } from "../../hooks/useTimeDistributionData";

type Props = {
  isDashboardEdit?: boolean;
  isWidgetPreview?: boolean;
};

const RunChartWrapper = ({ isDashboardEdit, isWidgetPreview }: Props) => {
  const {
    appliedFilters,
    selectedFilters,
    apiQueryParameters,
  } = useFilterPanelContext();

  const perspective = selectedFilters["perspective"] ?? "board";

  const {
    runChartData,
    runChartWidgetInfo,
    isValidating: isValidatingRunChart,
  } = useRunChartData(appliedFilters, apiQueryParameters);

  const {
    data: timeDistributionData,
    histogramWidgetInfo,
    scatterplotWidgetInfo,
    isValidating: isValidatingTimeDistribution,
  } = useTimeDistributionData(appliedFilters, apiQueryParameters, false);

  return (
    <WorkCompletionThroughputAnalytics
      isDashboardEdit={isDashboardEdit}
      isWidgetPreview={isWidgetPreview}
      timeDistributionProps={{
        data: timeDistributionData,
        isValidatingTimeDistribution: isValidatingTimeDistribution,
        perspective,
        histogramWidgetInfo,
        scatterplotWidgetInfo,
        apiQueryParameters,
      }}
      runChartProps={{
        perspective,
        data: runChartData,
        isValidatingRunChart: isValidatingRunChart,
        widgetInfo: runChartWidgetInfo,
      }}
      displayTimeDistribution={false}
    />
    // <Box className={globalStyles.groupContainer}>
    //   {/*
    //     This accordion contains both the Run Chart and Throughput Analysis widgets.
    //     These widgets were separate before. But we changed the design
    //     to combine the two accordions
    //   */}
    //   <BaseAccordionWithData
    //     title={getThroughputAnalyticsTitle(perspective)}
    //     Component={WorkCompletionThroughputAnalytics}
    //     defaultExpanded={isRunChartExpanded}
    //     customProps={{
    //       runChartProps: {
    //         perspective,
    //         data: runChartData,
    //         isValidatingRunChart: shouldFetchRunChart ? isValidatingRunChart : isValidatingServiceLevel,
    //         widgetInfo: runChartWidgetInfo,
    //       },
    //       timeDistributionProps: {
    //         data: timeDistributionData,
    //         isValidatingTimeDistribution: shouldFetchTimeDistribution ? isValidatingTimeDistribution : isValidatingServiceLevel,
    //         perspective,
    //         histogramWidgetInfo,
    //         scatterplotWidgetInfo,
    //         apiQueryParameters
    //       }
    //     }}
    //     afterOpen={() => {
    //       setEnableFetchRunChart(true);
    //       setRunChartExpanded(true);
    //       setEnableFetchTimeDistribution(true);
    //     }}
    //     afterClose={() => {
    //       setRunChartExpanded(false);
    //     }}
    //   />
    // </Box>
  );
};

export default RunChartWrapper;
