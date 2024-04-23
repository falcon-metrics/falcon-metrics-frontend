export const zingChartTheme = {
  graph: {
    height: "100%",
    plotarea: {
      margin: "25px 0 5px 70px",
    },
    tooltip: {
      visible: true,
      callout: true,
      calloutWidth: "20px",
      backgroundColor: "#ffffff",
      fontColor: "#707070",
      fontSize: "12px",
      fontFamily: "Open Sans",
      padding: "8px",
      htmlMode: true,
      shadow: false,
      borderColor: "#e3e3e3",
      borderWidth: "1px",
    },
  },
};

export const baseLegendConfig = {
  border: "none",
  align: "center",
  verticalAlign: "bottom",
  overflow: "scroll",
  item: {
    fontSize: "12px",
    fontColor: "rgba(0, 0, 0, 0.7)",
    fontFamily: "Open Sans",
    wrapText: true,
    maxWidth: "320",
  },
  marker: {
    type: "circle",
    borderColor: "none",
  },
  backgroundColor: "none",
};

export const distributionLegends = {
  ...baseLegendConfig,
  layout: "4x2",
  maxItems: 8,
  height: "30%",
  width: "100%",
  minHeight: 10,
  marginLeft: "6%",
  overflowY: "scroll",
  item: {
    fontSize: "12px",
    fontColor: "rgba(0, 0, 0, 0.7)",
    fontFamily: "Open Sans",
    wrapText: true,
    maxWidth: "500",
    maxChars: 85,
  },
};

export const ratioLegends = {
  ...baseLegendConfig,
  maxItems: 4,
  layout: "2x2",
};

export const distributionChartConfig = {
  type: "bar",
  scaleX: {
    labels: [""],
    label: {
      text: "",
    },
  },
  plot: {
    barWidth: "25px",
    hoverState: {
      visible: false,
    },
  },
};

export const donutChartConfig = {
  type: "ring",
  globals: {
    fontSize: "12px",
    fontFamily: "Open Sans",
  },
  plot: {
    detach: false,
    slice: "80%",
    valueBox: {
      placement: "out",
      connected: "false",
      text: "%npv%",
      fontSize: "17px",
      fontWeight: "bold",
      fontColor: "rgba(0, 0, 0, 0.7)",
    },
  },
  legend: ratioLegends,
  height: "98%",
};
