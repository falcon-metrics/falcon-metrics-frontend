import memo from 'utils/typescript/memo';

import Box from '@material-ui/core/Box';
import {
  DataGridPro,
  DataGridProProps,
  GridColDef,
  GridColumns,
} from '@mui/x-data-grid-pro';

import useStyles from './BaseDataGrid.styles';

export const baseDefaultWidths = {
  string: 180,
  number: 150,
  boolean: 150,
};

export const validTypes = Object.keys(baseDefaultWidths);

type Props = {
  data: any[];
  columns?: GridColumns;
  boxClassName?: string;
  customHeight?: number;
} & Omit<DataGridProProps, 'rows' | 'columns'>;

export const BaseDataGridStaticColumns = ({
  data,
  columns,
  boxClassName,
  customHeight,
  ...dataGridProps
}: Props) => {
  const classes = useStyles();

  // if (!data.length) {
  //   return null;
  // }

  const allColumns: GridColDef[] = columns || [];

  return (
    <Box className={boxClassName || classes.box}>
      <DataGridPro
        rows={data}
        columns={allColumns}
        style={{ height: customHeight }}
        {...dataGridProps}
      />
    </Box>
  );
}

export default memo(BaseDataGridStaticColumns);
