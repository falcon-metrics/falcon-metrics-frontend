import { WorkItemGroupCount } from '../../../../interfaces/profileOfWork';
import DonutChartSkeleton from '../../components/DonutChartSkeleton';
import StaticWorkItemTypeAnalysis from './components/StaticWorkItemTypeAnalysis';

export interface StaticDonutChartProps {
  data: WorkItemGroupCount[];
  isValidating: boolean;
};

// Differs from DynamicDonutChart by format of data received
const StaticDonutChart = ({ data, isValidating }: StaticDonutChartProps) => {
  return (
    <>
      {isValidating
        ? <DonutChartSkeleton />
        : <StaticWorkItemTypeAnalysis data={data}/>
      }
    </>
  );
}

export default StaticDonutChart;
