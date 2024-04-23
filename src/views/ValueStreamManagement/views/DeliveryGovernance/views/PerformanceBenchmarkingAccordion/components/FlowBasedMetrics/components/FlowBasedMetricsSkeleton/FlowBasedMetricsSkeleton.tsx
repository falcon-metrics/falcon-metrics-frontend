import {
  useValueStreamManagementStyles,
} from 'views/ValueStreamManagement/ValueStreamManagement.styles';

import Box from '@material-ui/core/Box';
import { DataGridPro } from '@mui/x-data-grid-pro';

import { useStyles } from '../../FlowBasedMetrics.styles';
import { staticColumns } from './utils';
import CustomGridPanel from 'components/UI/CustomGridPanel';

export const FlowBasedMetricsSkeleton = () => {
  const globalStyles = useValueStreamManagementStyles();
  const classes = useStyles();

  const data = [
    {
      id: 1,
      column1: '', column2: '', column3: '', column4: '',
    },
    {
      id: 2,
      column1: '', column2: '', column3: '', column4: '',
    },
    {
      id: 3,
      column1: '', column2: '', column3: '', column4: '',
    },
    {
      id: 4,
      column1: '', column2: '', column3: '', column4: '',
    },
    {
      id: 5,
      column1: '', column2: '', column3: '', column4: '',
    },
    {
      id: 6,
      column1: '', column2: '', column3: '', column4: '',
    },
    {
      id: 7,
      column1: '', column2: '', column3: '', column4: '',
    },
    {
      id: 8,
      column1: '', column2: '', column3: '', column4: '',
    }
  ];

  return (
    <Box className={globalStyles.groupContainer}>
      <Box className={classes.box}>
        <DataGridPro
          rows={data}
          columns={staticColumns}
          className={classes.dataGrid}
          getRowId={({ id }) => id}
          hideFooter
          disableColumnReorder
          disableColumnSelector
          disableColumnFilter
          disableMultipleColumnsSorting
          components={{ Panel: CustomGridPanel }}
        />
      </Box>
    </Box>
  );
};
