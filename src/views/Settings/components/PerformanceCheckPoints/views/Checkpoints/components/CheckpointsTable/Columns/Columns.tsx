import { default as Box, default as Text } from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import { styled } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import {
  GridColumns
} from '@mui/x-data-grid-pro';
import { DateTime } from 'luxon';
import { Controller } from 'react-hook-form';
import { DEFAULT_DATE_FORMAT } from 'utils/dateTime';
import { daysToIntervalString } from 'utils/daysToIntervalString';
import { CheckpointItem } from 'views/Settings/components/PerformanceCheckPoints/interfaces';



const Header = styled(Text)({
  '&': {
    fontFamily: 'Open Sans',
    fontSize: 14,
    fontWeight: 'bold',
    position: 'relative'
  },
});

const TextContent = styled(Text)({
  '&': {
    fontFamily: 'Open Sans',
    fontSize: 14,
  },
});

const getColumns = (
  classes,
  isAnyRowEditMode,
  handleEditClick,
  control
): GridColumns => {
  return [
    {
      field: 'name',
      headerName: 'Name',
      width: 300,
      renderHeader: () => (
        <Header>
          Name
        </Header>
      ),
      renderCell: (props) => {
        const id = `id-${(props.row as CheckpointItem).id}`;

        const fieldName = `checkpoints.${id}.name`;
        const fieldIdName = `checkpoints.${id}.id`;
        return (
          <>
            <Controller
              render={() => <span></span>}
              name={fieldIdName}
              control={control}
              defaultValue={props.row?.id}
            />
            <Controller
              render={() => <TextContent>{props.row?.name}</TextContent>}
              name={fieldName}
              control={control}
              defaultValue={props.row?.name}
            />
          </>
        );
      }
    },
    {
      field: 'start_date',
      headerName: 'Start date',
      renderHeader: () => (
        <Header>
          Start Date
        </Header>
      ),
      width: 180,
      renderCell: (props) => {
        const id = `id-${(props.row as CheckpointItem).id}`;
        const fieldName = `checkpoints.${id}.start_date`;
        const formattedDate = DateTime.fromJSDate(props.row?.start_date).toFormat(DEFAULT_DATE_FORMAT);
        console.log("🚀 ~ file: Columns.tsx:89 ~ fieldName:", fieldName);
        return (
          <>
            <Controller
              render={() => <TextContent>{formattedDate}</TextContent>}
              name={fieldName}
              control={control}
              defaultValue={props.row?.start_date}
            />
          </>
        );
      }
    },
    {
      field: 'end_date',
      headerName: 'Finish Date',
      width: 180,
      renderHeader: () => (
        <Header>
          Finish Date
        </Header>
      ),
      renderCell: (props) => {
        const id = `id-${(props.row as CheckpointItem).id}`;
        const fieldName = `checkpoints.${id}.end_date`;
        const formattedDate = DateTime.fromJSDate(props.row?.end_date).toFormat(DEFAULT_DATE_FORMAT);
        return (
          <>
            <Controller
              render={() => <TextContent>{formattedDate}</TextContent>}
              name={fieldName}
              control={control}
              defaultValue={props.row?.end_date}
            />
          </>
        );
      }
    },
    {
      field: 'duration',
      headerName: 'Duration',
      renderHeader: () => (
        <Header>
          Duration
        </Header>
      ),
      renderCell: (props) => {
        const endDate = DateTime.fromJSDate(props?.row?.end_date);
        const startDate = DateTime.fromJSDate(props?.row?.start_date);
        const { days } = endDate.diff(startDate, ['days']).toObject();
        const diff = daysToIntervalString(days || 0);

        return (
          <TextContent>{diff}</TextContent>
        );
      },
      sortable: false,
      headerAlign: 'center',
      filterable: false,
      align: 'center',
      disableColumnMenu: true,
      disableReorder: true,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      renderHeader: () => (
        <Header>
          Actions
        </Header>
      ),
      renderCell: (props) => {
        return (
          <Box className={classes.actionColumn}>
            <IconButton
              color="inherit"
              size="small"
              aria-label="edit"
              disabled={isAnyRowEditMode}
              onClick={() => {
                handleEditClick(props?.row);
              }}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </Box>
        );
      },
      sortable: false,
      width: 100,
      headerAlign: 'center',
      filterable: false,
      align: 'center',
      disableColumnMenu: true,
      disableReorder: true,
    }
  ];
};

export { getColumns };
