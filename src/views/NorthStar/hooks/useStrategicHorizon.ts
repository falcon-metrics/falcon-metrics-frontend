/* eslint-disable @typescript-eslint/no-unused-vars */
import fetch from 'core/api/fetch';
import useSWR from 'swr';
import { HorizonItem } from '../interfaces';

/**
 * @deprecated
 * This entire hook is no longer in use. Refer to useNorthStar
 */

const defaultResource = 'horizons';

const fetchStrategicHorizon = (url: string) => {
  return fetch.get(`${url}`);
};

function useStrategicHorizon(
  resource = defaultResource,
): {
  data: HorizonItem[] | undefined;
  isValidating: boolean;
  isLoading: boolean;
} {
  const { data, isValidating } = useSWR(
    resource,
    fetchStrategicHorizon,
    { revalidateOnFocus: false },
  );

  return {
    data: data?.data,
    isValidating,
    isLoading: !data?.data,
  };
}
