import _ from "lodash";
import ZingChart from "zingchart-react";

interface Props {
  data?: any;
}

const lineColorActual = "#2AD2C9";
const lineColorTargets = "#66C4EB";

const MetricValuesChart = ({ data }: Props) => {
  const config = _.cloneDeep(setupConfig(data));
  return <ZingChart height="100%" data={config} />;
};

const markerConfig = {  
    visible: true,
    type: "circle",
    borderWidth: "3px",
    size: 6,
    borderColor: "#FFF",
};

const setupConfig = (data: any) => {
  let series;
  let legendLayout;
  if (data.type === "fitness-criteria") {
    series = [
      {
        lineColor: lineColorActual,
        marker: data.actual.length > 1 ? {
            visible: false
        } : {
            backgroundColor: lineColorActual,
          ...markerConfig
        },
        name: "Actual",
        text: "Actual",
        values: data.actual,
        "line-width": 4,
      },
      {
        lineColor: lineColorTargets,
        marker: data.target.length > 1 ? {
            visible: false
        } : {
            backgroundColor: lineColorTargets,
          ...markerConfig
        },
        name: "Threshold",
        text: "Threshold",
        values: data.target,
        "line-width": 4,
      },
    ];
    legendLayout = "1x2";
  } else if (data.type === "health-indicator") {
    series = [
      {
        lineColor: lineColorActual,
        marker: data.actual.length > 1 ? {
            visible: false
        } : {
            backgroundColor: lineColorActual,
          ...markerConfig
        },
        name: "Actual",
        text: "Actual",
        values: data.actual,
        "line-width": 4,
      },
      {
        lineColor: lineColorTargets,
        marker: data.upperLimit.length > 1 ? {
            visible: false
        } : {
            backgroundColor: lineColorTargets,
          ...markerConfig
        },
        name: "Upper Limit",
        text: "Upper Limit",
        values: data.upperLimit,
        "line-width": 4,
      },
      {
        lineColor: lineColorTargets,
        marker: data.lowerLimit.length > 1 ? {
            visible: false
        } : {
            backgroundColor: lineColorTargets,
          ...markerConfig
        },
        name: "Lower Limit",
        text: "Lower Limit",
        values: data.lowerLimit,
        "line-width": 4,
      },
    ];
    legendLayout = "1x3";
  } else if (data.type === "improvement-driver") {
    series = [
      {
        lineColor: lineColorActual,
        marker: data.actual.length > 1 ? {
            visible: false
        } : {
            backgroundColor: lineColorActual,
          ...markerConfig
        },
        name: "Actual",
        text: "Actual",
        values: data.actual,
        "line-width": 4,
      },
      {
        lineColor: lineColorTargets,
        marker: data.target.length > 1 ? {
            visible: false
        } : {
            backgroundColor: lineColorTargets,
          ...markerConfig
        },
        name: "Target",
        text: "Target",
        values: data.target,
        "line-width": 4,
      },
    ];
    legendLayout = "1x2";
  } else {
    series = [
      {
        lineColor: lineColorActual,
        marker: data.actual.length > 1 ? {
            visible: false
        } : {
            backgroundColor: lineColorActual,
          ...markerConfig
        },
        name: "Actual",
        text: "Actual",
        values: data.actual,
        "line-width": 4,
      },
    ];
    legendLayout = "1x1";
  }
  const otherConfig = {
    type: "line",
    backgroundColor: "#FEFEFE",
    tooltip: {
      shadow: false,
      border: "none",
    },
    legend: {
      layout: legendLayout || "1x3", //row x column
      x: "20%",
      y: "8%",
      verticalAlign: "bottom",
      align: "center",
      backgroundColor: "#FEFEFE",
      border: "none",
      item: {
        fontFamily: "Open Sans",
        fontSize: 12,
      },
    },
    scaleX: {
      labels: data.recordedDates,
    },
    scaleY: {
      guide: {
        visible: false,
      },
      short: true,
    },
    plotarea: {
      margin: "30px 65px",
    },
  };
  return { ...otherConfig, ...{ series } };
};

export default MetricValuesChart;
