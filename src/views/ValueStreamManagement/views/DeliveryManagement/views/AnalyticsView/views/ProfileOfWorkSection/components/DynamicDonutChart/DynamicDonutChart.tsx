import DonutChartSkeleton from '../DonutChartSkeleton';
import DynamicWorkItemTypeAnalysis from './components/DynamicWorkItemTypeAnalysis';

export interface DynamicDonutChartProps {
  data: Array<{ type: string; count: number }>;
  isValidating: boolean;
  getColorByDisplayName?: (displayName: string) => string | undefined;
};

// Differs from StaticDonutChart by format of data received
const DynamicDonutChart = ({
  data,
  isValidating,
  getColorByDisplayName
}: DynamicDonutChartProps) => {
  return (
    <>
      {isValidating
        ? <DonutChartSkeleton />
        : <DynamicWorkItemTypeAnalysis data={data} getColorByDisplayName={getColorByDisplayName}/>
      }
    </>
  );
}

export default DynamicDonutChart;
