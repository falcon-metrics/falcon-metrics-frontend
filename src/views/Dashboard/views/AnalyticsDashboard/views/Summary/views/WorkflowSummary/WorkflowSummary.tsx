import { WorkflowTrendData } from 'core/api/ApiClient/SummaryClient';
import BarChart, {
  SeriesGenerator,
} from 'views/Dashboard/components/Charts/components/BarChart/BarChart';
import { ChartProps } from '../../interfaces/ChartProps';

const defaultColorMap = {
  COMPLETED: '#00beb2',
  INPROGRESS: '#003594',
  PROPOSED: '#e0e0e0',
};

const seriesOrder = Object.keys(defaultColorMap);

const seriesGenerator: SeriesGenerator = (data) => ({
  ...data,
  text: data.text === 'Inprogress' ? 'In Progress' : data.text,
});

const WorkflowSummary = (props: ChartProps<WorkflowTrendData>) => {
  return (
    <BarChart<WorkflowTrendData>
      {...props}
      seriesOrder={seriesOrder}
      defaultColorMap={defaultColorMap}
      seriesGenerator={seriesGenerator}
      tooltipPluralization={' items'}
    />
  );
};

export default WorkflowSummary;
