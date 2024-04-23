import { AggregationPeriod } from 'core/api/ApiClient/SummaryClient';
import ZingChart from 'zingchart-react';
import { useMemo } from 'react';
import { removePluralityFromAggregation } from 'views/ValueStreamManagement/views/DeliveryManagement/utils/aggregation';
import { formatDate } from 'utils/dateTime';

type Props = {
  demand: { date: string; demand: number; }[];
  capacity: { date: string; capacity: number; }[];
  currentDataAggregation: AggregationPeriod;
}

function CapacityDemandGraph({
  demand,
  capacity,
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
            rule: '"%plot-text" == "Demand"',
            text: '%vt work items committed\nin the ' + step + ' starting %kt',
            //backgroundColor: '#003050',
            //fontColor: 'white'
          },
          {
            //Rule 2
            rule: '"%plot-text" == "Capacity"',
            text: '%vt work items completed\nin the ' + step + ' starting %kt',
            //backgroundColor: '#009CDE',
            //fontColor: "rgba(0, 0, 0, 0.7)",
          }
        ],
      },
    },
  }), [step]);

  const chartData = useMemo(() => setupChartData(demand, capacity, step as any), [demand, capacity, step]);

  return <ZingChart data={chartData} theme={myTheme} />;
}

function setupChartData(
  demand: {demand: number; date: string}[],
  capacity: {capacity: number; date: string}[],
  step: 'day' | 'week' | 'month' | 'quarter' | 'year'
) {
  const chartSeries: Array<any> = [];

  chartSeries.push({
    type: 'bar',
    text: 'Demand',
    values: demand.map((item) => [
      formatDate(item.date), //.substring(0, ['month', 'quarter', 'year'].includes(step) ? 7 : 10),
      item.demand,
    ]),
    backgroundColor: '#22A8A1',
    legendMarker: {
      type: 'square',
    },
    'bar-space': '0.15',
    'bar-width': step === 'day' ? undefined : '20',
  });

  chartSeries.push({
    type: 'bar',
    text: 'Capacity',
    values: capacity.map((item) => [
      formatDate(item.date), //.substring(0, ['month', 'quarter', 'year'].includes(step) ? 7 : 10),
      item.capacity,
    ]),
    backgroundColor: '#004E6F',
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

export default CapacityDemandGraph;
