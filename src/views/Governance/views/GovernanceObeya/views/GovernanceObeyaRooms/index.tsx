/**
 * @deprecated
 * 
 * This is the old Governance Obeya code. Refer to Lean Portfolio
 */

import {
  useEffect,
  useState,
} from 'react';

import { useSendTelemetry } from 'core/api/CustomerTelemetryClient';
import useAuthentication from 'hooks/useAuthentication';
import { useCrud } from 'hooks/useCrud';
import { Redirect } from 'react-router';
import { useHistory } from 'react-router-dom';
import {
  BaseRoutes,
} from 'utils/routes';
import { sortByString } from 'utils/string';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Snackbar from '@material-ui/core/Snackbar';
import {
  createStyles,
  makeStyles,
} from '@material-ui/core/styles';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

import Container from './Container';
import GovernanceObeyaRoomsList from './GovernanceObeyaRoomsList';

const useStyles = makeStyles(() =>
  createStyles({
    defaultText: {
      fontFamily: 'Open Sans',
    },
  }),
);

const RoomsListContainer = () => {
  const history = useHistory();
  // TODO create a custom hook to manage snackbars
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [infoMessage, setInfoMessage] = useState<string>('');
  const [successAlertOpen, setSuccessAlertOpen] = useState<boolean>(false);
  const [waitingAlertOpen, setWaitingAlertOpen] = useState<boolean>(false);
  const [errorAlertOpen, setErrorAlertOpen] = useState<boolean>(false);
  const sendTelemetry = useSendTelemetry();
  const { isAdmin } = useAuthentication();

  const { data, loading, remove } = useCrud({
    getAll: '/obeya/rooms/all',
    remove: '/obeya/room/delete',
  },
    'obeyaRooms'
  );
  const classes = useStyles();

  useEffect(() => {
    sendTelemetry(
      'AccessObeyaRooms',
      `AccessObeyaRooms`,
      { page: 'obeya', widget: 'rooms' }
    );
  }, []);

  const deleteObeya = async (roomId: string, obeyaRoomName) => {
    setInfoMessage(`Deleting ${obeyaRoomName}...`);
    setWaitingAlertOpen(true);
    const afterDeleteSuccess = () => {
      setWaitingAlertOpen(false);
      setInfoMessage('');
      setSuccessMessage('Deleted successfully!');
      setSuccessAlertOpen(true);
    };
    const afterDeleteError = () => {
      setErrorAlertOpen(true);
    };
    sendTelemetry(
      'DeleteObeyaRoom',
      `DeleteObeyaRoom - RoomId: ${roomId}, RoomName: ${obeyaRoomName}`,
      { page: 'obeya', widget: 'rooms' }
    );
    const newObeyaRoomList = (data?.obeyaRooms || []).filter(
      (obeyaRoom) => obeyaRoom?.roomId !== roomId,
    );
    await remove(
      '/obeya/rooms/all',
      { obeyaRoomId: roomId },
      { obeyaRooms: newObeyaRoomList },
      'post',
      afterDeleteSuccess,
      afterDeleteError,
    );
  };

  const handleCloseAlert = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setWaitingAlertOpen(false);
    setSuccessAlertOpen(false);
    setErrorAlertOpen(false);
  };
  if (!isAdmin) {
    return <Redirect to={BaseRoutes.InitiativeSocialFeed} />;
  }

  return (
    <Box>
      <Container title="Manage Obeya Rooms" maxWidth="lg">
        <Snackbar
          open={successAlertOpen}
          autoHideDuration={4000}
          onClose={handleCloseAlert}
        >
          <Alert onClose={handleCloseAlert} severity="success">
            {successMessage}
          </Alert>
        </Snackbar>
        <Snackbar
          open={waitingAlertOpen}
          autoHideDuration={40000}
          onClose={handleCloseAlert}
        >
          <Alert onClose={handleCloseAlert} severity="info">
            {infoMessage || 'Your changes are being saved...'}
          </Alert>
        </Snackbar>
        <Snackbar
          open={errorAlertOpen}
          autoHideDuration={4000}
          onClose={handleCloseAlert}
        >
          <Alert onClose={handleCloseAlert} severity="error">
            Error saving the iteartion.
          </Alert>
        </Snackbar>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <GovernanceObeyaRoomsList
              data={sortByString(data?.obeyaRooms || [], 'roomName')}
              loading={loading}
              onDelete={deleteObeya}
            />
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={4}>
              <Grid item xs={6}>
                <Button
                  fullWidth
                  className={classes.defaultText}
                  type="button"
                  size="large"
                  variant="outlined"
                  color="primary"
                >
                  Return
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  className={classes.defaultText}
                  fullWidth
                  type="button"
                  size="large"
                  variant="contained"
                  color="primary"
                >
                  Create a New Obeya Room
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default RoomsListContainer;
