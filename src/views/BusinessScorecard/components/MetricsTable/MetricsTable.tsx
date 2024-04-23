import {
  Box,
  FormHelperText,
  IconButton,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import { DataGridPro, GridColumns } from "@mui/x-data-grid-pro";
import _, { noop } from "lodash";
import {
  AddButton,
  GridToolbarWrapper,
} from "views/BusinessScorecard/views/BusinessScorecardPage";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import {
  MetricsEntry,
  Perspective,
} from "views/BusinessScorecard/interfaces/interfaces";
import {
  findContextAndParentDisplayNamesById,
  metricTypes,
} from "views/BusinessScorecard/utils/utils";
import { useConfirm } from "material-ui-confirm";
import { Context } from "views/Dashboard/views/AnalyticsDashboard/interfaces/Context";
import { useMemo, useState } from "react";
import { ModalFilterContainer } from "../ScorecardTable/styles";
import CustomGridPanel from "components/UI/CustomGridPanel";

const getMetricColumns = (
  onRemoveMetric,
  handleMetricEdit,
  perspectives,
  contexts
): GridColumns => {
  return [
    {
      field: "perspective",
      headerName: "Perspective",
      renderHeader: () => {
        return <strong>Perspective</strong>;
      },
      renderCell: (props: any) => {
        return (
          <>
            <span>
              {perspectives.find((i) => i.id === props.row.perspective)?.name}
            </span>
          </>
        );
      },
      flex: 1,
    },
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
      field: "type",
      headerName: "Type",
      renderHeader: () => {
        return <strong>Type</strong>;
      },
      renderCell: (props: any) => {
        return (
          <>
            <span>
              {metricTypes.find((i) => i.id === props.row.type)?.displayName ||
                ""}
            </span>
          </>
        );
      },
      flex: 1,
    },
    {
      field: "target",
      headerName: "Target",
      renderHeader: () => {
        return <strong>Target</strong>;
      },
      renderCell: (props: any) => {
        let string = "";
        if (props.row.type === "fitness-criteria") {
          string = "Minimum of " + props.row.target;
        } else if (props.row.type === "health-indicator") {
          string =
            "Between " + props.row.lowerLimit + " and " + props.row.upperLimit;
        } else if (props.row.type === "improvement-driver") {
          string = "Target of " + props.row.target;
        } else {
          string = "";
        }
        return (
          <>
            <span>{string}</span>
          </>
        );
      },
      flex: 1,
    },
    {
      field: "context",
      headerName: "Boards and aggregations",
      renderHeader: () => {
        return <strong>Boards and aggregations</strong>;
      },
      renderCell: (props) => {
        const displayNames: string[] =
          findContextAndParentDisplayNamesById(props.row.context, contexts) ||
          [];
        return (
          <>
            <span>{displayNames.reverse().join(" | ")}</span>
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
                  handleMetricEdit(props?.row);
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
                  onRemoveMetric(props?.row);
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
type MetricsTableProps = {
  metrics: MetricsEntry[];
  setMetrics: any;
  setMetricModalData: any;
  setOpenEditMetricModal: any;
  openEditMetricModal: boolean;
  perspectives: Perspective[];
  onSave: any;
  contexts: Context[] | undefined;
};
const MetricsTable = (props: MetricsTableProps) => {
  const confirm = useConfirm();
  const onRemoveMetric = (metricRow) => {
    confirm({
      title: "Are you sure you want to delete this metric?",
      description: (
        <Typography>This metric and all its data will be deleted</Typography>
      ),
      cancellationText: "Cancel",
      confirmationText: "Delete",
    })
      .then(() => {
        const metricsCopy = _.cloneDeep(props.metrics);
        props.setMetrics(metricsCopy.filter((i) => i.id !== metricRow.id));
        props.onSave(metricsCopy.filter((i) => i.id !== metricRow.id));
      })
      .catch(noop);
  };

  const handleMetricEdit = (metricRow) => {
    props.setMetricModalData(props.metrics.find((i) => i.id === metricRow.id));
    props.setOpenEditMetricModal(!props.openEditMetricModal);
  };

  const [query, setQuery] = useState("");
  const [filterBy, setFilterBy] = useState("name");

  // Metrics based on perspectives that exist only
  const filteredMetrics = useMemo(() => {
    return props.metrics.filter((metric) =>
      props.perspectives.some(
        (perspective) => perspective.id === metric.perspective
      )
    );
  }, [props.metrics, props.perspectives]);

  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: 650,
        maxHeight: 650,
        paddingTop: 15,
      }}
    >
      <ModalFilterContainer>
        <Box display="flex" flexDirection="column">
          <FormHelperText>Filter By</FormHelperText>
          <Select
            label="Filter By"
            defaultValue={"name"}
            style={{ width: "220px" }}
            onChange={(e: any) => setFilterBy(e.target.value)}
          >
            <MenuItem value="" disabled>
              Filter by
            </MenuItem>

            <MenuItem value="name">Name</MenuItem>
            <MenuItem value="type">Type</MenuItem>
            <MenuItem value="target">Target</MenuItem>
          </Select>
        </Box>
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
        columns={getMetricColumns(
          onRemoveMetric,
          handleMetricEdit,
          props.perspectives,
          props.contexts
        )}
        rows={filteredMetrics}
        // autoHeight
        hideFooter
        filterModel={{
          items: [
            {
              columnField: filterBy,
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
                    const newMetric: MetricsEntry = {
                      id: undefined,
                      name: "",
                      type: "",
                      lowerLimit: 0,
                      upperLimit: 0,
                      target: 0,
                      metricValues: [],
                      perspective: undefined,
                      context: "",
                    };
                    props.setMetricModalData(newMetric);
                    props.setOpenEditMetricModal(!props.openEditMetricModal);
                  }}
                >
                  Add Metric
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

export default MetricsTable;
