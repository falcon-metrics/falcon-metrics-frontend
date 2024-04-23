import { APIClient, ApiQueryParameters } from './ApiClient';
import { TrendAnalysis } from 'utils/statistics/TrendAnalysis';
import { DateTime } from 'luxon';
import { WorkItemBasicPresentationInfo } from 'components/WorkItemList/WorkItemList';
import { ReplaceKeyTypes } from 'utils/typescript/types';
import { fromUtcToLocalTimezone } from 'utils/dateTime';
import { Distribution } from 'views/Dashboard/components/Charts/components/DistributionInfo';
import { AgeHistogramDatum } from 'views/Dashboard/components/Charts/components/AgeHistogram';

export type InventoryData = {
  count: number;
  countInDate: number;
  fromDate: DateTime;
  untilDate: DateTime;
  numDays: number;
};

export type WIPRunChartData = {
  WIPSeries: Map<number, number>;
  earliestWorkItemDate: Date;
};

type RawScatterplotDatum = {
  workItemId: string;
  title: string;
  workItemType: string;
  arrivalDateNoTime: string;
  inventoryAgeInWholeDays: number;
};

export type ScatterplotDatum = {
  arrivalDate: string;
} & RawScatterplotDatum;

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

export interface InventoryResponse {
  inventoryData?: InventoryData;
  trendAnalysis: TrendAnalysis;
  distribution?: Distribution;
  histogram?: Array<AgeHistogramDatum>;
  scatterplot?: Array<ScatterplotDatum>;

  workItemTypeAnalysisData?: Array<{ type: string; count: number }>;
  classOfServiceAnalysisData?: Array<{
    serviceClassName: string;
    count: number;
  }>;
  demandAnalysisData?: Array<{ type: string; count: number }>;
  plannedUnplannedAnalysisData?: Array<{ type: string; count: number }>;
  valueAreaAnalysisData?: Array<{ areaName: string; count: number }>;
  assignedToAnalysisData?: Array<any>;
  stateAnalysisData?: Array<{ stateName: string; count: number }>;
  boxPlot?: IBoxPlot;
  distributionShape?: string;
  workItemList: WorkItemBasicPresentationInfo[];
  normalisedWorkItemList: Record<string, Record<string, number>>;
}

export class InventoryClient extends APIClient<Promise<InventoryResponse>> {
  constructor() {
    super('inventory');
  }

  async getData(
    demoDataIsSelected: boolean,
    queryParameters?: ApiQueryParameters,
  ): Promise<InventoryResponse> {
    const rawResponse: ReplaceKeyTypes<
      InventoryResponse,
      {
        inventoryData?: { fromDate: string; untilDate: string };
        scatterplot: Array<RawScatterplotDatum>;
      }
    > = await super.get({
      queryParameters,
      dataKey: 'InventoryData',
      demoDataIsSelected,
    });

    const scatterplot = rawResponse.scatterplot?.map((datum) => ({
      ...datum,
      arrivalDate: fromUtcToLocalTimezone(datum.arrivalDateNoTime),
    })) as Array<ScatterplotDatum>;

    return {
      ...rawResponse,
      inventoryData: rawResponse.inventoryData
        ? {
            ...rawResponse.inventoryData,
            fromDate: DateTime.fromISO(rawResponse.inventoryData.fromDate, {
              zone: 'UTC',
            }).toLocal(),
            untilDate: DateTime.fromISO(rawResponse.inventoryData.untilDate, {
              zone: 'UTC',
            }).toLocal(),
          }
        : {},
      scatterplot,
    } as InventoryResponse;
  }
}
