import { ApiQueryParameters } from 'core/api/ApiClient/ApiClient';
import { generateSWRKeysFromObject } from 'core/api/fetch';
import { useSharedStateSetterEffect } from 'hooks/useSharedState';
import omit from 'lodash/omit';
import useSWR from 'swr';
import { getFiltersExcludedForPage } from '../utils/filtersLimitedToCertainPages';
import { AnalyticsDashboardPageIndexes } from '../interfaces/PageIndexes';
import { minutesToMiliseconds } from 'utils/dateTime';
import { useMemo } from 'react';

type Fetcher<T> = (
  demoDataIsSelected: boolean,
  filters: Record<string, unknown>,
) => Promise<T>;

const revalidateTimeInMs = minutesToMiliseconds(5);

const useFetchFilteredData = <
  T,
  AdditionalFilters extends Record<string, unknown>
>(
  pageKey: AnalyticsDashboardPageIndexes,
  demoDataIsSelected: boolean,
  fetcher: Fetcher<T>,
  filters: ApiQueryParameters = {},
  additionalFilters?: AdditionalFilters,
) => {
  const relevantFilters = useMemo(
    () =>
      omit(
        {
          ...filters,
          ...additionalFilters,
        },
        getFiltersExcludedForPage(pageKey),
      ),
    [additionalFilters, filters, pageKey],
  );
  const SWRResponse = useSWR(
    [
      pageKey,
      'filtered-analytics-page-data',
      ...generateSWRKeysFromObject({
        ...relevantFilters,
        demoDataIsSelected,
      }),
    ],
    () => fetcher(demoDataIsSelected, relevantFilters),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      dedupingInterval: revalidateTimeInMs,
    },
  );

  useSharedStateSetterEffect(
    'ANALYTICS_DASHBOARD_IS_LOADING',
    SWRResponse.isValidating,
  );

  return SWRResponse;
};

export default useFetchFilteredData;
