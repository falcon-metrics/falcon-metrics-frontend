import { Dialog, DialogContent } from "@material-ui/core";

import { useExtendedCardDetails } from "hooks/fetch/useExtendedCardDetails";
import DialogTitle from "./DialogTitle";
import ExtendedCardContent from "./ExtendedCardContent";
import ExtendedCardSkeleton from "./ExtendedCardSkeleton";

import { useStyles } from "./styles";
import useFilterPanelContext from "views/Dashboard/views/Platform/views/FilterPanel/contexts/FilterPanelContext";
import { useSendTelemetry } from "core/api/CustomerTelemetryClient";
import { useEffect } from "react";
import { ExtendedCardDetailsTelemetryAction } from "core/api/telemetry/types";

interface Props {
  selectedWorkItemId: string;
  perspective: string;
  open: boolean;
  setOpen: (open: boolean) => void;
}

const ExtendedCardDialog = ({
  selectedWorkItemId,
  perspective,
  open,
  setOpen,
}: Props) => {
  const classes = useStyles();
  const handleClose = () => setOpen(false);

  const { appliedFilters, apiQueryParameters } = useFilterPanelContext();

  const { data, isLoading } = useExtendedCardDetails(
    appliedFilters,
    { ...apiQueryParameters, ...{ perspective } },
    selectedWorkItemId

  );

  /*
   * Telemetry Action
   */
  const sendTelemetry = useSendTelemetry();
  useEffect(() => {
    sendTelemetry(
      ExtendedCardDetailsTelemetryAction.accessExtendedCardDetails,
      `Extended Card Details -> Flow Items accordion`,
      { page: "Flow Items" }
    );
  }, [sendTelemetry]);

  return (
    <Dialog
      fullWidth={true}
      maxWidth={"lg"}
      open={open}
      onClose={handleClose}
      PaperProps={{
        style: {
          borderRadius: 16,
          padding: 30,
          backgroundColor: "#fbfbfb"
        },
      }}
    >
      {isLoading ? (
        <ExtendedCardSkeleton open={false} setOpen={setOpen} />
      ) : (
        <>
          <DialogTitle data={data} workItemId={selectedWorkItemId} />
          <DialogContent className={classes.modalContent}>
            <ExtendedCardContent
              data={data}
              open={open}
              setOpen={setOpen}
              perspective={perspective}
            />
          </DialogContent>
        </>
      )}
    </Dialog>
  );
};

export default ExtendedCardDialog;
