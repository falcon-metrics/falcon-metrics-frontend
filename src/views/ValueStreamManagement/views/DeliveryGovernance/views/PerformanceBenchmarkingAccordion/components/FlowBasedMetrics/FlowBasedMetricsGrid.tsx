/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  DataGridPro,
  GridColumnHeaderParams,
  GridRenderCellParams,
} from "@mui/x-data-grid-pro";
import _ from "lodash";
import {
  Color,
  Comparison,
  PerformanceBenchmarkMetric,
  PerformanceBenchmarkRow,
  TrendComparison,
  TrendDirection,
  Unit,
} from "../../../PerformanceCheckpointAccordion/models";
import { inlineStyles } from "./FlowBasedMetrics.styles";
import CustomGridPanel from "components/UI/CustomGridPanel";
import { useCheckpoints } from "views/Settings/components/PerformanceCheckPoints/hooks/useCheckpoints";
import { CheckpointItem } from "views/Settings/components/PerformanceCheckPoints/interfaces";
import { DateTime } from "luxon";
import { Box } from "@material-ui/core";
import { renderTrendArrow } from "../../../PerformanceCheckpointAccordion/usePerformanceCheckpoints";
import PeopleIcon from "@material-ui/icons/People";
import IconButton from "@material-ui/core/IconButton";
import ExportButton from "./ExportButton";
import { reorderColumns } from "views/ValueStreamManagement/views/DeliveryManagement/views/AnalyticsView/views/FlowUnitsSection/utils/utils";
import { useRef } from "react";

interface Props {
  rows: PerformanceBenchmarkRow[];
  selectedCheckpointId: string;
  showSimplifiedView: boolean;
  openFlowItemsModal: any;
}

const arrowColors = {
  green: "#10cfc9",
  red: "#e74f3d",
  yellow: "#f3bd48",
  grey: "grey",
};

const HeaderFormatter = (params: GridColumnHeaderParams) => {
  return <strong>{params?.colDef?.headerName || "-"}</strong>;
};
const roundToOneDecimal = (n: number) => {
  return Math.round(n * 10) / 10;
};

const getUnitDisplayString = (unit: Unit, value: number | string): string => {
  let isPlural = true;
  if (typeof value === "number" && value === 1) {
    isPlural = false;
  }
  let str = "";
  switch (unit) {
    case Unit.DAYS: {
      str = " days";
      break;
    }
    case Unit.FLOW_ITEMS: {
      str = " flow items";
      break;
    }
    case Unit.PERCENTAGE: {
      str = "%";
      break;
    }
    case Unit.BLANK:
    default:
      str = "";
  }
  // Remove the s at the end to make it singular
  if (!isPlural) str = str.replace(/s$/, "");
  return str;
};

