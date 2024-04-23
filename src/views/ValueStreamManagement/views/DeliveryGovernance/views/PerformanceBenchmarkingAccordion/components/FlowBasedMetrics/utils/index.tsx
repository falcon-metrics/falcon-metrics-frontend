import { ReactNode } from "react";

import startCase from "lodash/startCase";
import { getTrendArrowImage } from "utils/statistics/TrendAnalysis";
import { HeaderFormatter } from "views/Governance/views/GovernanceObeya/views/GovernanceObeyaHome/views/Risk/components/RiskList/utils";
import {
  BenchmarkingListResponse,
  BenchmarkingWithUnit,
  ComparisionWithArrowDirection,
} from "../../../interfaces";
import Box from "@material-ui/core/Box";
import Tooltip from "@material-ui/core/Tooltip";
import { GridRenderCellParams } from "@mui/x-data-grid-pro";

import { inlineStyles } from "../FlowBasedMetrics.styles";
import "./style.css";

const columnDescriptions = {
  metric: "Flow-based Metrics",
  lead_time_portfolio_85: "Lead Time portfolio items (85th)",
  lead_time_team_85: "Lead Time team level items (85th)",
  lead_time_target_met: "Lead Time Target Met (%)",
  wip_age_85: "WIP Age (85th)",
  total_throughput: "Throughput (count)",
  flow_efficiency: "Flow Efficiency (%)",
  flow_debt: "Flow Debt (%)",
  throughput_predictability: "Throughput Predictability",
  lead_time_predictability: "Lead Time Predictability",
  wip_count: "WIP Count",
  fitness_level: "Fitness Level",
  stale_work: "Stale Work",
  average_throughput: "Average Throughput",
  wip_age_avg: "Average WIP Age",
  lead_time_team_avg: "Average Lead Time - Team",
  lead_time_portfolio_avg: "Average Lead Time - Portfolio",
};

export const renderTrendArrow = (trend) => {
  if (!trend || !trend.direction) {
    return null;
  }
  const { direction, colour, text } = trend;
  const image = getTrendArrowImage(direction, colour);

  return (
    <div
      style={{
        height: 20,
        position: "relative",
      }}
    >
      <img
        src={image}
        className="sle-trend-icon"
        alt={text}
        style={{
          top: -6,
          position: "absolute",
        }}
      />
    </div>
  );
};

type SubtitleColumnType = {
  children: ReactNode;
};

const SubtitleColumn = ({ children }: SubtitleColumnType) => {
  return (
    <Box
      style={{
        position: "relative",
        width: "100%",
        textAlign: "center",
        fontFamily: "Open Sans",
      }}
    >
      {children}
      <Box
        style={{
          position: "absolute",
          top: 20,
          left: 10,
          fontSize: 12,
          color: "#82838a",
        }}
      >
        Target
      </Box>
      <Box
        style={{
          position: "absolute",
          top: 20,
          left: 110,
          fontSize: 12,
          color: "#82838a",
        }}
      >
        Reading
      </Box>
      <Box
        style={{
          position: "absolute",
          top: 20,
          right: 0,
          fontSize: 12,
          color: "#82838a",
        }}
      >
        Benchmark
      </Box>
    </Box>
  );
};

const DefaultHeader = (params) => {
  return (
    <SubtitleColumn>
      <HeaderFormatter {...params} />
    </SubtitleColumn>
  );
};

const formatPercentLabel = (str: string): string => {
  return str.includes("%") ? str.replace(/ /g, "") : str;
};

