import BaseModal from "components/UI/BaseModal/BaseModal2";
import ManageColumnForm from "./ManageColumnForm";
import { Column } from "../../../../interfaces/PortfolioBoard";
import { useState } from "react";
import { useConfirm } from "material-ui-confirm";
import { Typography } from "@material-ui/core";
import { noop } from "lodash";

export interface ManageColumnProps {
  lastCount?: number;
  contextId: string | undefined;
  open: boolean;
  setOpen: (value: boolean) => void;
  defaultValue: Column | undefined;
}

const ManageColumnModal = ({
  contextId,
  open,
  setOpen,
  defaultValue,
}: ManageColumnProps) => {
  const title = `${!defaultValue ? "Add" : "Edit"} Column`;
  const [isFormDirty, setFormDirty] = useState(false);
  const [isFormModified, setFormModified] = useState(false);

  const confirm = useConfirm();

  const handleModalClose = () => {
    if (isFormDirty) {
      if (!defaultValue || isFormModified) {
        confirm({
          title: "Are you sure you want to leave this page?",
          description: (
            <Typography>You will lose the changes you have made.</Typography>
          ),
          cancellationText: "Cancel",
          confirmationText: "Continue without saving",
        })
          .then(() => setOpen(false))
          .catch(noop);
      } else {
        setOpen(false);
      }
    } else {
      setOpen(false);
    }
  };
  

  return (
    <BaseModal
      open={open}
      setOpen={handleModalClose}
      maxWidth="sm"
      title={title}
      disableBackdropClick
      disableEscKeyDown={!isFormDirty && isFormModified} //disable all the time except when form is dirty, a confirmation should show
    >
      <ManageColumnForm
        contextId={contextId}
        open={open}
        setOpen={setOpen}
        defaultValue={defaultValue}
        setFormDirty={setFormDirty}
        setFormModified={setFormModified}
      />
    </BaseModal>
  );
};

export default ManageColumnModal;
