import {
  GridColumns,
  GridRenderCellParams,
  GridToolbarExport,
} from '@mui/x-data-grid-pro';
import Box from '@material-ui/core/Box';
import BaseDataGrid, { ObjectConstraint } from 'components/UI/BaseDataGrid';
import useStyles from './WorkItemList.styles';
import memo from 'utils/typescript/memo';
import WorkItemLink from './components/WorkItemLink';
import startCase from 'lodash/startCase';
import CenteredCell from 'components/UI/CenteredCell';
import CustomGridPanel from 'components/UI/CustomGridPanel';

export type WorkItemBasicPresentationInfo = {
  workItemId: string;
  title: string;
  assignedTo: string;
  workItemType: string;
  serviceLevelExpectationInDays: string;
  itemAge: string;
  'age%OfSLE': string;
};

export type WorkItemInfo<
  T extends ObjectConstraint
> = WorkItemBasicPresentationInfo & T;

const baseColumns: GridColumns = [
  {
    field: 'workItemId',
    headerName: 'ID',
    width: 150,
    renderCell: WorkItemLink,
  },
  { field: 'title', headerName: 'Title', width: 350 },
  { field: 'flomatikaWorkItemTypeName', headerName: 'Type', width: 150 },
  {
    field: 'datasourceType',
    headerName: 'Datasource Type',
    width: 150,
    renderCell: ({ value }: GridRenderCellParams) => (
      <CenteredCell value={startCase(String(value))} />
    ),
  },
];

const baseExcludedColumns = ['datasourceId', 'namespace', 'projectId'];
export interface Props<T extends ObjectConstraint> {
  data?: WorkItemInfo<T>[];
  additionalColumns?: GridColumns;
  excludedColumns?: (keyof T)[];
}

export function WorkItemList<T extends ObjectConstraint>({
  data = [],
  additionalColumns = [],
  excludedColumns = [],
}: Props<T>) {
  const classes = useStyles();
  const listedColumns = [...baseColumns, ...additionalColumns];

  return (
    <Box className={classes.container}>
      <BaseDataGrid<WorkItemInfo<T>>
        className={classes.dataGrid}
        specialColumnOptions={listedColumns}
        excludedColumnKeys={[...excludedColumns, ...baseExcludedColumns]}
        data={data}
        getRowId={({ workItemId }) => workItemId}
        hideFooter
        components={{
          Toolbar: (props) => (
            <GridToolbarExport
              {...props}
              className={classes.gridToolbarExport}
            />
          ),
          Panel: CustomGridPanel
        }}
      />
    </Box>
  );
}

export default memo(WorkItemList);

export const getWorkItemListTitle = (data: any[] = [], baseTitle: string) => {
  const countString = data.length ? `(${data.length})` : '';
  const titleWithCount = baseTitle + '  ' + countString;
  return titleWithCount;
};
