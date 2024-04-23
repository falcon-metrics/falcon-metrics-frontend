import './styles.css';

import BaseDataGridStaticColumns
  from 'components/UI/BaseDataGrid/BaseDataGridStaticColumns';
import useAuthentication from 'hooks/useAuthentication';
import memo from 'utils/typescript/memo';
import {
  DependencyItem,
} from 'views/Governance/views/GovernanceObeya/hooks/useObeya';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import {
  GridColumns,
  GridSelectionModel,
  GridToolbarFilterButton,
} from '@mui/x-data-grid-pro';

import useStyles from './Dependencies.styles';
import useDataGridStyles from '../../../../../../../../../../components/UI/BaseDataGrid/BaseDataGrid.styles';
import { getBaseColumns } from './utils';
import CustomGridPanel from 'components/UI/CustomGridPanel';

export interface Props {
  data: DependencyItem[];
  additionalColumns?: GridColumns;
  onClick: (event: any) => void;
  onSelect: (selectionModel: GridSelectionModel, details?: any) => void;
  shouldEnableDeleteButton: boolean,
  openModalToAdd: () => void;
  onRemoveDependency: (event: any) => void;
  isModalOpen?: boolean;
}

export function DependenciesList({
  data,
  onSelect,
  onClick,
  shouldEnableDeleteButton,
  openModalToAdd,
  onRemoveDependency,
  isModalOpen
}: Props) {
  const classes = useStyles();
  const datagridClasses = useDataGridStyles();
  const listedColumns = getBaseColumns(onClick);
  const { isAdmin, isPowerUser } = useAuthentication();

  return (
    <Box className={classes.container}>
      <BaseDataGridStaticColumns
        boxClassName={isModalOpen ? (datagridClasses.box + " " + datagridClasses.boxFullScreen) : ""}
        className={classes.dataGrid}
        data={data}
        columns={listedColumns}
        getRowId={({ dependencyId }) => dependencyId}
        hideFooter
        onSelectionModelChange={onSelect}
        loading={data?.length === 0}
        components={{
          Toolbar: (props) => (
            <Box className={classes.actionsContainers}>
              {(isAdmin || isPowerUser) && (
                <>
                  <Button
                    aria-label="Add Dependency"
                    onClick={openModalToAdd}
                    disabled={!(isAdmin || isPowerUser)}
                  >
                    <AddIcon />
                    Add new
                  </Button>
                  <Button
                    onClick={onRemoveDependency}
                    disabled={!shouldEnableDeleteButton}
                  >
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

export default memo(DependenciesList);
