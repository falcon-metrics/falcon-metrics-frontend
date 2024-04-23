import { AxiosResponse } from 'axios';
import fetch from 'core/api/fetch';
import { StringUnitLength } from 'luxon';
import useSWR from 'swr';

type InsightItem = {
  id: number;
  orgId: string;
  context_id: string;
  query_parameters: string;
  name: string;
  rolling_window_in_days: number;
};

const fetchInsightsView = (url: StringUnitLength) => {
  return fetch.get(`${url}`);
};

const postInsightsView = (url, data) => {
  return fetch.post(`${url}`, data);
};

export function useInsights(
  resource = 'insights-views',
): {
  data: InsightItem[];
  isValidating: boolean;
  isLoadingInsights: boolean;
  error?: unknown;
  mutateInsights: any;
  postInsightsView: (url:string, data: {}) => Promise<AxiosResponse<any>>;
} {
  const { data: response, error, isValidating, mutate } = useSWR(
    resource,
    fetchInsightsView,
    { revalidateOnFocus: false },
  );

  return {
    data: response?.data?.insights || [],
    mutateInsights: mutate,
    isValidating,
    isLoadingInsights: !response?.data,
    error,
    postInsightsView,
  };
}
