import { useEffect, useMemo, useState } from "react";
import { ButtonContainer } from "./styles";
import { PortfolioBoardData } from "../../interfaces/PortfolioBoard";
import { initialData } from "./data/mock";
import ManageColumnModal from "./components/ManageColumn";
import { ManageColumnProps } from "./components/ManageColumn/ManageColumnModal";
import ManageInitiativeModal from "./components/ManageInitiative";
import { ManageInitiativeProps } from "./components/ManageInitiative/ManageInitiativeModal";
import { Box, IconButton, Menu, MenuItem } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ArchiveModal from "./components/ArchiveModal";
import { ArchiveModalProps } from "./components/ArchiveModal/ArchiveModal";
import useAuthentication from "hooks/useAuthentication";
import { usePortfolioBoardPageContext } from "../../contexts/PortfolioBoardPageContext";
import InitiativeBoard from "./components/InitiativeBoard";
import InitiativeBoardLoader from "./components/InitiativeBoard/InitiativeBoardLoader";
import { usePortfolio } from "views/LeanPortfolio/hooks/usePortfolio";
import { AccordionKeys, useBaseAccordionContext } from "views/Dashboard/views/AnalyticsDashboard/components/BaseAccordion/BaseAccordionContext";

export const renderColumnDialog = ({ ...props }: ManageColumnProps) => {
  return <ManageColumnModal {...props} />;
};

export const renderInitiativeDialog = ({ ...props }: ManageInitiativeProps) => {
  return <ManageInitiativeModal {...props} />;
};
export const renderArchiveDialog = ({ ...props }: ArchiveModalProps) => {
  return <ArchiveModal {...props} />;
};

const PortfolioBoard = () => {
  const {
    showChildren,
    obeyaRoomData,
    contextId,
    childContexts,
    selectedContexts,
  } = usePortfolioBoardPageContext();

  const { data: columns, isLoading } = usePortfolio();

  const columnsWithRoomIds = useMemo(() => {
    const sorted = columns.sort((a: any, b: any) => a.order - b.order);
    return Object.values(sorted).map((column: any) => {
      let filteredRooms = obeyaRoomData;
      if (selectedContexts.length > 0) {
        const [level1, level2, level3] = selectedContexts;
        if (level1 === "" && level2 === "" && level3 === "") {
          filteredRooms = showChildren
            ? obeyaRoomData
            : obeyaRoomData.filter((room: any) => room.contextId === contextId);
        } else if (level1 && !level2 && !level3) {
          filteredRooms = obeyaRoomData.filter(
            (room: any) =>
              room.contextId === level1 ||
              (showChildren && childContexts.includes(room.contextId))
          );
        } else if (level1 && level2 && !level3) {
          filteredRooms = obeyaRoomData.filter(
            (room: any) =>
              room.contextId === level2 ||
              (showChildren && childContexts.includes(room.contextId))
          );
        } else if (level1 && level2 && level3) {
          filteredRooms = obeyaRoomData.filter(
            (room) => room.contextId === level3
          );
        }
      }

      const roomIds = filteredRooms
        .filter((room) => room.columnId === column.columnId && !room.isArchived)
        .sort((a: any, b: any) => a.order - b.order);

      return {
        ...column,
        roomIds: roomIds,
      };
    });
  }, [columns, obeyaRoomData, selectedContexts, showChildren]);

  const mappedColumns = useMemo(() => {
    return columnsWithRoomIds.reduce((acc, curr) => {
      acc[curr.columnId] = curr;
      return acc;
    }, {});
  }, [columnsWithRoomIds]);

  const [portfolio, setPortfolio] = useState<PortfolioBoardData>(initialData);
  useEffect(() => {
    setPortfolio({
      initiatives: obeyaRoomData.filter((item) => !item.isArchived),
      columns: mappedColumns,
      columnOrder: Object.values(mappedColumns).map((col: any) => col.columnId),
    });
  }, [obeyaRoomData, mappedColumns, contextId]);

  const [showColumnDialog, setShowColumnDialog] = useState(false);
  const [showManageInitiative, setShowInitiativeDialog] = useState(false);
  const [showArchive, setShowArchiveDialog] = useState(false);

  const isFormLoading =
    isLoading || portfolio === undefined || portfolio === null;

  const [menuAnchorEl, setMenuAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const onAddColumn = () => {
    handleMenuClose();
    setShowColumnDialog(true);
  };

  const onAddInitiative = () => {
    handleMenuClose();
    setShowInitiativeDialog(true);
  };

  const onManageArchive = () => {
    handleMenuClose();
    setShowArchiveDialog(true);
  };

  const { isAdminOrPowerUser } = useAuthentication();

  // This code handles the visibility of the menu icon button along with the open state of the accordion
  // Without this, when the accordion closes, it leaves the icon button momentarily visible
  const { activeAccordions } = useBaseAccordionContext();
  const isActive = activeAccordions.includes(AccordionKeys.PortfolioBoardKey);

  return (
    <Box style={{ flex: 1 }}>
      {isActive && (
        <ButtonContainer>
          <IconButton size="small" onClick={handleMenuOpen}>
            <MoreVertIcon />
          </IconButton>
        </ButtonContainer>
      )}

      {isFormLoading && Object.keys(portfolio.columns).length === 0 ? (
        <InitiativeBoardLoader />
      ) : (
        <InitiativeBoard
          contextId={contextId}
          portfolio={portfolio}
          setShowColumnDialog={setShowColumnDialog}
          isAdminOrPowerUser={isAdminOrPowerUser}
        />
      )}

      <Menu
        anchorEl={menuAnchorEl}
        open={Boolean(menuAnchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
        {isAdminOrPowerUser && (
          <div>
            <MenuItem onClick={onAddColumn}>Add Column</MenuItem>
            <MenuItem onClick={onAddInitiative}>Add Initiative</MenuItem>
          </div>
        )}

        <MenuItem onClick={onManageArchive}>Archived Initiatives</MenuItem>
      </Menu>

      {showColumnDialog &&
        renderColumnDialog({
          contextId,
          lastCount: portfolio.columnOrder.length,
          open: showColumnDialog,
          setOpen: setShowColumnDialog,
          defaultValue: undefined,
        })}

      {showManageInitiative &&
        renderInitiativeDialog({
          contextId,
          open: showManageInitiative,
          setOpen: setShowInitiativeDialog,
          defaultValue: undefined,
        })}

      {showArchive &&
        renderArchiveDialog({
          contextId,
          open: showArchive,
          setOpen: setShowArchiveDialog,
          isAdminOrPowerUser,
        })}
    </Box>
  );
};

export default PortfolioBoard;
