import {
  Button,
  Box,
  IconButton,
  Chip,
  Divider,
  AccordionDetails,
} from "@material-ui/core";
import {
  MetricSnapshot,
  MetricsEntry,
  PerspectiveEntry,
} from "views/BusinessScorecard/interfaces/interfaces";
import {
  findContextAndParentDisplayNamesById,
  metricTypes,
} from "views/BusinessScorecard/utils/utils";
import {
  DataGridPro,
  GridColumns,
  GridSelectionModel,
} from "@mui/x-data-grid-pro";
import { useEffect, useState } from "react";
import MetricValuesChart from "../MetricValuesChart";
import Close from "@material-ui/icons/Close";
import { ArrowDropDown, ArrowDropUp, Remove } from "@material-ui/icons";
import BaseModal from "components/UI/BaseModal/BaseModal2";
import MetricSnapshotForm from "../MetricSnapshotForm/MetricSnapshotForm";
import { ToggleButton } from "@material-ui/lab";
import { DateTime } from "luxon";
import RelationshipsMinifiedDisplay from "components/RelationsipsMinifiedDisplay";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Context } from "views/Dashboard/views/AnalyticsDashboard/interfaces/Context";
import { formatDate } from "utils/dateTime";
import AddIcon from "@material-ui/icons/Add";
import {
  AccordionTitle,
  GraphContainer,
  GraphName,
  LastCheckin,
  LastCheckinContainer,
  MetricContainer,
  MetricCount,
  StyledAccordion,
  StyledAccordionSummary,
  TableHeader,
  ToggleButtonContainer,
  ToggleButtons,
} from "./styles";
import useAuthentication from "hooks/useAuthentication";
import ButtonTooltip from "views/Strategies/components/Tooltip/ButtonTooltip";
import CustomGridPanel from "components/UI/CustomGridPanel";

type ScorecardTableProps = {
  scorecardData: PerspectiveEntry;
  color: string;
  onSaveMetricSnapshot: any;
  contexts: Context[] | undefined;
};