const getStaticColumns = (openIndustryModal: (row) => void) => ({
  metric: {
    field: "label",
    headerName: "Flow-based Metrics",
    renderHeader: (params) => (
      <Box className="firstHeaderColumn">
        <HeaderFormatter
          {...params}
          customStyles={{
            paddingLeft: 25,
            paddingTop: 10,
          }}
        />
      </Box>
    ),
    renderCell: (params: GridRenderCellParams) => {
      return (
        <span
          style={{ ...inlineStyles.text, paddingLeft: 35 }}
          className="dependency-name"
        >
          <Tooltip
            title={columnDescriptions[params?.row?.metric]}
            placement="top"
            arrow
            classes={{ tooltip: ".default-tooltip" }}
          >
            <span style={{ ...inlineStyles.text }}>
              {params?.row?.label || "-"}
            </span>
          </Tooltip>
        </span>
      );
    },
    sortable: false,
    width: 350,
    minWidth: 380,
  },
  benchmarking1: {
    field: "benchmarking1",
    renderHeader: HeaderFormatter,
    renderCell: (params: GridRenderCellParams) => {
      return (
        <Box
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <span
            className="dependency-name"
            style={{
              width: 60,
              marginLeft: 7,
              fontFamily: "Open Sans",
              background: params?.row?.benchmarking1?.colour,
              color: params?.row?.benchmarking1?.reading?.colour
                ? params?.row?.benchmarking1?.reading?.colour
                : "#444B52",
            }}
          >
            {formatPercentLabel(
              `${params?.row?.benchmarking1?.reading?.value} ${params?.row?.benchmarking1?.reading?.unit}`
            ) || '-'}
          </span>
        </Box>
      );
    },
    sortable: false,
    minWidth: 300,
    width: 200,
  },
  benchmarking2: {
    field: "benchmarking2",
    renderHeader: HeaderFormatter,
    renderCell: (params: GridRenderCellParams) => {
      return (
        <Box
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <span
            className="dependency-name"
            style={{
              width: 60,
              marginLeft: 7,
              fontFamily: "Open Sans",
              background: params?.row?.benchmarking2?.colour,
              color: params?.row?.benchmarking2?.reading?.colour
                ? params?.row?.benchmarking2?.reading?.colour
                : "#444B52",
            }}
          >
            {formatPercentLabel(
              `${params?.row?.benchmarking2?.reading?.value} ${params?.row?.benchmarking2?.reading?.unit}`)
              || '-'}
          </span>
        </Box>
      );
    },
    minWidth: 300,
    width: 200,
  },
  benchmarking3: {
    field: "benchmarking3",
    renderHeader: HeaderFormatter,
    renderCell: (params: GridRenderCellParams) => {
      return (
        <Box
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <span
            className="dependency-name"
            style={{
              width: 60,
              marginLeft: 7,
              fontFamily: "Open Sans",
              background: params?.row?.benchmarking3?.colour,
              color: params?.row?.benchmarking3?.reading?.colour
                ? params?.row?.benchmarking3?.reading?.colour
                : "#444B52",
            }}
          >
            {formatPercentLabel(
              `${params?.row?.benchmarking3?.reading?.value || "-"} ${params?.row?.benchmarking3?.reading?.unit || ""
              }`
            )}
          </span>
        </Box>
      );
    },
    minWidth: 300,
    width: 200,
  },
  benchmarking4: {
    field: "benchmarking4",
    renderHeader: HeaderFormatter,
    renderCell: (params: GridRenderCellParams) => {
      return (
        <Box
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <span
            className="dependency-name"
            style={{
              width: 60,
              marginLeft: 7,
              fontFamily: "Open Sans",
              background: params?.row?.benchmarking4?.colour,
              color: params?.row?.benchmarking4?.reading?.colour
                ? params?.row?.benchmarking4?.reading?.colour
                : "#444B52",
            }}
          >
            {formatPercentLabel(
              `${params?.row?.benchmarking4?.reading?.value || "-"} ${params?.row?.benchmarking4?.reading?.unit || ""
              }`
            )}
          </span>
        </Box>
      );
    },
    minWidth: 300,
    width: 200,
    sortable: false,
  },
});

export type BaseColumnType = {
  field: string;
  headerName: string;
  minWidth?: number;
  renderCell?: (params) => ReactNode;
  renderHeader?: (params) => ReactNode;
  sortable?: boolean;
  width?: number;
};

