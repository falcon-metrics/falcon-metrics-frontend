import { useCallback } from "react";
import { AxiosResponse } from "axios";
import fetch, { useCustomSWR } from "core/api/fetch";
import { StringUnitLength } from "luxon";
import { ObeyaRoom } from "core/api/ApiClient/ObeyaGoalsClient";

export const MUTATE_OBEYA_KEY = "obeya/rooms/all";
export const defaultResources = {
  add: "obeya/room/create",
  update: "obeya/room/edit",
  updateRoadmap: "obeya/roadmap/edit",
  updateObeyaRoadmap: "obeya/roadmap/obeya/edit",
  remove: "obeya/room/delete",
  getAll: MUTATE_OBEYA_KEY,
};
export function useInitiatives(): {
  obeyaRoomData: ObeyaRoom[];
  isValidating: boolean;
  loading: boolean;
  error?: unknown;
  mutate: any;
  post: (data: {}) => Promise<AxiosResponse<any>>;
  update: (data: {}) => Promise<AxiosResponse<any>>;
  updateRoadmap: (data: {}) => Promise<AxiosResponse<any>>;
  updateObeyaRoadmap: (data: {}) => Promise<AxiosResponse<any>>;
  remove: (roomId: string) => Promise<AxiosResponse<any>>;
} {
  const { data: response, error, isValidating, mutate } = useCustomSWR<any>(
    MUTATE_OBEYA_KEY,
    (url: StringUnitLength) => fetch.get(`${url}`)
  );

  const post = useCallback(
    async (data: {}) => {
      const response = await fetch.post(`${defaultResources.add}`, data);
      mutate();
      return response.data;
    },
    [mutate]
  );

  const update = useCallback(
    async (data: {}) => {
      const response = await fetch.patch(`${defaultResources.update}`, data);
      mutate();

      return response.data;
    },
    [mutate]
  );

  const updateRoadmap = useCallback(
    async (data: {}) => {
      const response = await fetch.patch(
        `${defaultResources.updateRoadmap}`,
        data
      );
      if (response.data) mutate();

      return response.data;
    },
    [mutate]
  );

  const updateObeyaRoadmap = useCallback(
    async (data: {}) => {
      const response = await fetch.patch(
        `${defaultResources.updateObeyaRoadmap}`,
        data
      );

      return response.data;
    },
    [mutate]
  );

  const remove = useCallback(
    async (roomId: string) => {
      const response = await fetch.post(`${defaultResources.remove}`, {
        obeyaRoomId: roomId,
      });
      mutate();
      return response.data;
    },
    [mutate]
  );

  return {
    obeyaRoomData: response?.data?.obeyaRooms || [],
    mutate,
    isValidating,
    loading: !response?.data,
    error,
    post,
    update,
    updateRoadmap,
    updateObeyaRoadmap,
    remove,
  };
}
