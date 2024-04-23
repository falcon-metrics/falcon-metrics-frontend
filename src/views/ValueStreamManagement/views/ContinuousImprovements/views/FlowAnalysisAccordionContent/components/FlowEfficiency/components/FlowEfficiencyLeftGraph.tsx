import { Box, styled } from '@material-ui/core';
import { useMemo } from 'react';
import ZingChart from 'zingchart-react';

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
      text: "%v (%npv%) %t",
    },
  },
};

const baseChartConfig = {
  type: 'ring',
  globals: {
    fontSize: '12px',
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

type EfficiencyAnalysisData = {
  activeTime: number;
  waitingTime: number;
};

type Props = {
  data?: EfficiencyAnalysisData;
};

const NoDataAvailable = styled(Box)({
  fontFamily: 'Open Sans',
  fontSize: 15,
  textAlign: 'center',
  color: '#b5b5b5',
  height: '480px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
});

export const FlowEfficiencyLeftGraph = ({
  data,
}: Props) => {
  const chartData = useMemo(() => {
    const activeTime = data && data.activeTime ? data.activeTime : 0;
    const waitingTime = data && data.waitingTime ? data.waitingTime : 0;
    const mySeries = [
      {
        text: 'Value-adding time',
        values: [activeTime],
        legendItem: { visible: false },
        backgroundColor: '#2AD2C9',
        valueBox: [
          {
            connected: 'false',
            placement: 'center',
            text: '%npv%',
            decimals: 0,
            offsetY: '-1700%',
            fontSize: '35px',
            fontWeight: 'bold',
            fontColor: 'rgba(0, 0, 0, 0.7)',
          },
          {
            connected: 'false',
            placement: 'center',
            text: 'Process Flow Efficiency',
            fontSize: '15px',
            offsetY: '2200%',
            fontWeight: 'normal',
            fontColor: 'rgba(0, 0, 0, 0.7)',
          },
        ],
      },
      {
        text: 'Waiting time',
        values: [waitingTime],
        legendItem: { visible: false },
        backgroundColor: '#E1523E',
        valueBox: { text: null },
      },
    ];

    return {
      ...baseChartConfig,
      legend: {
        layout: '1x2',
        adjustLayout: 'true',
        verticalAlign: 'bottom',
        align: 'center',
        height: '60px',
        border: '0px',
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
  }, [data?.waitingTime, data?.activeTime]);

  if (!data || (!data.waitingTime && !data.activeTime)) {
    return <NoDataAvailable>No data available for the selected criteria</NoDataAvailable>;
  }

  return <ZingChart data={chartData} theme={myTheme} />;
};
