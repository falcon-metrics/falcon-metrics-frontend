import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { Box, CardHeader, Menu, MenuItem, Typography } from "@material-ui/core";
import _, { noop } from "lodash";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import DragIndicatorIcon from "@material-ui/icons/DragIndicator";
import InnerDragComponent from "../InnerDragComponent";
import { useConfirm } from "material-ui-confirm";
import { useSnackbar } from "notistack";
import { usePortfolio } from "views/LeanPortfolio/hooks/usePortfolio";
import { DragComponentProps } from "../InitiativeBoard/InitiativeBoard";
import { renderColumnDialog } from "../../PortfolioBoard";
import { ColumnCard, getColumnHeaderStyle, ColumnHeaderContent, ColumnTitle, ColumnMenuIcon, ColumnContent, getColumnContentStyle, Counter } from "../InitiativeBoard/styles";

interface OuterDragComponentProps extends DragComponentProps {
  index: number;
}

const OuterDragComponent: React.FC<OuterDragComponentProps> = ({
  index,
  contextId,
  column,
  initiatives,
  dragging,
  setDragging,
  isDragDisabled,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const { remove, mutate } = usePortfolio();

  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  const handleMenuOpen = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const handleEdit = () => {
    setIsEdit(true);
    handleMenuClose();
  };

  const handleDelete = () => {
    handleMenuClose();
    renderConfirmDelete(column);
  };

  const confirm = useConfirm();

  const renderConfirmDelete = (defaultValue) => {
    if (initiatives.length > 0) {
      enqueueSnackbar(
        "This column contains initiative. Please move them before deleting.",
        {
          variant: "error",
          persist: false,
        }
      );
    } else {
      confirm({
        title: "Warning: This action cannot be undone!",
        description: (
          <Typography>
            Are you sure you want to delete {defaultValue.columnName}?
          </Typography>
        ),
        cancellationText: "No",
        confirmationText: "Yes",
      })
        .then(() => onDelete(defaultValue.columnId))
        .catch(noop);
    }

    return null;
  };

  const onDelete = async (columnId: string) => {
    try {
      await remove(columnId).then(() => {
        enqueueSnackbar("Column has been deleted.", {
          variant: "success",
          persist: false,
        });

        mutate(columnId, true);
      });
    } catch (error) {
      enqueueSnackbar("Error during save. Please try again.", {
        variant: "error",
        persist: false,
      });
    }
  };

  return (
    <>
      <Draggable
        key={column.columnId}
        draggableId={column.columnId}
        index={index}
        isDragDisabled={isDragDisabled}
      >
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            style={{
              ...provided.draggableProps.style,
            }}
            onDragStart={() => setDragging(false)}
          >
            <ColumnCard>
              <CardHeader
                {...provided.dragHandleProps}
                style={getColumnHeaderStyle(column.colour)}
                title={
                  <Box display="flex" justifyContent="space-between">
                    <ColumnHeaderContent>
                      {!isDragDisabled && <DragIndicatorIcon color="inherit" />}
                      <ColumnTitle>
                        {_.truncate(column.columnName, {
                          length: 32,
                          omission: "...",
                        })} &nbsp;
                        <Counter>{ initiatives.length > 0 && `(${initiatives.length})` }</Counter>
                      </ColumnTitle>
                    </ColumnHeaderContent>
                    {!isDragDisabled && (
                      <ColumnMenuIcon
                        size="small"
                        id={`${column.columnId}`}
                        onClick={handleMenuOpen}
                      >
                        <MoreVertIcon />
                      </ColumnMenuIcon>
                    )}
                  </Box>
                }
              />
              <ColumnContent style={getColumnContentStyle()}>
                <InnerDragComponent
                  contextId={contextId}
                  column={column}
                  initiatives={initiatives}
                  dragging={dragging}
                  setDragging={setDragging}
                  isDragDisabled={isDragDisabled}
                />
              </ColumnContent>
            </ColumnCard>
          </div>
        )}
      </Draggable>

      <Menu
        anchorEl={menuAnchorEl}
        open={Boolean(menuAnchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleEdit}>Edit</MenuItem>
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>

      {isEdit &&
        renderColumnDialog({
          contextId,
          open: isEdit,
          setOpen: setIsEdit,
          defaultValue: column,
        })}
    </>
  );
};

export default OuterDragComponent;
