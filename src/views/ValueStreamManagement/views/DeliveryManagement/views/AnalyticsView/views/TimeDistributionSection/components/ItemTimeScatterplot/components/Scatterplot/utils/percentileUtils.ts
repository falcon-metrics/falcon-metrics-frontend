import {
  PercentileMarkerInfo,
} from 'views/Dashboard/components/Charts/utils/getPercentileMarker';

export const generatePercentileEntries = (
  percentile50th?: number | null,
  percentile85th?: number | null,
  percentile98th?: number | null,
): PercentileMarkerInfo[] => {
  const markers: PercentileMarkerInfo[] = [];

  if (percentile50th) {
    markers.push({ percentileLabel: 50, value: percentile50th });
  }

  if (percentile85th) {
    markers.push({ percentileLabel: 85, value: percentile85th });
  }

  if (percentile98th) {
    markers.push({ percentileLabel: 98, value: percentile98th });
  }

  return markers;
};
