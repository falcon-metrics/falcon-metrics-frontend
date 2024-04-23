import { AxiosResponse } from 'axios';
import fetch, { useCustomSWR } from 'core/api/fetch';

export type ObeyaContextItem = {
  positionInHierarchy: string;
  contextId: string;
  name?: string;
};

export const fetchAll = (url: string): Promise<AxiosResponse<{ contexts: ObeyaContextItem[]; }>> => {
  return fetch.get(`${url}`);
};

export function useObeyaContexts(resource = '/obeya-contexts') {
  const { data: response, error } = useCustomSWR<any>(resource, fetchAll, {
  });

  return {
    data: response?.data?.contexts || [],
    isLoading: !response?.data?.contexts,
    error,
  };
}
