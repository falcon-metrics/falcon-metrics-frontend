import { WidgetInformation } from "views/ValueStreamManagement/views/DeliveryGovernance/interfaces/common";
import { HistogramDatum } from "../views/TimeDistributionSection/components/ItemTimeHistogram/ItemTimeHistogram";

export type ScatterplotDatum = {
  workItemId: string;
  title: string;
  workItemType: string;
  arrivalDateNoTime: string | undefined;
  commitmentDateNoTime: string | undefined;
  departureDateNoTime: string | undefined;
  leadTimeInWholeDays: number | undefined;
  wipAgeInWholeDays: number | undefined;
  inventoryAgeInWholeDays: number | undefined;
};

export type ScatterplotDatumWithDates = ScatterplotDatum & {
  arrivalDate?: string;
  commitmentDate?: string;
  departureDate?: string;
};

export interface DistributionStatistics {
  minimum: number | null;
  maximum: number | null;
  modes: number[] | null;
  average: number | null;
  percentile50th: number | null;
  percentile85th: number | null;
  percentile95th: number | null;
  percentile98th: number | null;
  targetForPredictability: number | null;
};

export interface BoxPlot {
  median: number,
  quartile1st: number,
  quartile3rd: number,
  interQuartileRange: number,
  lowerWhisker: number,
  upperWhisker: number,
  lowerOutliers: Array<number>,
  upperOutliers: Array<number>,
};

export type TimeDistributionData = {
  distribution: DistributionStatistics;
  histogram: HistogramDatum[];
  boxPlot: BoxPlot | null;
  scatterplot: Array<ScatterplotDatumWithDates>;
};
