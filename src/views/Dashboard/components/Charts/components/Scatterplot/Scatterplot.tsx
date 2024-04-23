import ReactDOMServer from 'react-dom/server';
import ZingChart from 'zingchart-react';
import difference from 'lodash/difference';
import groupBy from 'lodash/groupBy';
import sortBy from 'lodash/sortBy';
import startCase from 'lodash/startCase';
import {
  ScatterplotTooltipSingle,
  ScatterplotTooltipMultiple,
  TooltipDatum,
  PropsMultiple,
} from 'views/Dashboard/components/Charts/components/Scatterplot/components/ScatterplotTooltip';
import { AllowedNames } from 'utils/typescript/types';
import { DateTime, Duration } from 'luxon';
import useSWR from 'swr';
import { generateSWRKeysFromObject } from 'core/api/fetch';
import { useCallback, useMemo } from 'react';
import 'views/Dashboard/components/Charts/components/Scatterplot/components/ScatterplotTooltip.css';
import { ScatterplotBaseProps } from 'views/Dashboard/components/Charts/components/Scatterplot/interfaces/ScatterplotBaseProps';
import { getPercentileMarkers } from 'views/Dashboard/components/Charts/utils/getPercentileMarker';
import { getTargetMarker } from 'views/Dashboard/components/Charts/utils/getTargetMarker';
import { getOutlierArea } from 'views/Dashboard/components/Charts/utils/getOutlierArea';

type Props<T, X extends TooltipDatum> = {
  xScaleField: keyof T;
  yScaleField: keyof T;
  xLabel?: string;
  yLabel?: string;
  tooltipDataTransformer(datum: T): X;
  fieldsToIncludeIfMultiple?: Array<Extract<keyof X, string>>;
  tooltipTitleProperty: AllowedNames<X, string>;
  chartId: string;
} & ScatterplotBaseProps<T>;

