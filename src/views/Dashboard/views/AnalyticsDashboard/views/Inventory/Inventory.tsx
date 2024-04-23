import { useMemo } from 'react';

import CenteredCell from 'components/UI/CenteredCell';
import WorkItemListCard from 'components/WorkItemList/utils/WorkItemListCard';
import { ApiQueryParameters } from 'core/api/ApiClient/ApiClient';
import { InventoryClient } from 'core/api/ApiClient/InventoryClient';
import { getCustomFields } from 'core/api/FetchConfigurations';
import useSWR from 'swr';
import AgeHistogram
  from 'views/Dashboard/components/Charts/components/AgeHistogram';
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

import { AnalyticsDashboardPageIndexes } from '../../';
import useFetchFilteredData from '../../hooks/useFilteredData';
import { usePageFetcher } from '../../hooks/usePageFetcher';
import {
  calculateFieldCountGroupByCustomFields,
  createChartFromEntries,
  generateFieldCountGroupFromNormalisationRecord,
} from '../../utils/donutChartGeneratorUtils';
import InventoryCounts from './views/Counts/Counts';
import InventoryScatterplot from './views/Scatterplot';
import InventoryStateAnalysis from './views/StateAnalysis';
import InventoryWorkItemTypeAnalysis from './views/WorkItemTypeAnalysis';
import { FieldCountGroup } from '../../interfaces/fieldCounts';

// import InventoryClassOfService from './views/ClassOfServiceAnalysis';
// import InventoryNatureOfWorkAnalysis from './views/NatureOfWorkAnalysis';
// import InventoryQualityAnalysis from './views/QualityAnalysis';
// import InventoryValueAreaAnalysis from './views/ValueAreaAnalysis';

const workItemListUniqueColumnDefinitions = [
  {
    field: 'itemAge',
    headerName: 'Inventory Age (Days)',
    width: 200,
    renderCell: CenteredCell,
  },
];

interface PageProps {
  filters?: ApiQueryParameters;
  demoDataIsSelected: boolean;
}

const InventoryPage = ({ filters, demoDataIsSelected }: PageProps) => {
  const fetcher = usePageFetcher(new InventoryClient());

  const { data: inventoryData, isValidating } = useFetchFilteredData(
    AnalyticsDashboardPageIndexes.inventory,
    demoDataIsSelected,
    fetcher,
    filters,
  );

  const distributionData =
    inventoryData?.distribution ?? emptyDistributionFactory();

  const { data: customFieldsData, isValidating: isValidatingCustomFields } = useSWR(
    'customfields',
    getCustomFields,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false
    },
  );

  // Custom Field Donut Charts Data
  const customFieldsChartsConfigs: JSX.Element[] = useMemo(
    () => {
      if (inventoryData && !isValidatingCustomFields && customFieldsData) {
        const result: FieldCountGroup[] = calculateFieldCountGroupByCustomFields(
          customFieldsData.customFields,
          inventoryData.workItemList
        );
        return createChartFromEntries(
          result,
          isValidating,
          undefined,
          undefined,
          false,
        );
      }
      return [];
    },
    [inventoryData, isValidatingCustomFields, customFieldsData]
  );

  const normalisationFieldsChartsConfigs: JSX.Element[] = useMemo(() => {
    if (inventoryData) {
      if (!inventoryData.normalisedWorkItemList) {
        console.warn('normalisedWorkItemList data is missing');
        return [];
      }
      // Generate field count group from grouped record of tags and displayName
      const normalisationFieldGroups: FieldCountGroup[] = generateFieldCountGroupFromNormalisationRecord(inventoryData.normalisedWorkItemList);

      const chartsConfigs: JSX.Element[] = createChartFromEntries(normalisationFieldGroups, isValidating);
      return chartsConfigs;
    }
    return [];
  }, [inventoryData, isValidating]);

  const groups = [
    {
      title: 'Work Items',
      charts: [
        <AssignedToChart
          key="work-item-type-1"
          data={inventoryData?.assignedToAnalysisData}
          unassignedColor="#F5B24B"
          label="Number of Work Items"
          size={ChartSizes.large}
          isLoading={isValidating}
        />,
        <DefaultDashboardCard
          key="work-item-type2"
          title="Work Item Type"
          contentId="work-item-type"
          Component={InventoryWorkItemTypeAnalysis}
          data={inventoryData?.workItemTypeAnalysisData}
          size={ChartSizes.small}
          isLoading={isValidating}
        />,
        <DefaultDashboardCard
          title="Stage Of Workflow"
          key="Stage Of Workflow"
          contentId="inventory-stage-of-workflow"
          Component={InventoryStateAnalysis}
          data={inventoryData?.stateAnalysisData}
          size={ChartSizes.small}
          isLoading={isValidating}
        />
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
          title="Inventory"
          contentId="inventory-counts"
          Component={InventoryCounts}
          data={inventoryData?.inventoryData}
          additionalProps={{
            trendAnalysis: inventoryData?.trendAnalysis,
          }}
          dataIsUnavailable={(data) => !data?.count && !data?.numDays}
          size={ChartSizes.medium}
        />
        <DefaultDashboardCard
          title="Inventory Age Distribution"
          contentId="inventory-age-distribution"
          Component={DistributionInfo}
          data={inventoryData?.distribution}
          additionalProps={{
            pageTitle: 'inventory age',
            distributionShape: inventoryData?.distributionShape,
          }}
          dataIsUnavailable={(data) => !data?.modes?.length}
          size={ChartSizes.medium}
        />
        <DefaultDashboardCard
          title="Inventory Age Histogram"
          contentId="inventory-age-histogram"
          Component={AgeHistogram}
          additionalProps={{
            lowerOutliers: inventoryData?.boxPlot?.lowerOutliers,
            upperOutliers: inventoryData?.boxPlot?.upperOutliers,
            scaleXLabel: 'Inventory Age',
            tooltipDescription: 'have been in\nthe inventory for',
            ...distributionData,
          }}
          dataIsUnavailable={(data) =>
            data?.length === 1 && data?.[0][0] === 0 && data?.[0][1] === 0
          }
          data={inventoryData?.histogram}
          size={ChartSizes.large}
        />
        <DefaultDashboardCard
          title="Inventory Age Scatterplot"
          contentId="inventory-age-scatterplot"
          Component={InventoryScatterplot}
          additionalProps={{
            lowerOutliers: inventoryData?.boxPlot?.lowerOutliers,
            upperOutliers: inventoryData?.boxPlot?.upperOutliers,
            ...distributionData,
            filters,
          }}
          data={inventoryData?.scatterplot}
          size={ChartSizes.full}
        />
        <WorkItemListCard
          workItemList={inventoryData?.workItemList}
          additionalColumns={workItemListUniqueColumnDefinitions}
          excludedColumns={['serviceLevelExpectationInDays', 'age%OfSLE']}
        />
      </DashboardPage>
      <AccordionGraphGroup
        title='Profile of Work'
        groups={groups}
      />
    </>
  );
};

export default InventoryPage;
