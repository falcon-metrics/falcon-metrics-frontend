export default null;

/**
 * @deprecated
 * 
 * Duplicate of /src/views/Dashboard/components/Charts/utils/getPercentileMarker.tsx
 */
// import merge from 'lodash/merge';
// import { round } from 'mathjs';

// const getPercentileMarker = (
//   percentileNumber: number,
//   value: number | undefined,
//   valueFunction?: (value: number) => number,
//   styleOptions?: Record<string, unknown>,
// ) => {
//   if (value === undefined) {
//     return {};
//   }
//   const transformedValue = valueFunction ? valueFunction(value) : value;
//   return merge(
//     {
//       type: 'line',
//       range: [transformedValue],
//       lineColor: '#e3e3e3',
//       lineWidth: 2,
//       lineStyle: 'dashed',
//       labelPlacement: 'opposite',
//       label: {
//         text: `${percentileNumber}th Percentile [${round(value ?? 0)}]`,
//         padding: '2 8 2 8',
//         backgroundColor: '#e3e3e3',
//         fontColor: 'rgba(0, 0, 0, 0.7)',
//         fontSize: '12px',
//       },
//     },
//     styleOptions,
//   );
// };

// export type PercentileMarkerInfo = {
//   percentileLabel: number;
//   value?: number;
// };

// export function getPercentileMarkers(
//   percentiles: PercentileMarkerInfo[],
//   valueFunction?: (value: number) => number,
//   styleOptions?: Record<string, unknown>,
// ) {
//   const percentileMarkers = percentiles.map(({ percentileLabel, value }) =>
//     getPercentileMarker(percentileLabel, value, valueFunction, styleOptions),
//   );
//   return percentileMarkers;
// }
