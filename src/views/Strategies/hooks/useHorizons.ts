import fetch from 'core/api/fetch';
import useSWR from 'swr';
import { AxiosResponse } from 'axios';

export type HorizonItem = {
  contextId: string;
  createdAt: string;
  deletedAt: string;
  endDate: string | Date;
  id: string;
  orgId: string;
  startDate: string | Date;
  title: string;
  updatedAt: string;
  visionId: string;
};

export const horizonsEndpoint = 'horizons';

const fetchHorizons = (url: string) => {
  return fetch.get(`${url}`);
};

export const postHorizon = (data) => {
  return fetch.post(horizonsEndpoint, data);
};

export const updateHorizon = (data) => {
  return fetch.patch(horizonsEndpoint, data);
};

export function useHorizons(
  resource = horizonsEndpoint,
): {
  data: HorizonItem[] | undefined;
  isValidating: boolean;
  isLoading: boolean;
  postHorizon: (data: {}) => Promise<AxiosResponse<any>>;
  updateHorizon: (data: {}) => Promise<AxiosResponse<any>>;
  mutate: any;
} {
  const { data, isValidating, mutate } = useSWR(
    resource,
    fetchHorizons,
    { revalidateOnFocus: false },
  );

  return {
    data: data?.data || [],
    isValidating,
    mutate,
    isLoading: !data?.data || isValidating,
    postHorizon,
    updateHorizon,
  };
}
