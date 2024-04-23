import BusinessScorecardPage from "./views";
import Footer from "views/Dashboard/views/Platform/views/Footer";
import { MetricsEntry, PerspectiveEntry } from "./interfaces/interfaces";
import { usePerspectives } from "./hooks/usePerspectives";
import { useMetrics } from "./hooks/useMetrics";
import { findContextById, getAllContextIdsUnderContext } from "./utils/utils";
import useDashboardContexts from "views/Dashboard/views/AnalyticsDashboard/hooks/useDashboardContexts";
import useFilterPanelContext from "views/Dashboard/views/Platform/views/FilterPanel/contexts/FilterPanelContext";
import _ from "lodash";
import { Box } from "@material-ui/core";
import { v4 as uuidV4 } from "uuid";
import ScorecardTable from "./components/ScorecardTable";
import SkeletonScorecard from "./components/SkeletonScorecard";
import TopBar from "views/LeanPortfolio/components/TopBar";

const colorPalette = ["#005E85", "#66C4EB", "#3392D3"];

const BusinessScorecard = () => {
  const { data: perspectivesData, isLoadingPerspectives } = usePerspectives();
  const {
    data: metricsData,
    isLoadingMetrics,
    mutate: mutateMetrics,
    updateMetrics,
  } = useMetrics();
  const { contexts } = useDashboardContexts();
  const {
    otherApiQueryParameters: { contextId },
  } = useFilterPanelContext();
  // const [tables, setTables] = useState<any>();

  const onSaveMetricSnapshot = async (
    formData: any,
    selectedMetric: MetricsEntry
  ) => {
    const metricsCopy = _.cloneDeep(metricsData || []);
    const metricSnapshot = { ...{ id: uuidV4() }, ...formData };
    if (selectedMetric) {
      const idx = metricsCopy.findIndex((i) => i.id === selectedMetric?.id);
      if (idx > -1) {
        if (metricsCopy[idx].metricValues) {
          metricsCopy[idx].metricValues.push(metricSnapshot);
        } else {
          metricsCopy[idx].metricValues = [metricSnapshot];
        }
        metricsCopy[idx].metricValues = metricsCopy[idx].metricValues.sort(
          (a, b) => {
            return (
              new Date(a.recordedDate || "").getTime() -
              new Date(b.recordedDate || "").getTime()
            );
          }
        );
      }
      mutateMetrics({ data: metricsCopy }, false);
      updateMetrics(metricsCopy, metricsData || []);
      return metricsCopy;
    }
  };

  const contextEntity = findContextById(contextId || "", contexts || []);
  let eligibleContextIds: string[] = [];
  if (contextEntity) {
    //Handle top level all context
    if (
      contextEntity.displayName === "All" &&
      (!contextEntity.children ||
        (contextEntity.children && contextEntity.children.length === 0))
    ) {
      contexts?.map((contextEntity) => {
        eligibleContextIds = eligibleContextIds.concat(
          _.uniq(getAllContextIdsUnderContext(contextEntity, []))
        );
      });
    } else {
      eligibleContextIds = _.uniq(
        getAllContextIdsUnderContext(contextEntity, [])
      );
    }
  }
  let newScorecardData: PerspectiveEntry[] = [];
  if (perspectivesData && metricsData) {
    newScorecardData = perspectivesData.map((i) => {
      const temp: PerspectiveEntry = {
        id: i.id,
        name: i.name,
        metrics: [],
      };
      return temp;
    });
    metricsData.forEach((metric) => {
      if (eligibleContextIds.includes(metric.context)) {
        const idx = newScorecardData.findIndex(
          (i) => i.id === metric.perspective
        );
        if (idx > -1) {
          newScorecardData[idx].metrics.push(_.cloneDeep(metric));
        }
      }
    });
  }
  newScorecardData = newScorecardData.filter((i) => i.metrics.length > 0);
  let componentToRender;
  if (newScorecardData.length > 0)
    componentToRender = (
      <Box style={{ flex: 1 }}>
        {newScorecardData.map((entry, index) => (
          <ScorecardTable
            contexts={contexts}
            scorecardData={entry}
            key={entry.id}
            color={colorPalette[index % 3]}
            onSaveMetricSnapshot={onSaveMetricSnapshot}
          />
        ))}
      </Box>
    );

  return (
    <Box
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      {" "}
      <TopBar showContext={true} />
      {isLoadingPerspectives || isLoadingMetrics ? (
        <SkeletonScorecard />
      ) : (
        <BusinessScorecardPage
          contexts={contexts}
          isEmpty={!(newScorecardData.length > 0)}
        >
          {componentToRender}
        </BusinessScorecardPage>
      )}
      <Footer />
    </Box>
  );
};

export default BusinessScorecard;
