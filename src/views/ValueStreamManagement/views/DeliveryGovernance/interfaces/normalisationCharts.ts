import { DistributionHistoricalWidgetData } from './common';

export type NormalisationChartsData= {
  upcomingWork: DistributionHistoricalWidgetData | undefined;
  workInProcess: DistributionHistoricalWidgetData | undefined;
  completedWork: DistributionHistoricalWidgetData | undefined;
};
