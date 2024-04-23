import { useMemo } from 'react';
import ZingChart from 'zingchart-react';
import { EfficiencyAnalysisData } from 'core/api/ApiClient/FlowEfficiencyClient';
import { DataProps } from 'components/Charts/components/DefaultDashboardCard/interfaces/ChartConfig';
import { baseChartConfig, myTheme } from '../../FlowEfficiency.styles';

export type Data = DataProps<EfficiencyAnalysisData>;

const defaultValues: EfficiencyAnalysisData = {
  valueAddingTimeDays: 0,
  waitingTimeDays: 0,
};

const FlowEfficiencyAnalysis = ({ data }: Data) => {
  const chartConfig = useMemo(() => {
    const { valueAddingTimeDays, waitingTimeDays } = data ?? defaultValues;

    const mySeries = [
      {
        text: 'Value-adding time',
        values: [valueAddingTimeDays],
        backgroundColor: '#2AD2C9',
        valueBox: [
          {
            connected: 'false',
            placement: 'center',
            text: '%npv%',
            offsetY: '-1700%',
            fontSize: '35px',
            fontWeight: 'bold',
            fontColor: 'rgba(0, 0, 0, 0.7)',
          },
          {
            connected: 'false',
            placement: 'center',
            text: 'Flow Efficiency',
            fontSize: '15px',
            offsetY: '2200%',
            fontWeight: 'normal',
            fontColor: 'rgba(0, 0, 0, 0.7)',
          },
        ],
      },
      {
        text: 'Waiting time',
        values: [waitingTimeDays],
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
  }, [data]);

  return <ZingChart data={chartConfig} theme={myTheme} />;
};

export default FlowEfficiencyAnalysis;
