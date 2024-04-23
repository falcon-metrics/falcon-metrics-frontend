// @ts-ignore
import ZingChart from 'zingchart-react';
import { DateTime } from 'luxon';

interface PageProps {
  data: Array<Array<any>>;
}

const WipRunChart = ({ data }: PageProps) => {
  const results = data;

  const x = results.map((innerArray) => (innerArray[0] as DateTime).toMillis());
  const y = results.map((innerArray) => innerArray[1]);

  const myTheme = {
    graph: {
      plot: {
        backgroundColor: '#41B6E6',
      },
      plotarea: {
        margin: '20px 50px 60px 60px',
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
        text: '%vt total work items in progress on %kt',
      },
    },
  };

  const config = {
    type: 'area',
    utc: true,
    globals: {
      fontFamily: 'Open Sans',
    },
    'scale-y': {
      zooming: 'true',
      label: {
        text: 'WIP',
        fontSize: '14px',
        fontColor: 'rgba(0, 0, 0, 0.7)',
      },
    },
    'scale-x': {
      zooming: 'true',
      label: {
        text: 'Date',
        fontSize: '14px',
        fontColor: 'rgba(0, 0, 0, 0.7)',
      },
      labels: x,
      step: 'day',
      transform: {
        type: 'date',
        all: '%dd %M %Y',
      },
    },
    series: [
      {
        values: y,
        lineWidth: 3,
        lineColor: '#009CDE',
        marker: {
          backgroundColor: '#009CDE',
        },
      },
    ],
  };

  return <ZingChart data={config} theme={myTheme} />;
};

export default WipRunChart;
