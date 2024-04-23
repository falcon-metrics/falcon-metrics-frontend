import { useMemo } from 'react';

import CenteredCell from 'components/UI/CenteredCell';
import WorkItemListCard from 'components/WorkItemList/utils/WorkItemListCard';
import { LeadTimeClient } from 'core/api/ApiClient/LeadTimeClient';
import { WIPClient } from 'core/api/ApiClient/WipClient';
import { getCustomFields } from 'core/api/FetchConfigurations';
import useSWR from 'swr';
import AssignedToChart
  from 'views/Dashboard/components/Charts/components/AssignedToAnalysis';
import { ChartSizes } from 'components/Charts/components/DashboardCard/interfaces/ChartSizes';
import DefaultDashboardCard
  from 'views/Dashboard/components/Charts/components/DefaultDashboardCard';
import DistributionInfo
  from 'views/Dashboard/components/Charts/components/DistributionInfo';
import {
  emptyDistributionFactory,
} from 'views/Dashboard/components/Charts/components/DistributionInfo/interfaces/Distribution';
import DashboardPage from 'views/Dashboard/components/DashboardPage';
import {
  AccordionGraphGroup,
} from 'views/Dashboard/views/AnalyticsDashboard/components/AccordionGraphGroup/AccordionGraphGroup';

import AgeHistogram
  from '../../../../components/Charts/components/AgeHistogram';
import useFetchFilteredData from '../../hooks/useFilteredData';
import { usePageFetcher } from '../../hooks/usePageFetcher';
import { AnalyticsDashboardPageIndexes } from '../../interfaces/PageIndexes';
import { PageProps } from '../../interfaces/PageProps';
import {
  calculateFieldCountGroupByCustomFields,
  createChartFromEntries,
  generateFieldCountGroupFromNormalisationRecord,
} from '../../utils/donutChartGeneratorUtils';
import WorkItemListHeatMapCell from './components/WorkItemListHeatMapCell';
// import WipClassOfService from './views/ClassOfServiceAnalysis';
// import WipQualityAnalysis from './views/QualityAnalysis';
// import WipNatureOfWorkAnalysis from './views/NatureOfWorkAnalysis';
// import WipValueAreaAnalysis from './views/ValuaAreaAnalysis';
import WipCounts from './views/Counts/Counts';
import WipRunChart from './views/RunChart/RunChart';
import WipAgeScatterplot from './views/Scatterplot';
import WipStateAnalysis from './views/StateAnalysis';
import WipWorkItemTypeAnalysis from './views/WorkItemTypeAnalysis';
import { FieldCountGroup } from '../../interfaces/fieldCounts';

const workItemListUniqueColumnDefinitions = [
  {
    field: 'serviceLevelExpectationInDays',
    headerName: 'SLE',
    width: 150,
    renderCell: CenteredCell,
  },
  {
    field: 'itemAge',
    headerName: 'WIP Age (Days)',
    width: 200,
    renderCell: CenteredCell,
  },
  {
    field: 'age%OfSLE',
    headerName: 'Age In % of SLE',
    width: 200,
    renderCell: WorkItemListHeatMapCell,
  },
];

