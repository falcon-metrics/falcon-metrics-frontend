import React, { useState, useContext } from 'react';
import BaseModal from 'components/UI/BaseModal/BaseModal2';
import useAuthentication from 'hooks/useAuthentication';
import {
  OKRObjective,
  ratingConfig,
} from 'views/Governance/views/GovernanceObeya/utils';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import Slide from '@material-ui/core/Slide';
import { makeStyles } from '@material-ui/core/styles';
import { TransitionProps } from '@material-ui/core/transitions';
import AddIcon from '@material-ui/icons/Add';
import { SelectedContextIdContext } from 'components/UserStateProvider/UserStateProvider';
import ManageObjectives from '../ManageObjectives';
import { ValueGrid } from './ValueGrid';
import ButtonTooltip from '../../components/Tooltip/ButtonTooltip';
import { SkeletonObjectivesTitle, SkeletonObjectivesTabs, SkeletonObjectivesAdd } from './SkeletonObjectives';
import { useContextName } from '../../hooks/useContextName';
import { useStrategy } from 'views/Strategies/hooks/useStrategies';
import _ from 'lodash';
import { OBEYA_ROLES_ALLOW_ACCESS } from 'utils/routes';

export const useStyles = makeStyles(() => ({
  zeroStateContainer: {
    minHeight: 600,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  customClass: {
    width: 920,
    height: 761,
  },
  modalBody: {
    padding: 20,
    width: "99%",
    overflow: "hidden"
  }
}));

interface Props {
  obeyaRoomId?: string;
  isLoading?: boolean;
  horizonId?: string;
}

const Objectives = ({ obeyaRoomId, isLoading, horizonId }: Props) => {
  const { contextId } = useContext(SelectedContextIdContext);

  const { isInRole } = useAuthentication();

  const [confirmDeleteAlertOpen, setConfirmDeleteAlertOpen] = useState<boolean>(
    false,
  );
  const { data, updateStrategy, mutate, isLoadingStrategy } = useStrategy('strategies', contextId, horizonId);

  const { selectedContext } = useContextName();

  const [showOkrModal, setOpenOkrModal] = useState<boolean>(false);

  const [currentObjective, setObjective] = useState<OKRObjective>({});

  const onCloseOkrModal = () => {
    setOpenOkrModal(false);
  };

  const onOpenOkrModal = () => {
    setOpenOkrModal(true);
  };

  const openModalToAdd = () => {
    setObjective({});
    onOpenOkrModal();
  };

  const setCurrentObjective = (objective: OKRObjective) =>
    setObjective(objective);

  const deleteOKR = async (data: OKRObjective) => {
    setCurrentObjective(data);
    onCloseOkrModal();
    handleConfirmDeleteDialogOpen();
  };

  const handleSubmitGoal = async (formData: OKRObjective) => {
    const keyResults = (formData.keyResults || []).map((keyResult) => {
      const ratingDescription = (
        keyResult.ratingId ? ratingConfig[keyResult.ratingId]?.text : ''
      );
      return {
        ...keyResult,
        ratingDescription,
      };
    });
    onCloseOkrModal();
    try {
      setObjective({});
      if (data) {
        const updatedObjective = _.cloneDeep({ ...formData, keyResults });
        const updatedObjectives = _.cloneDeep(data[0].okrs);
        const index = updatedObjectives.findIndex(i => i.objectiveId === updatedObjective.objectiveId);
        index > -1 ? updatedObjectives[index] = updatedObjective : updatedObjectives?.push(updatedObjective);
        mutate({ data: [{ ...data[0], okrs: updatedObjectives, strategyId: `${data?.[0]?.id}` }] }, false);
        await updateStrategy({ ...data[0], okrs: updatedObjectives, strategyId: `${data?.[0]?.id}` });
      }
    } catch (error) {
      console.log(error instanceof Error ? error.message : 'Unknown error object on handle submit goal');
    }
  };

  const handleConfirmDeleteDialogOpen = () => setConfirmDeleteAlertOpen(true);

  const closeAlerts = () => {
    setConfirmDeleteAlertOpen(false);
  };

  const completeDeleteOKR = async () => {
    onCloseOkrModal();
    setConfirmDeleteAlertOpen(false);
    try {
      if (data && currentObjective) {
        let updatedObjectives = _.cloneDeep(data[0].okrs);
        updatedObjectives = updatedObjectives.filter(i => i.objectiveId !== currentObjective.objectiveId);
        mutate({ data: [{ ...data[0], okrs: updatedObjectives, strategyId: `${data?.[0]?.id}` }] }, false);
        await updateStrategy({ ...data[0], okrs: updatedObjectives, strategyId: `${data?.[0]?.id}` });
      }
      setObjective({});
    } catch (e) {
      console.log('error when delete okr');
    }
  };

  const allowAlphaAccess = isInRole(...OBEYA_ROLES_ALLOW_ACCESS);

  const [isFormDirty, setFormDirty] = useState(false);

  return (
    <>
      {(!contextId || isLoadingStrategy)
        ? <Box style={{ background: '#F7F7F7', padding: 20, height: '100%' }}>
          <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
            <SkeletonObjectivesTitle />
            <SkeletonObjectivesAdd />
          </Box>
          <Box>
            <SkeletonObjectivesTabs />
            <SkeletonObjectivesTabs />
            <SkeletonObjectivesTabs />
            <SkeletonObjectivesTabs />
            <SkeletonObjectivesTabs />
            <SkeletonObjectivesTabs />
          </Box>
        </Box>
        : <Box className="ObeyaGoalsWidget matchSiblingHeight">
          <Box className="widget-title">
            <Box display="flex" justifyContent="space-between">
              <Box display="flex" alignItems="center">
                <Box display="inline-flex">{selectedContext} Objectives</Box>
                <Box display="inline-flex" ml={1}>
                  {(data?.[0]?.okrs?.length && !!isLoading) ? (
                    <CircularProgress size={16} />
                  ) : null}
                </Box>
              </Box>
              {data?.[0]?.okrs?.length ?
                <ButtonTooltip text="add new Objective">
                  <span>
                    <IconButton
                      aria-label="Add OKR"
                      className="objective-modal-button"
                      onClick={openModalToAdd}
                      disabled={!allowAlphaAccess}
                      size="small"
                    >
                      <AddIcon />
                    </IconButton>
                  </span>
                </ButtonTooltip> :
                null
              }
            </Box>
          </Box>
          <ValueGrid
            isLoadingOkrs={!!isLoading}
            obeyaRoomId={obeyaRoomId}
            okrs={data?.[0]?.okrs || []}
            setObjective={setCurrentObjective}
            openModal={onOpenOkrModal}
            onAddGoalRequest={openModalToAdd}
          />
          <BaseModal
            maxWidth='md'
            open={showOkrModal}
            setOpen={setOpenOkrModal}
            title={
              <Box mt={2} mb={2} className="obeya-title">
                Objectives and Key Results
              </Box>
            }
            disableEscKeyDown={!isFormDirty}
            disableBackdropClick
            isFormDirty={isFormDirty}

          >
            <ManageObjectives
              currentObjective={currentObjective}
              submit={handleSubmitGoal}
              roomId={obeyaRoomId}
              hideModal={onCloseOkrModal}
              deleteOKR={deleteOKR}
              setFormDirty={setFormDirty}
            />
          </BaseModal>
          <Dialog
            open={confirmDeleteAlertOpen}
            onClose={closeAlerts}
            TransitionComponent={Transition}
            keepMounted
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              Are you sure you want to delete this OKR?
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                {currentObjective?.objectiveDescription}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={closeAlerts} color="primary">
                No
              </Button>
              <Button onClick={completeDeleteOKR} color="primary" autoFocus>
                Yes
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      }
    </>
  );
};

export default Objectives;

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any>; },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
