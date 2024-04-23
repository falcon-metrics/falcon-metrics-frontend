import { useMemo } from 'react';
import { removePluralityFromAggregation } from 'views/ValueStreamManagement/views/DeliveryManagement/utils/aggregation';
import { colourPalletLine } from 'views/ValueStreamManagement/views/DeliveryManagement/views/AnalyticsView/views/ProfileOfWorkSection/utils/chartColors';
import ZingChart from 'zingchart-react';
import { legendConfigs } from '../ChartConfig';
import { formatDate } from 'utils/dateTime';

export interface HistoricalChartDataRow {
  dateStart: string;
  dateEnd: string;
  values: {
    [normalizedDisplayName: string]: number;
  };
};
export type HistoricalChartData = HistoricalChartDataRow[];

const defaultTheme = {
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
      fontFamily: 'Open Sans',
      padding: '8px',
      htmlMode: true,
      shadow: false,
      borderColor: '#e3e3e3',
      borderWidth: '1px',
    },
  },
};

type Props = {
  data: HistoricalChartData,
  currentDataAggregation,
  getColorByDisplayName?: (displayName: string) => string | undefined;
  stackType?: string;
};

function getLabelListFromData(
  data: HistoricalChartData
): string[] {
  return data.map(bucket => {
    return formatDate(bucket.dateStart);
  });
}

function getColorListFromData(data: HistoricalChartData, getColorByDisplayName?: (key: string) => string | undefined) {
  const colorRecord: Record<string, string> = {};
  {
    const seriesNameList: string[] = [];

    for (const dateBucket of data) {
      for (const seriesName in dateBucket.values) {
        if (!seriesNameList.includes(seriesName)) {
          seriesNameList.push(seriesName);
        }
      }
    }

    seriesNameList.sort((a, b) => a.localeCompare(b));

    let colourIdxBG = 0;
    for (let i = 0; i < seriesNameList.length; i++) {
      const seriesName = seriesNameList[i];
      const normalizationColor = getColorByDisplayName ? (
        seriesName === 'Not classified' ? '#DDDDDD' : getColorByDisplayName(seriesName)
      ) : undefined;
      colorRecord[seriesName] = normalizationColor || colourPalletLine[colourIdxBG++];
    }
  }
  return colorRecord;
}

function getSeriesListFromData(
  data: HistoricalChartData,
  getColorByDisplayName?: (displayName: string) => string | undefined,
): { text: string, values: number[], backgroundColor: string; }[] {

  const colorRecord = getColorListFromData(data, getColorByDisplayName);

  const seriesRecord: Record<string, { seriesName: string, values: { date: string, count: number; }[]; }> = {};
  // Transverse data to find all classes of services
  for (const dateBucket of data) {
    for (const seriesName in dateBucket.values) {
      if (!seriesRecord[seriesName]) {
        seriesRecord[seriesName] = {
          seriesName,
          values: [],
        };
      }
    }
  }
  // Fill values for each series for all dates
  for (const dateBucket of data) {
    for (const seriesName in seriesRecord) {
      const existingSeries = seriesRecord[seriesName];
      existingSeries.values.push(
        {
          date: dateBucket.dateStart,
          count: dateBucket.values[existingSeries.seriesName] || 0
        }
      );
    }
  }

  // Transform series record into zingchart series object
  const series: { text: string, values: number[], backgroundColor: string; }[] = [];
  for (const seriesName in seriesRecord) {
    series.push({
      text: seriesName,
      values: seriesRecord[seriesName].values.map(value => value.count),
      backgroundColor: colorRecord[seriesName],
    });
  }

  return series;
}

const HistoricalDataChart = ({
  data,
  currentDataAggregation,
  getColorByDisplayName,
  stackType
}: Props) => {
  const labels = getLabelListFromData(data);
  const config = useMemo(() => {
    if (!data) {
      // You should show skeleton loading while there's no data
      console.warn('Missing data on historical chart');
      return null;
    }
    const series = getSeriesListFromData(data, getColorByDisplayName);

    for (const serie of series) {
      if (serie.values.length !== labels.length) {
        throw new Error(`Mismatch between labels length (${labels.length}) and serie value length (${serie.values.length})`);
      }
    }
    const sortedSeries = series.sort((a, b) => a.text.localeCompare(b.text));

    const config: any = {
      type: 'bar',
      stacked: true,
      stackType: stackType || '100%',
      scaleX: {
        guide: { visible: false },
        item: { fontColor: '#8B8B8B' },
        labels: labels,
        label: {
          text: currentDataAggregation[0].toUpperCase() + currentDataAggregation.substring(1) + ' Starting',
          fontColor: 'rgba(0, 0, 0, 0.7)',
          fontSize: '14px',
        },
        lineColor: '#7E7E7E',
        step: '1',
        tick: { visible: false },
        values: labels,
        zooming: true,
      },
      scaleY: {
        guide: {
          alpha: 0.4,
          lineColor: "#53566f",
          lineStyle: "solid",
          lineWidth: "1px"
        },
        item: { fontColor: "#8B8B8B" },
        lineColor: "#7E7E7E",
        short: true,
        tick: { visible: false },
        label: { text: "Items (stacked)" }
      },
      series: sortedSeries,
      tooltip: {
        decimals: 1,
        rules: [
          {
            rule: '%vt <= 1',
            decimals: 2,
            text: `%vt ${stackType === 'normal' ? '' : '(%npv%)'} %plot-text item in ${removePluralityFromAggregation(currentDataAggregation)} starting %kt`,
          },
          {
            rule: '%vt > 1',
            text: `%vt ${stackType === 'normal' ? '' : '(%npv%)'} %plot-text items in ${removePluralityFromAggregation(currentDataAggregation)} starting %kt`,
          },
        ],
      },
      legend: legendConfigs,
      plot: {
        'scale-y': {
          'min-value': 0,
          'max-value': 100
        },
        barWidth: '25px',
        hoverState: {
          visible: false,
        },
        // animation: {
        //   method: 'LINEAR',
        //   delay: 0,
        //   effect: 0,
        //   sequence: 0,
        //   speed: 0,
        // },
      }
    };

    return config;
  }, [data, getColorByDisplayName]);

  return <ZingChart data={config} theme={defaultTheme} />;
};
export default HistoricalDataChart;
