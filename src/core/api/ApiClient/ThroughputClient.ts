import { APIClient, ApiQueryParameters } from './ApiClient';
import { TrendAnalysis } from 'utils/statistics/TrendAnalysis';
import { DateTime } from 'luxon';
import { WorkItemBasicPresentationInfo } from 'components/WorkItemList/WorkItemList';
import { Distribution as BaseDistribution } from 'views/Dashboard/components/Charts/components/DistributionInfo/interfaces/Distribution';
import { AssignedToDatum } from './WipClient';

export type ThroughputData = {
  count: number;
  fromDate: DateTime;
  untilDate: DateTime;
  numDays: number;
};

export type workItems = Array<{ id: string }>;

export type ThroughputRunChartData = {
  throughputSeries: Array<{
    weekEndingOn: DateTime;
    workItems: workItems;
  }>;
};

type Distribution = {
  percentile05th?: number;
  percentile15th?: number;
} & BaseDistribution;
export type IBoxPlot = {
  median?: number;
  quartile1st?: number;
  quartile3rd?: number;
  interQuartileRange?: number;
  lowerWhisker?: number;
  upperWhisker?: number;
  lowerOutliers?: Array<number>;
  upperOutliers?: Array<number>;
};

export type ThroughputResponse = {
  throughputData: ThroughputData;
  throughputRunChartData: ThroughputRunChartData;
  trendAnalysis: TrendAnalysis;
  workItemTypeAnalysisData: Array<{ type: string; count: number }>;
  classOfServiceAnalysisData: Array<{
    serviceClassName: string;
    count: number;
  }>;
  demandAnalysisData: Array<{ type: string; count: number }>;
  plannedUnplannedAnalysisData: Array<{ type: string; count: number }>;
  valueAreaAnalysisData: Array<{ areaName: string; count: number }>;
  assignedToAnalysisData: Array<AssignedToDatum>;
  boxPlot: IBoxPlot;
  distribution: Distribution;
  workItemList: WorkItemBasicPresentationInfo[];
  normalisedWorkItemList: Record<string, Record<string, number>>;
};

export class ThroughputClient extends APIClient<Promise<ThroughputResponse>> {
  constructor() {
    super('throughput');
  }

  async getData(
    demoDataIsSelected: boolean,
    queryParameters?: ApiQueryParameters,
  ): Promise<ThroughputResponse> {
    const response = await super.get({
      queryParameters,
      dataKey: 'ThroughputData',
      demoDataIsSelected,
    });

    // Need to properly deserialise dates
    if (response.throughputRunChartData?.throughputSeries) {
      response.throughputRunChartData.throughputSeries = response.throughputRunChartData?.throughputSeries.map(
        (item: { weekEndingOn: string; workItems: workItems }) => ({
          weekEndingOn: DateTime.fromISO(item.weekEndingOn),
          workItems: item.workItems,
        }),
      );
    }

    if (response.throughputData) {
      response.throughputData.fromDate = response.throughputData?.fromDate
        ? DateTime.fromISO(response.throughputData?.fromDate, {
            zone: 'UTC',
          }).toLocal()
        : undefined;
      response.throughputData.untilDate = response.throughputData?.untilDate
        ? DateTime.fromISO(response.throughputData?.untilDate, {
            zone: 'UTC',
          }).toLocal()
        : undefined;
    }

    return response;
  }
}
