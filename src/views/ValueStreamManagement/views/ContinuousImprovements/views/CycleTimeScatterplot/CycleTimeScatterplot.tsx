import { Box, Typography } from "@material-ui/core";
import ReactDOMServer from "react-dom/server";
import ZingChart from "zingchart-react";
import InfoIcon from "@material-ui/icons/Info";

type Props = {
  scatterplotData: any;
};

const legendsData: any[] = [
  {
    text: "98th %ile",
    color: "#F89287",
    description: "Unfavorably long duration",
  },
  { text: "85th %ile", color: "#FFC980", description: "Predominant WIP Age" },
  { text: "50th %ile", color: "#95EAE5", description: "Median WIP Age" },
];

function generateChartConfig(scatterplotData) {
  const steps = scatterplotData.steps;

  // Calculate maxYValue for y-axis scaling
  const max98thPercentile = Math.max(
    ...scatterplotData.steps.map((step) => step["98thPercentile"] ?? 0)
  );

  // Get max time in current state
  const maxTimeInCurrentState = scatterplotData.steps.reduce(
    (max, step) =>
      Math.max(
        max,
        ...step.items.map((item) => Math.ceil(Number(item.timeInCurrentState)))
      ),
    max98thPercentile
  );

  // Get the max value between 98th%ile and time in current state. Round to nearest 100 for proper scaling
  const maxYValue =
    Math.ceil(Math.max(max98thPercentile, maxTimeInCurrentState) / 100) * 100;

  const percentiles = {
    "50thPercentile": [],
    "85thPercentile": [],
    "98thPercentile": [],
  };

  scatterplotData.steps.forEach((step) => {
    Object.keys(percentiles).forEach((key) => {
      percentiles[key].push(step[key] || 0);
    });
  });

  // Calculate percentile values for the chart
  const sum = percentiles["50thPercentile"].map(
    (_, i) =>
      percentiles["50thPercentile"][i] +
      percentiles["85thPercentile"][i] +
      percentiles["98thPercentile"][i]
  );

  // Calculate each percentile value for the chart by scaling it based on maxYValue
  const calculatePercentileValues = (percentile) =>
    percentiles[percentile].map((value, i) =>
      Math.round((value / sum[i]) * maxYValue)
    );

  const percentile50thValues = calculatePercentileValues("50thPercentile");
  const percentile85thValues = calculatePercentileValues("85thPercentile");
  const percentile98thValues = calculatePercentileValues("98thPercentile");

  // Generate scatter plots
  const scatterPlots: any = [];
  steps.forEach((step, stepIndex) => {
    const scatterPlotValues = step.items.map((item) => ({
      timeInCurrentState: item.timeInCurrentState.toFixed(2),
      workItemId: item.workItemId,
    }));

    const scatterPlotValuesByTime = new Map();

    scatterPlotValues.forEach((value) => {
      const { timeInCurrentState, workItemId } = value;
      if (!scatterPlotValuesByTime.has(timeInCurrentState)) {
        scatterPlotValuesByTime.set(timeInCurrentState, []);
      }
      scatterPlotValuesByTime.get(timeInCurrentState).push(workItemId);
    });

    scatterPlotValuesByTime.forEach((workItemIds, time) => {
      const xValues = new Array(workItemIds.length).fill(stepIndex); // Assign x-values based on step index

      scatterPlots.push({
        type: "scatter",
        values: xValues.map((value) => [value, Number(time)]),
        marker: {
          "background-color": "rgba(0, 157, 224, 0.40)",
          size: 5,
          "border-color": "none",
        },
        valueBox: {
          text: workItemIds.length > 1 ? workItemIds.length : "",
          placement: "center",
          color: "#fff",
          fontSize: 8,
          fontFamily: "Open Sans",
        },
        tooltip: {
          backgroundColor: "#FCFCFC",
          visible: true,
          callout: true,
          calloutWidth: "20px",
          fontColor: "#707070",
          fontSize: "12px",
          textAlign: "left",
          htmlMode: true,
          placement: "node:top",
          offsetY: -6,
          sticky: true,
          shadow: false,
          borderColor: "#e3e3e3",
          borderWidth: "1px",
          timeout: 5000,
          text: ReactDOMServer.renderToStaticMarkup(
            <Box p={1}>
              <div>
                <strong>
                  Time In Current State: {time} {time > 1 ? "days" : "day"}
                </strong>
                <br />
                <br />
                <b>{workItemIds.length > 1 ? "Flow Items" : "Flow Item"}: </b>
                <div className="scatterplot-tooltip-list-box">
                  <ol>
                    {workItemIds
                      .flatMap((ids) => ids.split(", "))
                      .map((id, index) => (
                        <li
                          key={index}
                          className="scatterplot-tooltip-list-item"
                        >
                          <span>{id}</span>
                        </li>
                      ))}
                  </ol>
                </div>
              </div>
            </Box>
          ),
        },
      });
    });
  });

  const chartConfig = {
    type: "mixed",
    backgroundColor: "#fff",
    adjustLayout: true,
    plot: {
      stacked: true,
      hoverState: {
        visible: false,
      },
      tooltip: {
        visible: false,
      },
      barsSpaceLeft: 0,
      barsSpaceRight: 0,
    },
    plotarea: {
      backgroundColor: "#FEF5F4",
      margin: "dynamic",
    },
    scaleX: {
      visible: false,
    },
    scaleY: {
      step: 10,
      label: {
        text: "Cycle Time (days)",
      },
      maxValue: maxYValue,
    },
    series: [
      {
        type: "bar",
        barWidth: "100%",
        values: percentile50thValues,
        stack: 1,
        backgroundColor: "#95EAE5",
        alpha: 0.75,
      },
      {
        type: "bar",
        values: percentile85thValues,
        stack: 1,
        backgroundColor: "#FFC980",
        alpha: 0.75,
      },
      {
        type: "bar",
        values: percentile98thValues,
        stack: 1,
        backgroundColor: "#F89287",
        alpha: 0.75,
      },
      ...scatterPlots,
    ],
  };

  return chartConfig;
}

const CycleTimeScatterplot = ({ scatterplotData }: Props) => {
  const chartConfig = generateChartConfig(scatterplotData);

  return (
    <Box mr={1}>
      <ZingChart data={chartConfig} />
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        ml={4}
      >
        <Box display="flex" flexDirection="row">
          {legendsData.map((legend, index) => (
            <Box
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                padding: 8,
              }}
            >
              <Box
                style={{
                  width: 32,
                  height: 18,
                  backgroundColor: legend.color,
                  marginRight: 10,
                  opacity: 0.75,
                }}
              />
              <Typography
                style={{
                  fontFamily: "Open Sans",
                  fontSize: 12,
                  color: "rgba(0, 0, 0, 0.87)",
                }}
              >
                {legend.description} <br />
                {legend.text}
              </Typography>
            </Box>
          ))}
        </Box>
        <Box mr={3} display="flex" flexDirection="row" alignItems="center">
          <InfoIcon color="primary" />
          <Typography
            style={{
              fontFamily: "Open Sans",
              fontSize: 14,
              color: "rgba(0, 0, 0, 0.87)",
              marginLeft: 8
            }}
          >
            Bottlenecks are considered only in &#x26A1; active steps
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default CycleTimeScatterplot;