const WipPage = ({ filters, demoDataIsSelected }: PageProps) => {
  const fetcher = usePageFetcher(new WIPClient());
  const { data: wipData, isValidating } = useFetchFilteredData(
    AnalyticsDashboardPageIndexes.WIP,
    demoDataIsSelected,
    fetcher,
    filters,
  );

  const leadTimeFetcher = usePageFetcher(new LeadTimeClient());
  const { data: leadTimeData } = useFetchFilteredData(
    AnalyticsDashboardPageIndexes.leadTime,
    demoDataIsSelected,
    leadTimeFetcher,
    filters,
  );

  const { data: customFieldsData, isValidating: isValidatingCustomFields } = useSWR(
    'customfields',
    getCustomFields,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false
    },
  );

  const distributionData = {
    ...(wipData?.distribution ?? emptyDistributionFactory()),
    targetForPredictability:
      leadTimeData?.distribution?.targetForPredictability,
  };
  
  // Custom Field Donut Charts Data
  const customFieldsChartsConfigs: JSX.Element[] = useMemo(
    () => {
      if (wipData && !isValidatingCustomFields && customFieldsData) {
        const result: FieldCountGroup[] = calculateFieldCountGroupByCustomFields(
          customFieldsData.customFields,
          wipData.workItemList
        );
        return createChartFromEntries(
          result,
          isValidatingCustomFields,
          undefined,
          undefined,
          false,
        );
      }
      return [];
    },
    [wipData, isValidatingCustomFields, customFieldsData]
  );

  // Normalisation Donut Chart Calculations
  const normalisationFieldsChartsConfigs: JSX.Element[] = useMemo(() => {
    if (wipData) {
      if (!wipData.normalisedWorkItemList) {
        console.warn('normalisedWorkItemList data is missing');
        return [];
      }
      // Generate field count group from grouped record of tags and displayName
      const normalisationFieldGroups: FieldCountGroup[] = generateFieldCountGroupFromNormalisationRecord(wipData.normalisedWorkItemList);

      const chartsConfigs: JSX.Element[] = createChartFromEntries(normalisationFieldGroups, isValidating);
      return chartsConfigs;
    }
    return [];
  }, [wipData, isValidating]);

  const workItemTypeChart = (
    <DefaultDashboardCard
      title="Work Item Type"
      contentId="work-item-type"
      Component={WipWorkItemTypeAnalysis}
      data={wipData?.workItemTypeAnalysisData}
      size={ChartSizes.small}
      isLoading={isValidating}
    />
  );

  const stageOfWorkflowChart = (
    <DefaultDashboardCard
      title="Stage Of Workflow"
      contentId="wip-stage-of-workflow"
      Component={WipStateAnalysis}
      data={wipData?.stateAnalysisData}
      size={ChartSizes.small}
      isLoading={isValidating}
    />
  );

  const assignedToChart = (
    <AssignedToChart
      data={wipData?.assignedToAnalysisData}
      unassignedColor="#E1523E"
      label="Number of Work Items"
      size={ChartSizes.large}
      isLoading={isValidating}
    />
  );

  const groups = [
    {
      title: 'Work Items',
      charts: [
        assignedToChart,
        workItemTypeChart,
        stageOfWorkflowChart
      ]
    }, {
      title: 'Custom Fields',
      charts: customFieldsChartsConfigs
    }, {
      title: 'Normalisation Fields',
      charts: normalisationFieldsChartsConfigs
    }
  ];

  return (
    <>
      <DashboardPage
        demoDataIsSelected={demoDataIsSelected}
        isLoading={isValidating}
      >
        <DefaultDashboardCard
          title="Work In Progress"
          contentId="wip-counts"
          Component={WipCounts}
          data={wipData?.WIPData}
          additionalProps={{
            trendAnalysis: wipData?.trendAnalysis,
          }}
          size={ChartSizes.medium}
        />
        <DefaultDashboardCard
          title="WIP Age Distribution"
          contentId="wip-age-distribution"
          Component={DistributionInfo}
          data={wipData?.distribution}
          additionalProps={{
            pageTitle: 'WIP age',
            distributionShape: wipData?.distributionShape,
          }}
          dataIsUnavailable={(data) => !data?.modes?.length}
          size={ChartSizes.medium}
        />
        <DefaultDashboardCard
          title="WIP Run Chart"
          contentId="wip-run-chart"
          Component={WipRunChart}
          data={wipData?.WIPRunChartData}
          size={ChartSizes.large}
        />
        <DefaultDashboardCard
          title="WIP Age Histogram"
          contentId="wip-age-histogram"
          Component={AgeHistogram}
          additionalProps={{
            lowerOutliers: wipData?.boxPlot?.lowerOutliers,
            upperOutliers: wipData?.boxPlot?.upperOutliers,
            scaleXLabel: 'Wip Age',
            tooltipDescription: 'took',
            ...distributionData,
          }}
          data={wipData?.histogram}
          size={ChartSizes.large}
        />
        <DefaultDashboardCard
          title="WIP Age Scatterplot"
          contentId="wip-age-scatterplot"
          Component={WipAgeScatterplot}
          additionalProps={{
            lowerOutliers: wipData?.boxPlot?.lowerOutliers,
            upperOutliers: wipData?.boxPlot?.upperOutliers,
            ...distributionData,
            filters,
          }}
          data={wipData?.scatterplot}
          size={ChartSizes.large}
        />
        <WorkItemListCard
          workItemList={wipData?.workItemList}
          additionalColumns={workItemListUniqueColumnDefinitions}
          excludedColumns={['departureDate']}
        />
      </DashboardPage>
      <AccordionGraphGroup
        title='Profile of Work'
        groups={groups}
      />
    </>
  );
};

export default WipPage;
