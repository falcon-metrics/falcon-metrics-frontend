import { useMemo } from 'react';

import {
  AggregationPeriod,
  getAggregationData,
  PeriodType,
} from 'core/api/ApiClient/SummaryClient';
import useNormalizationColors from 'hooks/fetch/useNormalizationColors';
import capitalize from 'lodash/capitalize';
import find from 'lodash/find';
import groupBy from 'lodash/groupBy';
import merge from 'lodash/merge';
import sortBy from 'lodash/sortBy';
import {
  ChartProps,
} from 'views/Dashboard/views/AnalyticsDashboard/views/Summary';
import ZingChart from 'zingchart-react';

const myTheme = {
  graph: {
    plot: {
      backgroundColor: '#41B6E6',
      fontSize: '14px',
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
      fontFamily: 'Open Sans',
      padding: '8px',
      htmlMode: true,
      shadow: false,
      borderColor: '#e3e3e3',
      borderWidth: '1px',
    },
  },
};

type SeriesData = {
  backgroundColor: string;
  values: (number | undefined)[];
  text: string;
};

export type SeriesGenerator = (data: SeriesData) => SeriesData;

type Props<T> = ChartProps<T> & {
  zingchartConfigs?: Object;
  defaultColorMap: Record<string, string>;
  seriesGenerator?: SeriesGenerator;
  tooltipPluralization?: ' items' | 's' | '';
};

function BarChart<T>({
  data,
  currentDataAggregation,
  defaultColorMap,
  seriesOrder,
  zingchartConfigs,
  seriesGenerator = (data) => data,
  tooltipPluralization = ' items',
}: Props<T>) {
  const { filterColors } = useNormalizationColors();
  const combinedZingchartConfigs = useMemo(() => {
    const getColorByDisplayName = (displayName: string) =>
      find(filterColors, { displayName })?.colorHex;
    const itemsByFilterType: Array<PeriodType<AggregationPeriod>> =
      data[currentDataAggregation];
    const { displayName, xValueGenerator } = getAggregationData(
      currentDataAggregation,
    );
    const scaleXValue = itemsByFilterType.map(xValueGenerator);
    const periodGroups = groupBy(itemsByFilterType, xValueGenerator);
    const periods = Object.keys(periodGroups);
    const values = itemsByFilterType.map((item) => item.values).flat();
    const groupedValues = groupBy(values, 'itemTypeName');
    const seriesNames = sortBy(Object.keys(groupedValues), (name) =>
      seriesOrder.indexOf(name),
    );
    const series: Array<SeriesData> = seriesNames.map((seriesName) => {
      const values = periods.map((period) => {
        const periodGroup = periodGroups[period][0];
        const { values } = periodGroup;
        return values.find((v) => v.itemTypeName === seriesName)?.count;
      });
      return seriesGenerator({
        backgroundColor:
          getColorByDisplayName(seriesName) ??
          find(
            defaultColorMap,
            (_, workItemTypeName) =>
              !!seriesName
                .toLocaleLowerCase()
                .includes(workItemTypeName.toLocaleLowerCase()),
          ) ??
          'blue',
        values,
        text: capitalize(seriesName),
      });
    });

    const xLabel = {
      label: {
        text: displayName,
        fontColor: 'rgba(0, 0, 0, 0.7)',
        fontSize: '14px',
      },
    };

    const tooltipText =
      currentDataAggregation?.toLowerCase() === 'weeks' ? 'week starting' : '';

    return merge(
      {
        type: 'bar',
        backgroundColor: '#FFFFFF',
        stacked: true,
        stackType: '100%',
        plot: {
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
        },
        scaleX: {
          zooming: true,
          values: scaleXValue,
          step: '1',
          guide: {
            visible: false,
          },
          item: {
            fontColor: '#8B8B8B',
          },
          lineColor: '#7E7E7E',
          tick: {
            visible: false,
          },
          ...xLabel,
        },
        scaleY: {
          guide: {
            alpha: 0.4,
            lineColor: '#53566f',
            lineStyle: 'solid',
            lineWidth: '1px',
          },
          item: {
            fontColor: '#8B8B8B',
          },
          lineColor: '#7E7E7E',
          short: true,
          tick: {
            visible: false,
          },
          label: {
            text: 'Items (stacked)',
          },
        },
        legend: {
          borderWidth: 0,
          layout: '1x3',
          align: 'center',
          verticalAlign: 'bottom',
          item: {
            fontSize: '12px',
            fontColor: 'rgba(0, 0, 0, 0.7)',
            fontFamily: 'Open Sans',
            marginRight: '16px',
          },
          marker: {
            type: 'circle',
          },
        },
        tooltip: {
          decimals: 1,
          rules: [
            {
              rule: '%vt <= 1',
              decimals: 2,
              text: `%vt (%npv%) %t${tooltipPluralization.replace(
                's',
                '',
              )} in ${tooltipText} %kt.`,
            },
            {
              rule: '%vt > 1',
              text: `%vt (%npv%) %t${tooltipPluralization} in ${tooltipText} %kt.`,
            },
          ],
        },
        series,
      },
      zingchartConfigs,
    );
  }, [
    data,
    currentDataAggregation,
    filterColors,
    zingchartConfigs,
    defaultColorMap,
    seriesOrder,
    seriesGenerator,
  ]);

  return <ZingChart data={combinedZingchartConfigs} theme={myTheme} />;
}

export default BarChart;
