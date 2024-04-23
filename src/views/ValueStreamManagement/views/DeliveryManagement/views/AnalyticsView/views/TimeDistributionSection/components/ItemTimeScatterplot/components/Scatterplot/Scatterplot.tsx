import { useCallback, useMemo } from "react";
import ReactDOMServer from "react-dom/server";
import useSWR from "swr";
import ZingChart from "zingchart-react";
import { difference, groupBy, sortBy, startCase } from "lodash";
import { DateTime, Duration } from "luxon";

import { generateSWRKeysFromObject } from "core/api/fetch";
import { ApiQueryParameters } from "core/api/ApiClient/ApiClient";
import { AllowedNames } from "utils/typescript/types";
import {
  PercentileMarkerInfo,
  getPercentileMarkers,
} from "views/Dashboard/components/Charts/utils/getPercentileMarker";

import {
  ScatterplotTooltipSingle,
  ScatterplotTooltipMultiple,
  TooltipDatum,
  PropsMultiple,
} from "./ScatterplotTooltip";
import { generatePercentileEntries } from "./utils/percentileUtils";

type Props<T, X extends TooltipDatum> = {
  xScaleField: keyof T;
  yScaleField: keyof T;
  xLabel?: string;
  yLabel?: string;
  tooltipDataTransformer(datum: T): X;
  fieldsToIncludeIfMultiple?: Array<Extract<keyof X, string>>;
  tooltipTitleProperty: AllowedNames<X, string>;
  chartId: string;
  data: Array<T>;
  targetForPredictability?: number | null;
  maximum?: number;
  percentile50th?: number | null;
  percentile85th?: number | null;
  percentile98th?: number | null;
  lowerOutliers?: Array<number>;
  upperOutliers?: Array<number>;
  filters?: ApiQueryParameters;
};

