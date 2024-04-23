import { useState } from 'react';
import useSWR from 'swr';
import fetch from 'core/api/fetch';

export type ParentWorkItem = {
  keyResultId?: string;
  workItemId: string;
  title: string;
};

export const fetchParentWorkItems = (
  url: string,
): Promise<{ data: Array<ParentWorkItem>; }> => {
  return fetch.get(`${url}`);
};

export function useParentWorkItem(
  obeyaRoomId,
  resource = '/obeya/objectives/parent-workitems',
) {
  const [workItemId, setworkItemId] = useState<string | undefined>();

  const searchParentWorkItem = (workItemId) => {
    setworkItemId(workItemId);
  };

  const { data: response, error } = useSWR(
    workItemId
      ? `${resource}?workItemId=${workItemId}&obeyaRoomId=${obeyaRoomId}`
      : null,
    fetchParentWorkItems,
  );

  return {
    workItemId,
    data: response?.data
      ? response.data.map((workItem) => ({
        parentWorkItemId: workItem.workItemId,
        parentWorkItemTitle: workItem.title,
      }))
      : undefined,
    loading: !response?.data && workItemId,
    error,
    searchParentWorkItem,
  };
}
