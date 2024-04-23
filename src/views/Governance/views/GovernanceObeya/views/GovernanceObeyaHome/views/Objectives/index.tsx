import { useState } from "react";

import SpinnerFullSize from "components/SpinnerFullSize";
import { useSendTelemetry } from "core/api/CustomerTelemetryClient";
import useAuthentication from "hooks/useAuthentication";
import { OKRObjective } from "views/Governance/views/GovernanceObeya/utils";

import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";

import { ValueGrid } from "./ValueGrid";
import ButtonTooltip from "../../components/Tooltip/ButtonTooltip";
import { OBEYA_ROLES_ALLOW_ACCESS } from "utils/routes";
import BaseModal from "components/UI/BaseModal/BaseModal2";
import { ObjectivesFormProvider } from "../ManageObjectives/FormContext";
import ManageObjectivesForm from "../ManageObjectives";
import { getStatusStyles } from "../Updates/components/UpdateCard/utils";
import { useConfirm } from "material-ui-confirm";
import { Typography } from "@material-ui/core";
import { noop } from "lodash";
import { useSnackbar } from "notistack";
import ObjectiveForm from "../Updates/components/UpdateForm/components/ObjectiveForm/ObjectiveForm";
import KeyResultForm from "../Updates/components/UpdateForm/components/KeyResultForm/KeyResultForm";
import { useObeyaRoom } from "views/Governance/views/GovernanceObeya/hooks/useObeyaRoom";
import { useObeyaGoals } from "views/Governance/views/GovernanceObeya/hooks/useObeyaGoals";

