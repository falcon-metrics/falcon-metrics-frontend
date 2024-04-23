import {
  DataGridPro,
  GridToolbarContainer,
  GridSelectionModel,
} from '@mui/x-data-grid-pro';
import { Control } from 'react-hook-form';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { getColumns } from './Columns';
import useStyles from 'views/Settings/components/PerformanceCheckPoints/PerformanceCheckPoints.styles';

import { CheckpointItem, CheckpointItemForm } from 'views/Settings/components/PerformanceCheckPoints/interfaces';
import CustomGridPanel from 'components/UI/CustomGridPanel';

type Props = {
  checkpointsItems: CheckpointItem[];
  isLoadingCheckpoints: boolean;
  isValidating: boolean;
  onSelectToRemove: (ids: GridSelectionModel) => void;
  isAnyRowEditMode: boolean;
  currentCheckpointsToDelete: CheckpointItem[] | undefined;
  openDeleteConfirm: () => void;
  handleEditClick: (row: CheckpointItemForm) => void;
  control: Control<{ checkpoints: Record<string, CheckpointItem>; }>;
  openCheckpointForm: () => void;
};

const CheckpointsTable = ({
  checkpointsItems,
  isLoadingCheckpoints,
  isValidating,
  onSelectToRemove,
  isAnyRowEditMode,
  currentCheckpointsToDelete,
  openDeleteConfirm,
  handleEditClick,
  control,
  openCheckpointForm
}: Props) => {
  const classes = useStyles();

  // Failsafe - if the id is undefined, the DataGrid component
  // throws an error
  Object.keys(checkpointsItems).forEach(k => {
    if (checkpointsItems[k]?.id === undefined) {
      delete checkpointsItems[k];
    }
  });

  const columns = getColumns(
    classes,
    isAnyRowEditMode,
    handleEditClick,
    control,
  );

  return (
    <DataGridPro
      rows={checkpointsItems}
      columns={columns}
      checkboxSelection={true}
      editMode="row"
      hideFooter
      loading={isLoadingCheckpoints || isValidating}
      disableSelectionOnClick={true}
      onSelectionModelChange={onSelectToRemove}
      components={{
        Toolbar: () => {
          return (
            <GridToolbarContainer className={classes.toolbarContainer}>
              <Button
                disabled={isAnyRowEditMode}
                className={classes.addButton}
                startIcon={<AddIcon />}
                onClick={openCheckpointForm}
              >
                Add Checkpoint
              </Button>
              <Button
                disabled={isAnyRowEditMode || !currentCheckpointsToDelete || currentCheckpointsToDelete?.length === 0}
                onClick={openDeleteConfirm}
              >
                <DeleteOutlineIcon />
                Delete
              </Button>
            </GridToolbarContainer>
          );
        },
        Panel: CustomGridPanel
      }}
    // onEditRowsModelChange={handleEditRowsModelChange}
    />
  );
};

export default CheckpointsTable;