// @ts-ignore
import ZingChart from 'zingchart-react';
import { colourPallet } from 'views/Dashboard/components/Charts/configuration/ChartColors';

interface PageProps {
  data: Array<{ type: string; count: number }>;
}

const ThroughputNatureOfWork = ({ data }: PageProps) => {
  let colourIdx = 0;

  const mySeries = data.map((item) => {
    let colour = '';

    if (item.type === 'Unplanned work') {
      colour = '#E1523E';
    } else if (item.type === 'Planned work') {
      colour = '#2AD2C9';
    } else if (item.type === 'Not classified') {
      colour = '#F5B24B';
    } else {
      colour = colourPallet[colourIdx++];
    }

    return {
      values: [item.count],
      text: item.type,
      backgroundColor: colour,
    };
  });

  const myTheme = {
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
        text: '%v %t\n (%npv%)',
      },
    },
  };

  const config = {
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
    legend: {
      layout: '4x2',
      maxItems: '8',
      overflow: 'scroll',
      border: '0px',
      adjustLayout: 'true',
      verticalAlign: 'bottom',
      align: 'center',
      item: {
        fontSize: '12px',
        fontColor: 'rgba(0, 0, 0, 0.7)',
      },
      marker: {
        type: 'circle',
      },
    },
    series: mySeries,
  };

  return <ZingChart data={config} theme={myTheme} />;
};

export default ThroughputNatureOfWork;