function Scatterplot<T, X extends TooltipDatum>({
  data,
  targetForPredictability,
  maximum,
  percentile50th,
  percentile85th,
  percentile95th,
  lowerOutliers,
  upperOutliers,
  xScaleField,
  yScaleField,
  fieldsToIncludeIfMultiple = [],
  tooltipTitleProperty,
  xLabel,
  yLabel,
  tooltipDataTransformer,
  chartId,
  filters,
}: Props<T, X>) {
  const maxYValue = (maximum ?? 0) + 1;

  let minLowerOutliers,
    maxLowerOutliers,
    minUpperOutliers,
    maxUpperOutliers = 0;

  if (lowerOutliers && lowerOutliers.length) {
    minLowerOutliers = lowerOutliers[0];
    maxLowerOutliers = lowerOutliers[lowerOutliers.length - 1];
  }

  if (upperOutliers && upperOutliers.length) {
    minUpperOutliers = upperOutliers[0];
    maxUpperOutliers = upperOutliers[upperOutliers.length - 1];
  }

  const targetMarker = useMemo(() => getTargetMarker(targetForPredictability), [
    targetForPredictability,
  ]);

  const percentiles: {
    percentileLabel: number;
    value: number | undefined;
  }[] = [
    { percentileLabel: 50, value: percentile50th },
    { percentileLabel: 85, value: percentile85th },
    { percentileLabel: 95, value: percentile95th },
  ];

  const percentileMarkers = getPercentileMarkers(percentiles);

  const fetcher = useCallback(() => {
    type SeriesData = Record<keyof X, Array<X[keyof X]>>;
    type SeriesDataTuple = [any, any];
    const partialSinglePointSeriesData: Partial<SeriesData> = {};

    const datumKeys = Object.keys(tooltipDataTransformer(data[0])) as Array<
      keyof X
    >;
    datumKeys.forEach((k) => {
      partialSinglePointSeriesData[k] = [];
    });
    const singlePointSeriesData = {
      ...(partialSinglePointSeriesData as SeriesData),
      data: [] as SeriesDataTuple[],
    };

    const groupedData = groupBy(
      data,
      (d) => String(d[xScaleField]) + String(d[yScaleField]),
    );
    type Key = keyof typeof groupedData;
    const groupedDataKeys = Object.keys(groupedData) as Key[];

    const isSinglePoint = (groupKey: Key) => {
      const dataGroup = groupedData[groupKey];
      return dataGroup.length === 1;
    };

    groupedDataKeys.forEach((groupKey) => {
      if (!isSinglePoint(groupKey)) {
        return;
      }
      const dataValue = groupedData[groupKey][0];
      datumKeys.forEach((datumKey) => {
        singlePointSeriesData[datumKey]?.push(
          tooltipDataTransformer(dataValue)[datumKey],
        );
      });
      singlePointSeriesData.data.push([
        dataValue[xScaleField],
        dataValue[yScaleField],
      ]);
    });

    const maxNumberOfPoints = Math.max(
      ...groupedDataKeys.map((k) => groupedData[k].length),
    );

    const chartSeries = groupedDataKeys
      .filter((k) => !isSinglePoint(k))
      .map((key) => {
        const group = groupedData[key];
        const tooltipData = group.map(tooltipDataTransformer);

        const fieldsToExcludeIfMultiple = difference(
          Object.keys(group[0]).filter(
            (k) => typeof group[0][k] === 'string',
          ) as PropsMultiple<X>['fieldsToExclude'],
          fieldsToIncludeIfMultiple,
        );

        return {
          values: [[group[0][xScaleField], group[0][yScaleField]]],
          text: String(group.length),
          marker: getMarkerConfig(maxNumberOfPoints, group.length),
          tooltip: {
            text: ReactDOMServer.renderToStaticMarkup(
              <ScatterplotTooltipMultiple
                title={group[0][String(tooltipTitleProperty)]}
                tooltipData={tooltipData}
                fieldsToExclude={fieldsToExcludeIfMultiple}
              />,
            ),
          },
        };
      });

    const buildDataKey = (key: string | number | symbol) =>
      'data-' + String(key);
    const tokensWithDisplayName = datumKeys.map((datumKey) => ({
      datumKey,
      displayName: startCase(String(datumKey)),
      tokenId: buildDataKey(datumKey),
    }));
    const tokenValues: any = {};
    tokensWithDisplayName.forEach(({ tokenId, datumKey }) => {
      tokenValues[tokenId] = singlePointSeriesData[datumKey];
    });

    const seriesForSinglePoints = {
      ...tokenValues,
      values: singlePointSeriesData.data,
      marker: getMarkerConfig(maxNumberOfPoints),
      valueBox: { text: '' },
      tooltip: {
        text: ReactDOMServer.renderToStaticMarkup(
          <ScatterplotTooltipSingle
            title={buildDataKey(tooltipTitleProperty)}
            zingchartTokens={tokensWithDisplayName.filter(
              ({ datumKey }) => datumKey !== tooltipTitleProperty,
            )}
          />,
        ),
      },
    };

    const getLabel = (fieldName: keyof T, label?: string) =>
      label ?? (typeof fieldName === 'string' ? startCase(fieldName) : '');
    const xScaleValues = getXScaleValues<T>(data, xScaleField);

    return {
      type: 'scatter',
      utc: true,
      globals: {
        fontSize: '14px',
        fontFamily: 'Open Sans',
      },
      plot: {
        valueBox: {
          text: '%t',
          color: '#0078ac',
          fontSize: '10%',
          placement: 'over',
        },
        tooltip: {
          visible: true,
          callout: true,
          calloutWidth: '20px',
          backgroundColor: '#ffffff',
          fontColor: '#707070',
          fontSize: '12px',
          textAlign: 'left',
          htmlMode: true,
          placement: 'node:top',
          offsetY: -6,
          sticky: true,
          shadow: false,
          borderColor: '#e3e3e3',
          borderWidth: '1px',
          timeout: 5000,
        },
      },
      plotarea: {
        margin: '20px 50px 60px 60px',
      },
      'scale-y': {
        zooming: true,
        markers: [
          ...percentileMarkers,
          targetMarker,
          getOutlierArea(minLowerOutliers, maxLowerOutliers),
          getOutlierArea(minUpperOutliers, maxUpperOutliers),
        ],
        label: {
          text: getLabel(yScaleField, yLabel),
          fontColor: 'rgba(0, 0, 0, 0.7)',
        },
        'max-value': maxYValue,
      },
      'scale-x': {
        zooming: true,
        label: {
          text: getLabel(xScaleField, xLabel),
          fontColor: 'rgba(0, 0, 0, 0.7)',
        },
        step: 'day',
        transform: {
          type: 'date',
          all: '%dd %M %Y',
        },
        ...xScaleValues,
      },
      series: [...chartSeries, seriesForSinglePoints],
    };
  }, [
    data,
    fieldsToIncludeIfMultiple,
    maxLowerOutliers,
    maxUpperOutliers,
    maxYValue,
    minLowerOutliers,
    minUpperOutliers,
    percentileMarkers,
    tooltipDataTransformer,
    tooltipTitleProperty,
    xLabel,
    xScaleField,
    yLabel,
    yScaleField,
    targetMarker,
  ]);

  const fiveMinutesInMs = 30000;
  const { data: zingchartOptions } = useSWR(
    [chartId + 'scatterplot', ...generateSWRKeysFromObject(filters)],
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      revalidateIfStale: true,
      dedupingInterval: fiveMinutesInMs,
    },
  );

  return (
    <>
      <div className="widget-subtitle">
        Darker markers indicate more items in that location. Items located
        within the shaded area are considered outliers.
      </div>
      <ZingChart data={zingchartOptions} />
    </>
  );
}

export default Scatterplot;

function getXScaleValues<T>(data: T[], xScaleField: keyof T) {
  const values: string[] = [];
  if (!data.length) {
    return { values };
  }
  let xScaleValues: { values: string[] } | undefined;
  const xField = data[0][xScaleField];
  if (typeof xField === 'string' && !DateTime.fromISO(xField).invalidReason) {
    const fromISO = (datum: T) => DateTime.fromISO(datum[String(xScaleField)]);
    const sortedValues = sortBy(data, (d) => fromISO(d).toMillis());
    let date = fromISO(sortedValues[0]);
    values.push(date.toISODate());
    const finalDate = fromISO(sortedValues[sortedValues.length - 1]);
    while (finalDate.diff(date).as('days') >= 0) {
      const auxDate = date.plus(Duration.fromObject({ days: 1 }));
      values.push(auxDate.toISODate());
      date = auxDate;
    }
    xScaleValues = { values };
  }
  return xScaleValues;
}

function getMarkerConfig(maxNumberOfPoints: number, numberOfPoints = 1) {
  const minOpacity = 0.2;

  return {
    alpha:
      minOpacity +
      ((1 - minOpacity) * (numberOfPoints - 1)) / maxNumberOfPoints,
    borderWidth: '0px',
    size: '4px',
    backgroundColor: '#009CDE',
  };
}