const getScorecardTableColumns = (contexts): GridColumns => {
  return [
    {
      field: "name",
      headerName: "Metric",
      renderHeader: () => {
        return <TableHeader>Metric</TableHeader>;
      },
      renderCell: (props: any) => {
        return (
          <>
            <span
              style={{
                color: "#009CDE",
                paddingLeft: 6,
              }}
            >
              {props.row.name}
            </span>
          </>
        );
      },
      minWidth: 200,
    },
    {
      field: "name2",
      headerName: "Associations",
      renderHeader: () => {
        return <TableHeader></TableHeader>;
      },
      renderCell: (props: any) => {
        return (
          <>
            <RelationshipsMinifiedDisplay
              elementId={props.row.id || ""}
              elementType="metric"
              elementName={props.row.name}
            />
          </>
        );
      },
      width: 30,
    },
    {
      field: "context",
      headerName: "Boards and aggregations",
      renderHeader: () => {
        return <TableHeader>Boards and aggregations</TableHeader>;
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
      minWidth: 200,
    },
    {
      field: "type",
      headerName: "Type",
      renderHeader: () => {
        return <TableHeader>Type</TableHeader>;
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
      minWidth: 200,
    },
    {
      field: "target",
      headerName: "Target",
      renderHeader: () => {
        return <TableHeader>Target</TableHeader>;
      },
      renderCell: (props: any) => {
        let string = "";
        if (props.row.type === "fitness-criteria") {
          string = "Minimum of " + props.row.target + " " + props.row.unit;
        } else if (props.row.type === "health-indicator") {
          string =
            "Between " +
            props.row.lowerLimit +
            " and " +
            props.row.upperLimit +
            " " +
            props.row.unit;
        } else if (props.row.type === "improvement-driver") {
          string = props.row.target + " " + props.row.unit;
        } else {
          string = "";
        }
        return (
          <>
            <span>{string}</span>
          </>
        );
      },
      minWidth: 150,
    },
    {
      field: "metricValues2",
      headerName: "Actual",
      renderHeader: () => {
        return <TableHeader>Actual</TableHeader>;
      },
      renderCell: (props: any) => {
        return (
          <>
            <span>
              {props.row.metricValues && props.row.metricValues.length >= 1
                ? props.row.metricValues[props.row.metricValues.length - 1]
                  .value +
                " " +
                props.row.unit
                : "-"}
            </span>
          </>
        );
      },
      minWidth: 100,
    },
    {
      field: "metricValues3",
      headerName: "Improvement",
      renderHeader: () => {
        return <TableHeader>Improvement</TableHeader>;
      },
      renderCell: (props: any) => {
        let improvement: number | undefined = undefined,
          improvementIcon;
        if (
          props.row.metricValues &&
          props.row.metricValues.length >= 2 &&
          props.row.trendDirection
        ) {
          const currentValue =
            props.row.metricValues[props.row.metricValues.length - 1].value;
          const previousValue =
            props.row.metricValues[props.row.metricValues.length - 2].value;
          improvement =
            currentValue && previousValue
              ? ((currentValue - previousValue) / previousValue) * 100
              : 0;
          if (
            (improvement > 0 &&
              props.row.trendDirection === "higher-is-better") ||
            (improvement < 0 && props.row.trendDirection === "lower-is-better")
          ) {
            improvementIcon = (
              <ArrowDropUp style={{ color: "#10CFC9", fontSize: 50 }} />
            );
          } else if (
            (improvement < 0 &&
              props.row.trendDirection === "higher-is-better") ||
            (improvement > 0 && props.row.trendDirection === "lower-is-better")
          ) {
            improvementIcon = (
              <ArrowDropDown style={{ color: "#E74F3D", fontSize: 50 }} />
            );
          } else {
            improvementIcon = (
              <Remove style={{ color: "#F3BD48", fontSize: 50 }} />
            );
          }
        }
        const returnValue =
          improvement !== undefined ? (
            <>
              <span>{Math.ceil(Math.abs(improvement)) + "%"}</span>
              {improvementIcon}
            </>
          ) : (
            <span>-</span>
          );
        return returnValue;
      },
      minWidth: 150,
    },
    {
      field: "metricValues",
      headerName: "Status",
      width: 150,
      renderHeader: () => {
        return <TableHeader>Status</TableHeader>;
      },
      renderCell: (props: any) => {
        let label, color, fontColor;
        if (
          props.row.type === "fitness-criteria"
        ) {
          if (
            props.row.metricValues &&
            props.row.metricValues.length >= 1 &&
            props.row.metricValues[props.row.metricValues.length - 1].value >=
            props.row.target
          ) {
            label = "Above threshold";
            color = "#7FE4DF";
            fontColor = "#000000";
          } else {
            label = "Below threshold";
            color = "#FF585D";
            fontColor = "#FFFFFF";
          }
        } else if (
          props.row.type === "improvement-driver"
        ) {
          if (
            props.row.metricValues &&
            props.row.metricValues.length >= 1 &&
            props.row.metricValues[props.row.metricValues.length - 1].value >=
            props.row.target
          ) {
            label = "Above target";
            color = "#7FE4DF";
            fontColor = "#000000";
          } else {
            label = "Below target";
            color = "#FF585D";
            fontColor = "#FFFFFF";
          }
        } else if (props.row.type === "health-indicator") {
          if (
            props.row.metricValues &&
            props.row.metricValues.length >= 1 &&
            props.row.metricValues[props.row.metricValues.length - 1].value >=
            props.row.lowerLimit &&
            props.row.metricValues[props.row.metricValues.length - 1].value <=
            props.row.upperLimit
          ) {
            label = "Healthy";
            color = "#7FE4DF";
            fontColor = "#000000";
          } else {
            label = "Unhealthy";
            color = "#FF585D";
            fontColor = "#FFFFFF";
          }
        }
        //  else {
        //     label = 'Healthy';
        //     color = '#7FE4DF';
        //     fontColor = '#000000';
        // }
        return (
          <>
            {label && (
              <Box style={{ paddingRight: 10 }}>
                <Chip
                  label={label}
                  style={{
                    backgroundColor: color,
                    fontFamily: "Open Sans",
                    fontWeight: 400,
                    fontSize: "12px",
                    color: fontColor,
                  }}
                />
              </Box>
            )}
          </>
        );
      },
      minWidth: 100,
    },
  ];
};

const ScorecardTable = (props: ScorecardTableProps) => {
  const [selectedRow, setSelectedRow] = useState<GridSelectionModel>();
  const [graphData, setGraphData] = useState<any>({ actual: [] });
  const [
    openMetricSnapshotModal,
    setOpenMetricSnapshotModal,
  ] = useState<boolean>(false);
  const [selectedMetric, setSelectedMetric] = useState<MetricsEntry>();
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [selectedGranularity, setSelectedGranularity] = useState<string>("all");

  const { isAdminOrPowerUser } = useAuthentication();

  useEffect(() => {
    if (
      selectedRow === undefined &&
      props.scorecardData.metrics.length > 0 &&
      props.scorecardData.metrics[0].id
    ) {
      setSelectedRow([props.scorecardData.metrics[0].id]);
      populateGraphData([props.scorecardData.metrics[0].id]);
    }
  }, [props.scorecardData]);

  const filterValuesByGranularity = (
    values: MetricSnapshot[],
    granularity = selectedGranularity
  ) => {
    let months;
    switch (granularity) {
      case "1m":
        months = 1;
        break;
      case "3m":
        months = 3;
        break;
      case "6m":
        months = 6;
        break;
      case "1y":
        months = 12;
        break;
      default:
        months = 1;
        break;
    }
    if (granularity === "all") {
      return values;
    } else {
      const startDate = DateTime.now().minus({ months: months }).toMillis();
      const endDate = DateTime.now().toMillis();
      return values.filter((i) => {
        const time = DateTime.fromISO(i.recordedDate || "").toMillis();
        return time >= startDate && time <= endDate;
      });
    }
  };

  const populateGraphData = (selectedRow: GridSelectionModel) => {
    const tempData: any = {
      actual: [],
      type: "",
      name: "",
    };
    const metric = props.scorecardData.metrics.find(
      (i) => i.id === selectedRow[0]
    );

    setSelectedMetric(metric);

    if (metric && metric.metricValues) {
      tempData.actual = filterValuesByGranularity(metric?.metricValues).map(
        (i) => i.value
      );
      tempData.recordedDates = filterValuesByGranularity(
        metric?.metricValues
      ).map((i) => (i.recordedDate ? formatDate(i.recordedDate) : ""));
      if (
        metric &&
        (metric.type === "fitness-criteria" ||
          metric.type === "improvement-driver")
      ) {
        tempData.target = tempData.actual.map(() => metric?.target);
      } else if (metric && metric.type === "health-indicator") {
        tempData.lowerLimit = tempData.actual.map(() => metric?.lowerLimit);
        tempData.upperLimit = tempData.actual.map(() => metric?.upperLimit);
      }
    }
    tempData.type = metric?.type;
    tempData.name = metric?.name;
    setGraphData(tempData);
  };

  const onChangeGranularity = (value) => {
    const tempData: any = {
      actual: [],
      type: "",
      name: "",
    };

    if (selectedMetric && selectedMetric.metricValues) {
      tempData.actual = filterValuesByGranularity(
        selectedMetric?.metricValues,
        value
      ).map((i) => i.value);
      tempData.recordedDates = filterValuesByGranularity(
        selectedMetric?.metricValues,
        value
      ).map((i) => (i.recordedDate ? formatDate(i.recordedDate) : ""));
      if (
        selectedMetric &&
        (selectedMetric.type === "fitness-criteria" ||
          selectedMetric.type === "improvement-driver")
      ) {
        tempData.target = tempData.actual.map(() => selectedMetric?.target);
      } else if (selectedMetric && selectedMetric.type === "health-indicator") {
        tempData.lowerLimit = tempData.actual.map(
          () => selectedMetric?.lowerLimit
        );
        tempData.upperLimit = tempData.actual.map(
          () => selectedMetric?.upperLimit
        );
      }
    }
    tempData.type = selectedMetric?.type;
    tempData.name = selectedMetric?.name;
    setGraphData(tempData);
    setSelectedGranularity(value);
  };

  const onSaveMetricSnapshot = async (formData: any) => {
    setIsSaving(true);
    const saveResult = await props.onSaveMetricSnapshot(
      formData,
      selectedMetric
    );
    if (!saveResult) {
      alert("Something went wrong");
    } else {
      setOpenMetricSnapshotModal(false);
      const tempData: any = {
        actual: [],
        type: "",
        name: "",
      };
      const metric = saveResult.find((i) => i.id === selectedMetric?.id);
      if (metric && metric.metricValues) {
        tempData.actual = filterValuesByGranularity(metric?.metricValues).map(
          (i) => i.value
        );
        tempData.recordedDates = filterValuesByGranularity(
          metric?.metricValues
        ).map((i) => (i.recordedDate ? formatDate(i.recordedDate) : ""));
        if (
          metric &&
          (metric.type === "fitness-criteria" ||
            metric.type === "improvement-driver")
        ) {
          tempData.target = tempData.actual.map(() => metric?.target);
        } else if (metric && metric.type === "health-indicator") {
          tempData.lowerLimit = tempData.actual.map(() => metric?.lowerLimit);
          tempData.upperLimit = tempData.actual.map(() => metric?.upperLimit);
        }
      }
      tempData.type = metric?.type;
      tempData.name = metric?.name;
      setGraphData(tempData);
      setSelectedMetric(metric);
    }
    setIsSaving(false);
  };

  const [isFormDirty, setFormDirty] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isFormModified, setFormModified] = useState(false);

  return (
    <Box mt={2}>
      <StyledAccordion defaultExpanded={true} style={{}}>
        <StyledAccordionSummary
          expandIcon={<ExpandMoreIcon style={{ color: "#FFFFFF" }} />}
          style={{
            background:
              "linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2))," +
              props.color,
          }}
        >
          <AccordionTitle>{props.scorecardData.name}</AccordionTitle>
          <MetricCount>
            {"(" +
              props.scorecardData.metrics.length +
              (props.scorecardData.metrics.length > 1
                ? " metrics)"
                : " metric)")}
          </MetricCount>
        </StyledAccordionSummary>

        <AccordionDetails style={{ padding: 0 }}>
          <Box style={{ display: "flex", width: "100%" }}>
            <Box style={{ width: (selectedRow && selectedRow?.length > 0) ? "68%" : "100%", backgroundColor: "#FFFFFF" }}>
              <Box style={{ width: "100%", height: 500 }}>
                <DataGridPro
                  columns={getScorecardTableColumns(props.contexts)}
                  rows={props.scorecardData.metrics}
                  hideFooter
                  onSelectionModelChange={(newSelectionModel) => {
                    setSelectedRow(newSelectionModel);
                    populateGraphData(newSelectionModel);
                  }}
                  selectionModel={selectedRow}
                  style={{ border: "none" }}
                  components={{ Panel: CustomGridPanel }}
                />
              </Box>
            </Box>
            {(selectedRow && selectedRow?.length > 0) && (
              <Divider
                orientation="vertical"
                style={{
                  backgroundColor: "#F0F0F0",
                  width: 6,
                }}
              />
            )}
            {(selectedRow && selectedRow?.length > 0) && (
              <Box style={{ width: "calc(33% - 10px)", minHeight: 400 }}>
                {selectedRow && selectedRow?.length > 0 ? (
                  <MetricContainer>
                    <Box
                      display="flex"
                      flexDirection="row"
                      justifyContent="space-between"
                      p={2}
                      m={2}
                    >
                      <LastCheckinContainer>
                        <ButtonTooltip text="do metric check-ins">
                          <Button
                            size="small"
                            variant="contained"
                            color="primary"
                            onClick={() => {
                              setOpenMetricSnapshotModal(true);
                            }}
                            style={{ marginRight: 10 }}
                            startIcon={<AddIcon />}
                            disabled={!isAdminOrPowerUser}
                          >
                            Update&nbsp;&nbsp;
                          </Button>
                        </ButtonTooltip>
                        <LastCheckin>
                          {selectedMetric?.metricValues &&
                            selectedMetric.metricValues.length > 0
                            ? `Last check-in on ${formatDate(
                              selectedMetric.metricValues[
                                selectedMetric.metricValues.length - 1
                              ].recordedDate || ""
                            )}`
                            : "No check-in recorded."}
                        </LastCheckin>
                      </LastCheckinContainer>
                      <Box position={"relative"} top={-25} right={-25}>
                        <IconButton
                          size="small"
                          onClick={() => setSelectedRow([])}
                        >
                          <Close style={{ color: "grey", fontSize: 22 }} />
                        </IconButton>
                      </Box>
                    </Box>

                    <GraphName>{graphData.name}</GraphName>
                    <ToggleButtonContainer>
                      <ToggleButtons
                        size="small"
                        value={selectedGranularity}
                        exclusive
                        onChange={(_event, value) => {
                          onChangeGranularity(value);
                        }}
                        aria-label="text alignment"
                        style={{}}
                      >
                        <ToggleButton value="all">all</ToggleButton>
                        <ToggleButton value="1m">1m</ToggleButton>
                        <ToggleButton value="3m">3m</ToggleButton>
                        <ToggleButton value="6m">6m</ToggleButton>
                        <ToggleButton value="1y">1y</ToggleButton>
                      </ToggleButtons>
                    </ToggleButtonContainer>
                    <GraphContainer>
                      <MetricValuesChart data={graphData} />
                    </GraphContainer>
                  </MetricContainer>
                ) : (
                  <></>
                )}
              </Box>
            )}
          </Box>
        </AccordionDetails>
      </StyledAccordion>

      <Box
        style={{
          display: "flex",
          marginTop: 25,
          marginBottom: 25,
          flexDirection: "column",
        }}
      ></Box>
      <BaseModal
        open={openMetricSnapshotModal}
        setOpen={setOpenMetricSnapshotModal}
        maxWidth="sm"
        title={(selectedMetric ? selectedMetric.name : "") + " Check-in"}
        disableEscKeyDown={!isFormDirty} //disable all the time except when form is dirty, a confirmation should show
        disableBackdropClick
        isFormDirty={isFormDirty}
      >
        <MetricSnapshotForm
          isSaving={isSaving}
          onSave={(formData) => {
            onSaveMetricSnapshot(formData);
          }}
          setFormDirty={setFormDirty}
          setFormModified={setFormModified}
        />
      </BaseModal>
    </Box>
  );
};

export default ScorecardTable;
