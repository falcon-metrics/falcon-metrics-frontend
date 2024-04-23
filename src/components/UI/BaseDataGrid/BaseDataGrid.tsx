import memo from 'utils/typescript/memo';

import Box from '@material-ui/core/Box';
import {
  DataGridPro,
  DataGridProProps,
  GridColDef,
  GridColumns,
} from '@mui/x-data-grid-pro';

import CenteredCell from '../CenteredCell';
import useStyles from './BaseDataGrid.styles';
import {
  getDataGridUnlistedColumns,
} from './utils/utils';
import { formatDate } from 'utils/dateTime';

export const baseDefaultWidths = {
  string: 180,
  number: 150,
  boolean: 150,
};

export const validTypes = Object.keys(baseDefaultWidths);

export type ObjectConstraint = Record<string, string | number | boolean>;

type Props<T> = {
  data: T[];
  specialColumnOptions?: GridColumns;
  excludedColumnKeys?: Array<keyof T>;
  globalColumnDefinitions?: Partial<GridColDef>[];
  isModalOpen?: boolean;
} & Omit<DataGridProProps, 'rows' | 'columns'>;

function MUIDataGrid<T extends ObjectConstraint>({
  data,
  specialColumnOptions = [],
  excludedColumnKeys = [],
  globalColumnDefinitions,
  isModalOpen,
  ...dataGridProps
}: Props<T>) {
  const classes = useStyles();

  if (!data.length) {
    return null;
  }
  const listedAndExcludedKeys = [
    ...specialColumnOptions.map((o) => o.field as keyof T),
    ...excludedColumnKeys,
  ];
  const allColumns = [
    ...specialColumnOptions,
    ...getDataGridUnlistedColumns(data[0], listedAndExcludedKeys),
  ];

  const columnsWithGlobalDefinitions = allColumns.map((column) => ({
    renderCell: CenteredCell,
    valueFormatter: formatDate,
    ...globalColumnDefinitions,
    ...column,
  }));
  return (
    <Box className={classes.box + (isModalOpen ? " " + classes.boxFullScreen : " ")}>
      <DataGridPro
        rows={data}
        columns={columnsWithGlobalDefinitions}
        {...dataGridProps}
      />
    </Box>
  );
}

export default memo(MUIDataGrid);
