import { useMemo } from 'react';
import { AxiosResponse } from 'axios';
import fetch from 'core/api/fetch';
import useSWR from 'swr';
import { getAppliedFilters } from 'views/Dashboard/views/Platform/views/FilterPanel/contexts/FilterPanelContext/utils';
import { useHistory } from 'react-router-dom';
import { AppliedFilters } from 'views/Dashboard/views/Platform/views/FilterPanel/contexts/FilterPanelContext/useFilterPanelContext';
import { getFilterUrlSearchParams } from 'views/Dashboard/views/Platform/views/FilterPanel/contexts/FilterPanelContext/utils';


export type EventInfo = {
  key?: string;
  context_id: string;
  createdAt?: string | null;
  deletedAt?: string | null;
  description?: string;
  efective_date: string;
  event_name: string;
  id?: number | string;
  updatedAt?: string;
  username: string;
  user_id?: string;
};

const defaultResource = 'events';

const fetchEevents = (url: string) => {
  return fetch.get(`${url}`);
};

const postEvent = (data, params) => {
  return fetch.post(`${defaultResource}?${params}`, data);
};

const removeEvent = (eventId) => {
  return fetch.delete(`${defaultResource}/${eventId}`);
};

const updateEvent = (data, params) => {
  return fetch.patch(`${defaultResource}?${params}`, data);
};

export function useEvents(
  resource = defaultResource,
): {
  data: EventInfo[];
  isValidating: boolean;
  isLoadingEvents: boolean;
  error?: unknown;
  mutate: any;
  postEvent: (data: {}) => Promise<AxiosResponse<any>>;
  updateEvent: (data: {}) => Promise<AxiosResponse<any>>;
  removeEvent: (eventId: string | number) => Promise<AxiosResponse<any>>;
  resourceWithFilters: string;
} {
  const history = useHistory();

  const urlParamsObject = useMemo(
    () => getAppliedFilters(history.location.search),
    [history.location.search],
  );
  const appliedFilters: AppliedFilters = urlParamsObject;

  const allQueryParametersString = getFilterUrlSearchParams(appliedFilters);

  const { data: response, error, isValidating, mutate } = useSWR(
    [`${resource}?${allQueryParametersString}`],
    fetchEevents,
    { revalidateOnFocus: false },
  );

  return {
    resourceWithFilters: `${resource}?${allQueryParametersString}`,
    data: response?.data?.events || [],
    mutate,
    isValidating,
    isLoadingEvents: !response?.data,
    error,
    postEvent: (data) => postEvent(data, allQueryParametersString),
    removeEvent,
    updateEvent: (data) => updateEvent(data, allQueryParametersString),
  };
}