export const getBaseColumns = (
  data: BenchmarkingListResponse,
  headerNamesMap: ColumnsNamesMap,
  openIndustryModal: (row: any) => void
): BaseColumnType[] => {
  const columNames: string[] = getColumnNames(data);
  const currentColumns = columNames?.map((column: string) => {
    const configColumn = getStaticColumns?.(openIndustryModal)?.[column];
    if (configColumn?.field?.includes("benchmarking")) {
      configColumn.headerName = headerNamesMap[column] || startCase(column);
    }
    return configColumn;
  });
  return currentColumns;
};

export const getColumnNames = (data: BenchmarkingListResponse): string[] => {
  const firstColumnOfResponse = Object.keys(data)?.[0];
  const columnsToAddOnTable: any = data?.[firstColumnOfResponse] || {};
  const columnBase: string[] = Object.keys(columnsToAddOnTable);
  return ["metric", ...columnBase];
};

export type ColumnsNamesMap = {
  [columnName: string]: string;
};

// get all names of each benchmarking to generate the columns
export const getColumnsNamesMap = (
  data: BenchmarkingListResponse
): ColumnsNamesMap => {
  const firstColumnOfResponse = Object.keys(data)?.[0];
  const columnsToAddOnTable: ColumnsNamesMap =
    data?.[firstColumnOfResponse] || {};
  const columnNamesMap: ColumnsNamesMap = Object.keys(
    columnsToAddOnTable
  ).reduce((acc: ColumnsNamesMap, columnName: string) => {
    if (columnName.includes("benchmarking")) {
      acc[columnName] =
        data?.[firstColumnOfResponse]?.[columnName]?.tribe || columnName;
    }
    return acc;
  }, {});
  return columnNamesMap;
};

type BenchMarkItem = {
  tribe: string;
  target: {
    value: string;
    unit: string;
  };
  reading: {
    value: string;
    unit: string;
  };
  benchmark: {
    value: string;
    unit: string;
  };
};

export type RowDataGridBenchmarkItem = {
  id?: string | number;
  benchmarking1?: BenchMarkItem;
  benchmarking2?: BenchMarkItem;
  benchmarking3?: BenchMarkItem;
  benchmarking4?: BenchMarkItem;
  comparison?: {
    value: string | number;
    arrow: { direction: "down"; colour: "#000"; };
  };
  metric?: string;
  label?: string;
  tooltipText?: string;
};

// This function will format the response to return a valid format to use on
// Datagrid table pro
export const getFormattedCheckpointsRows = (
  data: BenchmarkingListResponse
): RowDataGridBenchmarkItem[] => {
  const rowsData: RowDataGridBenchmarkItem[] = [];
  const metricKeys = Object.keys(data);
  const columns = getColumnNames(data);

  metricKeys.forEach((metricKey, index) => {
    const column1 = columns[0]; // metric
    const column2 = columns[1]; // checkpoint 1
    const column3 = columns[2]; // checkpoint 2
    const column4 = columns[3]; // checkpoint 3
    const column5 = columns[4]; // checkpoint 4

    let benchmarkingRow: RowDataGridBenchmarkItem = {
      [column1]: metricKey,
      label: columnDescriptions[metricKey],
      id: index,
      tooltipText: columnDescriptions?.[metricKey] || "",
    };
    const currentMetricValue:
      | BenchmarkingWithUnit
      | ComparisionWithArrowDirection
      | undefined = data?.[metricKey];
    if (currentMetricValue?.[column2]) {
      benchmarkingRow = {
        ...benchmarkingRow,
        [column2]: currentMetricValue[column2],
      };
    }
    if (currentMetricValue?.[column3]) {
      benchmarkingRow = {
        ...benchmarkingRow,
        [column3]: currentMetricValue[column3],
      };
    }
    if (currentMetricValue?.[column4]) {
      benchmarkingRow = {
        ...benchmarkingRow,
        [column4]: currentMetricValue[column4],
      };
    }
    if (currentMetricValue?.[column5]) {
      benchmarkingRow = {
        ...benchmarkingRow,
        [column5]: currentMetricValue[column5],
      };
    }
    // prevent to show empty rows
    if (benchmarkingRow.label) {
      rowsData.push(benchmarkingRow);
    }
  });
  return rowsData;
};
