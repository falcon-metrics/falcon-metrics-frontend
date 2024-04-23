import ZingChart from 'zingchart-react';
import {
  getPercentileMarkers,
  PercentileMarkerInfo,
} from 'views/Dashboard/components/Charts/utils/getPercentileMarker';
import { getTargetMarker } from 'views/Dashboard/components/Charts/utils/getTargetMarker';
import { getPerspectiveProfile } from '../../utils/perspective';
import { generatePercentileEntries } from '../ItemTimeScatterplot/components/Scatterplot/utils/percentileUtils';
import { getOutlierMarkers } from './utils/getOutlierArea';
import SkeletonBarChart from 'views/ValueStreamManagement/components/SkeletonBarChart';
import { useSendTelemetry } from 'core/api/CustomerTelemetryClient';
import { useEffect } from 'react';
import { DrillDownTelemetryAction } from 'core/api/telemetry/types';

export type HistogramDatum = {
  ageInDays: number;
  workItems: Array<{ id: string; }>;
};

type Props = {
  histogram: HistogramDatum[];
  boxPlot: {
    median: number,
    quartile1st: number,
    quartile3rd: number,
    interQuartileRange: number,
    lowerWhisker: number,
    upperWhisker: number,
    lowerOutliers: Array<number>,
    upperOutliers: Array<number>,
  } | null;
  targetForPredictability: number | null;
  percentile50th: number | null;
  percentile85th: number | null;
  percentile98th: number | null;
  perspective: string;
  isValidatingTimeDistribution?: boolean;
  telemetryAction?: string;
  telemetrySource?: string;
};

const ItemTimeHistogram = ({
  histogram,
  boxPlot,
  targetForPredictability,
  percentile50th,
  percentile85th,
  percentile98th,
  perspective,
  isValidatingTimeDistribution,
  telemetryAction,
  telemetrySource
}: Props) => {
  const { ageFieldLabel, tooltipDescription } = getPerspectiveProfile(perspective);

  const lowestValue = histogram.reduce(
    (previousValue, obj) => (previousValue > obj.ageInDays ? obj.ageInDays : previousValue),
    Number.POSITIVE_INFINITY
  );
  const highestValue = histogram.reduce(
    (previousValue, obj) => (previousValue > obj.ageInDays ? previousValue : obj.ageInDays),
    Number.NEGATIVE_INFINITY
  );

  const {
    lowerOutliersMarker,
    upperOutliersMarker
  } = getOutlierMarkers(boxPlot, lowestValue);

  const yValues = highestValue !== Number.NEGATIVE_INFINITY
    ? new Array<number>(highestValue).fill(0)
    : [];

  histogram.forEach((item) => {
    yValues[item.ageInDays] = item.workItems.length;
  });

  const percentiles: PercentileMarkerInfo[] = generatePercentileEntries(
    percentile50th,
    percentile85th,
    percentile98th,
  );

  const percentileMarkers = getPercentileMarkers(
    percentiles,
    (value) => value - lowestValue,
    { labelPlacement: 'opposite' },
  );

  const targetMarker = getTargetMarker(targetForPredictability);

  const myTheme = {
    graph: {
      plot: {
        backgroundColor: '#41B6E6',
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
        padding: '8px',
        htmlMode: true,
        shadow: false,
        borderColor: '#e3e3e3',
        borderWidth: '1px',
        text: tooltipDescription,
      },
    },
  };

  const config = {
    type: 'bar',
    globals: {
      fontSize: '12px',
      fontFamily: 'Open Sans',
    },
    plot: {
      aspect: 'histogram',
      barsSpaceLeft: 0.1,
      barsSpaceRight: 0.1,
    },
    'scale-y': {
      label: {
        values: '0:100:20',
        text: 'Frequency',
        fontColor: 'rgba(0, 0, 0, 0.7)',
        fontSize: '14px',
      },
    },
    'scale-x': {
      values: [],
      label: {
        text: `${ageFieldLabel} (Days)`,
        fontColor: 'rgba(0, 0, 0, 0.7)',
        fontSize: '14px',
      },
      markers: [
        ...percentileMarkers,
        targetMarker,
        lowerOutliersMarker,
        upperOutliersMarker,
      ],
    },
    series: [
      {
        values: yValues,
      },
    ],
  };

  /*
  * Telemetry Action
  */
  const sendTelemetry = useSendTelemetry();
  useEffect(() => {
    if (telemetryAction === DrillDownTelemetryAction.accessFitnessCriteriaDrillDown)
      sendTelemetry(DrillDownTelemetryAction.accessFitnessCriteriaDrillDown,
        `${telemetrySource} -> Lead Time Histogram tab`, { page: "Lead Time Histogram" });
  }, [sendTelemetry]);

  return (
    <>
      {isValidatingTimeDistribution || !histogram ?
        <SkeletonBarChart /> :
        <div>
          <div className="widget-subtitle">
            Items located within the shaded area are considered outliers.
          </div>
          <ZingChart data={config} theme={myTheme} />
        </div>}
    </>
  );
};

export default ItemTimeHistogram;
