import { IBoxPlot } from 'core/api/ApiClient/LeadTimeClient';

export function getOutlierArea(minOutliers: number, maxOutliers: number) {
  return {
    type: 'area',
    range: [minOutliers, maxOutliers],
    backgroundColor: '#e3e3e3',
    alpha: 0.2,
  };
}

interface OutlierMarker {
  type: string;
  range: number[];
  backgroundColor: string;
  alpha: number;
}

interface OutlierMarkerPair {
  lowerOutliersMarker: OutlierMarker | null;
  upperOutliersMarker: OutlierMarker | null;
}

export const getOutlierMarkers = (boxPlot: IBoxPlot | null, lowestValue: number): OutlierMarkerPair => {
  const lowerOutliers = boxPlot?.lowerOutliers;
  const upperOutliers = boxPlot?.upperOutliers;

  if (!lowerOutliers || !upperOutliers) {
    return {
      lowerOutliersMarker: null,
      upperOutliersMarker: null, 
    };
  }

  const minLowerOutliers = lowerOutliers[0] - lowestValue;
  const maxLowerOutliers = lowerOutliers[lowerOutliers.length - 1] - lowestValue;
  const minUpperOutliers = upperOutliers[0] - lowestValue;
  const maxUpperOutliers = upperOutliers[upperOutliers.length - 1] - lowestValue;

  const lowerOutliersMarker = getOutlierArea(minLowerOutliers, maxLowerOutliers);
  const upperOutliersMarker = getOutlierArea(minUpperOutliers, maxUpperOutliers);

  return {
    lowerOutliersMarker,
    upperOutliersMarker
  };
}
