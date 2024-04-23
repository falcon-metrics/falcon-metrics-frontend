import ZingChart from 'zingchart-react';

interface EmptyScatterplotProps {
  xLabel: string;
  yLabel: string;
}

const EmptyScatterplot = ({ xLabel, yLabel }: EmptyScatterplotProps) => {
  const configs = {
    type: 'scatter',
    utc: true,
    globals: {
      fontSize: '12px',
      fontFamily: 'Open Sans',
    },
    plot: {
      valueBox: {
        text: '%t',
        color: '#0078ac',
        fontSize: '10%',
        placement: 'over',
      },
      tooltip: {
        visible: true,
        callout: true,
        calloutWidth: '20px',
        backgroundColor: '#ffffff',
        fontColor: '#707070',
        fontSize: '12px',
        textAlign: 'left',
        htmlMode: true,
        placement: 'node:top',
        offsetY: -6,
        sticky: true,
        shadow: false,
        borderColor: '#e3e3e3',
        borderWidth: '1px',
        timeout: 5000,
      },
    },
    plotarea: {
      margin: '20px 50px 60px 60px',
    },
    'scale-y': {
      zooming: true,
      label: {
        text: yLabel,
        fontColor: 'rgba(0, 0, 0, 0.7)',
      },
    },
    'scale-x': {
      zooming: true,
      label: {
        text: xLabel,
        fontColor: 'rgba(0, 0, 0, 0.7)',
      },
      step: 'day',
      transform: {
        type: 'date',
        all: '%dd %M %Y',
      },
      values: []
    },
    series: [[],[]],
  };

  return (
    <>
      <div className="widget-subtitle">
        Darker markers indicate more items in that location. Items located
        within the shaded area are considered outliers.
      </div>
      <ZingChart data={configs} />
    </>
  );
};

export default EmptyScatterplot;
