import { DataByPeriod } from 'core/api/ApiClient/SummaryClient';

export function isEmptySummaryChart(data?: DataByPeriod) {
  return (
    !data?.years?.length &&
    !data?.quarters?.length &&
    !data?.months?.length &&
    !data?.weeks?.length
  );
}