export const useStyles = makeStyles(() => ({
  zeroStateContainer: {
    minHeight: 600,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  customClass: {
    width: 920,
    height: 761,
  },
  modalBody: {
    padding: 20,
    width: "99%",
    overflow: "hidden",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "flex-end",
  },
}));

const Objectives = () => {
  const classes = useStyles();
  const { isInRole } = useAuthentication();
  const sendTelemetry = useSendTelemetry();
  const { enqueueSnackbar } = useSnackbar();

  const {
    isLoadingObeyaData,
    isValidating,
    activeObeyaRoomId: obeyaRoomId,
  } = useObeyaRoom();
  const {
    data: objectives,
  } = useObeyaGoals(obeyaRoomId);

  const [showOkrModal, setOpenOkrModal] = useState<boolean>(false);

  const [currentObjective, setObjective] = useState<any>({
    objectiveId: "",
    objectiveDescription: "",
  });
  const [isOpenUpdateModal, setOpenUpdateModal] = useState<boolean>(false);
  const [isOpenKrUpdateModal, setOpenKrUpdateModal] = useState<boolean>(false);
  const [payload, setPayload] = useState<any>({});
  const [krPayload, setKrPayload] = useState<any>({});
  const [action, setAction] = useState<string>("");

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
    const keyResults = (formData.keyResults ?? []).map((keyResult) => {
      const ratingDescription = keyResult.ratingId
        ? getStatusStyles(keyResult.ratingId).label
        : "";
      return {
        ...keyResult,
        ratingDescription,
      };
    });

    const telemetryAction = formData?.objectiveId ? "EditOKR" : "CreateOKR";

    try {
      formData.roomId = obeyaRoomId || undefined;
      formData.ratingDescription = getStatusStyles(formData.ratingId).label;
      formData.objectiveId = currentObjective?.objectiveId ?? "";
      formData.keyResults = keyResults;
      setPayload(formData);
      setAction(formData?.objectiveId ? "edit" : "create");
      sendTelemetry(
        telemetryAction,
        `${telemetryAction} - ObjectiveId: ${formData?.objectiveId} Objective Description: ${formData.objectiveDescription}`,
        { page: "obeya", widget: "okr" }
      );

      setOpenUpdateModal(true);
    } catch (error) {
      console.log(
        error instanceof Error
          ? error.message
          : "Unknown error object on handle submit goal"
      );
      handleShowErrorAlert();
    }
  };

  const handleObjectiveStatusChange = async (
    formData: OKRObjective,
    currentObjective: OKRObjective
  ) => {
    const keyResults = (formData.keyResults ?? []).map((keyResult) => {
      const ratingDescription = keyResult.ratingId
        ? getStatusStyles(keyResult.ratingId).label
        : "";
      return {
        ...keyResult,
        ratingDescription,
      };
    });

    const telemetryAction = formData?.objectiveId ? "EditOKR" : "CreateOKR";

    try {
      formData.roomId = obeyaRoomId || undefined;
      formData.ratingDescription = getStatusStyles(formData.ratingId).label;
      formData.objectiveId = currentObjective.objectiveId ?? "";
      formData.keyResults = keyResults;
      setCurrentObjective(currentObjective);
      setPayload(formData);
      setAction("edit");

      setOpenUpdateModal(true);

      sendTelemetry(
        telemetryAction,
        `${telemetryAction} - ObjectiveId: ${formData?.objectiveId} Objective Description: ${formData.objectiveDescription}`,
        { page: "obeya", widget: "okr" }
      );
    } catch (error) {
      console.log(
        error instanceof Error
          ? error.message
          : "Unknown error object on handle submit goal"
      );
      handleShowErrorAlert();
    }
  };

  const handleKrStatusChange = async (
    formData: OKRObjective,
    currentObjective: OKRObjective,
    krId: string
  ) => {
    const keyResults = (formData.keyResults ?? []).map((keyResult) => {
      const ratingDescription = keyResult.ratingId
        ? getStatusStyles(keyResult.ratingId).label
        : "";
      return {
        ...keyResult,
        ratingDescription,
      };
    });
    try {
      const editedKr = keyResults.find((x) => x.keyResultId === krId);
      formData.roomId = obeyaRoomId || undefined;
      formData.ratingDescription = getStatusStyles(formData.ratingId).label;
      formData.objectiveId = currentObjective.objectiveId ?? "";
      formData.keyResults = keyResults;
      setCurrentObjective(currentObjective);
      setPayload(formData);
      setKrPayload(editedKr);
      setAction("edit");

      setOpenKrUpdateModal(true);

    } catch (error) {
      console.log(
        error instanceof Error
          ? error.message
          : "Unknown error object on handle submit goal"
      );
      handleShowErrorAlert();
    }
  };

  const handleShowErrorAlert = () => {
    enqueueSnackbar("An error has occurred. Please try again.", {
      variant: "error",
    });
  };

  const completeDeleteOKR = async () => {
    onCloseOkrModal();
    setAction("delete");
    setOpenUpdateModal(true);
  };

  const allowObeyaAccess = isInRole(...OBEYA_ROLES_ALLOW_ACCESS);

  const confirm = useConfirm();

  const handleConfirmDeleteDialogOpen = () => {
    confirm({
      title: "Are you sure you want to delete this OKR?",
      description: (
        <Typography>{currentObjective?.objectiveDescription}</Typography>
      ),
      cancellationText: "No",
      confirmationText: "Yes",
    })
      .then(() => completeDeleteOKR())
      .catch(noop);
  };

  const afterSubmit = () => {
    setOpenUpdateModal(false);
    setOpenKrUpdateModal(false);
    setObjective({});
    onCloseOkrModal();
  };

  return (
    <Box>
      {objectives?.length ? (
        <Box display="flex" justifyContent="flex-end">
          <ButtonTooltip text="Add New Objective">
            <Button
              disabled={!allowObeyaAccess}
              className="objective-modal-button"
              startIcon={
                (objectives?.length && isValidating) || isLoadingObeyaData ? (
                  <CircularProgress size={16} />
                ) : (
                  <AddIcon />
                )
              }
              onClick={openModalToAdd}
            >
              Add Objective
            </Button>
          </ButtonTooltip>
        </Box>
      ) : null}
      {isLoadingObeyaData ? (
        <SpinnerFullSize containerClass={classes.zeroStateContainer} />
      ) : (
        <ObjectivesFormProvider>
          <ValueGrid
            isLoadingOkrs={isValidating || isLoadingObeyaData}
            obeyaRoomId={obeyaRoomId || undefined}
            okrs={objectives}
            setObjective={setObjective}
            openModal={onOpenOkrModal}
            onAddGoalRequest={openModalToAdd}
            handleKeyResultStatusChange={handleKrStatusChange}
            handleObjectiveStatusChange={handleObjectiveStatusChange}
          // handleShowSuccessAlert={handleShowSuccessAlert}
          />
        </ObjectivesFormProvider>
      )}

      <BaseModal
        open={showOkrModal}
        setOpen={() => setOpenOkrModal(false)}
        maxWidth="lg"
        title="Objectives and Key Results"
      >
        <ObjectivesFormProvider>
          <ManageObjectivesForm
            submit={handleSubmitGoal}
            deleteOKR={deleteOKR}
            existingData={currentObjective || []}
          />
        </ObjectivesFormProvider>
      </BaseModal>
      <BaseModal
        title="New update"
        open={isOpenUpdateModal}
        setOpen={setOpenUpdateModal}
        customStyle={{
          width: 840,
        }}
      >
        <ObjectiveForm
          placeholder="Write a post"
          activePlaceholder="Post your update. You've got 280 characters, so keep it concise. You can include more details with a note."
          payload={payload}
          defaultAchieved={
            action === "delete" ? currentObjective.achieved : payload.achieved
          }
          defaultRatingId={
            action === "delete" ? currentObjective.ratingId : payload.ratingId
          }
          afterSubmit={afterSubmit}
          objective={currentObjective}
          action={action}
        />
      </BaseModal>
      <BaseModal
        title="New update"
        open={isOpenKrUpdateModal}
        setOpen={setOpenKrUpdateModal}
        customStyle={{
          width: 840,
        }}
      >
        <KeyResultForm
          placeholder="Write a post"
          activePlaceholder="Post your update. You've got 280 characters, so keep it concise. You can include more details with a note."
          payload={payload}
          defaultAchieved={krPayload.completed}
          defaultRatingId={krPayload.ratingId}
          afterSubmit={afterSubmit}
          objective={currentObjective}
          keyResult={currentObjective?.keyResults?.find(
            (x) => x.keyResultId === krPayload.keyResultId
          )}
          action={'edit'}
        />
      </BaseModal>
    </Box>
  );
};

export default Objectives;
