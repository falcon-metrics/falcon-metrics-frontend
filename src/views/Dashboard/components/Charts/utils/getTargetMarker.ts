export function getTargetMarker(targetForPredictability?: number | null) {
  if (targetForPredictability === undefined || targetForPredictability === null) {
    return {};
  }
  return {
    type: 'line',
    range: [targetForPredictability],
    lineColor: '#ff8a8a',
    lineWidth: 2,
    lineStyle: 'dashed',
    label: {
      text: 'Predictability Target',
      padding: '2 8 2 8',
      backgroundColor: '#ff8a8a',
      fontColor: 'rgba(0, 0, 0, 0.7)',
      fontSize: '12px',
    },
  };
}
