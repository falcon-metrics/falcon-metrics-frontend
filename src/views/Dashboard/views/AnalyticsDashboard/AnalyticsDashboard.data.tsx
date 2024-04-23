import { useMemo } from 'react';

import { ApiQueryParameters } from 'core/api/ApiClient/ApiClient';
import { defaultFetcher } from 'core/api/fetch';
import useTrialInfo from 'hooks/fetch/useTrialInfo';
import merge from 'lodash/merge';
import { DateTime } from 'luxon';
import { useHistory } from 'react-router';
import useSWRImmutable from 'swr/immutable';
import { fromUtcToLocalTimezone } from 'utils/dateTime';
import memo from 'utils/typescript/memo';

import { FilterPanelProvider } from '../Platform/views/FilterPanel/contexts/FilterPanelContext/useFilterPanelContext';
import {
  getAppliedFilters,
  getPanelParams,
} from '../Platform/views/FilterPanel/contexts/FilterPanelContext/utils';
import AnalyticsDashboard from './AnalyticsDashboard';
import { getTimezone } from 'utils/utils';

type Response = {
  startDate: string;
  finishDate: string;
};

export function useGetDefaultRollingWindow() {
  const history = useHistory();

  const initialFilters = useMemo(
    () => getPanelParams(getAppliedFilters(history.location.search)),
    [history],
  );

  const params = new URLSearchParams({
    timezone: initialFilters.timezone || getTimezone(),
  });
  const rollingWindowUrl = `/rolling-window?${params.toString()}`;

  const { data } = useSWRImmutable<Response>(rollingWindowUrl, defaultFetcher, {
    suspense: true,
  });

  if (!data) {
    return null;
  }

  const { startDate, finishDate } = data;
  const dates = [startDate, finishDate]
    .map(fromUtcToLocalTimezone)
    .map((d) => DateTime.fromISO(d).toJSDate());

  const defaultInitialDates: Partial<ApiQueryParameters> = {
    departureDateLowerBoundary: dates[0],
    departureDateUpperBoundary: dates[1],
  };

  return defaultInitialDates;
}

const AnalyticsDashboardWithData = () => {
  const {
    trialInfo: { hasDatasource = true, sampleDataOptionIsVisible = true } = {},
  } = useTrialInfo();
  const history = useHistory();

  const initialFilters = useMemo(
    () => getPanelParams(getAppliedFilters(history.location.search)),
    [history],
  );

  const params = new URLSearchParams({
    timezone: initialFilters.timezone || getTimezone(),
  });
  const rollingWindowUrl = `/rolling-window?${params.toString()}`;

  const { data } = useSWRImmutable<Response>(rollingWindowUrl, defaultFetcher, {
    suspense: true,
  });

  if (!data) {
    return null;
  }

  const { startDate, finishDate } = data;
  const dates = [startDate, finishDate]
    .map(fromUtcToLocalTimezone)
    .map((d) => DateTime.fromISO(d).toJSDate());

  const defaultInitialDates: Partial<ApiQueryParameters> = {
    departureDateLowerBoundary: dates[0],
    departureDateUpperBoundary: dates[1],
  };

  if (!initialFilters.timezone) {
    initialFilters.timezone = getTimezone();
  }

  const initialStateProp = {
    defaultRollingWindowDates: defaultInitialDates,
    selectedFilters: merge(defaultInitialDates, initialFilters),
  };

  return (
    <FilterPanelProvider
      initialStateProp={initialStateProp}
    >
      <AnalyticsDashboard
        hasDatasource={hasDatasource}
        sampleDataOptionIsVisible={sampleDataOptionIsVisible}
      />
    </FilterPanelProvider>
  );
};

export default memo(AnalyticsDashboardWithData);
