import { useMemo } from 'react';
import { AxiosResponse } from 'axios';
import useSWR from 'swr';
import { getAppliedFilters } from 'views/Dashboard/views/Platform/views/FilterPanel/contexts/FilterPanelContext/utils';
import { useHistory } from 'react-router-dom';
import { AppliedFilters } from 'views/Dashboard/views/Platform/views/FilterPanel/contexts/FilterPanelContext/useFilterPanelContext';
import { getFilterUrlSearchParams } from 'views/Dashboard/views/Platform/views/FilterPanel/contexts/FilterPanelContext/utils';
import { fetchComment, postComment, removeComment, updateComment } from './useComments';

export type CommentInfoBase = {
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
}

export type CommentInfo = CommentInfoBase & {
  replies?: [];
};

const defaultResource = 'comments';

export function useReplies(
  commentId,
  resource = defaultResource,
): {
  data: CommentInfo[];
  isValidating: boolean;
  isLoadingReplies: boolean;
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
    [history.location.search],
  );
  const appliedFilters: AppliedFilters = urlParamsObject;

  const allQueryParametersString = getFilterUrlSearchParams(appliedFilters);

  // Will manager the state of comments with replies
  const { data: response, error, isValidating, mutate } = useSWR(
    () => commentId ? `${resource}/${commentId}?${allQueryParametersString}` : null,
    fetchComment,
    { revalidateOnFocus: false },
  );

  return {
    resourceWithFilters: `${resource}/${commentId}?${allQueryParametersString}`,
    data: response?.data?.comment || [],
    mutate,
    isValidating,
    isLoadingReplies: !response?.data,
    error,
    fetchComment: (id) => fetchComment(`${resource}/${id}?${allQueryParametersString}`),
    postComment: (data) => postComment(data, allQueryParametersString),
    removeComment,
    updateComment: (data) => updateComment(data, allQueryParametersString),
  };
}
