import fetch from 'core/api/fetch';
import useSWR from 'swr';
import { AxiosResponse } from 'axios';
import { DateTime } from 'luxon';
import _ from 'lodash';
import { ScopedMutator } from 'swr/_internal';

export type UpdateItem = {
  id?: string | number;
  orgId: string;
  initiativeId: string;
  userId: string;
  username: string;
  feedType: string;
  updateType: string;
  updateMetadata: any;
  updateText: string;
  updatedAt: string;
  deletedAt?: string;
  createdAt: string;
  feedImages: string;
  parentId?: string | number;
  replies_count?: number | string;
  reply_count?: number | string;
  replies?: UpdateItem[];
  name?: string;
  updateNotes?: string;
  new_id?: string;
  reactions?: any;
};

export type UpdatesAggregatedByTime = {
  thisWeek: UpdateItem[];
  lastWeek: UpdateItem[];
  previous: UpdateItem[];
};

export const defaultResource = 'updates';

export const fetchUpdates = (url: string): Promise<AxiosResponse<UpdatesAggregatedByTime>> => {
  return fetch.get(url);
};

export const fetchUpdate = (url: string): Promise<AxiosResponse<any>> => {
  return fetch.get(url);
};

export const addUpdateInfo = (data) => {
  const dataCopy = _.cloneDeep(data);
  if (typeof data.reactions !== 'string') {
    dataCopy.reactions = JSON.stringify(data.reactions);
  }
  return fetch.post(defaultResource, dataCopy);
};

export const saveUpdate = (data) => {
  const dataCopy = _.cloneDeep(data);
  if (typeof data.reactions !== 'string') {
    dataCopy.reactions = JSON.stringify(data.reactions);
  }
  return fetch.patch(`${defaultResource}/${data.id}`, dataCopy);
};

export const removeUpdate = (id) => {
  return fetch.delete(`${defaultResource}/${id}`);
};

export function sortByUpdatedAt(list: UpdateItem[]) {
  return list?.sort((a, b) => {
    const aValue = DateTime.fromISO(a?.updatedAt).toMillis() || 0;
    const bValue = DateTime.fromISO(b?.updatedAt).toMillis() || 0;

    return bValue - aValue;
  }).map(x => {
    if (x.updateMetadata && typeof x.updateMetadata === 'string') {
      x.updateMetadata = JSON.parse(x.updateMetadata);
      x.reactions = x.reactions ? JSON.parse(x.reactions) : [];
    }
    return x;
  });
};
export const editUpdateInCache = (item: UpdateItem, cacheData: any, mutate: ScopedMutator, key: string) => {
  let updateFound = false;
  const dataCopy = _.cloneDeep(cacheData);

  if (dataCopy?.data?.thisWeek) {
    const idx = dataCopy.data.thisWeek.findIndex(i => i.id === item.id);
    if (idx > -1) {
      dataCopy.data.thisWeek[idx] = item;
      updateFound = true;
    }
  }
  if (dataCopy?.data?.lastWeek && !updateFound) {
    const idx = dataCopy.data.lastWeek.findIndex(i => i.id === item.id);
    if (idx > -1) {
      dataCopy.data.lastWeek[idx] = item;
      updateFound = true;
    }
  }
  if (dataCopy?.data?.thisWeek && !updateFound) {
    const idx = dataCopy.data.previous.findIndex(i => i.id === item.id);
    if (idx > -1) {
      dataCopy.data.previous[idx] = item;
      updateFound = true;
    }
  }
  mutate(key, dataCopy, false);
};

export const removeUpdateFromCache = (item: UpdateItem, cacheData: any, mutate: ScopedMutator, key: string) => {
  const dataCopy = _.cloneDeep(cacheData);

  if (dataCopy?.data) {
    dataCopy.data.thisWeek = dataCopy.data.thisWeek.filter(x => x.id !== item.id);
    dataCopy.data.lastWeek = dataCopy.data.lastWeek.filter(x => x.id !== item.id);
    dataCopy.data.previous = dataCopy.data.previous.filter(x => x.id !== item.id);
  }
  mutate(key, dataCopy, false);
};

export const addUpdateToCache = (item: UpdateItem, cacheData: any, mutate: ScopedMutator, key: string) => {
  if (cacheData && cacheData.data && Array.isArray(cacheData.data.thisWeek)) {
    const dataCopy = _.cloneDeep(cacheData);
    dataCopy.data.thisWeek.unshift(item);
    mutate(key, dataCopy, false);
  }
  // else {
  //   mutate(key, cacheData, false);
  // }
};


export function useUpdates(
  resource = defaultResource,
  updateType = '',
): {
  data: UpdatesAggregatedByTime | undefined;
  isValidating: boolean;
  isLoading: boolean;
  addUpdateInfo: (data: {}) => Promise<AxiosResponse<any>>;
  saveUpdate: (data: {}) => Promise<AxiosResponse<any>>;
  removeUpdate: any;
  mutate: any;
} {
  const queryParams = new URLSearchParams(window.location.search);
  const selectedObeyaRoomId = queryParams.get('roomId');

  const { data: response, isValidating, mutate } = useSWR(
    selectedObeyaRoomId && updateType
      ? `${resource}?initiativeId=${selectedObeyaRoomId}&updateType=${updateType}` : null,
    fetchUpdates,
    {
      revalidateOnFocus: false,
      revalidateIfStale: false,
      revalidateOnReconnect: false
    },
  );


  return {
    data: response?.data ? {
      thisWeek: sortByUpdatedAt(response?.data?.thisWeek) || [],
      lastWeek: sortByUpdatedAt(response?.data?.lastWeek) || [],
      previous: sortByUpdatedAt(response?.data?.previous) || [],
    } : undefined,
    isValidating,
    mutate,
    isLoading: !response?.data,
    addUpdateInfo,
    saveUpdate,
    removeUpdate,
  };
};
