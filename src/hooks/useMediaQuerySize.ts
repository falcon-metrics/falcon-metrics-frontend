import useMediaQueryMinWidth from './useMediaQueryMinWidth';

export enum QuerySizes {
  smallDevice = 480,
  mediumDevice = 768,
  largeDevice = 992,
  smallComputer = 1200,
  mediumComputer = 1550,
  largeComputer = 1920,
}

const useMediaQuerySize = () => {
  let size = QuerySizes.smallDevice;
  const setSize = (matchedSize: QuerySizes) => {
    size = Math.max(matchedSize, size);
  };
  let query = QuerySizes.largeComputer;
  useMediaQueryMinWidth(query) && setSize(query);
  query = QuerySizes.mediumComputer;
  useMediaQueryMinWidth(query) && setSize(query);
  query = QuerySizes.smallComputer;
  useMediaQueryMinWidth(query) && setSize(query);
  query = QuerySizes.largeDevice;
  useMediaQueryMinWidth(query) && setSize(query);
  query = QuerySizes.mediumDevice;
  useMediaQueryMinWidth(query) && setSize(query);
  query = QuerySizes.smallDevice;
  useMediaQueryMinWidth(query) && setSize(query);

  return size;
};

export default useMediaQuerySize;

// import { ChartSizes } from '';
// const getQuerySizesMap = (sizes: number[]) => {
//   const querySizeKeys = Object.keys(QuerySizes);
//   const sizesWithCorrectIndex = sizes.slice(0, querySizeKeys.length);
//   const mapValues = sizesWithCorrectIndex.map((size, i): [
//     QuerySizes,
//     number,
//   ] => {
//     return [parseInt(querySizeKeys[i]), size];
//   });
//   return new Map(mapValues);
// };

// const mediaQueryColumnSpans = new Map<ChartSizes, Map<QuerySizes, number>>([
//   //                             460  768  992  1200  1550  1920
//   [ChartSizes.tiny, getQuerySizesMap([1, 1, 1, 1, 1, 1])],
//   [ChartSizes.small, getQuerySizesMap([2, 2, 2, 2, 1, 1])],
//   [ChartSizes.medium, getQuerySizesMap([2, 2, 2, 2, 2, 2])],
//   [ChartSizes.big, getQuerySizesMap([2, 2, 2, 4, 2, 2])],
//   [ChartSizes.full, getQuerySizesMap([2, 2, 2, 4, 4, 4])],
// ]);
// const defaultColSpan = 2;
//
//THE NEXT PART SHOULD GO INSIDE DefaultDashboardCard component:
// let colSpan = defaultColSpan;
//           if (size !== undefined) {
//             const colSpans = mediaQueryColumnSpans.get(size)!;
//             colSpan = colSpans.get(screenSize)!;
//           }
