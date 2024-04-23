import { useCallback } from "react";

import fetch, { useCustomSWR } from "core/api/fetch";
import { DateTime } from "luxon";
import { mutate, useSWRConfig } from "swr";
import { sortByString } from "utils/string";

export type ObeyaRoomItem = {
  path: string;
  displayName: string;
  orgId?: string;
  filterId?: string;
  roomId?: string;
  roomName?: string;
  beginDate?: DateTime;
  endDate?: DateTime;
  datasourceId?: string;
  columnId?: string;
  contextId?: string;
  order?: number;
  isFinished?: boolean;
  isArchived?: boolean;
  baselines?: any;
  dependencies?: any;
  // constraintType?: string;
  // constraintDate?: string;
};

export type ObeyaRoomList = Array<ObeyaRoomItem>;

const getAll = (resource) => {
  return fetch.get(resource);
};

const search = (resource) => () => {
  const queryString = "";
  return fetch.get(`${resource}?${queryString}`);
};

const getOne = (resource) => (id) => {
  return fetch.get(`${resource}?id=${id}`);
};

const deleteItem = (resource, data, method?: string) => {
  return fetch[method ?? "post"](`${resource}`, data);
};

const add = (resource: string, data) => {
  return fetch.post(resource, data);
};

const update = (resource, data) => {
  return fetch.patch(resource, data);
};

type DefaultResources = {
  add?: string;
  getOne?: string;
  getAll?: string;
  update?: string;
  search?: string;
  remove?: string;
};

export function useCrud(resource: DefaultResources, dataResponseKey: string) {
  const { cache } = useSWRConfig();
  const { data: response, error } = useCustomSWR<any>(
    resource?.getAll ? resource?.getAll : null,
    getAll,
    { revalidateOnFocus: false }
  );

  const getOneFn = useCallback(() => getOne(resource), [resource]);

  const searchFn = useCallback(() => search(resource), [resource]);

  const updateAndMutate = useCallback(
    async (
      mutateListKey: string,
      formData: {},
      nextData: any,
      afterSuccess?: (response: any) => any,
      afterError?: (error: any) => any,
      shouldMutate = true,
      shouldRevalidate = true
    ) => {
      try {
        const newRoomResponse = await update(resource?.update, formData);
        afterSuccess?.(newRoomResponse);

        if (shouldMutate) {
          mutate(
            mutateListKey,
            {
              data: nextData,
            },
            shouldRevalidate
          );
        }
      } catch (e) {
        afterError?.(e);
        return e;
      }
    },
    [response?.data?.obeyaRooms, resource?.update]
  );

  const postAndMutate = useCallback(
    async (
      mutateListKey: string,
      formData,
      previousData: any,
      afterSuccess?: (response: any) => any,
      afterError?: (error: any) => any,
      shouldRevalidate?: boolean,
      sortKeyAfterMutate?: string,
      shouldMutate = true
    ) => {
      try {
        const resultOfPost: any =
          resource?.add && (await add(resource?.add, formData));

        afterSuccess?.(resultOfPost);

        const items = previousData?.[dataResponseKey] || [];
        const newItems = resultOfPost?.data
          ? [...items, resultOfPost?.data]
          : items;

        if (shouldMutate) {
          mutate(
            mutateListKey,
            {
              data: {
                ...previousData,
                [dataResponseKey]: sortKeyAfterMutate
                  ? sortByString(newItems, sortKeyAfterMutate)
                  : newItems,
              },
            },
            shouldRevalidate
          );
        }

        return resultOfPost;
      } catch (e) {
        afterError?.(e);
        return e;
      }
    },
    [response?.data?.[dataResponseKey], resource?.add]
  );

  const deleteAndMutate = async (
    mutateListKey: string,
    payload: any,
    newListToUpdate: any,
    method: "post" | "delete" = "post",
    afterSuccess?: () => void,
    afterError?: () => void,
    customResource?: string,
    shouldRevalidate = false
  ) => {
    try {
      const deleteResponse = await deleteItem(
        customResource ?? resource?.remove,
        payload,
        method
      );
      newListToUpdate &&
        mutate(mutateListKey, { data: newListToUpdate }, shouldRevalidate);
      afterSuccess?.();
      return deleteResponse;
    } catch (e) {
      afterError?.();
      return e;
    }
  };

  return {
    data: response?.data,
    loading: !response?.data,
    error,
    cache,
    add: postAndMutate,
    update: updateAndMutate,
    getOne: getOneFn,
    remove: deleteAndMutate,
    search: searchFn,
  };
}
