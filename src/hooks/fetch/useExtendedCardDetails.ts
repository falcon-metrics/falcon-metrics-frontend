import fetch from "core/api/fetch";
import useSWR from "swr";
import { StringUnitLength } from "luxon";
import { ApiQueryParameters } from "core/api/ApiClient/ApiClient";
import { AppliedFilters } from "views/Dashboard/views/Platform/views/FilterPanel/contexts/FilterPanelContext/useFilterPanelContext";
import { getFilterUrlSearchParams } from "views/Dashboard/views/Platform/views/FilterPanel/contexts/FilterPanelContext/utils";

const fetchExtendedCardDetails = (url: StringUnitLength) => {
  return fetch.get(`${url}`);
};

export function useExtendedCardDetails(
  appliedFilters: AppliedFilters,
  apiQueryParameters: ApiQueryParameters,
  workItemId: string
): {
  data: any;
  isValidating: boolean;
  isLoading: boolean;
  error?: unknown;
  mutate: any;
  response: any;
} {
  const allQueryParametersString = getFilterUrlSearchParams({
    ...appliedFilters,
    ...apiQueryParameters,
  });
  const endpoint = "/extended-work-items";
  const url = `${endpoint}?${allQueryParametersString}&workItemId=${workItemId}`;

  const { data: response, error, isValidating, mutate } = useSWR(
    url,
    fetchExtendedCardDetails,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
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
