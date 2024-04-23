import { useCallback } from "react";
import { AxiosResponse } from "axios";
import fetch from "core/api/fetch";
import { StringUnitLength } from "luxon";
import useSWR from "swr";
import { PortfolioInfo } from "../interfaces/PortfolioBoard";

export const MUTATE_PORTFOLIO_KEY = "portfolios";
export const defaultResources = {
  add: `${MUTATE_PORTFOLIO_KEY}/create`,
  update: `${MUTATE_PORTFOLIO_KEY}/update`,
  remove: `${MUTATE_PORTFOLIO_KEY}/delete`,
};

export function usePortfolio(): {
  data: PortfolioInfo[];
  isValidating: boolean;
  isLoading: boolean;
  error?: unknown;
  mutate: any;
  post: (data: {}) => Promise<AxiosResponse<any>>;
  update: (data: {}) => Promise<AxiosResponse<any>>;
  remove: (columnId: string) => Promise<AxiosResponse<any>>;
} {
  const { data: response, error, isValidating, mutate } = useSWR(
    () => `${MUTATE_PORTFOLIO_KEY}`,
    (url: StringUnitLength) => fetch.get(`${url}`),
    { revalidateOnFocus: false }
  );

  const post = useCallback(
    async (data: {}) => {
      const response = await fetch.post(`${defaultResources.add}`, data);
      mutate(); // trigger a revalidation after a successful response
      return response.data;
    },
    [mutate]
  );

  const update = useCallback(
    async (data: {}) => {
      // console.log("usePortfolio - update operation  - - - ", data);
      const response = await fetch.patch(`${defaultResources.update}`, data);
      mutate(); // trigger a revalidation after a successful response

      return response.data;
    },
    [mutate]
  );

  const remove = useCallback(
    async (columnId: string) => {
      const response = await fetch.delete(
        `${defaultResources.remove}/${columnId}`
      );
      mutate(); // trigger a revalidation after a successful response
      return response.data;
    },
    [mutate]
  );

  return {
    data: response?.data?.columns || [],
    mutate,
    isValidating,
    isLoading: !response?.data,
    error,
    post,
    update,
    remove,
  };
}
