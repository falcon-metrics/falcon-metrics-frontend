import { useMemo } from 'react';

import {
  ChartSizes,
} from 'components/Charts/components/DashboardCard/interfaces/ChartSizes';
import CenteredCell from 'components/UI/CenteredCell';
import WorkItemListCard from 'components/WorkItemList/utils/WorkItemListCard';
import { ThroughputClient } from 'core/api/ApiClient/ThroughputClient';
import { getCustomFields } from 'core/api/FetchConfigurations';
import useSWR from 'swr';
import AssignedToChart
  from 'views/Dashboard/components/Charts/components/AssignedToAnalysis';
import DefaultDashboardCard
  from 'views/Dashboard/components/Charts/components/DefaultDashboardCard';
import DashboardPage from 'views/Dashboard/components/DashboardPage';
import {
  AccordionGraphGroup,
} from 'views/Dashboard/views/AnalyticsDashboard/components/AccordionGraphGroup/AccordionGraphGroup';

import { AnalyticsDashboardPageIndexes } from '../../';
import useFetchFilteredData from '../../hooks/useFilteredData';
import { usePageFetcher } from '../../hooks/usePageFetcher';
import { PageProps } from '../../interfaces/PageProps';
import {
  calculateFieldCountGroupByCustomFields,
  createChartFromEntries,
  generateFieldCountGroupFromNormalisationRecord,
  selectTopCategories,
} from '../../utils/donutChartGeneratorUtils';
import WorkItemListHeatMapCell
  from '../WorkInProgress/components/WorkItemListHeatMapCell';
import ThroughputCounts from './views/Counts/Counts';
import ThroughputChart from './views/ThroughputChart';
import ThroughputWorkItemTypeAnalysis
  from './views/WorkItemTypeAnalysis/WorkItemTypeAnalysis';
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
    headerName: 'Leadtime (Days)',
    width: 200,
    renderCell: CenteredCell,
  },
  {
    field: 'age%OfSLE',
    headerName: 'Lead Time % of SLE',
    width: 200,
    renderCell: WorkItemListHeatMapCell,
  },
];

const ThroughputPage = ({ filters, demoDataIsSelected }: PageProps) => {
  const fetcher = usePageFetcher(new ThroughputClient());

  const { data: throughputData, isValidating: isValidatingThroughputData } = useFetchFilteredData(
    AnalyticsDashboardPageIndexes.throughput,
    demoDataIsSelected,
    fetcher,
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

  // Work Item Type Donut Chart
  const workItemData = throughputData
    ? throughputData.workItemTypeAnalysisData
    : [];
  const maxCategories = 10;
  const workItemDataTopCategories = selectTopCategories(
    workItemData,
    maxCategories,
    false,
  );

  const workItemsChartConfigs = (
    <DefaultDashboardCard
      title="Work Item Type"
      contentId="work-item-type"
      Component={ThroughputWorkItemTypeAnalysis}
      data={workItemDataTopCategories}
      size={ChartSizes.medium}
    />
  );

  // Assigned To Chart
  const assignedToChartConfigs =  (
    <AssignedToChart
      data={throughputData?.assignedToAnalysisData}
      unassignedColor="#E1523E"
      label="Number of Work Items Completed"
      size={ChartSizes.mediumLarge}
    />
  );

  // Custom Field Donut Charts Data
  const customFieldsChartsConfigs: JSX.Element[] = useMemo(
    () => {
      if (throughputData && !isValidatingCustomFields && customFieldsData) {
        const result: FieldCountGroup[] = calculateFieldCountGroupByCustomFields(
          customFieldsData.customFields,
          throughputData.workItemList
        );
        const chartsConfigs: JSX.Element[] = createChartFromEntries(
          result,
          isValidatingCustomFields,
          undefined,
          undefined,
          false,
        );
        return chartsConfigs;
      }
      return [];
    },
    [throughputData, isValidatingCustomFields, customFieldsData]
  );

  // Normalisation Donut Chart Calculations
  const normalisationFieldsChartsConfigs: JSX.Element[] = useMemo(() => {
    if (throughputData) {
      if (!throughputData.normalisedWorkItemList) {
        console.warn("normalisedWorkItemList data is missing");
        return [];
      }
      // Generate field count group from grouped record of tags and displayName
      const normalisationFieldGroups: FieldCountGroup[] = generateFieldCountGroupFromNormalisationRecord(throughputData.normalisedWorkItemList);

      const chartsConfigs: JSX.Element[] = createChartFromEntries(normalisationFieldGroups, isValidatingThroughputData);
      return chartsConfigs;
    }
    return [];
  }, [throughputData, isValidatingThroughputData]);

  const groups = [
    {
      title: 'Work Items',
      charts: [
        assignedToChartConfigs,
        workItemsChartConfigs
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
        isLoading={isValidatingThroughputData}
      >
        <DefaultDashboardCard
          title="Completed Work"
          contentId="throughput-counts"
          Component={ThroughputCounts}
          data={throughputData?.throughputData}
          additionalProps={{
            trendAnalysis: throughputData?.trendAnalysis,
          }}
          size={ChartSizes.fixed1}
        />
        <DefaultDashboardCard
          title="Throughput Run Chart"
          contentId="throughput-run-chart"
          Component={ThroughputChart}
          data={throughputData?.throughputRunChartData}
          additionalProps={{
            percentile50th: throughputData?.distribution?.percentile50th,
            percentile85th: throughputData?.distribution?.percentile85th,
            percentile95th: throughputData?.distribution?.percentile95th,
            percentile05th: throughputData?.distribution?.percentile05th,
            percentile15th: throughputData?.distribution?.percentile15th,
            lowerOutliers: throughputData?.boxPlot?.lowerOutliers,
            upperOutliers: throughputData?.boxPlot?.upperOutliers,
          }}
          dataIsUnavailable={(data) => !data?.throughputSeries.length}
          size={ChartSizes.fixed3}
        />
        <WorkItemListCard
          workItemList={throughputData?.workItemList}
          additionalColumns={workItemListUniqueColumnDefinitions}
          excludedColumns={['serviceLevelExpectationInDays', 'age%OfSLE']}
        />
      </DashboardPage>
      <AccordionGraphGroup
        title='Profile of Work'
        groups={groups}
      ></AccordionGraphGroup>
    </>
  );
};

export default ThroughputPage;
