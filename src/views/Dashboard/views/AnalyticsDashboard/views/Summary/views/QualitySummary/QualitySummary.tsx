import { QualitySummaryData } from 'core/api/ApiClient/SummaryClient';
import BarChart from 'views/Dashboard/components/Charts/components/BarChart/BarChart';
import { ChartProps } from '../../interfaces/ChartProps';

const defaultColorMap = {
  'Failure Demand': '#ff585d',
  'Non-Value Demand': '#f5af3e',
  'Non-value Demand': '#f5af3e',
  'Value Demand': '#00beb2',
};

const QualitySummary = (props: ChartProps<QualitySummaryData>) => {
  return (
    <BarChart<QualitySummaryData>
      {...props}
      defaultColorMap={defaultColorMap}
      tooltipPluralization={''}
    />
  );
};

export default QualitySummary;