function Scatterplot<T, X extends TooltipDatum>({
  data,
  targetForPredictability,
  maximum,
  percentile50th,
  percentile85th,
  percentile98th,
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
  let maxYValue = 0;

  // Take predictability target as max value should it be greater than the y-axis value
  if (targetForPredictability && targetForPredictability >= maxYValue) {
    maxYValue = targetForPredictability + 1;
  } else maxYValue = (maximum ?? 0) + 1;

  let minLowerOutliers = 0;
  let maxLowerOutliers = 0;
  let minUpperOutliers = 0;
  let maxUpperOutliers = 0;

  if (lowerOutliers && lowerOutliers.length) {
    minLowerOutliers = lowerOutliers[0];
    maxLowerOutliers = lowerOutliers[lowerOutliers.length - 1];
  }

  if (upperOutliers && upperOutliers.length) {
    minUpperOutliers = upperOutliers[0];
    maxUpperOutliers = upperOutliers[upperOutliers.length - 1];
  }

  const targetMarker = useMemo(
    () => getTargetMarker(targetForPredictability),
    [targetForPredictability]
  );

  const percentiles: PercentileMarkerInfo[] = generatePercentileEntries(
    percentile50th,
    percentile85th,
    percentile98th
  );

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
      (d) => String(d[xScaleField]) + String(d[yScaleField])
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
          tooltipDataTransformer(dataValue)[datumKey]
        );
      });
      singlePointSeriesData.data.push([
        dataValue[xScaleField],
        dataValue[yScaleField],
      ]);
    });

    const maxNumberOfPoints = Math.max(
      ...groupedDataKeys.map((k) => groupedData[k].length)
    );

    const chartSeries = groupedDataKeys
      .filter((k) => !isSinglePoint(k))
      .map((key) => {
        const group = groupedData[key];
        const tooltipData = group.map(tooltipDataTransformer);

        const fieldsToExcludeIfMultiple = difference(
          Object.keys(group[0] as any).filter(
            (k) => typeof group[0][k] === "string"
          ) as PropsMultiple<X>["fieldsToExclude"],
          fieldsToIncludeIfMultiple
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
              />
            ),
          },
        };
      });

    const buildDataKey = (key: string | number | symbol) =>
      "data-" + String(key);
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
      valueBox: { text: "" },
      tooltip: {
        text: ReactDOMServer.renderToStaticMarkup(
          <ScatterplotTooltipSingle
            title={buildDataKey(tooltipTitleProperty)}
            zingchartTokens={tokensWithDisplayName.filter(
              ({ datumKey }) => datumKey !== tooltipTitleProperty
            )}
          />
        ),
      },
    };

    const getLabel = (fieldName: keyof T, label?: string) =>
      label ?? (typeof fieldName === "string" ? startCase(fieldName) : "");
    const xScaleValues = getXScaleValues<T>(data, xScaleField);

    return {
      type: "scatter",
      utc: true,
      globals: {
        fontSize: "12px",
        fontFamily: "Open Sans",
      },
      plot: {
        valueBox: {
          text: "%t",
          color: "#0078ac",
          fontSize: "10%",
          placement: "over",
        },
        tooltip: {
          visible: true,
          callout: true,
          calloutWidth: "20px",
          backgroundColor: "#ffffff",
          fontColor: "#707070",
          fontSize: "12px",
          textAlign: "left",
          htmlMode: true,
          placement: "node:top",
          offsetY: -6,
          sticky: true,
          shadow: false,
          borderColor: "#e3e3e3",
          borderWidth: "1px",
          timeout: 5000,
        },
      },
      plotarea: {
        margin: "20px 50px 60px 60px",
      },
      "scale-y": {
        zooming: true,
        markers: [
          ...percentileMarkers,
          targetMarker,
          getOutlierArea(minLowerOutliers, maxLowerOutliers),
          getOutlierArea(minUpperOutliers, maxUpperOutliers),
        ],
        label: {
          text: getLabel(yScaleField, yLabel),
          fontColor: "rgba(0, 0, 0, 0.7)",
        },
        "max-value": maxYValue,
      },
      "scale-x": {
        zooming: true,
        label: {
          text: getLabel(xScaleField, xLabel),
          fontColor: "rgba(0, 0, 0, 0.7)",
        },
        step: "day",
        transform: {
          type: "date",
          all: "%dd %M %Y",
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
    [chartId + "scatterplot", ...generateSWRKeysFromObject(filters)],
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      revalidateIfStale: true,
      dedupingInterval: fiveMinutesInMs,
    }
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

function getTargetMarker(targetForPredictability?: number | null) {
  if (
    targetForPredictability === undefined ||
    targetForPredictability === null
  ) {
    return {};
  }
  console.log(
    `File: Scatterplot.tsx, Line: 308 -> targetForPredictability`,
    targetForPredictability
  );
  return {
    type: "line",
    range: [targetForPredictability],
    lineColor: "#ff8a8a",
    lineWidth: 2,
    lineStyle: "dashed",
    label: {
      text: "Predictability Target",
      padding: "2 8 2 8",
      backgroundColor: "#ff8a8a",
      fontColor: "rgba(0, 0, 0, 0.7)",
      fontSize: "12px",
    },
  };
}

function getOutlierArea(minOutliers: number, maxOutliers: number): {} {
  return {
    type: "area",
    range: [minOutliers, maxOutliers],
    backgroundColor: "#e3e3e3",
    alpha: 0.2,
  };
}

function getXScaleValues<T>(data: T[], xScaleField: keyof T) {
  const values: string[] = [];
  if (!data.length) {
    return { values };
  }
  let xScaleValues: { values: string[] } | undefined;
  const xField = data[0][xScaleField];
  if (typeof xField === "string" && !DateTime.fromISO(xField).invalidReason) {
    const fromISO = (datum: T) => DateTime.fromISO(datum[String(xScaleField)]);
    const sortedValues = sortBy(data, (d) => fromISO(d).toMillis());
    let date = fromISO(sortedValues[0]);
    values.push(date.toISODate());
    const finalDate = fromISO(sortedValues[sortedValues.length - 1]);
    while (finalDate.diff(date).as("days") >= 0) {
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
    borderWidth: "0px",
    size: "4px",
    backgroundColor: "#009CDE",
  };
}

export default Scatterplot;
