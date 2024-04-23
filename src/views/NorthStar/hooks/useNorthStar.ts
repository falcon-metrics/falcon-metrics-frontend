import fetch from 'core/api/fetch';
import useSWR, { mutate } from 'swr';
import { AxiosResponse } from 'axios';
import { VisionItem } from '../interfaces';
import { horizonsEndpoint } from 'views/Strategies/hooks/useHorizons';

export const defaultResource = 'visions';

const fetchNorthStar = (url: string) => {
  return fetch.get(`${url}`);
};

export const postVision = (data) => {
  return fetch.post(defaultResource, data);
};

export const updateVision = async (data) => {
  // The horizons and visions are both updated with the visions endpoint
  // So mutate horizons to fetch the updated list of horizons
  await mutate(horizonsEndpoint, undefined, true);
  const response = await fetch.patch(defaultResource, data);
  return response;
};

export function useNorthStar(
  resource = defaultResource,
): {
  data: VisionItem | undefined;
  isValidating: boolean;
  isLoadingVisions: boolean;
  postVision: (data: {}) => Promise<AxiosResponse<any>>;
  updateVision: (data: {}) => Promise<AxiosResponse<any>>;
  mutate: any;
} {
  const { data, isValidating, mutate } = useSWR(
    resource,
    fetchNorthStar,
    { revalidateOnFocus: false },
  );

  let response: any = undefined;

  if (data?.data?.[0]) {
    response = {
      strategicDrivers: (data?.data?.[0]?.strategicDrivers || []),
      ...(data?.data?.[0] || []),
    };
  }

  if (!data && !isValidating) {
    response = {
      visionStatement: '',
      missionStatement: '',
      strategicDrivers: [
      ],
    };
  }

  return {
    data: response,
    isValidating,
    mutate,
    isLoadingVisions: !data?.data,
    postVision,
    updateVision,
  };
}
