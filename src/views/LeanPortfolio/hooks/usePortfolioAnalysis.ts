import fetch from 'core/api/fetch';
import useSWR from 'swr';
import { AxiosResponse } from 'axios';
import { PortfolioAnalysisData } from '../interfaces/PortfolioAnalysis';
import { DateTime } from 'luxon';

export const DEFAULT_RESOURCE = 'portfolios/focus';

export const fetchPortfolioAnalysis = (url: string): Promise<AxiosResponse<PortfolioAnalysisData>> => {
  return fetch.get(url).then(response => {
    return response;
  });
};

export function usePortfolioAnalysis({
  params
}): {
  data: PortfolioAnalysisData;
  isLoading: boolean;
  repopulatePortfolioAnalysis: (data: PortfolioAnalysisData) => void;
} {
  const { contextId, filterStartDate, filterEndDate, includeChildren } = params;

  const startStr = encodeURIComponent(DateTime.fromISO(filterStartDate).startOf('day').toISO());
  const endStr = encodeURIComponent(DateTime.fromISO(filterEndDate).endOf('day').toISO());
  const url = `${DEFAULT_RESOURCE}?contextId=${contextId}&filterStartDate=${startStr}&filterEndDate=${endStr}&isIncludeChildren=${includeChildren}`;

  const { data: response, mutate } = useSWR(
    url,
    fetchPortfolioAnalysis,
    {
      revalidateOnFocus: false,
      revalidateIfStale: false,
      revalidateOnReconnect: false
    },
  );

  const repopulatePortfolioAnalysis = async () => {
    await fetchPortfolioAnalysis(url)
      .then(newDataResponse => {
        mutate(newDataResponse, false);
      })
      .catch(error => {
        console.error("Error repopulating portfolio analysis:", error);
      });
  };


  return {
    data: response?.data["focus"],
    isLoading: !response?.data,
    repopulatePortfolioAnalysis
  };
};
