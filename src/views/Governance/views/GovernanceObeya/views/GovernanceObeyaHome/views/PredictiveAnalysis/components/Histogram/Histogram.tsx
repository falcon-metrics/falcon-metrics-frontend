import ZingChart from 'zingchart-react';

interface PageProps {
  // data: PredictiveAnalysisResponse["histogramData"];
  scaleXLabel: string;
  hideSubTitle?: boolean;
  tooltipText?: string;
  customMargin?: string;
  chartHeight?: string | number;
  xValues: string[] | number[],
  yValues: string[] | number[],
  xLabels?: string[] | number[],
  yLabel?: string,
  dataParameter1?: string[] | number[],
}

const Histogram = ({
  // data,
  scaleXLabel,
  hideSubTitle,
  tooltipText,
  customMargin,
  chartHeight,
  xValues,
  yValues,
  xLabels,
  yLabel,
  dataParameter1,
}: PageProps) => {
  // const histogramData =
  //   data instanceof Array ? data : []
  // const x = histogramData.map((item) => item.accumulatedProbability);

  // const yValues = histogramData.map(item => item.frequency)
  // const deliveryDates = histogramData.map(item => new Date(item.deliveryDate).toLocaleDateString())
  const myTheme = {
    graph: {
      plot: {
        backgroundColor: '#41B6E6',
      },
      plotarea: {
        margin: customMargin || '20px 50px 60px 60px',
      },
      tooltip: {
        visible: true,
        callout: true,
        calloutWidth: '20px',
        backgroundColor: '#ffffff',
        fontColor: '#707070',
        fontSize: '12px',
        padding: '8px',
        htmlMode: true,
        shadow: false,
        borderColor: '#e3e3e3',
        borderWidth: '1px',
        text: tooltipText,
      },
    },
  };


  const config = {
    type: 'bar',
    globals: {
      fontFamily: 'Open Sans',
    },
    plot: {
      aspect: 'histogram',
      barsSpaceLeft: 0.1,
      barsSpaceRight: 0.1,
    },
    'scale-y': {
      label: {
        values: '0:100:20',
        text: yLabel,
        fontColor: 'rgba(0, 0, 0, 0.7)',
        fontSize: '14px',
        paddingLeft:'20px',
      },
    },
    'scale-x': {
      values: xValues,
      label: {
        text: `${scaleXLabel}`,
        fontColor: 'rgba(0, 0, 0, 0.7)',
        fontSize: '14px',
      },
      labels: xLabels || xValues,
    },
    series: [
      {
        values: yValues,
        "data-parameter1": dataParameter1,
      },
    ],
  };

  return (
    <div>
      {!hideSubTitle && 
      <div className="widget-subtitle">
        Items located within the shaded area are considered outliers.
      </div>
    } 
      <ZingChart data={config} theme={myTheme} height={chartHeight} />
    </div>
  );
};

export default Histogram;