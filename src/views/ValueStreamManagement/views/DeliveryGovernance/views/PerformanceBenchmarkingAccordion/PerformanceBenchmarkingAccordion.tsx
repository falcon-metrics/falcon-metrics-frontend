import Box from "@material-ui/core/Box";
import DashboardCard from "components/Charts/components/DashboardCard/DashboardCard";
import { ChartSizes } from "components/Charts/components/DashboardCard/interfaces/ChartSizes";
import { SelectedContextIdContext } from "components/UserStateProvider/UserStateProvider";
import { useContext, useEffect, useState } from "react";
import useDashboardContexts from "views/Dashboard/views/AnalyticsDashboard/hooks/useDashboardContexts";
import { useCheckpoints } from "views/Settings/components/PerformanceCheckPoints/hooks/useCheckpoints";
import FlowItemsTableSkeleton from "views/ValueStreamManagement/views/DeliveryManagement/views/AnalyticsView/views/FlowUnitsSection/components/FlowItemsTableSkeleton/FlowItemsTableSkeleton";
import { getChildren } from "../../../../../../views/Dashboard/views/Platform/views/Header/views/ContextNavigation/ContextNavigation";
import { usePerformanceBenchmark } from "../PerformanceCheckpointAccordion/usePerformanceBenchmarkData";
import CheckpointSelection from "./components/CheckpointSelection";
import FlowBasedMetricsGrid from "./components/FlowBasedMetrics/FlowBasedMetricsGrid";
import IndustryAnalysisModal from "./components/IndustryAnalysisModal";
import { DateTime } from "luxon";
import { DEFAULT_DATE_FORMAT } from "utils/dateTime";
import BaseModal from "components/UI/BaseModal/BaseModal2";
import useFilterPanelContext from "views/Dashboard/views/Platform/views/FilterPanel/contexts/FilterPanelContext";
import { useFlowItemsData } from "views/ValueStreamManagement/views/DeliveryManagement/views/AnalyticsView/hooks/useFlowItemsData";
import FlowItemsSection from "views/ValueStreamManagement/views/DeliveryManagement/views/AnalyticsView/views/FlowUnitsSection/FlowItemsSection";
import { Tab, Tabs, Typography } from "@material-ui/core";
import _ from "lodash";
import useStyles from "./styles";

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const PerformanceBenchmarkingAccordion = () => {
  const classes = useStyles();
  const { contexts } = useDashboardContexts();
  const { data: checkpoints, isLoadingCheckpoints } = useCheckpoints();
  const [selectedCheckpoint, setSelectedCheckpoint] = useState<string | undefined>(checkpoints[0]?.id?.toString());
  const [selectedContext, setSelectedContext] = useState<string>('');
  const [openFlowItemsModal, setOpenFlowItemsModal] = useState<boolean>(false);
  const [showSimplifiedView, setShowSimplifiedView] = useState<boolean>(false);
  const [selectedTab, setSelectedTab] = useState<number>(0);

  const {
    appliedFilters,
    apiQueryParameters,
  } = useFilterPanelContext();

  const selectedCheckpointItem = checkpoints.find(c => c.id?.toString() === selectedCheckpoint);
  let startDate: any = selectedCheckpointItem?.start_date;
  startDate = typeof startDate === 'string' ? DateTime.fromISO(startDate) : '';
  let endDate: any = selectedCheckpointItem?.end_date;
  endDate = typeof endDate === 'string' ? DateTime.fromISO(endDate) : '';
  const dateString = typeof startDate === 'object' && typeof endDate === 'object' ? startDate.toFormat(DEFAULT_DATE_FORMAT) + ' - ' + endDate.toFormat(DEFAULT_DATE_FORMAT) : '';

  const modifiedFilters = { ...appliedFilters, ...{ contextId: selectedContext } };
  const modifiedQueryParameters = { ...apiQueryParameters, ...{ contextId: selectedContext } };
  if (startDate) {
    modifiedFilters.departureDateLowerBoundary = startDate.toJSDate();
    modifiedQueryParameters.departureDateLowerBoundary = startDate.toJSDate();
  }
  if (endDate) {
    modifiedFilters.departureDateUpperBoundary = endDate.toJSDate();
    modifiedQueryParameters.departureDateUpperBoundary = endDate.toJSDate();
  }
  const {
    flowItems: pastFlowItems,
    flowItemsWidgetInfo,
    isValidating: pastFlowItemsValidating
  } = useFlowItemsData({ ...modifiedFilters, ...{ perspective: 'past' } }, { ...modifiedQueryParameters, ...{ perspective: 'past' } }, !openFlowItemsModal);

  const {
    flowItems: presentFlowItems,
    isValidating: presentFlowItemsValidating
  } = useFlowItemsData({ ...modifiedFilters, ...{ perspective: 'present' } }, { ...modifiedQueryParameters, ...{ perspective: 'present' } }, !openFlowItemsModal);

  const {
    flowItems: futureFlowItems,
    isValidating: futureFlowItemsValidating
  } = useFlowItemsData({ ...modifiedFilters, ...{ perspective: 'future' } }, { ...modifiedQueryParameters, ...{ perspective: 'future' } }, !openFlowItemsModal);

  const perspectives = ['past', 'present', 'future'];
  const items = [pastFlowItems, presentFlowItems, futureFlowItems];
  const isValidating = [pastFlowItemsValidating, presentFlowItemsValidating, futureFlowItemsValidating];
  useEffect(() => {
    if (checkpoints[0]?.id !== undefined) {
      setSelectedCheckpoint(checkpoints[0]?.id?.toString());
    }
  }, [checkpoints]);

  const { contextId } = useContext(SelectedContextIdContext);
  const children = getChildren(contextId, contexts ?? []);
  // TODO: Uncomment this to pass this data down to the table
  const { rows, isLoading } = usePerformanceBenchmark(
    children ?? [],
    checkpoints
  );
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
  const [isOpenIndustryModal, setIndustryModal] = useState<boolean>(false);

  const handleCheckpointChange = (checkpointId: string) => {
    setSelectedCheckpoint(checkpointId);
  };

  const handleOpenFlowItemsModal = (contextId) => {
    setSelectedContext(contextId);
    setOpenFlowItemsModal(true);
  };

  const handleChange = (event: any, newValue: number) => {
    setSelectedTab(newValue);
  };
  return (
    <Box display="flex" flexDirection="column" flexGrow={1}>
      <DashboardCard
        key="checkpoints-table"
        title=""
        size={ChartSizes.full}
        fullScreen={true}
        useModalOpenProps={true}
        isModalOpenProps={isFullScreen}
        setIsModalOpenProps={setIsFullScreen}
      >
        <IndustryAnalysisModal
          onClick={setIndustryModal}
          isOpenIndustryModal={isOpenIndustryModal}
        />
        <Box>
          <CheckpointSelection
            checkpoints={checkpoints}
            handleSelectCheckpoint={handleCheckpointChange}
            dateString={dateString}
            showSimplifiedView={showSimplifiedView}
            setShowSimplifiedView={setShowSimplifiedView}
          />
        </Box>
        <Box justifyContent={"center"}>
          {(isLoading || isLoadingCheckpoints) ? (
            <FlowItemsTableSkeleton />
          ) : (
            <FlowBasedMetricsGrid rows={rows ?? []} selectedCheckpointId={selectedCheckpoint ?? ''} showSimplifiedView={showSimplifiedView} openFlowItemsModal={handleOpenFlowItemsModal} />
          )}
        </Box>
      </DashboardCard>
      <BaseModal
        open={openFlowItemsModal}
        setOpen={setOpenFlowItemsModal}
        maxWidth="lg"
        title={contexts?.find(context => context.id === selectedContext)?.displayName || ''}
        disableBackdropClick
        disableEscKeyDown
      >
        <Typography style={{ fontSize: 18, fontWeight: 600, padding: 10 }}>Individual Contributors</Typography>
        <Box style={{
          fontSize: 14,
          fontFamily: 'Open Sans',
          marginBottom: 20,
          padding: 20
        }}>
          {Object.entries(_.groupBy([...pastFlowItems, ...presentFlowItems, ...futureFlowItems], 'assignedTo')).map(key => {
            const [k, v] = key;
            return <Box style={{ marginBottom: 10 }} key={k}><strong>{k || 'Unassigned'}</strong> : {v.length} items </Box>;
          })}
        </Box>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={selectedTab} onChange={handleChange} aria-label="basic tabs example">
            <Tab classes={{
              selected: classes.selectedTab
            }} label="Completed items" {...a11yProps(0)} />
            <Tab classes={{
              selected: classes.selectedTab
            }} label="In progress items" {...a11yProps(1)} />
            <Tab classes={{
              selected: classes.selectedTab
            }} label="Upcoming items" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <Box style={{ marginTop: 30 }}>
          <FlowItemsSection
            perspective={perspectives[selectedTab]}
            flowItems={items[selectedTab]}
            isValidating={isValidating[selectedTab]}
            widgetInfo={flowItemsWidgetInfo}
          />
        </Box>
      </BaseModal>
    </Box>
  );
};

export default PerformanceBenchmarkingAccordion;
