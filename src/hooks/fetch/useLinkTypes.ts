import fetch from "core/api/fetch";
import useSWR from "swr";
import { StringUnitLength } from "luxon";

const fetchLinkTypes = (url: StringUnitLength) => {
  return fetch.get(`${url}`);
};

export function useLinkTypes(): {
  data: string[];
  isValidating: boolean;
  isLoading: boolean;
  error?: unknown;
  mutate: any;
  response: any;
} {

  const { data: response, error, isValidating, mutate } = useSWR(
    'linktypes',
    fetchLinkTypes,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false
    },
  );

  const data = response?.data || [];

  return {
    data,
    response,
    mutate,
    isValidating,
    isLoading: !response?.data,
    error,
  };
}
