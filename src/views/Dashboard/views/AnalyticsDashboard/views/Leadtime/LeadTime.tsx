import { LeadTimeClient } from 'core/api/ApiClient/LeadTimeClient';
import AgeHistogram from 'views/Dashboard/components/Charts/components/AgeHistogram';
import { ChartSizes } from 'components/Charts/components/DashboardCard/interfaces/ChartSizes';
import DefaultDashboardCard from 'views/Dashboard/components/Charts/components/DefaultDashboardCard';
import DistributionInfo from 'views/Dashboard/components/Charts/components/DistributionInfo';
import { emptyDistributionFactory } from 'views/Dashboard/components/Charts/components/DistributionInfo/interfaces/Distribution';
import DashboardPage from 'views/Dashboard/components/DashboardPage';
import useFetchFilteredData from '../../hooks/useFilteredData';
import { usePageFetcher } from '../../hooks/usePageFetcher';
import { AnalyticsDashboardPageIndexes } from '../../interfaces/PageIndexes';
import { PageProps } from '../../interfaces/PageProps';
import LeadTimeScatterplot from './views/Scatterplot';
import LeadTimeSLE from './views/ServiceLevelExpectation';

const LeadTimePage = ({ demoDataIsSelected, filters }: PageProps) => {
  const fetcher = usePageFetcher(new LeadTimeClient());

  const { data: leadTimeData, isValidating } = useFetchFilteredData(
    AnalyticsDashboardPageIndexes.leadTime,
    demoDataIsSelected,
    fetcher,
    filters,
  );

  const distributionData =
    leadTimeData?.distribution ?? emptyDistributionFactory();

  return (
    <DashboardPage
      demoDataIsSelected={demoDataIsSelected}
      isLoading={isValidating}
    >
      <DefaultDashboardCard
        title="Predictability"
        contentId="lead-time-sle"
        Component={LeadTimeSLE}
        data={leadTimeData?.predictability}
        size={ChartSizes.large}
      />
      <DefaultDashboardCard
        title="Lead Time Distribution"
        contentId="lead-time-distribution"
        Component={DistributionInfo}
        data={leadTimeData?.distribution}
        additionalProps={{
          pageTitle: 'lead time',
          distributionShape: leadTimeData?.distributionShape,
        }}
        dataIsUnavailable={(data) => !data?.modes?.length}
        size={ChartSizes.large}
      />
      <DefaultDashboardCard
        title="Lead Time Histogram"
        contentId="lead-time-histogram"
        Component={AgeHistogram}
        data={leadTimeData?.histogram}
        additionalProps={{
          lowerOutliers: leadTimeData?.boxPlot?.lowerOutliers,
          upperOutliers: leadTimeData?.boxPlot?.upperOutliers,
          ...distributionData,
          tooltipDescription: 'took',
          scaleXLabel: 'Lead Time',
        }}
        size={ChartSizes.large}
      />
      <DefaultDashboardCard
        title="Lead Time Scatterplot"
        contentId="lead-time-scatterplot"
        Component={LeadTimeScatterplot}
        data={leadTimeData?.scatterplot}
        additionalProps={{
          lowerOutliers: leadTimeData?.boxPlot?.lowerOutliers,
          upperOutliers: leadTimeData?.boxPlot?.upperOutliers,
          ...distributionData,
          filters,
        }}
        size={ChartSizes.large}
      />
    </DashboardPage>
  );
};

export default LeadTimePage;
