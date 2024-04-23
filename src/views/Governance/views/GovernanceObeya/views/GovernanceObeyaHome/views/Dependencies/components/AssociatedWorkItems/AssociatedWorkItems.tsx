import './styles.css';

import { memo } from 'react';

import SpinnerFullSize from 'components/SpinnerFullSize';
import BaseDataGridStaticColumns
  from 'components/UI/BaseDataGrid/BaseDataGridStaticColumns';

import Box from '@material-ui/core/Box';
import {
  GridColumns,
  GridSelectionModel,
} from '@mui/x-data-grid-pro';

import { AssociateWorkItemDependency } from '../../types';
import useStyles from './AssociatedWorkItems.styles';
import { getBaseColumns } from './utils';
import CustomGridPanel from 'components/UI/CustomGridPanel';

export type AssociatedItemsInfo = Partial<AssociateWorkItemDependency>;
export interface Props {
  data: any[];
  additionalColumns?: GridColumns;
  excludedColumns?: string[];
  onClick?: (event: any) => void;
  onSelect?: (selectionModel: GridSelectionModel, details?: any) => void;
  openModalToAdd?: () => void;
  onRemoveDependency?: (event: any) => void;
  isLoading: boolean;
  selectionModel: any;
}

export const AssociatedWorkItems = ({
  data,
  onSelect,
  isLoading,
  selectionModel,
}: Props) => {
  const classes = useStyles();
  const columns = getBaseColumns();
  return (
    <Box className={classes.container}>
      {isLoading ? (
        <SpinnerFullSize />
      ) : (
        <BaseDataGridStaticColumns
          className={classes.dataGrid}
          data={data}
          columns={columns}
          getRowId={({ dependencyMapId }) => dependencyMapId}
          hideFooter
          selectionModel={selectionModel}
          onSelectionModelChange={onSelect}
          loading={isLoading}
          pageSize={8}
          rowsPerPageOptions={[8]}
          checkboxSelection={!isLoading}
          disableSelectionOnClick
          components={{ Panel: CustomGridPanel }}
        />
      )}
    </Box>
  );
};

export default memo(AssociatedWorkItems);
