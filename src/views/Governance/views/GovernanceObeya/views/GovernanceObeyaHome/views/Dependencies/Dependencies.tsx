/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';

import Modal from 'components/UI/Modal';
import useAuthentication from 'hooks/useAuthentication';
import { useCrud } from 'hooks/useCrud';
import {
  DependencyItem,
  useObeya,
} from 'views/Governance/views/GovernanceObeya/hooks/useObeya';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Snackbar from '@material-ui/core/Snackbar';
import { makeStyles } from '@material-ui/core/styles';
import { TransitionProps } from '@material-ui/core/transitions';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import EmptyState from '../EmptyState';
import DependenciesList from './components/DependenciesList';
import { DependencyForm } from './DependencyForm';
import { OBEYA_ROLES_ALLOW_ACCESS } from 'utils/routes';
import BaseModal from 'components/UI/BaseModal/BaseModal2';
import { default as DependencyUpdateForm } from '../../views/Updates/components/UpdateForm/components/DependencyForm/DependencyForm';
import { DateTime } from 'luxon';

export const useStyles = makeStyles(() => ({
  zeroStateContainer: {
    minHeight: 600,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  customClass: {
    width: 931,
    height: 761,
    overflow: 'auto',
  },
  dependencyContainer: {
    minHeight: 500,
    maxHeight: 'auto',
  },
  dependencyContainerFullScreen: {
    maxHeight: 'calc(100vh - 100px)'
  }
}));

const defaultResources: {
  remove: string;
} = {
  remove: 'obeya/dependency/',
};

interface Props {
  obeyaRoomId?: string;
}

export const Dependencies = ({ obeyaRoomId }: Props) => {
  const classes = useStyles();
  const { isInRole } = useAuthentication();
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [successAlertOpen, setSuccessAlertOpen] = useState<boolean>(false);
  const [waitingAlertOpen, setWaitingAlertOpen] = useState<boolean>(false);
  const [errorAlertOpen, setErrorAlertOpen] = useState<boolean>(false);
  const [confirmDeleteAlertOpen, setconfirmDeleteAlertOpen] = useState<boolean>(
    false,
  );

  const [shouldDelete, setToggleDelete] = useState<boolean>(false);
  const [currentDependency, setCurrentDependency] = useState<DependencyItem | undefined>();
  const [showFullScreen, setShowFullScreen] = useState<boolean>(false);
  const [openUpdateModal, setOpenUpdateModal] = useState<boolean>(false);

  const resources = {
    ...defaultResources,
  };
  const { remove } = useCrud(resources, 'dependencies');

  const {
    data,
    isLoadingObeyaData,
    mutateObeyaData,
  } = useObeya(obeyaRoomId);

  const [showModal, setShowModal] = useState<boolean>(false);

  const onCloseDependencyModal = () => {
    setShowModal(false);
    setCurrentDependency(undefined);
  };

  const onOpenDependencyModal = () => {
    setShowModal(true);
  };

  const openModalToAdd = () => {
    setCurrentDependency(undefined);
    onOpenDependencyModal();
  };

  const handleShowSuccessAlert = () => setSuccessAlertOpen(true);

  const handleShowInfoAlert = () => setWaitingAlertOpen(true);

  const handleShowErrorAlert = () => setErrorAlertOpen(true);

  const handleCloseAlert = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setWaitingAlertOpen(false);
    setSuccessAlertOpen(false);
    setErrorAlertOpen(false);
  };

  const closeAlerts = () => {
    setconfirmDeleteAlertOpen(false);
    setWaitingAlertOpen(false);
    setSuccessAlertOpen(false);
    setErrorAlertOpen(false);
  };

  const deleteDependency = () => {
    setconfirmDeleteAlertOpen(false);
    setOpenUpdateModal(true);
  };

  const openEditModal = () => {
    const timeoutId = setTimeout(() => {
      setToggleDelete(false);
      clearTimeout(timeoutId);
    }, 100);
    onOpenDependencyModal();
  };

  const onSelectToRemove = (ids) => {
    const [dependencyId] = ids;
    const dependencyItem = (data.dependencies || []).find(d => d.dependencyId === dependencyId);

    if (dependencyItem) {
      setCurrentDependency(dependencyItem);
    }

    if (!showModal) {
      setToggleDelete(true);
    }
  };

  const openDeleteConfirm = () => setconfirmDeleteAlertOpen(true);

  const allowObeyaAccess = isInRole(...OBEYA_ROLES_ALLOW_ACCESS);

  const afterSubmit = () => {
    setOpenUpdateModal(false);
  };

  return (
    <>
      <Box>
        {!isLoadingObeyaData && data?.dependencies?.length === 0 && (
          <EmptyState
            message="Seems like there are no dependencies recorded to show"
            buttonText="Record Dependency"
            onClickButton={allowObeyaAccess ? onOpenDependencyModal : () => ({})}
            disabled={!allowObeyaAccess}
          />
        )}
        {!isLoadingObeyaData && data?.dependencies?.length ? (
          <DependenciesList
            shouldEnableDeleteButton={shouldDelete}
            data={data.dependencies}
            onClick={openEditModal}
            onSelect={onSelectToRemove}
            onRemoveDependency={openDeleteConfirm}
            openModalToAdd={openModalToAdd}
            isModalOpen={showFullScreen}
          />
        ) : null}
        <Modal
          customClass={classes.customClass}
          onClose={onCloseDependencyModal}
          isOpen={showModal}
        >
          <DependencyForm
            hideModal={onCloseDependencyModal}
            obeyaRoomId={obeyaRoomId}
            obeyaData={data}
            currentDependency={currentDependency}
            mutateObeyaData={mutateObeyaData}
          />
        </Modal>
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
          autoHideDuration={4000}
          onClose={handleCloseAlert}
        >
          <Alert onClose={handleCloseAlert} severity="info">
            Your changes are being saved...
          </Alert>
        </Snackbar>
        <Snackbar
          open={errorAlertOpen}
          autoHideDuration={4000}
          onClose={handleCloseAlert}
        >
          <Alert onClose={handleCloseAlert} severity="error">
            Error saving the Dependencies.
          </Alert>
        </Snackbar>
        <Dialog
          open={confirmDeleteAlertOpen}
          onClose={closeAlerts}
          TransitionComponent={Transition}
          keepMounted
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            Are you sure you want to delete this Dependency?
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {currentDependency?.name}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={closeAlerts} color="primary">
              No
            </Button>
            <Button onClick={deleteDependency} color="primary" autoFocus>
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
      <BaseModal
        title='New update'
        open={openUpdateModal}
        setOpen={setOpenUpdateModal}
        customStyle={{
          width: 840,
        }}
      >
        <DependencyUpdateForm
          placeholder="Write a post"
          activePlaceholder="Post your update. You've got 280 characters, so keep it concise. You can include more details with a note."
          payload={currentDependency}
          defaultDateOfImpact={currentDependency && currentDependency.dateOfImpact ? DateTime.fromISO(currentDependency?.dateOfImpact).toJSDate() : new Date()}
          defaultSeverity={currentDependency?.severity || ''}
          defaultStatus={currentDependency?.status || ''}
          afterSubmit={afterSubmit}
          dependency={currentDependency || {
            blockedName: '',
            blockerName: '',
            severity: '',
            name: "",
            summary: "",
            dateOfImpact: "",
            status: ""
          }}
          action={'delete'}
        />
      </BaseModal>
    </>
    // </DashboardCard>
  );
};

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any>; },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
