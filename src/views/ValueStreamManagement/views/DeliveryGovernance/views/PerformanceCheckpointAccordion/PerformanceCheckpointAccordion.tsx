import {
  useCallback,
  useEffect,
  useState,
} from 'react';
import DashboardCard
  from 'components/Charts/components/DashboardCard/DashboardCard';
import {
  ChartSizes,
} from 'components/Charts/components/DashboardCard/interfaces/ChartSizes';
import fetch, { useCustomSWR } from 'core/api/fetch';
import {
  AppliedFilters,
  useFilterPanelContext,
} from 'views/Dashboard/views/Platform/views/FilterPanel/contexts/FilterPanelContext/useFilterPanelContext';
import {
  getFilterUrlSearchParams,
} from 'views/Dashboard/views/Platform/views/FilterPanel/contexts/FilterPanelContext/utils';
import {
  useCheckpoints,
} from 'views/Settings/components/PerformanceCheckPoints/hooks/useCheckpoints';
import {
  CheckpointItem,
} from 'views/Settings/components/PerformanceCheckPoints/interfaces';
import Box from '@material-ui/core/Box';
import CheckboxSelection from './components/CheckboxSelection';
import ComparisonTable from './components/FlowBasedMetrics';
import PerspectiveSection from './components/PerspectiveSection';
import {
  CheckpointOption,
} from './interfaces';
import ExtendedTooltip from 'views/ValueStreamManagement/components/ExtendedTooltip';
import { sortByDate } from 'utils/dateTime';
import _ from 'lodash';
import { useMetrics } from 'views/Settings/components/PerformanceCheckPoints/views/Metrics/hooks/useMetrics';


export const useCheckpointsSnapshots = (appliedFilters: AppliedFilters, checkpointsOptions: CheckpointOption[]): {
  data: any[] | null;
  error: unknown;
  isLoading: boolean;
} => {
  const resource = '/checkpoints-snapshots';
  const checkpointsIds = checkpointsOptions.map(options => options.id).join(',');
  const queryParamsString = getFilterUrlSearchParams({
    ...appliedFilters,
    checkpointsSnapshots: checkpointsIds
  });
  const checkpointsSnapshotsFetcher = async (uri: string) =>
    fetch.get<{ checkpoints: any; }>(uri);
  const { data: response, error, isValidating } = useCustomSWR<any>(
    checkpointsIds ? `${resource}?${queryParamsString}` : null,
    checkpointsSnapshotsFetcher
  );

  const data = response ? response?.data?.checkpoints : null;

  return {
    data,
    error,
    isLoading: isValidating
  };
};


/**
   * When a new checkpoint view gets created, it takes 
   * a few mintues to load the snapshots
  */
const checkForMissingSnapshots = (checkpointViews: CheckpointOption[], checkpointsSnapshots: any[]) => {
  const viewIds = checkpointViews.map(c => c.id?.toString() ?? '');
  const snapshotIds = checkpointsSnapshots.map(c => c.checkpoints_view_id.toString());

  const isMissing = !(viewIds.every(id => snapshotIds.includes(id)));
  const missingIds = viewIds.filter(id => !snapshotIds.includes(id));
  const missingCheckpoints = checkpointViews.filter(c => missingIds.includes(c.id?.toString() ?? ''));

  return { isMissing, missingCheckpoints };
};

const PerformanceCheckpointAccordion = () => {
  const {
    appliedFilters,
    otherApiQueryParameters,
  } = useFilterPanelContext();

  // const [showAlert, setToggleAlert] = useState<boolean>(false);
  const { data: checkpoints, isLoadingCheckpoints, widgetInfo } = useCheckpoints();
  const { data, isLoadingMetrics, metricsToDisplayOnPerfCheckpoints } = useMetrics();
  const [checkedValues, setCompare] = useState<CheckpointOption[]>([]);
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);

  const [checkpointsToCompare, setCheckpointsToCompare] = useState<CheckpointOption[]>([]);
  const {
    data: checkpointsSnapshots,
    isLoading: isLoadingComparison,
  } = useCheckpointsSnapshots({ ...appliedFilters, ...otherApiQueryParameters }, checkpoints);

  useEffect(() => {
    if (!checkedValues.length) {
      const formattedOptions = _.reverse(_.cloneDeep(checkpoints)).map(formatOption);
      const sortedOptions = sortByDate(formattedOptions, 'start_date');
      setCompare(formattedOptions);

      // keep them to send on the request and compare at least two after the page load
      // if (sortedOptions.length) {
      setCheckpointsToCompare(sortedOptions.filter(c => c?.checked));
      // }
    }
  }, [checkpoints]);

  const onCompareCheckpoints = useCallback((checkpointList: CheckpointOption[]) => {
    setCheckpointsToCompare(checkpointList);
  }, [checkpointsToCompare, otherApiQueryParameters]);

  const setCompareFunction = useCallback((value: CheckpointOption[]) => setCompare(value), []);

  const checkedItems = checkedValues.filter(c => c?.checked)?.length;

  const { isMissing: isSnapshotMissing, missingCheckpoints } = checkForMissingSnapshots(checkpointsToCompare, checkpointsSnapshots ?? []);
  const isMissing = isSnapshotMissing && (!isLoadingCheckpoints && !isLoadingComparison);

  return (
    <Box display="flex" flexDirection="column" flexGrow={1}>
      <PerspectiveSection title="Checkpoints" customStyles={{ title: { background: '#fff' } }}>
        <CheckboxSelection
          selectionOptions={checkedValues}
          setOptions={setCompareFunction}
          onCompareCheckpoints={onCompareCheckpoints}
          amountOfCheckpointsToFilter={checkedItems}
          isLoading={isLoadingCheckpoints}
        />
      </PerspectiveSection>
      <DashboardCard
        key="checkpoints-table"
        title=""
        size={ChartSizes.full}
        fullScreen={true}
        useModalOpenProps={true}
        isModalOpenProps={isFullScreen}
        setIsModalOpenProps={setIsFullScreen}
      >
        {
          isMissing
            ? (
              <Box
                justifyContent="center"
                alignItems="center"
                display="flex"
                fontSize={25}
                marginTop={10}
                textAlign={'center'}
                fontFamily={'Open Sans'}>
                Please try again in a few minutes. <br />
                Processing the following checkpoints: {`${missingCheckpoints.map(c => `"${c.name}"`).join(',')}`}
              </Box>
            )
            : (
              <ComparisonTable
                isLoading={isLoadingCheckpoints || isLoadingComparison || isLoadingMetrics}
                checkpointsSnapshots={checkpointsSnapshots}
                isFullScreen={isFullScreen}
                selectedCheckpoints={checkpointsToCompare}
                metricsToDisplay={metricsToDisplayOnPerfCheckpoints ?? []}
                customViewsToDisplay={data.savedMetrics.customViews}
              />
            )
        }


        {!isLoadingCheckpoints && widgetInfo?.length !== 0 ?
          <ExtendedTooltip maxWidth="md" content={widgetInfo} /> : <></>}

      </DashboardCard>
    </Box>
  );
};

function formatOption(checkpointInfo: CheckpointItem, index: number) {
  return {
    id: checkpointInfo.id,
    name: checkpointInfo.name,
    start_date: checkpointInfo.start_date,
    end_date: checkpointInfo.end_date,
    checked: !![0, 1].includes(index),
  };
}

export default PerformanceCheckpointAccordion;