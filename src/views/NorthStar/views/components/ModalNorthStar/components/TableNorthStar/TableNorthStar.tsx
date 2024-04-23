import { DataGridPro } from '@mui/x-data-grid-pro';
import {
  GridColumns,
} from '@mui/x-data-grid-pro';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
// import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import { styled } from '@material-ui/styles';

import { WrapperDataGridPro } from './TableNorthStar.styles';
import CustomGridPanel from 'components/UI/CustomGridPanel';

export const AddButton = styled(Button)({
  color: '#2196F3',
  fontFamily: 'Open Sans',
  fontSize: 14,
  border: '1px solid #2196F3',
});

// const GridToolbarWrapper = styled(GridToolbarContainer)({
//   display: 'flex',
//   justifyContent: 'flex-end',
// });

const getColumns = (onRemoveStrategicDriver, handleEditClick): GridColumns => {
  return [
    {
      field: 'name',
      headerName: 'Strategic Driver',
      renderHeader: () => {
        return (
          <strong style={{ fontFamily: 'Open Sans' }}>
            Strategic Driver
          </strong>
        );
      },
      renderCell: (props: any) => {
        return (
          <>
            <span style={{ fontFamily: 'Open Sans', marginLeft: 10 }}>{props.row.name}</span>
          </>
        );
      },
      width: 1000,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      renderHeader: () => (
        <b style={{ fontFamily: 'Open Sans' }}>
          Actions
        </b>
      ),
      renderCell: (props: any) => {
        return (
          <Box display="flex">
            <Box style={{ width: 30 }}>
              <IconButton
                color="inherit"
                size="small"
                aria-label="edit"
                onClick={() => {
                  handleEditClick(props?.row);
                }}
              >
                <EditIcon fontSize="small" />
              </IconButton>
            </Box>
            <Box style={{ width: 30 }}>
              <IconButton
                color="inherit"
                size="small"
                aria-label="Delete"
                onClick={(event) => {
                  // prevent break when remove https://github.com/mui/mui-x/issues/2714
                  event.stopPropagation();
                  onRemoveStrategicDriver(props?.row);
                }}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>
        );
      },
      sortable: false,
      width: 90,
      headerAlign: 'center',
      filterable: false,
      align: 'center',
      disableColumnMenu: true,
      disableReorder: true,
    },
  ];
};

const TableNorthStar = ({
  loading,
  strategicsDataRows,
  onRemoveStrategicDriver,
  handleEditClick,
  // onAddStrategicDriver
}: any) => {
  return (
    <WrapperDataGridPro>
      <DataGridPro
        loading={loading}
        columns={getColumns(onRemoveStrategicDriver, handleEditClick)}
        rows={strategicsDataRows}
        getRowId={({ uuid }) => uuid}
        hideFooter
        components={{ Panel: CustomGridPanel }}
      // autoHeight
      // components={{
      //   Toolbar: () => {
      //     return (
      //       <GridToolbarWrapper>
      //         <AddButton
      //           startIcon={<AddIcon />}
      //           onClick={onAddStrategicDriver}
      //         >
      //           Strategic Driver
      //         </AddButton>
      //       </GridToolbarWrapper>
      //     );
      //   },
      // }}
      />
    </WrapperDataGridPro>
  );
};

export default TableNorthStar;