const getArrowColor = (
  trendDirection: TrendDirection,
  trendComparison: TrendComparison
) => {
  // Stable by default
  let color = Color.YELLOW;
  if (trendDirection === TrendDirection.DOWN) {
    if (trendComparison === TrendComparison.DOWN_IS_GOOD) {
      color = Color.GREEN;
    } else if (trendComparison === TrendComparison.UP_IS_GOOD) {
      color = Color.RED;
    }
  } else if (trendDirection === TrendDirection.UP) {
    if (trendComparison === TrendComparison.UP_IS_GOOD) {
      color = Color.GREEN;
    } else if (trendComparison === TrendComparison.DOWN_IS_GOOD) {
      color = Color.RED;
    }
  }
  return color;
};
const compareStringResults = (
  v1: string,
  v2: string
): {
  trendDirection: TrendDirection;
  displayString: string;
  arrowColor: Color;
} => {
  const HIGH = "High",
    LOW = "Low";
  let displayString = "";
  let trendDirection: TrendDirection = TrendDirection.STABLE;
  let arrowColor = Color.YELLOW;

  // Down trend
  if (v1 === HIGH && v2 === LOW) {
    displayString = "Down";
    trendDirection = TrendDirection.DOWN;
  }

  // Up trend
  if (v1 === LOW && v2 === HIGH) {
    displayString = "Up";
    trendDirection = TrendDirection.UP;
  }

  // Stable trend
  if ((v1 === LOW && v2 === LOW) || (v1 === HIGH && v2 === HIGH)) {
    displayString = "Stable";
    trendDirection = TrendDirection.STABLE;
    if (v1 === LOW) arrowColor = Color.RED;
    if (v1 === HIGH) arrowColor = Color.GREEN;
  }
  return {
    displayString,
    trendDirection,
    arrowColor,
  };
};
const getComparison = (
  val1: PerformanceBenchmarkMetric,
  val2: PerformanceBenchmarkMetric,
  unit
): Comparison => {
  let result: Comparison = {
    unit,
    diff: 0,
    percentageChange: 0,
    trendDirection: TrendDirection.STABLE,
    displayString: "",
    arrowColor: Color.YELLOW,
  };
  if (val1 === undefined || val2 === undefined) {
    return result;
  }

  // If either of the metrics has an error, dont display comparison
  if (val1.error || val2.error) {
    console.error("Error in one of the metrics");
    result.displayString = "";
  } else {
    switch (unit) {
      // Use the fall-through of switch to process the numeric values
      case Unit.DAYS:
      case Unit.FLOW_ITEMS:
      case Unit.PERCENTAGE: {
        // Trend direction
        const v1 = val1.value as number;
        const v2 = val2.value as number;
        if (v2 === v1) result.trendDirection = TrendDirection.STABLE;
        else if (v2 > v1) result.trendDirection = TrendDirection.UP;
        else result.trendDirection = TrendDirection.DOWN;

        // Difference
        result.diff = roundToOneDecimal(Math.abs(v2 - v1));

        // Percentange change
        if (v1 !== 0) {
          result.percentageChange = roundToOneDecimal((result.diff * 100) / v1);
        }

        // Display string
        if (result.diff === 0 || isNaN(result.diff)) {
          result.displayString = "Stable";
        } else {
          result.displayString = `${result.diff}${getUnitDisplayString(
            unit,
            result.diff
          )} (${result.percentageChange}%)`;
        }
        // Percentange change
        result.arrowColor = getArrowColor(
          result.trendDirection,
          val1.trendComparision
        );
        break;
      }
      case Unit.BLANK: {
        // If the unit is blank, the value is a string. Hence the typecast
        const v1 = val1.value as string;
        const v2 = val2.value as string;
        result = {
          ...result,
          ...compareStringResults(v1, v2),
        };
        break;
      }
      default: {
        result.displayString = "";
      }
    }
  }
  return result;
};
const getRowsAndColumns = (
  rowObjects: PerformanceBenchmarkRow[],
  selectedCheckpointId: string,
  checkpoints: CheckpointItem[],
  showSimplifiedView: boolean,
  openFlowItemsModal: any
) => {
  const rows: any[] = [];
  const columns: any[] = [];
  let comparisionShowed = false;
  const row = rowObjects[0];
  if (row === undefined) {
    return { rows, columns };
  }
  const contexts = _.uniqBy(row.metrics, (m) => m.context.id).map(
    (m) => m.context
  );
  const metrics = rowObjects.map((row) => row.metricName);
  const sortedCheckpoints = checkpoints.sort((a, b) => {
    const dateA = DateTime.fromISO(
      typeof a.start_date === "string" ? a.start_date : ""
    );
    const dateB = DateTime.fromISO(
      typeof b.start_date === "string" ? b.start_date : ""
    );
    return dateA.toMillis() - dateB.toMillis();
  });
  contexts.forEach((context, id) => {
    const obj: Record<any, any> = {};
    obj.id = id;
    obj.contextId = context.id;
    obj.contextName = context.name;
    rowObjects.forEach((rowObj) => {
      //find the one relevant metric for the row ( combi of context and checkpoint)
      const metric = rowObj.metrics.find(
        (metric) =>
          metric.context.id === context.id &&
          metric.checkpoint.id === selectedCheckpointId
      );
      if (metric) {
        obj[metric.displayName] = {};
        obj[metric.displayName].metric = metric.getDisplayString();

        const idx = sortedCheckpoints.findIndex(
          (x) => x.id?.toString() === selectedCheckpointId
        );
        let prevMetric: PerformanceBenchmarkMetric | undefined;
        if (idx && idx > 0) {
          prevMetric = rowObj.metrics.find(
            (metric) =>
              metric.context.id === context.id &&
              metric.checkpoint.id === sortedCheckpoints[idx - 1].id?.toString()
          );
          if (prevMetric) {
            const c = getComparison(prevMetric, metric, metric.unit);
            obj[metric.displayName].comparision = c;
            if (c && c.displayString) comparisionShowed = true;
          }
        }
      }
    });
    rows.push(obj);
  });
  columns.push({
    field: "contextName",
    headerName: "Contexts",
    renderHeader: (params) => (
      <HeaderFormatter {...params} customStyles={{ paddingLeft: 25 }} />
    ),
    renderCell: (params: GridRenderCellParams) => {
      return (
        <Box>
          {params.row.contextName}
          <IconButton
            size="small"
            onClick={() => openFlowItemsModal(params.row.contextId)}
          >
            <PeopleIcon />
          </IconButton>
        </Box>
      );
    },
    sortable: false,
    width: 400,
    minWidth: 420,
    disableReorder: true
  });
  metrics.forEach((metric) => {
    columns.push({
      field: metric,
      headerName: metric,
      sortable: false,
      minWidth: 300,
      width: 200,
      renderHeader: (params) => (
        <HeaderFormatter {...params} customStyles={{ paddingLeft: 25 }} />
      ),
      renderCell: (params: GridRenderCellParams) => {
        // Get the metric object from params.
        const m = params.row[metric].metric;
        const text = m; //.getDisplayString();
        const comparision = params.row[metric].comparision;

        return (
          <Box style={{ display: "flex", flexDirection: "column" }}>
            <Box style={{ display: "flex", alignItems: "center" }}>
              {comparision && comparision.arrowColor && showSimplifiedView && (
                <Box
                  style={{
                    padding: 15,
                    borderRadius: "50%",
                    backgroundColor: arrowColors[comparision.arrowColor],
                    marginRight: 30,
                  }}
                />
              )}
              <Box
                style={{
                  ...inlineStyles.text,
                  lineHeight: "50px",
                }}
                className="dependency-name"
              >
                {text}
              </Box>
            </Box>
            {comparision && comparision.displayString && !showSimplifiedView && (
              <Box display="flex" style={{ lineHeight: "50px" }}>
                <Box style={inlineStyles.arrow}>
                  {renderTrendArrow(
                    comparision.trendDirection,
                    comparision.arrowColor
                  )}
                </Box>
                <span style={{ ...inlineStyles.text, marginLeft: 14 }}>
                  {comparision.displayString}
                </span>
              </Box>
            )}
          </Box>
        );
      },
    });
  });
  // console.log(rows);
  return { rows, columns, comparisionShowed };
};

