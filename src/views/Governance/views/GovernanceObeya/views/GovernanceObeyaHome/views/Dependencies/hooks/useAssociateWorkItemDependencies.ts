import { AxiosResponse } from 'axios';
import fetch from 'core/api/fetch';
import useSWR from 'swr';

import { AssociateWorkItemDependency } from '../types';

export const fetchAll = (url?: string): Promise<AxiosResponse<AssociateWorkItemDependency[]>> =>
  fetch.get(`${url}`);

export const initialState = {
  dependencyMapId: '',
  blockerContextId: '',
  blockerWorkItemId: '',
  blockerContextName: '',
  blockerWorkItemTitle: '',

  blockedContextId: '',
  blockedWorkItemId: '',
  blockedContextName: '',
  blockedWorkItemTitle: '',
};

export function useAssociateWorkItemDependencies(params: {
    obeyaRoomId?: string;
    blockerContextId?: string;
    blockedContextId?: string;
  } | undefined,
  resource = '/obeya/associate-workitem-dependencies'
) {
  const { data: response, error } = useSWR(
      params 
        ? `${resource}?obeyaRoomId=${params?.obeyaRoomId}&blockerContextId=${params?.blockerContextId}&blockedContextId=${params?.blockedContextId}` 
        : null, 
      fetchAll,
      { revalidateOnFocus: false }
  );

  return {
    data: response?.data || [],
    isLoadingAssociateWorkItemDependency: !response?.data,
    error,
  };
}
