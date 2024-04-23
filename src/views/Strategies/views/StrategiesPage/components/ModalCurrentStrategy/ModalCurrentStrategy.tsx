import BaseModal from "components/UI/BaseModal/BaseModal2";
import { useStyles } from "./ModalCurrentStrategy.styles";
import FormCurrentStrategy from "../FormCurrentStrategy";
import { EditIconWrapper } from "views/NorthStar/views/NorthStarPage.styles";
import { styled } from "@material-ui/styles";
import { useStrategy } from "views/Strategies/hooks/useStrategies";
import { useContext, useEffect, useState } from "react";
import { SelectedContextIdContext } from "components/UserStateProvider/UserStateProvider";
import _ from "lodash";
import { v4 as uuid } from "uuid";
import { useRelationships } from "components/RelationshipForm/hooks/useRelationships";
import { useGovernanceObeyaContext } from "views/Governance/views/GovernanceObeya/views/GovernanceObeyaHome/GovernanceObeyaContext";
import { calculateTimeSinceLastEdit } from "../../utils";

export const EditIcon = styled(EditIconWrapper)({
  color: "#333",
  fontSize: 24,
});

const ModalCurrentStrategy = ({
  isOpen,
  setOpenModal,
  title,
  mutate,
  postStrategy,
  updateStrategy,
  selectedHorizon,
  setLastEditStatement,
  lastUserWhoDidEdit,
}: {
  handleOpenModal?: any;
  isOpen: boolean;
  title?: string;
  setOpenModal?: any;
  mutate?: any;
  updateStrategy?: any;
  postStrategy?: any;
  selectedHorizon?: any;
  setLastEditStatement?: any;
  lastUserWhoDidEdit?: any;
}) => {
  const classes = useStyles();
  const { contextId } = useContext(SelectedContextIdContext);
  const { data } = useStrategy("strategies", contextId, selectedHorizon);
  const { activeRoom } = useGovernanceObeyaContext();
  const { mutate: mutateRelationships } = useRelationships(
    "obeyaRoom",
    activeRoom?.roomName || ""
  );

  useEffect(() => {
    // Fetch strategy data when the modal is opened or when selectedHorizon changes
    if (isOpen || selectedHorizon) {
      mutate();
    }
  }, [isOpen, selectedHorizon]);

  const onSubmitValues = async (formValues, afterSuccess) => {
    setLastEditStatement(
      `Last edit was made ${calculateTimeSinceLastEdit(
        new Date()
      )} ago ${lastUserWhoDidEdit}`
    );
    try {
      let updatedStrategy = _.cloneDeep(data?.[0]);
      updatedStrategy = { ...updatedStrategy, ...formValues };
      setOpenModal(false);
      if (formValues?.id) {
        mutate({ data: [updatedStrategy] }, false);
        await updateStrategy(formValues);
        await mutate();
      } else {
        if (updatedStrategy) {
          const payload = {
            ...formValues,
            // Setting a random id here
            // The strategies component checks for the id
            id: uuid(),
            okrs: [],
          };
          // There can only be one strategy per context
          // So we can call mutate right after form submit
          // Since there can only be one strategy for this context, the id returned by the backend doesnt actually matter
          // In the future if we decide to support
          // multiple strategies per context, we'll have to change this code
          mutate({ data: [payload] }, false);
          mutateRelationships({ data: [] }, true);
          await postStrategy(payload);
          // After creating the strategy, call get strategies to get the ID
          await mutate({ data: [payload] }, true);
        }
      }
      afterSuccess();
    } catch (e) {
      console.log("error when postVision", e);
    }
  };

  const [isFormDirty, setFormDirty] = useState(false);

  return (
    <div className={classes.sm}>
      <BaseModal
        maxWidth="md"
        open={isOpen}
        setOpen={setOpenModal}
        title={title}
        disableEscKeyDown={!isFormDirty}
        disableBackdropClick
        isFormDirty={isFormDirty}
      >
        <FormCurrentStrategy
          onSubmit={onSubmitValues}
          selectedHorizon={selectedHorizon}
          setFormDirty={setFormDirty}
          isFormDirty={isFormDirty}
          // setFormModified={setFormModified}
        />
      </BaseModal>
    </div>
  );
};

export default ModalCurrentStrategy;