const SAVED_COLUMNS_KEY = `performance-benchmark-columns`;

export const FlowBasedMetricsGrid = ({
  rows: rowObjects,
  selectedCheckpointId,
  showSimplifiedView,
  openFlowItemsModal,
}: Props) => {
  // console.log(rowObjects);
  const { data: checkpoints } = useCheckpoints();
  const {
    rows,
    columns: originalColumns,
    comparisionShowed,
  } = getRowsAndColumns(
    rowObjects,
    selectedCheckpointId,
    checkpoints,
    showSimplifiedView,
    openFlowItemsModal
  );

  const columnsRef = useRef<undefined | string[]>(undefined);

  let columns = [...originalColumns];

  // Check if the order is saved. If saved, use that order
  if (localStorage.getItem(SAVED_COLUMNS_KEY) !== null) {
    columns = reorderColumns(
      columns.slice(1),
      JSON.parse(localStorage.getItem(SAVED_COLUMNS_KEY) as string)
    );
  }

  const isSameArray = (oldColumns: string[], newColumns: string[]) =>
    _.zip(oldColumns, newColumns).every(
      (pair) => pair.length === 2 && pair[0] === pair[1]
    );

  return (
    <div style={{ height: "100%", width: "100%" }}>
      {rowObjects ? (
        // Alternative to column pinning is to split the columns into two tables
        <div style={{ display: "flex", overflowX: "auto" }}>
          <div style={{ flexShrink: 0, minWidth: 400, maxWidth: 420 }}>
            <DataGridPro
              columns={originalColumns.slice(0, 1)}
              rows={rows}
              autoHeight
              rowHeight={comparisionShowed && !showSimplifiedView ? 100 : 50}
              components={{
                Footer: (props) => {
                  return (
                    <div style={{ textAlign: "right", padding: 18 }}>
                      &nbsp;
                    </div>
                  );
                },
                Panel: CustomGridPanel,
              }}
            />
          </div>
          <div style={{ flex: 1 }}>
            <DataGridPro
              columns={columns.slice(1)}
              rows={rows}
              autoHeight
              rowHeight={comparisionShowed && !showSimplifiedView ? 100 : 50}
              components={{
                Footer: (props) => {
                  return (
                    <div style={{ textAlign: "right", padding: 10 }}>
                      <ExportButton
                        rows={rows}
                        columns={columns}
                        title="Performance Benchmark"
                      />
                    </div>
                  );
                },
                Panel: CustomGridPanel,
              }}
              onStateChange={(gridState) => {
                if (
                  !gridState.isScrolling &&
                  gridState.columnReorder.dragCol !== ""
                ) {
                  const oldColumns = columnsRef.current;
                  const newColumns = gridState.columns.all;
                  const originalColumnNames = originalColumns.map(
                    (c) => c.field
                  );

                  if (oldColumns === undefined) {
                    columnsRef.current = newColumns;
                  } else if (
                    !isSameArray(oldColumns, newColumns) &&
                    !isSameArray(originalColumnNames, newColumns)
                  ) {
                    columnsRef.current = newColumns;
                    localStorage.setItem(
                      SAVED_COLUMNS_KEY,
                      JSON.stringify(newColumns)
                    );
                  }
                }
              }}
            />
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default FlowBasedMetricsGrid;
