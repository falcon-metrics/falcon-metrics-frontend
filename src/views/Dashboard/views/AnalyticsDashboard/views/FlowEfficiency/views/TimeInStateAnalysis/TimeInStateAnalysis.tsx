import { useMemo } from 'react';
import { DataProps } from 'components/Charts/components/DefaultDashboardCard/interfaces/ChartConfig';
import { colourPallet } from 'views/Dashboard/components/Charts/configuration/ChartColors';
import ZingChart from 'zingchart-react';
import { baseChartConfig, myTheme } from '../../FlowEfficiency.styles';

export type Data = DataProps<Array<{ state: string; totalDays: number }>>;

export const TimeInStateAnalysis = ({ data = [] }: Data) => {
  const chartConfig = useMemo(() => {
    const getBackgroundColor = (label: string, colorIndex: number) => {
      const fixedColors = {
        backlog: '#ef5350',
      };
      while (colorIndex > colourPallet.length) {
        colorIndex = colorIndex - colourPallet.length;
      }
      const lowerLabel = label.toLowerCase();
      const fixedColor: string | undefined = fixedColors[lowerLabel];
      return fixedColor ?? colourPallet[colorIndex];
    };

    const mySeries = data.map((stateDatum, i) => ({
      values: [stateDatum.totalDays],
      text: stateDatum.state,
      backgroundColor: getBackgroundColor(stateDatum.state, i),
    }));

    return {
      ...baseChartConfig,
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
  }, [data]);

  return <ZingChart data={chartConfig} theme={myTheme} />;
};
