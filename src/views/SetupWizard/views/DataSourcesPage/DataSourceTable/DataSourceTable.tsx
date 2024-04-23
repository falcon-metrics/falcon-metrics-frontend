import { useState } from 'react';

import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

import Switch from '@material-ui/core/Switch';
import Checkbox from '@material-ui/core/Checkbox';

import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import VisibilityIcon from '@material-ui/icons/Visibility';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

//import useProfile from 'hooks/useProfile';
import { Auth0ContextInterface, withAuth0 } from '@auth0/auth0-react';
import { useSendTelemetry } from 'core/api/CustomerTelemetryClient';
import { Feature } from 'core/api/telemetry/types';
import useAuthentication from 'hooks/useAuthentication';

export type Props = {
  dataset: any[];
  onEdit: (data: any) => void;
  onDelete: (data: any) => void;
  onChange: (data: any) => void;
  auth0: Auth0ContextInterface;
};

const DataSourceTable = ({
  dataset,
  onEdit,
  onDelete,
  onChange,
}: Props) => {
  const sendTelemetry = useSendTelemetry();
  //const {data: profile} = useProfile();
  const datasourceTelemetryFeature: Feature = {
    page: 'settings-wizard',
    widget: 'datasource',
  };

  const auth = useAuthentication();
  let isEditButtonDisabled = false;
  // If a user is a demo user, the user has to be a Falcon Metrics Admin
  // to be able to save
  // If the demo user is NOT a Administrator, the user should NOT be able to save
  if (auth.isDemoUser && !auth.isAdmin) {
    isEditButtonDisabled = true;
  }
  return (
    <Table aria-label="normalisation">
      <TableHead>
        <TableRow>
          <TableCell>Data Sources</TableCell>
          <TableCell width={300} align="center">
            Sync Data
          </TableCell>
          <TableCell colSpan={3} align="center">
            Actions
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {dataset.map((data) => {
          const { id, name, enable, isDemoDatasource } = data;
          return (
            <TableRow key={id}>
              <TableCell component="th" scope="row">
                {isDemoDatasource ? 'Falcon Metrics Sample data' : name}
              </TableCell>
              <TableCell padding="checkbox" align="center">
                <Switch
                  disabled={isDemoDatasource}
                  defaultChecked={enable}
                  color="primary"
                  inputProps={{ 'aria-label': 'checkbox to enable datasource' }}
                  onChange={async (event, checked) => {
                    onChange({ id, enabled: checked });
                    if (checked) {
                      ////TODO: customer telemetry on enabled datasource
                      await sendTelemetry(
                        'EnabledDatasource',
                        `User enabled datasource ${name}`,
                        datasourceTelemetryFeature
                      );
                    } else {
                      await sendTelemetry(
                        'DisabledDatasource',
                        `User disabled datasource ${name}`,
                        datasourceTelemetryFeature
                      );
                    }
                  }}
                />
              </TableCell>
              <TableCell padding="checkbox">
                <IconButton
                  disabled={isEditButtonDisabled}
                  aria-label="edit"
                  onClick={async () => {
                    //customer telemetry on editing data source
                    console.log("dataSourceTable.tsx ~", data)
                    onEdit(data);
                    await sendTelemetry(
                      'EditDatasource',
                      `User enabled datasource ${name}`,
                      datasourceTelemetryFeature
                    );
                  }}
                >
                  <EditIcon />
                </IconButton>
              </TableCell>
              <TableCell padding="checkbox">
                <Checkbox
                  disabled
                  defaultChecked={true}
                  checkedIcon={<VisibilityIcon color="disabled" />}
                />
              </TableCell>
              <TableCell padding="checkbox">
                <AlertDialog
                  isDemoDatasource={isDemoDatasource}
                  onConfirm={async () => {
                    // customer telemetry on delete datasource
                    onDelete(data);
                    await sendTelemetry(
                      'DeleteDatasource',
                      `User deleted datasource ${name}`,
                      datasourceTelemetryFeature
                    );
                  }}
                />
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

const AlertDialog = ({ onConfirm, isDemoDatasource }: { onConfirm: () => void, isDemoDatasource: boolean; }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    onConfirm();
    handleClose();
  };

  return (
    <>
      <IconButton aria-label="remove" onClick={handleClickOpen} disabled={isDemoDatasource}>
        <DeleteIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Warning: This action cannot be undone!
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Deleting a data source will remove its details of User name,
            Personal Access token and url from our system and purge all data
            belonging to this data sources.
          </DialogContentText>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this datasource?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            No, keep datasource
          </Button>
          <Button onClick={handleConfirm} color="primary" variant="contained">
            Yes, delete Datasource
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default withAuth0<Props>(DataSourceTable);
