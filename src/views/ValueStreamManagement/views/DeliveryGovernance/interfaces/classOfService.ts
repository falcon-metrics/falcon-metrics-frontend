import { DistributionHistoricalWidgetData } from './common';

export type ClassOfServiceData = {
  upcomingWork: DistributionHistoricalWidgetData | undefined;
  workInProcess: DistributionHistoricalWidgetData | undefined;
  completedWork: DistributionHistoricalWidgetData | undefined;
};
