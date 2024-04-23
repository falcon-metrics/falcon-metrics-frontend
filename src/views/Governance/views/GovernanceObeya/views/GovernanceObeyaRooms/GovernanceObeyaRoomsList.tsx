/**
 * @deprecated
 * 
 * This is the old Governance Obeya code. Refer to Lean Portfolio
 */

import noop from 'lodash/noop';
import { useConfirm } from 'material-ui-confirm';
import { useHistory } from 'react-router-dom';

import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';
import {
  createStyles,
  makeStyles,
} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { formatDate } from 'utils/dateTime';

interface Props {
  data: any[];
  onDelete?: (roomId: string, obeyaRoomName: string) => any;
  loading?: boolean;
}

const useStyles = makeStyles(() =>
  createStyles({
    cell: {
      fontFamily: 'Open Sans',
    },
  }),
);

const GovernanceObeyaRoomsList = ({ data = [], onDelete, loading }: Props) => {
  const classes = useStyles();
  const history = useHistory();
  const confirm = useConfirm();

  const onDeleteObeyaRoom = (roomId, roomName) =>
    confirm({
      title: 'Warning: This action cannot be undone!',
      description: (
        <>
          <Typography>
            Are you sure you want to delete this obeya room?
          </Typography>
        </>
      ),
      cancellationText: 'No',
      confirmationText: 'Yes',
    })
      .then(() => onDelete?.(roomId, roomName))
      .catch(noop);

  return (
    <>
      <Table aria-label="normalisation">
        <TableHead>
          <TableRow>
            <TableCell width={220} className={classes.cell}>
              <b>Obeya Room</b>
            </TableCell>
            <TableCell width={400} align="left" className={classes.cell}>
              <b>Purpose</b>
            </TableCell>
            <TableCell align="left" width={200} className={classes.cell}>
              <b>Type</b>
            </TableCell>
            <TableCell align="left" width={200} className={classes.cell}>
              <b>Expected Start</b>
            </TableCell>
            <TableCell align="left" width={200} className={classes.cell}>
              <b>Expected Finish</b>
            </TableCell>
            <TableCell colSpan={3} align="center" className={classes.cell}>
              <b>Actions</b>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {!loading &&
            data.map((obeyaRoom) => {
              const {
                roomId,
                roomName,
                goal,
                endDate,
                beginDate,
                type,
              } = obeyaRoom;
              return (
                <TableRow key={roomId}>
                  <TableCell
                    component="th"
                    scope="row"
                    className={classes.cell}
                  >
                    {roomName}
                  </TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                    className={classes.cell}
                  >
                    {goal}
                  </TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                    className={classes.cell}
                  >
                    {type}
                  </TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                    className={classes.cell}
                  >
                    {formatDate(beginDate)}
                  </TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                    className={classes.cell}
                  >
                    {formatDate(endDate)}
                  </TableCell>
                  <TableCell padding="checkbox">
                    <IconButton
                      aria-label="edit"
                    >
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell padding="checkbox">
                    <IconButton
                      aria-label="remove"
                      onClick={() => onDeleteObeyaRoom(roomId, roomName)}
                    >
                      <DeleteIcon aria-label="Remove Room" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
      {loading && (
        <Box
          mt={4}
          width="100%"
          display="flex"
          flexGrow="1"
          justifyContent="center"
          alignItems="center"
        >
          <CircularProgress size={22} />
        </Box>
      )}
    </>
  );
};

export default GovernanceObeyaRoomsList;
