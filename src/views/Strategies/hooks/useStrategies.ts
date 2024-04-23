import fetch from "../../../core/api/fetch";
import useSWR from "swr";
import { AxiosResponse } from "axios";
import { OKRObjective } from "views/Governance/views/GovernanceObeya/utils";
import { getTimezone } from "utils/utils";

export type Strategy = {
  contextId: string;
  createdAt: string;
  deletedAt: null | string;
  id: number | string;
  lastUser: string;
  okrs: OKRObjective[];
  orgId: string;
  parentStrategicDriverId: null | string;
  relationshipType: string;
  relationships: any[]; // Define the specific type if possible
  strategyDescription: string;
  strategyStatement: string;
  updatedAt: string;
  userCreated: string;
  userModified: string;
  horizon: string;
  horizonId: string | number;
};

export const defaultResource = "strategies";

const fetchStrategy = (url: string): Promise<AxiosResponse<Strategy[]>> => {
  return fetch.get(`${url}`);
};

export const postStrategy = (data) => {
  return fetch.post(defaultResource, data);
};

export const updateStrategy = (data) => {
  return fetch.patch(defaultResource, data);
};

export function useStrategy(
  resource = defaultResource,
  contextId = "",
  horizonId = ""
): {
  data: Strategy[] | undefined;
  isValidating: boolean;
  isLoadingStrategy: boolean;
  postStrategy: (data: {}) => Promise<AxiosResponse<Strategy>>;
  updateStrategy: (data: {}) => Promise<AxiosResponse<Strategy>>;
  mutate: any;
} {
  
  const { data: response, isValidating, mutate } = useSWR(
    contextId || horizonId
      ? `${resource}?contextId=${contextId}&timezone=${getTimezone()}&horizonId=${horizonId}`
      : null,
    fetchStrategy,
    {
      revalidateOnFocus: false,
      revalidateIfStale: false,
      revalidateOnReconnect: false,
    }
  );

  return {
    data: response?.data || [],
    isValidating,
    mutate,
    isLoadingStrategy: !response?.data,
    postStrategy,
    updateStrategy
  };
}
