import { SummaryPeriods } from 'components/PeriodSelectorProvider/PeriodSelectorProvider';
import sortBy from 'lodash/sortBy';
import { DateTime } from 'luxon';
import { mapOfMonths } from 'utils/dateTime';
import { TrendData } from 'utils/statistics/TrendAnalysis';
import { AllowedNames } from 'utils/typescript/types';
import NormalizationCategories from 'views/SetupWizard/views/Normalization/interfaces/NormalizationCategories';
import { normalizationFormDefaultData } from 'views/SetupWizard/views/Normalization/utils/normalizationFormDefaultData';
import { APIClient, ApiQueryParameters } from './ApiClient';

export type BaseValue = {
  itemTypeName: string;
  count: number;
};

type BaseDatum = {
  defectIncident: number[];
  feature: number[];
  enhancementOptimisation: number[];
  enablersTechDebt: number[];
  risksCompliance: number[];
  managementActivity: number[];
};

export type Year<T = BaseValue> = {
  year: string;
  values: T[];
};
export type Quarter<T = BaseValue> = {
  quarter: string;
} & Year<T>;
export type Month<T = BaseValue> = {
  month: string;
} & Year<T>;
export type Week<T = BaseValue> = {
  week: string;
} & Year<T & { weekStarting: string }>;

export type DataByPeriod = {
  years: Year<BaseValue>[];
  quarters: Quarter<BaseValue>[];
  months: Month<BaseValue>[];
  weeks: Week<BaseValue>[];
};

export type AggregationPeriod = 'years' | 'quarters' | 'months' | 'weeks' | 'days';

export type PeriodType<T extends AggregationPeriod> = T extends 'years'
  ? Year
  : T extends 'quarters'
  ? Quarter
  : T extends 'months'
  ? Month
  : T extends 'weeks'
  ? Week
  : never;

export function getAggregationData<T extends AggregationPeriod>(
  aggregationPeriod: T,
): { displayName: string; xValueGenerator(data: PeriodType<T>): string } {
  const aggregationData: Record<
    AggregationPeriod,
    {
      displayName: string;
      xValueGenerator(data: Year | Quarter | Month | Week): string;
    }
  > = {
    years: { displayName: 'Years', xValueGenerator: (data: Year) => data.year },
    quarters: {
      displayName: 'Quarters',
      xValueGenerator: (data: Quarter) => `Quarter ${data.quarter}-${data.year.slice(-2)}`,
    },
    months: {
      displayName: 'Months',
      xValueGenerator: (data: Month) => `${mapOfMonths[data.month]}-${String(data.year).slice(-2)}`,
    },
    weeks: {
      displayName: 'Week Starting',
      xValueGenerator: (data: Week) => `${DateTime.fromISO(data.values[0].weekStarting)
        .startOf('week')
        .startOf('day')
        .toFormat('dd MMM yyyy')}`,
    },
    days: {
      displayName: '',
      xValueGenerator: (data: any) => data.toString()
    }
  };
  return aggregationData[aggregationPeriod];
}

export type LeadTimeData = DataByPeriod;
export type QualitySummaryData = DataByPeriod;
export type WorkflowTrendData = DataByPeriod;
export type ProductivityData = DataByPeriod;

export type SpeedValueDatum = BaseDatum & { scaleX: string[] };

export type SummaryPastItem = {
  itemTypeName: string;
  leadtimePercentile: number;
  serviceLevelExpectationDays: number;
  serviceLevelPercent: number;
  throughput: number;
  trendAnalysisLeadTime: TrendData;
  trendAnalysisSLE: TrendData;
  trendAnalysisThroughput: TrendData;
  variabilityLeadTime: string;
  variabilityThroughput: string;
};

export type SummaryInprogressItem = {
  itemTypeName: string;
  wipCount: number;
  wipAge85Percentile: number;
  wipAgeAverage: number;
  wipVariability: string;
  flowDebt: string;
  flowEfficiencyAverage: number;
  keySourceOfDelay: string;
  demandVsCapacity: string;
};

export type SummaryTableFutureItem = {
  itemTypeName: string;
  inventoryCount: number;
  inventoryAgePercentile85th: string;
  inventoryVariability: string;
  commitmentRate: string;
  timeToCommitPercentile85th: string;
};

type NormalizationFilters = {
  category: string;
  displayName: string;
};

export type SummaryResponse = {
  productivity: ProductivityData;
  workflowTrendWidget: WorkflowTrendData;
  summaryTable: {
    past: Array<SummaryPastItem>;
    present: Array<SummaryInprogressItem>;
    future: Array<SummaryTableFutureItem>;
  };
  leadTimeWidget: LeadTimeData;
  quality: QualitySummaryData;
  normalizationOrder: Array<NormalizationFilters>;
};

const defaultNormalizationOrder: Array<NormalizationFilters> = normalizationFormDefaultData.dataset.flatMap(
  (d) =>
    d.fields.map((f) => ({
      displayName: f.displayName,
      category: d.key,
    })),
);

export function orderByNormalizationFilters<T>(
  listToOrder: T[],
  accessor: AllowedNames<T, string>,
  normalizationOrder: Array<NormalizationFilters>,
  category?: NormalizationCategories,
) {
  const orderList = normalizationOrder
    .filter((o) => !category || o.category === category)
    .map(({ displayName }) => displayName);
  return sortBy(listToOrder, (item) => {
    const newLocal = ((item[accessor] ?? '') as any).toString();
    return orderList.indexOf(newLocal)
  });
}

type ReturnValue = SummaryResponse & { currentPeriodType: SummaryPeriods };
export class SummaryClient extends APIClient<Promise<ReturnValue>> {
  constructor() {
    super('summary');
  }

  async getData(
    demoDataIsSelected: boolean,
    queryParameters?: ApiQueryParameters & {
      summaryPeriodType: SummaryPeriods;
    },
  ): Promise<ReturnValue> {
    const response: SummaryResponse = await super.get({
      queryParameters,
      dataKey: 'SummaryData',
      demoDataIsSelected,
    });
    if (!('normalizationOrder' in response)) {
      response.normalizationOrder = defaultNormalizationOrder;
    }
    return {
      ...response,
      currentPeriodType:
        queryParameters?.summaryPeriodType || SummaryPeriods.PAST,
    };
  }
}
