import { APIClient, ApiQueryParameters } from './ApiClient';
import { DateTime } from 'luxon';
import { WorkItemBasicPresentationInfo } from 'components/WorkItemList/WorkItemList';
import { ReplaceKeyTypes } from 'utils/typescript/types';
import { fromUtcToLocalTimezone } from 'utils/dateTime';
import { Distribution } from 'views/Dashboard/components/Charts/components/DistributionInfo';
import { TrendAnalysis } from 'utils/statistics/TrendAnalysis';
import { AgeHistogramDatum } from 'views/Dashboard/components/Charts/components/AgeHistogram';

type LocalDates = {
  arrivalDate: string;
  commitmentDate: string;
};

type RawScatterplotDatum = {
  workItemId: string;
  title: string;
  workItemType: string;
  arrivalDateNoTime: string;
  commitmentDateNoTime: string;
  wipAgeInWholeDays: number;
  state?: string;
  targetForPredictability: number;
};

export type ScatterplotDatum = RawScatterplotDatum & LocalDates;

export type WIPData = {
  count: number;
  countInDate: number;
  fromDate: DateTime;
  untilDate: DateTime;
  numDays: number;
};

export type WIPRunChartData = {
  WIPSeries: Map<number, number>;
  earliestWorkItemDate: DateTime;
};

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

export type AssignedToDatum = {
  name: string;
  workItems: Array<{ id: string }>;
};

export type WIPResponse = {
  WIPData?: WIPData;
  WIPRunChartData?: Array<Array<any>>; // item[0]: number of milliseconds utc, item[1] count
  trendAnalysis: TrendAnalysis;
  distribution?: Distribution;
  histogram?: Array<AgeHistogramDatum>;
  scatterplot?: Array<ScatterplotDatum>;
  assignedToAnalysisData?: Array<AssignedToDatum>;
  workItemTypeAnalysisData?: Array<{ type: string; count: number }>;
  stateAnalysisData?: Array<{ stateName: string; count: number }>;
  classOfServiceAnalysisData?: Array<{
    serviceClassName: string;
    count: number;
  }>;
  demandAnalysisData?: Array<{ type: string; count: number }>;
  plannedUnplannedAnalysisData?: Array<{ type: string; count: number }>;
  valueAreaAnalysisData?: Array<{ areaName: string; count: number }>;
  boxPlot?: IBoxPlot;
  distributionShape?: string;
  workItemList: WorkItemBasicPresentationInfo[];
  normalisedWorkItemList: Record<string, Record<string, number>>;
};

export class WIPClient extends APIClient<Promise<WIPResponse>> {
  constructor() {
    super('wip');
  }
  async getData(
    demoDataIsSelected: boolean,
    queryParameters?: ApiQueryParameters,
  ): Promise<WIPResponse> {
    const rawResponse: ReplaceKeyTypes<
      WIPResponse,
      {
        WIPData: ReplaceKeyTypes<
          WIPData,
          {
            fromDate: string;
            untilDate: string;
          }
        >;
      }
    > = await super.get({
      queryParameters,
      dataKey: 'WipData',
      demoDataIsSelected,
    });
    let wipRunChartData: WIPResponse['WIPRunChartData'] = [];

    const scatterplot = rawResponse.scatterplot?.map((datum) => ({
      ...datum,
      arrivalDate: fromUtcToLocalTimezone(datum.arrivalDateNoTime),
      commitmentDate: fromUtcToLocalTimezone(datum.commitmentDateNoTime),
    })) as Array<ScatterplotDatum>;

    if (rawResponse.WIPRunChartData?.map) {
      wipRunChartData = rawResponse.WIPRunChartData.map((item: Array<any>) => [
        DateTime.fromISO(item[0], { zone: 'UTC' }).toLocal(),
        item[1],
      ]);
    }

    return {
      ...rawResponse,
      WIPRunChartData: wipRunChartData,
      WIPData: rawResponse.WIPData
        ? {
            ...rawResponse.WIPData,
            fromDate: DateTime.fromISO(rawResponse.WIPData.fromDate, {
              zone: 'UTC',
            }).toLocal(),
            untilDate: DateTime.fromISO(rawResponse.WIPData.untilDate, {
              zone: 'UTC',
            }).toLocal(),
          }
        : undefined,
      scatterplot,
    } as WIPResponse;
  }
}
