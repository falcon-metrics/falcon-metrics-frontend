import {
  ScatterplotDatumWithDates,
  TimeDistributionData,
} from '../../interfaces/timeDistribution';
import {
  HistogramDatum
} from '../../views/TimeDistributionSection/components/ItemTimeHistogram/ItemTimeHistogram';

export const isHistogramEmpty = (
  histogram: HistogramDatum[] | undefined
): boolean => {
  if (!histogram) {
    return true;
  }

  if (histogram.length === 0) {
    return true;
  }

  return histogram.length === 0;
}

export const isScatterplotEmpty = (
  scatterplot: ScatterplotDatumWithDates[] | undefined
): boolean => {
  if (!scatterplot) {
    return true;
  }

  if (scatterplot.length === 0) {
    return true;
  }

  return scatterplot.length === 0;
}

export const isTimeDistributionDataEmpty = (data: TimeDistributionData | undefined): boolean => {
  if (!data) {
    return true;
  }

  const { histogram, scatterplot } = data;

  const isEmpty: boolean =
    isHistogramEmpty(histogram) &&
    isScatterplotEmpty(scatterplot);
  
  return isEmpty;
}
