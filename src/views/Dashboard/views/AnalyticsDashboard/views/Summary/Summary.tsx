import { useMemo } from 'react';
import {
  SummaryPeriods,
  useSelectedPeriod,
} from 'components/PeriodSelectorProvider/PeriodSelectorProvider';
import getNormalizationErrorMessage from 'components/ZeroState/getNormalizationErrorMessage';
import {
  AggregationPeriod,
  orderByNormalizationFilters,
  SummaryClient,
} from 'core/api/ApiClient/SummaryClient';
import useConfiguredCategories from 'hooks/useConfiguredCategories';
import { summaryTableComponentByPeriod } from 'hooks/useSummaryTable';
import merge from 'lodash/merge';
import { ChartSizes } from 'components/Charts/components/DashboardCard/interfaces/ChartSizes';
import DefaultDashboardCard from 'views/Dashboard/components/Charts/components/DefaultDashboardCard';
import DashboardPage from 'views/Dashboard/components/DashboardPage';

import { AnalyticsDashboardPageIndexes } from '../../';
import useFetchFilteredData from '../../hooks/useFilteredData';
import { usePageFetcher } from '../../hooks/usePageFetcher';
import { PageProps } from '../../interfaces/PageProps';
import { isEmptySummaryChart } from './utils/isEmptySummaryChart';
import DemandTypeSummary from './views/DemandTypeSummary';
import LeadtimeSummary from './views/LeadtimeSummary';
import QualitySummary from './views/QualitySummary';
import WorkflowSummary from './views/WorkflowSummary';
import NormalizationCategories from 'views/SetupWizard/views/Normalization/interfaces/NormalizationCategories';

type PeriodTitles = Record<SummaryPeriods, string>;
enum ChartsWithCustomTitles {
  demandType = 'demandType',
  speedToValue = 'speedToValue',
  quality = 'quality',
}

const chartTitles: Record<ChartsWithCustomTitles, PeriodTitles> = {
  demandType: {
    past: 'Throughput',
    present: 'Work in Progress (WIP)',
    future: 'Inventory',
  },
  speedToValue: {
    past: 'Lead Time',
    present: 'WIP Age',
    future: 'Inventory Age',
  },
  quality: {
    past: 'Throughput',
    present: 'Work in Progress (WIP) ',
    future: 'Inventory',
  },
};

const SummaryPage = ({ demoDataIsSelected, filters }: PageProps) => {
  const { missingCategories } = useConfiguredCategories(demoDataIsSelected);
  const { currentPeriodType } = useSelectedPeriod();
  const currentDataAggregation = (filters?.currentDataAggregation?.toLocaleLowerCase() ??
    'weeks') as AggregationPeriod;
  const additionalFilters = useMemo(
    () => ({
      summaryPeriodType: currentPeriodType,
    }),
    [currentPeriodType]
  );

  const fetcher = usePageFetcher(new SummaryClient());

  const { data: summaryData, isValidating } = useFetchFilteredData(
    AnalyticsDashboardPageIndexes.summary,
    demoDataIsSelected,
    fetcher,
    filters,
    additionalFilters
  );

  const summaryTableData = orderByNormalizationFilters<{
    itemTypeName: string;
  }>(
    summaryData &&
      summaryData.summaryTable &&
      summaryData.summaryTable[currentPeriodType]
      ? summaryData.summaryTable[currentPeriodType]
      : [],
    'itemTypeName',
    summaryData?.normalizationOrder ?? [],
    NormalizationCategories.DEMAND
  );

  const getOrderedNormalizationCategory = (
    selectedCategory: NormalizationCategories
  ) =>
    summaryData?.normalizationOrder
      .filter(({ category }) => category === selectedCategory)
      .map(({ displayName }) => displayName) ?? [];
  const SummaryTableComponent =
    summaryTableComponentByPeriod[currentPeriodType];

  const getErrorMessageNormalization = (
    relevantCategory: NormalizationCategories
  ) => getNormalizationErrorMessage([relevantCategory], missingCategories);

  const getAttributesForWhenNormalizationIsRequired = (
    key: NormalizationCategories
  ) => {
    return {
      errorMessages: [getErrorMessageNormalization(key)],
      additionalProps: {
        seriesOrder: getOrderedNormalizationCategory(key),
        currentDataAggregation,
      },
    };
  };

  return (
    <DashboardPage
      isLoading={isValidating || !missingCategories}
      demoDataIsSelected={demoDataIsSelected}
    >
      <DefaultDashboardCard
        title="Summary Table"
        Component={SummaryTableComponent}
        data={summaryTableData}
        {...merge(
          {
            additionalProps: {
              demoDataIsSelected,
            },
          },
          getAttributesForWhenNormalizationIsRequired(
            NormalizationCategories.DEMAND
          )
        )}
        size={ChartSizes.full}
      />
      <DefaultDashboardCard
        title="Demand Distribution"
        Component={DemandTypeSummary}
        size={ChartSizes.fixed2}
        data={summaryData?.productivity}
        {...getAttributesForWhenNormalizationIsRequired(
          NormalizationCategories.DEMAND
        )}
        dataIsUnavailable={isEmptySummaryChart}
      />
      <DefaultDashboardCard
        title={chartTitles.speedToValue[currentPeriodType]}
        Component={LeadtimeSummary}
        size={ChartSizes.fixed2}
        data={summaryData?.leadTimeWidget}
        {...getAttributesForWhenNormalizationIsRequired(
          NormalizationCategories.DEMAND
        )}
        dataIsUnavailable={isEmptySummaryChart}
      />
      <DefaultDashboardCard
        title="Quality Distribution"
        Component={QualitySummary}
        size={ChartSizes.fixed2}
        data={summaryData?.quality}
        {...getAttributesForWhenNormalizationIsRequired(
          NormalizationCategories.QUALITY
        )}
        dataIsUnavailable={isEmptySummaryChart}
      />
      <DefaultDashboardCard
        title="Workflow Distribution"
        Component={WorkflowSummary}
        size={ChartSizes.fixed2}
        data={summaryData?.workflowTrendWidget}
        dataIsUnavailable={isEmptySummaryChart}
        additionalProps={{ currentDataAggregation, seriesOrder: [] }}
      />
    </DashboardPage>
  );
};

export default SummaryPage;
