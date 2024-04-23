import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Box, Menu, MenuItem, IconButton, Typography } from "@material-ui/core";
import { useState } from "react";
import { useSnackbar } from "notistack";
import { useConfirm } from "material-ui-confirm";
import { noop } from "lodash";
import { renderInitiativeDialog } from "../../PortfolioBoard";
import { useInitiatives } from "../../../../hooks/useInitiatives";

const OptionsCell = (row, contextId) => {
  const { enqueueSnackbar } = useSnackbar();

  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  const handleMenuOpen = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const handleEdit = () => {
    // Handle edit action
    setIsEdit(true);
    handleMenuClose();
  };

  const handleDelete = () => {
    // Handle delete action
    renderConfirmDelete(row.roomId, row.roomName);
    handleMenuClose();
  };

  const confirm = useConfirm();
  const { update, remove } = useInitiatives();

  const renderConfirmDelete = (roomId, roomName) =>
    confirm({
      title: "Warning: This action cannot be undone!",
      description: (
        <Typography>Are you sure you want to delete {roomName}?</Typography>
      ),
      cancellationText: "No",
      confirmationText: "Yes",
    })
      .then(() => onDelete?.(roomId))
      .catch(noop);

  const onDelete = async (roomId: string) => {
    try {
      await remove(roomId).then(() => {
        enqueueSnackbar("Initiative has been deleted.", {
          variant: "success",
          persist: false,
        });
      });
    } catch (error) {
      enqueueSnackbar("Error during delete. Please try again.", {
        variant: "error",
        persist: false,
      });

      console.log(`Error on delete : `, error);
    }
  };

  const handleUnarchive = async () => {
    const unarchive = {
      ...row,
      isArchived: false,
    };

    await update(unarchive).then(() => {
      enqueueSnackbar("Initiative has been unarchived.", {
        variant: "success",
        persist: false,
      });
    });
  };

  return (
    <Box>
      <IconButton size="small" onClick={handleMenuOpen}>
        <MoreVertIcon />
      </IconButton>

      <Menu
        anchorEl={menuAnchorEl}
        open={Boolean(menuAnchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
        <MenuItem onClick={handleEdit}>Edit</MenuItem>
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
        <MenuItem onClick={handleUnarchive}>Unarchive</MenuItem>
      </Menu>

      {isEdit &&
        renderInitiativeDialog({
          contextId,
          open: isEdit,
          setOpen: setIsEdit,
          defaultValue: row,
        })}
    </Box>
  );
};

export default OptionsCell;
