import { ComponentType } from 'react';
import useSWR from 'swr';
import fetch from 'core/api/fetch';
import { MockData } from 'core/api/ApiClient/MockData/MockData';
import useConfiguredCategories from 'hooks/useConfiguredCategories';
import {
  Props as SummaryTableProps,
  SummaryTableCompletedWork,
  SummaryTableWorkInProcess,
  SummaryTableUpComingWork,
} from 'views/Dashboard/views/AnalyticsDashboard/views/Summary/components/SummaryTable';
import { SummaryPeriods } from 'components/PeriodSelectorProvider/PeriodSelectorProvider';
import { getTimezone } from 'utils/utils';

export const summaryTableComponentByPeriod: Record<
  SummaryPeriods,
  ComponentType<SummaryTableProps>
> = {
  [SummaryPeriods.PAST]: SummaryTableCompletedWork,
  [SummaryPeriods.PRESENT]: SummaryTableWorkInProcess,
  [SummaryPeriods.FUTURE]: SummaryTableUpComingWork,
};

const fetchSummaryTable = async (
  url: string,
  period?: SummaryPeriods,
  obeyaRoomId?: string,
  demoDataIsSelected?: boolean,
) => {
  if (demoDataIsSelected) {
    const mockData = new MockData();
    return mockData.getMockDataByKey('parent-context-1', 'SummaryData');
  }

  // TODO leo should create a Context API to
  // share current filters bettwen each component that need to see filters
  const allFilters = new URLSearchParams({
    summaryPeriodType: period ?? SummaryPeriods.PAST,
    tz: getTimezone(),
    lang: navigator.language,
    obeyaRoomId: obeyaRoomId || '',
  });

  const response = await fetch.get(`${url}?${allFilters}`);
  return response;
};

export default function useSummaryTable(
  obeyaRoomId?: string,
  currentPeriodType?: SummaryPeriods,
) {
  const { missingCategories } = useConfiguredCategories(true);
  const { data: response, error } = useSWR(
    obeyaRoomId && currentPeriodType
      ? ['/summary-table', obeyaRoomId, currentPeriodType].join('/')
      : null,
    (url) => fetchSummaryTable(url, currentPeriodType, obeyaRoomId, false),
  );

  return {
    data: response?.data,
    loading: !response?.data,
    error,
    missingCategories,
  };
}
