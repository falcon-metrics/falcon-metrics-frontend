import { sortByString } from 'utils/string';
import {
  useValueStreamManagementStyles,
} from 'views/ValueStreamManagement/ValueStreamManagement.styles';
import Box from '@material-ui/core/Box';
import { DataGridPro } from '@mui/x-data-grid-pro';
import FlowBasedMetricsSkeleton from './components/FlowBasedMetricsSkeleton';

import { styled } from '@material-ui/styles';

import {
  getBaseColumns,
  getColumnsNamesMap,
  getFormattedCheckpointsRows,
  RowDataGridBenchmarkItem,
  BaseColumnType,
  ColumnsNamesMap,
} from './utils';

import { useStyles } from './FlowBasedMetrics.styles';
import CustomGridPanel from 'components/UI/CustomGridPanel';

type Props = {
  data: any | null;
  isLoading?: boolean;
  isFullScreen?: boolean;
  openIndustryModal: (row: any) => void;
};

const CustomDataGridStyles = styled(DataGridPro)({
  '& .MuiDataGrid-columnHeaderWrapper': {
    paddingBottom: 16,
  },
  '& .firstHeaderColumn': {
    paddingTop: 11,
  }
});

export const FlowBasedMetrics = ({
  data,
  isLoading,
  isFullScreen,
  openIndustryModal
}: Props) => {

  const globalStyles = useValueStreamManagementStyles();
  const classes = useStyles();

  if (isLoading && data === null) {
    return <FlowBasedMetricsSkeleton />;
  }

  if (data) {
    const headerNamesMap: ColumnsNamesMap = getColumnsNamesMap(data.benchmarkings);
    const columns: BaseColumnType[] = getBaseColumns(
      data.benchmarkings,
      headerNamesMap,
      openIndustryModal
    );
    const formattedValues: RowDataGridBenchmarkItem[] = getFormattedCheckpointsRows(data.benchmarkings);

    const sortedByMetric = sortByString(formattedValues, 'metric');

    return (
      <Box className={globalStyles.groupContainer}>
        <Box className={classes.box + (isFullScreen ? (" " + classes.boxFullScreen) : " ")}>
          <CustomDataGridStyles
            disableColumnSelector
            className={classes.dataGrid}
            rows={sortedByMetric}
            columns={columns}
            getRowId={({ id }) => id}
            components={{ Panel: CustomGridPanel }}
            hideFooter
          />
        </Box>
      </Box>
    );
  }

  return null;
};
