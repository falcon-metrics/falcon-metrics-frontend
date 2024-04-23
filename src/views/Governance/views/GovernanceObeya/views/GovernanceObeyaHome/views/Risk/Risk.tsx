/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {
  memo,
  useState,
  useMemo,
} from 'react';
import {
  getFilterUrlSearchParams,
} from 'views/Dashboard/views/Platform/views/FilterPanel/contexts/FilterPanelContext/utils';
import Modal from 'components/UI/Modal';
import useAuthentication from 'hooks/useAuthentication';
import { useCrud } from 'hooks/useCrud';
import {
  useObeya,
} from 'views/Governance/views/GovernanceObeya/hooks/useObeya';
import {
  useObeyaContexts,
} from 'views/Governance/views/GovernanceObeya/hooks/useObeyaContexts';

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
import RiskList from './components/RiskList';
import { RiskForm } from './RiskForm';
import { RiskItem } from './types';
import { OBEYA_ROLES_ALLOW_ACCESS } from 'utils/routes';
import { getTimezone } from 'utils/utils';
import BaseModal from 'components/UI/BaseModal/BaseModal2';
import { default as RiskUpdateForm } from '../../views/Updates/components/UpdateForm/components/RiskForm/RiskForm';

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
  getAll?: string;
} = {
  remove: 'obeya/risk/',
  getAll: 'obeya',
};

interface Props {
  obeyaRoomId?: string;
};

export const Risk = memo(({ obeyaRoomId }: Props) => {
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
  const [currentRisk, setcurrentRisk] = useState<RiskItem | undefined>();
  const [showFullScreen, setShowFullScreen] = useState<boolean>(false);
  const [openUpdateModal, setOpenUpdateModal] = useState<boolean>(false);

  const { data: teams, isLoading: isContextLoading } = useObeyaContexts();

  const resources = useMemo(function () {
    const params = getFilterUrlSearchParams({
      obeyaRoomId: obeyaRoomId,
      timezone: getTimezone()
    });

    return {
      ...defaultResources,
      getAll: obeyaRoomId ? `${defaultResources.getAll}?${params}` : undefined,
    };
  }, [obeyaRoomId, defaultResources]);

  const { remove } = useCrud(resources, 'risks');

  const {
    data,
    // isValidating,
    isLoadingObeyaData,
    mutateObeyaData,
  } = useObeya(obeyaRoomId);

  const [showModal, setShowModal] = useState<boolean>(false);

  const onCloseRiskModal = () => {
    setShowModal(false);
    setcurrentRisk(undefined);
  };

  const onOpenRiskModal = () => {
    setShowModal(true);
  };

  const openModalToAdd = () => {
    setcurrentRisk(undefined);
    onOpenRiskModal();
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

  const deleteRisk = () => {
    setconfirmDeleteAlertOpen(false);
    setOpenUpdateModal(true);
  };

  const openEditModal = () => {
    const timeoutId = setTimeout(() => {
      setToggleDelete(false);
      clearTimeout(timeoutId);
    }, 200);
    onOpenRiskModal();
  };

  const onSelectToRemove = (ids) => {
    const [riskId] = ids;
    const riskItem = (data.risks || []).find(d => d.riskId === riskId);

    if (riskItem) {
      setcurrentRisk(riskItem);
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
        {!isLoadingObeyaData && data.risks.length === 0 ? (
          <EmptyState
            message="Seems like there are no risks recorded to show"
            buttonText="Record Risk"
            onClickButton={allowObeyaAccess ? onOpenRiskModal : () => ({})}
            disabled={!allowObeyaAccess} />
        ) : (
          <RiskList
            shouldEnableDeleteButton={shouldDelete}
            data={data.risks}
            onClick={openEditModal}
            onSelect={onSelectToRemove}
            onRemoveDependency={openDeleteConfirm}
            openModalToAdd={openModalToAdd}
            isModalOpen={showFullScreen} />
        )}
        <Modal
          customClass={classes.customClass}
          onClose={onCloseRiskModal}
          isOpen={showModal}
        >
          <RiskForm
            teams={teams}
            obeyaData={data}
            hideModal={onCloseRiskModal}
            obeyaRoomId={obeyaRoomId}
            currentRisk={currentRisk}
            isContextLoading={isContextLoading} />
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
            Error saving the risks.
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
            Are you sure you want to delete this Risk?
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {currentRisk?.name}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={closeAlerts} color="primary">
              No
            </Button>
            <Button onClick={deleteRisk} color="primary" autoFocus>
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
        <RiskUpdateForm
          placeholder="Write a post"
          activePlaceholder="Post your update. You've got 280 characters, so keep it concise. You can include more details with a note."
          payload={currentRisk}
          defaultImpactOnCost={currentRisk?.impactOnCost || 0}
          defaultLikelihood={currentRisk?.likelihood || 0}
          defaultImpactOnSchedule={currentRisk?.impactOnSchedule || 0}
          defaultStatus={currentRisk?.status || 'open'}
          risk={currentRisk || {
            riskId: '',
            name: '',
            description: '',
            riskExposureAmount: 0,
            riskExposureDays: 0,
            status: ''
          }}
          afterSubmit={afterSubmit}
          action="delete" />
      </BaseModal>
    </>
  );
});

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any>; },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
