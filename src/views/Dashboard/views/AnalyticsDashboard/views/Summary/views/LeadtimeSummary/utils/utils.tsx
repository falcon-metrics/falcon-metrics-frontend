import { SeriesGenerator } from 'views/Dashboard/components/Charts/components/BarChart/BarChart';
import { fillMissingValues } from 'utils/charts';

export const seriesGenerator: SeriesGenerator = (data) => ({
  ...data,
  values: data.values.map(fillMissingValues),
  lineColor: data.backgroundColor,
  lineWidth: '2px',
  marker: {
    backgroundColor: data.backgroundColor,
    borderColor: data.backgroundColor,
    borderWidth: '1px',
    size: 3,
    palette: 0,
    shadow: false,
  },
});
