import { AggregationPeriod } from 'core/api/ApiClient/SummaryClient';
import ZingChart from 'zingchart-react';
import { useMemo } from 'react';
import { removePluralityFromAggregation } from 'views/ValueStreamManagement/views/DeliveryManagement/utils/aggregation';
import { formatDate } from 'utils/dateTime';

type Props = {
  inflow: { date: string; inflow: number; }[];
  outflow: { date: string; outflow: number; }[];
  currentDataAggregation: AggregationPeriod;
};

function InflowOutflowGraph({
  inflow,
  outflow,
  currentDataAggregation,
}: Props) {
  const step = removePluralityFromAggregation(currentDataAggregation.toLowerCase());
  
  const myTheme = useMemo(() => ({
    graph: {
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
            //Rule 1
            rule: '"%plot-text" == "Inflow"',
            text: '%vt work items committed\nin the ' + step + ' starting %kt',
            //backgroundColor: '#003050',
            //fontColor: 'white'
          },
          {
            //Rule 2
            rule: '"%plot-text" == "Outflow"',
            text: '%vt work items completed\nin the ' + step + ' starting %kt',
            //backgroundColor: '#009CDE',
            //fontColor: "rgba(0, 0, 0, 0.7)",
          }
        ],
      },
    },
  }), [step]);

  const chartData = useMemo(() => setupChartData(inflow, outflow, step as any), [inflow, outflow, step]);

  return <ZingChart data={chartData} theme={myTheme} />;
}

function setupChartData(
  inflow: {inflow: number; date: string}[],
  outflow: {outflow: number; date: string}[],
  step: 'day' | 'week' | 'month' | 'quarter' | 'year'
) {
  const chartSeries: Array<any> = [];

  chartSeries.push({
    type: 'bar',
    text: 'Inflow',
    values: inflow.map((item) => [
      formatDate(item.date), //.substring(0, ['month', 'quarter', 'year'].includes(step) ? 7 : 10),
      item.inflow,
    ]),
    backgroundColor: '#66ADDE',
    legendMarker: {
      type: 'square',
    },
    'bar-space': '0.15',
    'bar-width': step === 'day' ? undefined : '20',
  });

  chartSeries.push({
    type: 'bar',
    text: 'Outflow',
    values: outflow.map((item) => [
      formatDate(item.date), //.substring(0, ['month', 'quarter', 'year'].includes(step) ? 7 : 10),
      item.outflow,
    ]),
    backgroundColor: '#005FA0',
    legendMarker: {
      type: 'square',
    },
    'bar-space': '0.15',
    'bar-width': step === 'day' ? undefined : '20',
  });

  return {
    type: 'mixed',
    utc: true,
    globals: {
      fontSize: '12px',
      fontFamily: 'Open Sans',
    },
    legend: {
      border: '0px',
      align: 'center',
      item: {
        fontSize: '12px',
        fontColor: 'rgba(0, 0, 0, 0.7)',
      },
      highlightPlot: true,
      marker: {
        type: 'circle',
      },
    },
    plot: {
      tooltip: {
        text: "%t on %kt is %vt"
      },
    //},
    // plot: {
      barMaxWidth: 20,
      barsSpaceLeft: 2,
      barsSpaceRight: 2,
      marker: {
        visible: true,
      },
    },
    scaleY: {
      label: {
        text: 'Number of items',
        fontSize: '14px',
        fontColor: 'rgba(0, 0, 0, 0.7)',
      },
      guide: {
        //lineColor: "#909090",
      },
    },
    scaleX: {
      label: {
        text: step[0].toUpperCase() + step.substring(1),
        fontSize: '14px',
        fontColor: 'rgba(0, 0, 0, 0.7)',
      },
    },
    series: chartSeries,
  };
}

export default InflowOutflowGraph;
