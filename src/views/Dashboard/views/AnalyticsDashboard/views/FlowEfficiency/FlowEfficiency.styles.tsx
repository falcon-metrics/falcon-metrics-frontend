export const myTheme = {
  graph: {
    tooltip: {
      visible: true,
      callout: true,
      calloutWidth: '20px',
      backgroundColor: '#ffffff',
      fontFamily: 'Open Sans',
      fontColor: '#707070',
      fontSize: '12px',
      padding: '8px',
      htmlMode: true,
      shadow: false,
      borderColor: '#e3e3e3',
      borderWidth: '1px',
      text: "%v (%npv%) days\nspent in '%t'",
    },
  },
};

export const baseChartConfig = {
  type: 'ring',
  globals: {
    fontFamily: 'Open Sans',
  },
  plot: {
    detach: false,
    slice: '80%',
    valueBox: {
      placement: 'out',
      connected: 'false',
      text: '%npv%',
      fontSize: '17px',
      fontWeight: 'bold',
      fontColor: 'rgba(0, 0, 0, 0.7)',
    },
  },
};
