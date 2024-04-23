import DashboardCard from 'components/Charts/components/DashboardCard/DashboardCard';
import { ChartSizes } from 'components/Charts/components/DashboardCard/interfaces/ChartSizes';
import { SimpleTabView } from 'views/ValueStreamManagement/components/SimpleTabView/SimpleTabView';
import DynamicDonutChart from './DynamicDonutChart/DynamicDonutChart';
import HistoricalDataChart from 'views/ValueStreamManagement/views/DeliveryGovernance/components/HistoricalBarChart/HistoricalBarChart';

type DistributionHistoryDonutTabViewProps = {
  displayName: string;
  distribution?: Record<string, number>;
  historical?: {
    dateStart: string;
    dateEnd: string;
    values: Record<string, number>;
  }[];
  currentDataAggregation: string;
  getColorByDisplayName?: (displayName: string) => string | undefined;
};

export const DistributionHistoryDonutTabView = ({
  displayName,
  distribution,
  historical,
  currentDataAggregation,
  getColorByDisplayName,
}: DistributionHistoryDonutTabViewProps) => {
  const distributionData = !distribution ? [] : Object.keys(distribution).map(
    key => ({
      type: key.length > 30 ? (key.substring(0, 30) + '...') : key,
      count: distribution ? distribution[key] : 0
    })
  );
  const historicalData = !historical ? [] : historical;
  return <DashboardCard
    title={displayName}
    size={ChartSizes.small}
  >
    <SimpleTabView
      defaultActiveTab={0}
      tabTitles={['Distribution', 'Historical View']}
      tabContents={[
        distribution ? <DynamicDonutChart
          data={distributionData}
          isValidating={false}
          getColorByDisplayName={getColorByDisplayName}
          /> : null,
        historical ? <HistoricalDataChart
          data={historicalData}
          currentDataAggregation={currentDataAggregation}
          getColorByDisplayName={getColorByDisplayName} /> : null,
      ]} />
  </DashboardCard>;
};
