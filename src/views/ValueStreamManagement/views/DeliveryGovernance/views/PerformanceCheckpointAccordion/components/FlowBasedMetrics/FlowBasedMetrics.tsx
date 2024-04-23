/* eslint-disable @typescript-eslint/no-unused-vars */
import Box from '@material-ui/core/Box';
import { DataGridPro, GridToolbarExport } from '@mui/x-data-grid-pro';
import { CheckpointItem } from 'views/Settings/components/PerformanceCheckPoints/interfaces';
import {
  useValueStreamManagementStyles
} from 'views/ValueStreamManagement/ValueStreamManagement.styles';
import { Checkpoint } from '../../models';
import { buildRowsAndColumns } from '../../usePerformanceCheckpoints';
import FlowBasedMetricsSkeleton from './components/FlowBasedMetricsSkeleton';
import { useStyles } from './FlowBasedMetrics.styles';
import CustomGridPanel from 'components/UI/CustomGridPanel';
import ExportButton from './ExportButton';
import { FilterWithId } from 'views/Settings/components/PerformanceCheckPoints/views/Metrics/interfaces';

type Props = {
  checkpointsSnapshots: any[] | null;
  isLoading?: boolean;
  isFullScreen?: boolean;
  selectedCheckpoints: CheckpointItem[];
  metricsToDisplay: string[];
  customViewsToDisplay: FilterWithId[];
};


export const ComparisonTable = ({
  checkpointsSnapshots,
  isLoading,
  isFullScreen,
  selectedCheckpoints,
  metricsToDisplay,
  customViewsToDisplay
}: Props) => {
  // TODO: This doesnt have to be a hook. 
  // Its just a function that returns an object
  const globalStyles = useValueStreamManagementStyles();

  const classes = useStyles();
  const checkpoints = (selectedCheckpoints ?? []).map(c => new Checkpoint({
    id: c.id?.toString() as string,
    name: c.name as string,
    startDate: c.start_date as string,
    endDate: c.end_date as string
  }));
  const { rows, columns } = buildRowsAndColumns(checkpointsSnapshots ?? ([] as any), checkpoints, metricsToDisplay ?? [], customViewsToDisplay ?? []);

  if (isLoading && checkpointsSnapshots === null) {
    return <FlowBasedMetricsSkeleton />;
  }

  if (checkpointsSnapshots) {
    return (
      <Box className={globalStyles.groupContainer}>
        <Box className={classes.box + (isFullScreen ? (" " + classes.boxFullScreen) : " ")}>
          <DataGridPro
            rows={rows}
            columns={columns}
            className={classes.dataGrid}
            getRowId={({ id }) => id}
            components={{
              Footer: (props) => {
                return (
                  <div className={classes.gridToolbarExport}>
                    <ExportButton rows={rows} columns={columns} title="Performance Checkpoints" />
                  </div>
                );
              },
              Panel: CustomGridPanel,
            }}
          />
        </Box>
      </Box>
    );
  }

  return null;
};
