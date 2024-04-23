import { fromUtcToLocalTimezone } from 'utils/dateTime';
import { TrendAnalysis } from 'utils/statistics/TrendAnalysis';
import { ReplaceKeyTypes } from 'utils/typescript/types';
import { APIClient, ApiQueryParameters } from './ApiClient';
import { Distribution as BaseDistribution } from 'views/Dashboard/components/Charts/components/DistributionInfo/interfaces/Distribution';
import { AgeHistogramDatum } from 'views/Dashboard/components/Charts/components/AgeHistogram';

type LocalDates = {
  arrivalDate: string;
  commitmentDate: string;
  departureDate: string;
};

type RawScatterplotDatum = {
  workItemId: string;
  title: string;
  workItemType: string;
  arrivalDateNoTime: string;
  commitmentDateNoTime: string;
  departureDateNoTime: string;
  leadTimeInWholeDays: number;
  wipAgeInWholeDays: number;
  inventoryAgeInWholeDays: number;
  targetForPredictability: number;
};

export type ScatterplotDatum = RawScatterplotDatum & LocalDates;

type Distribution = {
  modes?: number[];
  average?: number;
} & BaseDistribution;

export type PredictabilityItem = {
  itemTypeName: string;
  serviceLevelExpectationDays: number;
  serviceLevelPercent: any;
  trendAnalysis: TrendAnalysis;
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

export type LeadTimeResponse = {
  completedItemCount?: number;
  distribution?: Distribution;
  predictability?: Array<PredictabilityItem>;
  histogram?: Array<AgeHistogramDatum>;
  scatterplot?: Array<ScatterplotDatum>;
  boxPlot?: IBoxPlot;
  distributionShape?: string;
};

export class LeadTimeClient extends APIClient<Promise<LeadTimeResponse>> {
  constructor() {
    super('leadtime');
  }
  async getData(
    demoDataIsSelected: boolean,
    queryParameters?: ApiQueryParameters,
  ): Promise<LeadTimeResponse> {
    const response: ReplaceKeyTypes<
      LeadTimeResponse,
      { scatterplot: Array<RawScatterplotDatum> }
    > = await super.get({
      queryParameters,
      dataKey: 'LeadTimeData',
      demoDataIsSelected,
    });

    const scatterplot = response.scatterplot?.map((datum) => ({
      ...datum,
      arrivalDate: fromUtcToLocalTimezone(datum.arrivalDateNoTime),
      commitmentDate: fromUtcToLocalTimezone(datum.commitmentDateNoTime),
      departureDate: fromUtcToLocalTimezone(datum.departureDateNoTime),
    }));

    return {
      ...response,
      scatterplot,
    };
  }
}
