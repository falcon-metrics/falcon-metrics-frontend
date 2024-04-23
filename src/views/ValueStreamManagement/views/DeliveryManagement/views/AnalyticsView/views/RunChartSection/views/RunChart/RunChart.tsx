import ZingChart from 'zingchart-react';
import { TimeSeries } from '../../../../interfaces/runChart';
import { DEFAULT_DATE_FORMAT } from 'utils/dateTime';

export interface RunChartProps {
  runChartSeries: TimeSeries | any;
  chartType: string;
  customXAxisLabel: string | undefined;
  customDateFormat: string | undefined;
  customTooltipLabel: string | undefined;
  isWidgetPreview?: boolean;
};

const RunChart = ({
  runChartSeries,
  chartType,
  customXAxisLabel = undefined,
  customDateFormat = undefined,
  customTooltipLabel = undefined,
  isWidgetPreview
}: RunChartProps) => {
  const x: number[] = runChartSeries.map(
    ([date, _count]) => isWidgetPreview ? date : date.toMillis()
  );
  const y: number[] = runChartSeries.map(
    ([_date, count]) => count
  );

  const xAxisLabel = customXAxisLabel ?? 'Day';
  const tooltipLabel = customTooltipLabel ?? '%vt total work items on %kt';

  // Currently no way to escape standard apostrophes
  const dateFormat = customDateFormat ?? DEFAULT_DATE_FORMAT;
  const labels: string[] = runChartSeries.map(
    ([date, _count]) => isWidgetPreview ? date : date.toFormat(dateFormat)
  );

  const myTheme = {
    graph: {
      plot: {
        backgroundColor: '#41B6E6',
      },
      plotarea: {
        margin: '20px 50px 60px 60px',
      },
    },
  };

  const config = {
    type: chartType,
    plot: {
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
        text: tooltipLabel,
      },
    },
    globals: {
      fontFamily: 'Open Sans',
    },
    'scale-y': {
      zooming: 'true',
      label: {
        text: 'Work Items Count',
        fontSize: '14px',
        fontColor: 'rgba(0, 0, 0, 0.7)',
      },
    },
    'scale-x': {
      zooming: 'true',
      values: x,
      label: {
        text: xAxisLabel,
        fontSize: '14px',
        fontColor: 'rgba(0, 0, 0, 0.7)',
      },
      labels,
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

export default RunChart;
