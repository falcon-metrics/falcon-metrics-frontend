import {
  Box,
  FormHelperText,
  IconButton,
  TextField,
  Typography,
} from "@material-ui/core";
import { DataGridPro, GridColumns } from "@mui/x-data-grid-pro";
import _, { noop } from "lodash";
import {
  AddButton,
  GridToolbarWrapper,
} from "views/BusinessScorecard/views/BusinessScorecardPage";
import {
  MetricsEntry,
  Perspective,
} from "views/BusinessScorecard/interfaces/interfaces";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { useConfirm } from "material-ui-confirm";
import { ModalFilterContainer } from "../ScorecardTable/styles";
import { useState } from "react";
import CustomGridPanel from "components/UI/CustomGridPanel";

const getColumns = (onRemovePerspective, handleEditClick): GridColumns => {
  return [
    {
      field: "name",
      headerName: "Name",
      renderHeader: () => {
        return <strong>Name</strong>;
      },
      renderCell: (props: any) => {
        return (
          <>
            <span>{props.row.name}</span>
          </>
        );
      },
      flex: 1,
    },
    {
      field: "actions",
      headerName: "Actions",
      renderHeader: () => <b>Actions</b>,
      renderCell: (props: any) => {
        return (
          <Box display="flex">
            <Box style={{ width: 30 }}>
              <IconButton
                color="inherit"
                size="small"
                aria-label="edit"
                onClick={() => {
                  handleEditClick(props?.row);
                }}
              >
                <EditIcon fontSize="small" />
              </IconButton>
            </Box>
            <Box style={{ width: 30 }}>
              <IconButton
                color="inherit"
                size="small"
                aria-label="Delete"
                onClick={() => {
                  onRemovePerspective(props?.row);
                }}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>
        );
      },
      sortable: false,
      width: 90,
      headerAlign: "center",
      filterable: false,
      align: "center",
      disableColumnMenu: true,
      disableReorder: true,
    },
  ];
};

type PerspectiveTableProps = {
  setPerspectiveModalData: any;
  perspectives: Perspective[];
  setPerspectives: any;
  openPerspectiveModal: boolean;
  setOpenPerspectiveModal: any;
  onSave: any;
  metrics: MetricsEntry[];
};
const PerspectiveTable = (props: PerspectiveTableProps) => {
  const confirm = useConfirm();
  const onRemovePerspective = (perspectiveRow) => {
    confirm({
      title: "Before you delete this perspective",
      description: (
        <>
          <Typography>
            All the metrics under this perspective will be deleted for all
            boards
          </Typography>
          <Typography>Do you want to continue?</Typography>
        </>
      ),
      cancellationText: "Cancel",
      confirmationText: "Delete",
    })
      .then(() => {
        const perspectivesCopy = _.cloneDeep(props.perspectives);
        props.setPerspectives(
          perspectivesCopy.filter((i) => i.id !== perspectiveRow.id)
        );
        props.onSave(
          perspectivesCopy.filter((i) => i.id !== perspectiveRow.id)
        );
      })
      .catch(noop);
  };

  const handleEditClick = (perspectiveRow) => {
    const perspectiveCopy = _.cloneDeep(
      props.perspectives.find((i) => i.id === perspectiveRow.id)
    );
    if (perspectiveCopy) {
      props.setPerspectiveModalData(perspectiveCopy);
      props.setOpenPerspectiveModal(!props.openPerspectiveModal);
    }
  };

  const [query, setQuery] = useState("");

  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: 500,
        maxHeight: 500,
        paddingTop: 15,
      }}
    >
      <ModalFilterContainer>
        <Box display="flex" flexDirection="column" width="100%">
          <FormHelperText>Filter</FormHelperText>
          <TextField
            fullWidth
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </Box>
      </ModalFilterContainer>
      <DataGridPro
        columns={getColumns(onRemovePerspective, handleEditClick)}
        rows={props.perspectives}
        // autoHeight
        hideFooter
        filterModel={{
          items: [
            {
              columnField: "name",
              operatorValue: "contains",
              value: query,
            },
          ],
        }}
        disableColumnFilter={true}
        components={{
          Toolbar: () => {
            return (
              <GridToolbarWrapper>
                <AddButton
                  startIcon={<AddIcon />}
                  onClick={() => {
                    props.setPerspectiveModalData({
                      id: undefined,
                      name: "",
                    });
                    props.setOpenPerspectiveModal(!props.openPerspectiveModal);
                  }}
                >
                  Add perspective
                </AddButton>
              </GridToolbarWrapper>
            );
          },
          Panel: CustomGridPanel
        }}
      />
    </Box>
  );
};

export default PerspectiveTable;
