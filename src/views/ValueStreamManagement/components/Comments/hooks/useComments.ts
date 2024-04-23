import { useMemo } from 'react';
import { AxiosResponse } from 'axios';
import fetch from 'core/api/fetch';
import useSWR from 'swr';
import { getAppliedFilters } from 'views/Dashboard/views/Platform/views/FilterPanel/contexts/FilterPanelContext/utils';
import { useHistory } from 'react-router-dom';
import { AppliedFilters } from 'views/Dashboard/views/Platform/views/FilterPanel/contexts/FilterPanelContext/useFilterPanelContext';
import { getFilterUrlSearchParams } from 'views/Dashboard/views/Platform/views/FilterPanel/contexts/FilterPanelContext/utils';

export type CommentInfo = {
  id?: number | string;
  orgId?: string;
  context_id: string;
  comment?: string;
  title: string;
  user_id?: string;
  username: string;
  effective_date: string;
  context: string;
  parentId?: number;
  key?: string;
  updatedAt?: string;
  createdAt?: string | null;
  deletedAt?: string | null;
  replies_count?: string;
  elementFields?: any;
  widget?: string | number;
};

const defaultResource = 'comments';

export const fetchComment = (url: string) => {
  return fetch.get(`${url}`);
};

export const fetchComments = (url: string) => {
  return fetch.get(`${url}`);
};

export const postComment = (data, params) => {
  return fetch.post(`${defaultResource}?${params}`, data);
};

export const removeComment = (eventId) => {
  return fetch.delete(`${defaultResource}/${eventId}`);
};

export const updateComment = (data, params) => {
  return fetch.patch(`${defaultResource}?${params}`, data);
};

export function useComments(
  resource = defaultResource,
): {
  data: CommentInfo[];
  isValidating: boolean;
  isLoadingComments: boolean;
  error?: unknown;
  mutate: any;
  postComment: (data: {}) => Promise<AxiosResponse<any>>;
  fetchComment: (id: string) => Promise<AxiosResponse<any>>;
  updateComment: (data: {}) => Promise<AxiosResponse<any>>;
  removeComment: (eventId: string | number) => Promise<AxiosResponse<any>>;
  resourceWithFilters: string;
} {
  const history = useHistory();

  const urlParamsObject = useMemo(
    () => getAppliedFilters(history.location.search),
    [history?.location?.search],
  );
  const appliedFilters: AppliedFilters = urlParamsObject;

  const allQueryParametersString = getFilterUrlSearchParams(appliedFilters);

  const { data: response, error, isValidating, mutate } = useSWR(
    () => `${resource}?${allQueryParametersString}`,
    fetchComments,
    { revalidateOnFocus: false },
  );

  return {
    resourceWithFilters: `${resource}?${allQueryParametersString}`,
    data: response?.data?.comments || [],
    mutate,
    isValidating,
    isLoadingComments: !response?.data,
    error,
    fetchComment: (id) => fetchComment(`${resource}/${id}?${allQueryParametersString}`),
    postComment: (data) => postComment(data, allQueryParametersString),
    removeComment,
    updateComment: (data) => updateComment(data, allQueryParametersString),
  };
}
