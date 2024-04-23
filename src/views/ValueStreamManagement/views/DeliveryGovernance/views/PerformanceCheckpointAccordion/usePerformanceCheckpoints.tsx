/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Tooltip } from "@material-ui/core";
import {
    GridColumnHeaderParams,
    GridRenderCellParams,
} from "@mui/x-data-grid-pro";
import _ from "lodash";
import { getTrendArrowImage } from "utils/statistics/TrendAnalysis";
import { inlineStyles } from "./components/FlowBasedMetrics/FlowBasedMetrics.styles";
import {
    Checkpoint,
    Color,
    Comparison,
    PerformanceCheckpointMetric,
    PerformanceCheckpointsRow,
    TrendDirection,
} from "./models";
import { getMetricsFromResponse } from "./utils";
import { FilterWithId } from "views/Settings/components/PerformanceCheckPoints/views/Metrics/interfaces";

export const renderTrendArrow = (direction: TrendDirection, color: Color) => {
    const image = getTrendArrowImage(direction.toString().toLowerCase(), color);

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
                // alt={''}
                style={{
                    top: -6,
                    position: "absolute",
                }}
            />
        </div>
    );
};

export const HeaderFormatter = (
    params: GridColumnHeaderParams,
    customStyles = {}
) => {
    const headerStyles = {
        fontFamily: "Open Sans",
        fontSize: 14,
        fontWeigth: "bold",
        color: "#444B52",
    };

    const headerStyle = {
        width: "100%",
        paddingLeft: 25,
    };

    return (
        <span style={headerStyle}>
            <strong style={{ ...inlineStyles, ...headerStyles, ...customStyles }}>
                {params?.colDef?.headerName || "-"}
            </strong>
        </span>
    );
};

export const buildRowsAndColumns = (
    checkpointsSnapshots: any[],
    selectedCheckpoints: Checkpoint[],
    metricsToDisplay: string[],
    customViewsToDisplay: FilterWithId[]
) => {
    const COMPARISON_COLUMN = "Comparison";
    const METRIC_NAME_COLUMN = "metricName";
    const metrics = getMetricsFromResponse(
        checkpointsSnapshots,
        selectedCheckpoints,
        customViewsToDisplay
    );
    // Group the array of Metric objects by the metric name
    const groups = _.groupBy(metrics, (m) => m.name);
    const rowObjects: PerformanceCheckpointsRow[] = [];
    const customViewsFilterIds = customViewsToDisplay
        .filter(x => x.filter_id)
        .map(x =>
            x.filter_id && (typeof x.filter_id === 'string' ? x.filter_id : x.filter_id.toString())
        );
    // Each Row object has an array of Metrics
    Object.keys(groups)
        .filter((metricName) => metricsToDisplay.includes(metricName) || customViewsFilterIds.includes(metricName))
        .forEach((metricName) => {
            rowObjects.push(
                new PerformanceCheckpointsRow(
                    groups[metricName],
                    selectedCheckpoints.map((cv) => cv.id.toString())
                )
            );
        });

    const rows = rowObjects.map((row, i) => {
        const obj: Record<any, any> = {};
        obj.id = i;
        row.metrics.forEach((metric) => {
            obj[METRIC_NAME_COLUMN] = metric.displayName;
            obj[metric.checkpoint.id] = metric.getDisplayString();
        });
        if (selectedCheckpoints.length === 2) {
            const comp = row.getComparison(
                selectedCheckpoints.map((c) => c.id) as any
            );
            obj[COMPARISON_COLUMN] = comp;
            // comp.displayString + `Arrow Direction: ${comp.trendDirection}. Color: ${comp.arrowColor}`;
        }
        return obj;
    });

    const columns: any = [
        {
            field: METRIC_NAME_COLUMN,
            headerName: "Flow-based Metrics",
            renderHeader: (params) => (
                <HeaderFormatter {...params} customStyles={{ paddingLeft: 25 }} />
            ),
            renderCell: (params: GridRenderCellParams) => {
                return (
                    <span
                        style={{ ...inlineStyles.text, paddingLeft: 35 }}
                        className="dependency-name"
                    >
                        <Tooltip
                            title={""}
                            placement="top"
                            arrow
                            classes={{ tooltip: ".default-tooltip" }}
                        >
                            <span style={{ ...inlineStyles.text }}>
                                {params?.row[METRIC_NAME_COLUMN] || "-"}
                            </span>
                        </Tooltip>
                    </span>
                );
            },
            sortable: false,
            width: 400,
            minWidth: 420,
        },
    ];

    selectedCheckpoints.forEach((c) =>
        columns.push({
            field: c.id,
            headerName: c.name,
            sortable: false,
            minWidth: 300,
            width: 200,
            renderHeader: (params) => (
                <HeaderFormatter {...params} customStyles={{ paddingLeft: 25 }} />
            ),
            renderCell: (params: GridRenderCellParams) => {
                // Get the metric object from params.
                const metric: PerformanceCheckpointMetric = params.row[
                    c.id
                ] as PerformanceCheckpointMetric;

                const text: any = metric; //.getDisplayString();
                let background = "white";
                if (selectedCheckpoints.length > 2) {
                    background = metric.backgroundColor;
                }

                return (
                    <span
                        style={{
                            ...inlineStyles.text,
                            textAlign: "center",
                            background,
                            paddingLeft: 35,
                        }}
                        className="dependency-name"
                    >
                        {text}
                    </span>
                );
            },
        })
    );

    // If only 2 columns are selected, show the comparison column
    if (selectedCheckpoints.length === 2) {
        columns.push({
            field: COMPARISON_COLUMN,
            headerName: COMPARISON_COLUMN,
            sortable: false,
            minWidth: 300,
            width: 200,
            renderHeader: HeaderFormatter,
            renderCell: (params: GridRenderCellParams) => {
                const comparison: Comparison = params.row[COMPARISON_COLUMN];
                const image = renderTrendArrow(
                    comparison.trendDirection,
                    comparison.arrowColor
                );

                return (
                    <Box display="flex">
                        <Box style={inlineStyles.arrow}>
                            {image}
                        </Box>
                        <span style={{ ...inlineStyles.text, marginLeft: 14 }}>
                            {comparison.displayString}
                        </span>
                    </Box>
                );
            },
        });
    }

    return { rows, columns };
};