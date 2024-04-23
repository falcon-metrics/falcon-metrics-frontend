import { AxiosResponse } from 'axios';
import useSWR from 'swr';
import { fetchUpdate, addUpdateInfo, saveUpdate, removeUpdate, UpdateItem } from './useUpdates';

export type Response = UpdateItem[];

const defaultResource = 'updates';
export function useRepliesUpdates(
  updateId,
  resource = defaultResource,
): {
  data: Response;
  isValidating: boolean;
  isLoadingReplies: boolean;
  error?: unknown;
  mutate: any;
  addUpdateInfo: (data: {}) => Promise<AxiosResponse<any>>;
  fetchUpdate: (id: string) => Promise<AxiosResponse<any>>;
  saveUpdate: (data: {}) => Promise<AxiosResponse<any>>;
  removeUpdate: (eventId: string | number) => Promise<AxiosResponse<any>>;
} {
  const queryParams = new URLSearchParams(window.location.search);
  const selectedObeyaRoomId = queryParams.get('roomId');

  // Will manager the state of updates with replies
  const { data: response, error, isValidating, mutate } = useSWR(
    () => updateId ? `${resource}/${updateId}?initiativeId=${selectedObeyaRoomId}` : null,
    fetchUpdate,
    {
      revalidateOnFocus: false,
      revalidateIfStale: false,
      revalidateOnReconnect: false
    }
  );

  return {
    data: response?.data?.updateWithReplies || [],
    mutate,
    isValidating,
    isLoadingReplies: !response?.data,
    error,
    fetchUpdate: (id) => fetchUpdate(`${resource}/${id}`),
    addUpdateInfo: (data) => addUpdateInfo(data),
    removeUpdate,
    saveUpdate: (data) => saveUpdate(data),
  };
}
