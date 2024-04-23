import { isObject } from 'views/ValueStreamManagement/utils/validation';
import { NormalisationChartsData } from '../../interfaces/normalisationCharts';
import { parseDistributionHistoricalWidgetData } from './common';

export const parseDemandDistributionData = (data: unknown): NormalisationChartsData | null => {
  if (!isObject(data)) {
    return null;
  }
  
  const upcomingWork: unknown = data['upcomingWork'];
  const parsedUpcomingWork = isObject(upcomingWork)
    ? parseDistributionHistoricalWidgetData(upcomingWork)
    : undefined;

  const workInProcess: unknown = data['workInProcess'];
  const parsedWorkInProcess = isObject(workInProcess)
    ? parseDistributionHistoricalWidgetData(workInProcess)
    : undefined;

  const completedWork: unknown = data['completedWork'];
  const parsedCompletedWork = isObject(completedWork)
    ? parseDistributionHistoricalWidgetData(completedWork)
    : undefined;

  const parsedData: NormalisationChartsData = {
    upcomingWork: parsedUpcomingWork,
    workInProcess: parsedWorkInProcess,
    completedWork: parsedCompletedWork,
  } ;

  return parsedData;
}
