import {
  Typography,
  Box,
  createStyles,
  makeStyles,
  Dialog,
  DialogContent,
  IconButton,
} from "@material-ui/core";

import Close from "@material-ui/icons/Close";
import { noop } from "lodash";
import { useConfirm } from "material-ui-confirm";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  children: React.ReactNode;
  title?: string | React.ReactNode;
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl";
  fullScreen?: boolean;
  stickyBar?: React.ReactNode;
  disableEscKeyDown?: boolean;
  disableBackdropClick?: boolean;
  backgroundColor?: string;
  customStyle?: any;
  isFormDirty?: boolean;
}

const useStyles = makeStyles((theme) =>
  createStyles({
    modalIcon: {
      color: "#707070",
      fontSize: 16,
      paddingLeft: 3,
    },
    title: {
      fontFamily: "Open Sans",
      display: "flex",
      alignItems: "center",
      fontSize: 18,
      padding: 0,
      fontWeight: 600
    },
    linkTitle: {
      display: "flex",
      alignItems: "center",
      fontWeight: 500,
      fontSize: 18,
      padding: 0,
    },
    closeButton: {
      padding: 5,
      position: "absolute",
      top: 5,
      right: 5,
    },
    closeIcon: {
      color: theme.palette.grey[500],
      fontSize: 22,
    },
  })
);

const BaseModal = ({
  children,
  open,
  setOpen,
  title,
  maxWidth,
  fullScreen,
  stickyBar,
  disableEscKeyDown = false,
  disableBackdropClick = false,
  backgroundColor = "#FCFCFC",
  customStyle = {},
  isFormDirty = false,
}: Props) => {
  const confirm = useConfirm();

  const handleModalClose = (event, reason) => {
    if (
      (disableEscKeyDown && reason === "escapeKeyDown") ||
      (disableBackdropClick && reason === "backdropClick")
    ) {
      // Prevent closing the Dialog
      return;
    }

    if (isFormDirty) {
      confirm({
        title: "Are you sure you want to leave this page?",
        description: (
          <Typography>You will lose the changes you have made.</Typography>
        ),
        cancellationText: "Cancel",
        confirmationText: "Continue without saving",
      })
        .then(() => {
          setOpen(false);
        })
        .catch(noop);
    } else {
      setOpen(false);
    }
  };

  const classes = useStyles();

  return (
    <Dialog
      fullWidth={true}
      fullScreen={fullScreen}
      maxWidth={maxWidth ?? "xl"}
      open={open}
      onClose={handleModalClose}
      PaperProps={{
        style: {
          borderRadius: 16,
          padding: 30,
          backgroundColor,
          ...customStyle,
        },
      }}
    >
      <Box
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: 0,
          margin: 0,
          fontFamily: "Open Sans",
        }}
      >
        <Typography className={classes.title}>{title}</Typography>
        <IconButton
          className={classes.closeButton}
          onClick={(e) => handleModalClose(e, "")}
        >
          <Close className={classes.closeIcon} />
        </IconButton>
      </Box>
      {stickyBar && (
        <Box style={{ margin: "20px 0 10px 0px" }}>{stickyBar}</Box>
      )}
      <DialogContent style={{ padding: 0, margin: 0 }}>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default BaseModal;
