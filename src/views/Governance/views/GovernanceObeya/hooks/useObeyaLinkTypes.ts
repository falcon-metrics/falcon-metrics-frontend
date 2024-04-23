import { AxiosResponse } from "axios";
import fetch from "core/api/fetch";
import { StringUnitLength } from "luxon";
import useSWR, { KeyedMutator } from "swr";
import { getTimezone } from "utils/utils";
import {
  getFilterUrlSearchParams,
} from 'views/Dashboard/views/Platform/views/FilterPanel/contexts/FilterPanelContext/utils';

const fetchObeyaData = (url: StringUnitLength) => {
  return fetch.get(`${url}`);
};

export type ObeyaResponse = {
  obeyaLinkTypes: string[];
};

export type MutateObeyaType = KeyedMutator<AxiosResponse<any>>;

export function useObeyaLinkTypes(
  obeyaRoomId,
  resource = "obeya_linktypes"
): {
  data: ObeyaResponse;
  isValidating: boolean;
  isLoading: boolean;
  error?: unknown;
  mutateObeyaData: any;
  response: any;
} {
  const params = getFilterUrlSearchParams({
    obeyaRoomId: obeyaRoomId,
    timezone: getTimezone()
  });
  const { data: response, error, isValidating, mutate } = useSWR(
    obeyaRoomId ? `${resource}?${params}` : null,
    fetchObeyaData,
    { revalidateOnFocus: false }
  );

  const data = {
    obeyaLinkTypes: []
  };

  if (response?.data) {
    data.obeyaLinkTypes = response.data.obeyaLinkTypes || ["relates"];
  }

  return {
    data,
    response,
    mutateObeyaData: mutate,
    isValidating,
    isLoading: !response?.data,
    error,
  };
}
