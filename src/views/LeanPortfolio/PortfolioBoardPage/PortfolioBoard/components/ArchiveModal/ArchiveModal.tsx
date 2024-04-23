import BaseModal from "components/UI/BaseModal/BaseModal2";
import { useInitiatives } from "../../../../hooks/useInitiatives";
import ArchiveTable from "./ArchiveTable";
import { GridColDef } from "@mui/x-data-grid-pro";
import CenteredDateCell from "components/UI/CenteredDateCell";
import { useState } from "react";
import { Box, Button, DialogActions, TextField } from "@material-ui/core";
import OptionsCell from "./OptionsCell";
import { useSnackbar } from "notistack";
import ContextCell from "./ContextCell";
import Spinner from "components/UI/MUIFormInput/components/MUIFormInputSpinner/MUIFormInputSpinner";

export interface ArchiveModalProps {
  contextId: string | undefined;
  open: boolean;
  setOpen: (value: boolean) => void;
  isAdminOrPowerUser: boolean;
}

const getColumns = (contextId, isAdminOrPowerUser) => {
  const columns: GridColDef[] = [
    {
      field: "roomName",
      width: 320,
      renderHeader: () => <b>{"Initiative"}</b>,
    },
    {
      field: "beginDate",
      width: 175,
      renderHeader: () => <b>{"Start Date"}</b>,
      renderCell: CenteredDateCell,
    },
    {
      field: "endDate",
      width: 175,
      renderHeader: () => <b>{"End Date"}</b>,
      renderCell: CenteredDateCell,
    },
    {
      field: "roomId",
      width: 320,
      renderHeader: () => <b>{"Boards & Aggregations"}</b>,
      renderCell: (params) => ContextCell(params.row),
    },
    {
      field: "rowValue",
      width: 25,
      renderHeader: () => <div />,
      disableColumnMenu: true,
      disableReorder: true,
      sortable: false,
      hide: !isAdminOrPowerUser,
      renderCell: (params) => OptionsCell(params.row, contextId),
    },
  ];

  return columns;
};

const ArchiveModal = ({
  contextId,
  open,
  setOpen,
  isAdminOrPowerUser,
}: ArchiveModalProps) => {
  const { obeyaRoomData, update, loading, mutate } = useInitiatives();
  const { enqueueSnackbar } = useSnackbar();

  const archiveList = obeyaRoomData
    .filter((item) => item.isArchived)
    .map((row) => ({
      ...row,
      id: row.roomId,
    }));
  const [query, setQuery] = useState("");

  const [selection, setSelection] = useState<string[]>([]);

  const handleArchiveClick = async () => {
    const unarchive = archiveList
      .filter((item) => selection.includes(item.id))
      .map((item) => ({
        ...item,
        isArchived: false,
      }));

    await update(unarchive).then(() => {
      enqueueSnackbar("Initiatives has been unarchived.", {
        variant: "success",
        persist: false,
      });

      mutate({ data: { initiatives: unarchive } }, true);
    });
  };

  return (
    <BaseModal
      open={open}
      setOpen={setOpen}
      maxWidth="lg"
      title={"Manage Archive"}
      stickyBar={
        <Box display="flex" justifyContent="space-between">
          <TextField
            fullWidth
            size="small"
            variant="outlined"
            label="Filter"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </Box>
      }
    >
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          overflowY: "hidden",
          height: "100%",
        }}
      >
        <Box style={{ flex: 1, overflowY: "auto" }}>
          <ArchiveTable
            loading={!obeyaRoomData || loading}
            rows={archiveList}
            query={query}
            columns={getColumns(contextId, isAdminOrPowerUser)}
            queryFieldName="roomName"
            setSelection={setSelection}
          />
        </Box>
      </Box>
      { isAdminOrPowerUser && <DialogActions>
        <Button
          onClick={handleArchiveClick}
          color="primary"
          variant="contained"
          style={{ marginLeft: 10 }}
          disabled={selection.length === 0}
          startIcon={<Spinner isVisible={loading} />}
        >
          Unarchive
        </Button>
      </DialogActions> }
    </BaseModal>
  );
};

export default ArchiveModal;
