// @ts-ignore
import ZingChart from 'zingchart-react';
import {
  getPercentileMarkers,
  PercentileMarkerInfo,
} from 'views/Dashboard/components/Charts/utils/getPercentileMarker';
import { getTargetMarker } from 'views/Dashboard/components/Charts/utils/getTargetMarker';
import { AgeHistogramDatum } from './interfaces/AgeHistogramDatum';
import { getOutlierArea } from '../../utils/getOutlierArea';
import { isArray } from 'lodash';

interface PageProps {
  data: Array<AgeHistogramDatum>;
  percentile50th?: number;
  percentile85th?: number;
  percentile95th?: number;
  lowerOutliers?: Array<number>;
  upperOutliers?: Array<number>;
  targetForPredictability?: number;
  tooltipDescription: string;
  scaleXLabel: string;
}

const AgeHistogram = ({
  data,
  percentile50th,
  percentile85th,
  percentile95th,
  lowerOutliers,
  upperOutliers,
  targetForPredictability,
  tooltipDescription,
  scaleXLabel,
}: PageProps) => {
  const histogramData =
    data instanceof Array ? data : new Array<AgeHistogramDatum>();

  // TODO: won't be necessary after sample data is fixed.
  if (isArray(histogramData[0])) {
    return null;
  }
  // TODO: won't be necessary after sample data is fixed.
  //@ts-ignore
  const x = histogramData.map((item) => item.ageInDays ?? item.leadTimeInDays);

  const xMin = Math.min(...x);
  const xMax = Math.max(...x);

  const xScaleValues = `${xMin}:${xMax}:1`;

  const yValues = new Array<number>(isNaN(xMax) ? 0 : xMax).fill(0);

  histogramData.forEach((item) => {
    yValues[item.ageInDays - xMin] = item.workItems.length;
  });

  let minLowerOutliers,
    maxLowerOutliers,
    minUpperOutliers,
    maxUpperOutliers = 0;

  if (lowerOutliers && lowerOutliers.length) {
    minLowerOutliers = lowerOutliers[0] - xMin;
    maxLowerOutliers = lowerOutliers[lowerOutliers.length - 1] - xMin;
  }

  if (upperOutliers && upperOutliers.length) {
    minUpperOutliers = upperOutliers[0] - xMin;
    maxUpperOutliers = upperOutliers[upperOutliers.length - 1] - xMin;
  }

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
        text: `<p>%vt work items ${tooltipDescription} %kt days</p>`,
      },
    },
  };

  const percentiles: PercentileMarkerInfo[] = [
    { percentileLabel: 50, value: percentile50th },
    { percentileLabel: 85, value: percentile85th },
    { percentileLabel: 95, value: percentile95th },
  ];

  const percentileMarkers = getPercentileMarkers(
    percentiles,
    (value) => value - xMin,
    { labelPlacement: 'opposite' },
  );

  const targetMarker = getTargetMarker(targetForPredictability);

  const config = {
    type: 'bar',
    globals: {
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
      values: xScaleValues,
      label: {
        text: `${scaleXLabel} (days)`,
        fontColor: 'rgba(0, 0, 0, 0.7)',
        fontSize: '14px',
      },
      markers: [
        ...percentileMarkers,
        targetMarker,
        getOutlierArea(minLowerOutliers, maxLowerOutliers),
        getOutlierArea(minUpperOutliers, maxUpperOutliers),
      ],
    },
    series: [
      {
        values: yValues,
      },
    ],
  };

  return (
    <div>
      <div className="widget-subtitle">
        Items located within the shaded area are considered outliers.
      </div>
      <ZingChart data={config} theme={myTheme} />
    </div>
  );
};

export default AgeHistogram;
