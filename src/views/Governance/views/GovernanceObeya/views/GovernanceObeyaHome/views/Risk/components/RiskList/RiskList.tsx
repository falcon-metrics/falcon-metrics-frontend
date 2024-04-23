import BaseDataGrid, { ObjectConstraint } from 'components/UI/BaseDataGrid';
import useAuthentication from 'hooks/useAuthentication';
import memo from 'utils/typescript/memo';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import {
  GridColumns,
  GridSelectionModel,
  GridToolbarFilterButton,
} from '@mui/x-data-grid-pro';

import { RiskItem } from '../../types';
import useStyles from './RiskList.styles';
import { getBaseColumns } from './utils';
import CustomGridPanel from 'components/UI/CustomGridPanel';

export type RiskInfo<T extends ObjectConstraint> = Partial<RiskItem> & T;

export interface Props<T extends ObjectConstraint> {
  data: RiskInfo<T>[];
  additionalColumns?: GridColumns;
  excludedColumns?: (keyof T)[];
  onClick: (event: any) => void;
  onSelect: (selectionModel: GridSelectionModel, details?: any) => void;
  shouldEnableDeleteButton: boolean,
  openModalToAdd: () => void;
  onRemoveDependency: (event: any) => void;
  isModalOpen?: boolean;
}

const excludedColumns = [
  'riskId',
  'roomId',
  'orgId',
  'owner',
  'createdAt',
  'deletedAt',
  'modifiedAt',
  'createdBy',
  'description',
];

export function RiskList<T extends ObjectConstraint>({
  data,
  onSelect,
  onClick,
  shouldEnableDeleteButton,
  openModalToAdd,
  onRemoveDependency,
  isModalOpen
}: Props<T>) {
  const classes = useStyles();
  const listedColumns = getBaseColumns(onClick);
  const { isAdmin, isPowerUser } = useAuthentication();

  return (
    <Box className={classes.container}>
      <BaseDataGrid<RiskInfo<T>>
        isModalOpen={isModalOpen}
        className={classes.dataGrid}
        data={data}
        excludedColumnKeys={excludedColumns}
        specialColumnOptions={listedColumns}
        getRowId={({ riskId }) => riskId}
        hideFooter
        onSelectionModelChange={onSelect}
        loading={data?.length === 0}
        components={{
          Toolbar: (props) => (
            <Box className={classes.actionsContainers}>
              {(isAdmin || isPowerUser) && (
                <>
                  <Button
                    aria-label="Add a new Risk"
                    onClick={openModalToAdd}
                  >
                    <AddIcon />
                    Add new
                  </Button>
                  <Button disabled={!shouldEnableDeleteButton} onClick={onRemoveDependency}>
                    <DeleteOutlineIcon />
                    Delete
                  </Button>
                </>
              )}
              <GridToolbarFilterButton
                {...props}
                className={classes.filterButton}
              />
            </Box>
          ),
          Panel: CustomGridPanel
        }}
      />
    </Box>
  );
}

export default memo(RiskList);
