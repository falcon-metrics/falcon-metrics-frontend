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

import { WrapperDataGridPro } from './TableStrategicHorizon.styles';
import { formatDate } from 'utils/dateTime';
import CustomGridPanel from 'components/UI/CustomGridPanel';

export const AddButton = styled(Button)({
  color: '#2196F3',
  fontFamily: 'Open Sans',
  fontSize: 14,
  lineHeight: 0,
  border: '1px solid #2196F3',
});

const getColumns = (onRemoveHorizon, handleEditClick): GridColumns => {
  return [
    {
      field: 'title',
      headerName: 'Horizon',
      renderHeader: () => {
        return (
          <strong style={{ fontFamily: 'Open Sans' }}>
            Horizon
          </strong>
        );
      },
      renderCell: (props: any) => {
        return (
          <>
            <span style={{ fontFamily: 'Open Sans', marginLeft: 10 }}>{props.row.title}</span>
          </>
        );
      },
      width: 510,
    },
    {
      field: 'startDate',
      headerName: 'Range Date',
      renderHeader: () => {
        return (
          <strong style={{ fontFamily: 'Open Sans' }}>
            Date Range
          </strong>
        );
      },
      renderCell: (props: any) => {
        return (
          <>
            <span style={{ fontFamily: 'Open Sans' }}>
              {formatDate(props.row?.startDate)}
              {' - '}
              {formatDate(props.row?.endDate)}
            </span>
          </>
        );
      },
      width: 490,
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
                onClick={(event) => {
                  event.stopPropagation();
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
                  onRemoveHorizon(props?.row);
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

const TableStrategyHorizon = ({
  loading,
  strategicsDataRows,
  onRemoveHorizon,
  handleEditClick,
}: any) => {
  return (
    <WrapperDataGridPro>
      <DataGridPro
        loading={loading}
        columns={getColumns(onRemoveHorizon, handleEditClick)}
        rows={strategicsDataRows}
        getRowId={({ uuid }) => uuid}
        hideFooter
        components={{ Panel: CustomGridPanel }}
      />
    </WrapperDataGridPro>
  );
};

export default TableStrategyHorizon;
