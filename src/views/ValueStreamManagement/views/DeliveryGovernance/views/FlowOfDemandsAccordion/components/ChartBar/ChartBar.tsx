import { useMemo } from 'react';

import { AggregationPeriod } from 'core/api/ApiClient/SummaryClient';
import ZingChart from 'zingchart-react';
import { removePluralityFromAggregation } from 'views/ValueStreamManagement/views/DeliveryManagement/utils/aggregation';

type Props = {
  firstSerieData?: number[];
  firsSerieName?: string;
  firstSerieColor?: string;
  secondSerieData?: number[];
  secondSerieName?: string;
  secondSerieColor?: string;
  currentDataAggregation: AggregationPeriod;
};

export function ChartBar(props: Props) {
  const { currentDataAggregation } = props;
  const customProps = {
    firstSerieData: props?.firstSerieData,
    firsSerieName: props?.firsSerieName,
    firstSerieColor: props?.firstSerieColor,
    secondSerieData: props?.secondSerieData,
    secondSerieName: props?.secondSerieName,
    secondSerieColor: props?.secondSerieColor,
  };
  
  const myTheme = useMemo(() => ({
    graph: {
      width: 220,
      height: 200,
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
        rules: [
          {
            rule: '"%plot-text" == "Demand"',
            text: '%vt flow items',
          },
          {
            //Rule 2
            rule: '"%plot-text" == "Capacity"',
            text: '%vt flow items',
          }
        ],
      },
    },
  }), []);

  const step = removePluralityFromAggregation(currentDataAggregation.toLowerCase());
  
  const chartData = useMemo(
    () => setupChartData(customProps, step),
    [customProps.firstSerieData, step, customProps?.secondSerieColor]
  );

  return <ZingChart data={chartData} theme={myTheme} />;
}

function setupChartData(
  customProps: any,
  step: 'day' | 'week' | 'month' | 'quarter' | 'year',
) {
  const chartSeries: Array<any> = [];
  chartSeries.push({
    type: 'bar',
    text: customProps?.firsSerieName || '',
    values: customProps?.firstSerieData || [],
    backgroundColor: customProps?.firstSerieColor,
    legendMarker: {
      visible: false,
      type: 'square',
    },
    'bar-space': '0.15',
    'bar-width': step === 'day' ? undefined : '48',
  });

  chartSeries.push({
    type: 'bar',
    text: customProps?.secondSerieName || '',
    values: customProps?.secondSerieData || [],
    backgroundColor: customProps?.secondSerieColor || '#22A8A1',
    legendMarker: {
      visible: false,
      type: 'square',
    },
    'bar-space': '0.15',
    'bar-width': step === 'day' ? undefined : '48',
  });

  return {
    type: 'bar',
    utc: true,
    globals: {
      fontFamily: 'Open Sans',
    },
    legend: {
      border: '0px',
      item: {
        fontSize: '12px',
        fontColor: 'rgba(0, 0, 0, 0.7)',
      },
      width: 112,
      highlightPlot: false,
      marker: {
        type: 'circle',
        visible: false
      },
      layout: '2x2',
      align: 'bottom',
      marginTop: 145,
      offsetX: -65,
    },
    plot: {
      barMaxWidth: 60,
      barsSpaceLeft: 6,
      barsSpaceRight: 6,
      marker: {
        visible: false,
      },
      tooltip: {
        text: "%vt flow items"
      },
    },
    scaleY: {
      borderColor: 'rgba(0, 0, 0, 0)',
      borderAlpha: 0,
      lineWidth: 0,
      tick: {
        visible: false,
      },
      visible: false,
      label: {
        text: '',
        fontSize: '14px',
        fontColor: 'rgba(0, 0, 0, 0)',
        visible: false,
      },
      guide: {
        lineColor: "#fff",
      },
    },
    scaleX: {
      label: {
        text: step[0].toUpperCase() + step.substring(1) + 's',
        fontSize: '14px',
        fontColor: 'rgba(0, 0, 0, 0)',
        visible: false,
        enable: false
      },
      visible: false,
      tick: {
        visible: false,
      },
    },
    series: chartSeries,
  };
}
