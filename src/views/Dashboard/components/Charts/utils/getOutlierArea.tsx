export function getOutlierArea(minOutliers: number, maxOutliers: number): {} {
  return {
    type: 'area',
    range: [minOutliers, maxOutliers],
    backgroundColor: '#e3e3e3',
    alpha: 0.2,
  };
}
