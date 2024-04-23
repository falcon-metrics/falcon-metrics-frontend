import useFilterPanelContext from "views/Dashboard/views/Platform/views/FilterPanel/contexts/FilterPanelContext";
import useNormalizationColors from "hooks/fetch/useNormalizationColors";
import NormalisationChartsAccordion from "./NormalisationChartsAccordion";
import { NormalisationChartsData } from "../../interfaces/normalisationCharts";

type Props = {
  isDashboardEdit?: boolean;
  isWidgetPreview?: boolean;
  data: {
    normalisationChartsData: NormalisationChartsData | null;
    normalisationChartsError: any;
    normalisationChartsEmpty: any;
    normalisationChartsOptions: any;
    normalisationChartsOptionsError: any;
    normalisationChartTag: string;
    setNormalisationChartTag: any;
  };
  isDashboard?: boolean;
};

const NormalisationChartsWrapper = ({
  isDashboardEdit,
  isWidgetPreview,
  data,
  isDashboard
}: Props) => {

  const { apiQueryParameters } = useFilterPanelContext();
  const currentDataAggregation =
    apiQueryParameters?.currentDataAggregation?.toLowerCase() || "weeks";


  const { getColorByDisplayName, isValidating } = useNormalizationColors();

  return (
    <NormalisationChartsAccordion
      isLoading={false}
      error={data.normalisationChartsError ?? data.normalisationChartsOptionsError}
      data={data.normalisationChartsData}
      currentDataAggregation={currentDataAggregation}
      normalisationChartTag={data.normalisationChartTag}
      getColorByDisplayName={getColorByDisplayName}
      isEmpty={data.normalisationChartsEmpty}
      isValidating={isValidating}
      normalisationChartsOptions={data.normalisationChartsOptions}
      setNormalisationChartTag={data.setNormalisationChartTag}
      isWidgetPreview={isWidgetPreview}
      isDashboardEdit={isDashboardEdit}
      isDashboard={isDashboard}
    />

    // <Box className={globalStyles.groupContainer}>
    //   <BaseAccordionWithData
    //     title="Work Overview"
    //     Component={NormalisationChartsAccordion}
    //     defaultExpanded={true}
    //     customProps={{
    //       data: normalisationChartsData,
    //       error: normalisationChartsError ?? normalisationChartsOptionsError,
    //       isLoading: shouldFetchNormalisationCharts
    //         ? isLoadingNormalisationCharts
    //         : true,
    //       currentDataAggregation,
    //       isEmpty: normalisationChartsEmpty,
    //       normalisationChartsOptions: normalisationChartsOptions,
    //       normalisationChartTag: normalisationChartTag,
    //       setNormalisationChartTag,
    //       getColorByDisplayName,
    //       isValidating,
    //     }}
    //     afterOpen={() => {
    //       if (!shouldFetchNormalisationCharts) {
    //         setEnableFetchDemandDistribution(true);
    //       }
    //       updateNormalisationChartsOptions();
    //     }}
    //   />
    // </Box>
  );
};

export default NormalisationChartsWrapper;
