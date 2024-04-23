import axios from 'axios';
import { SWRConfiguration, useSWRConfig } from 'swr';
import useSWRImmutable from 'swr/immutable';

const baseURL =
  process.env.NODE_ENV === 'production'
    ? 'https://api.example.com'
    : process.env.REACT_APP_API_BASE_URL;
const fetch = axios.create({ baseURL });

fetch.interceptors.request.use(
  function (config) {
    config.headers['Authorization'] = `Bearer ${window.token}`;
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  },
);

export default fetch;

export async function defaultFetcher<T>(key: string) {
  return fetch.get<T>(key).then(({ data }) => data);
}

export const generateSWRKeysFromObject = (object: object = {}) =>
  Object.keys(object)
    .sort((a, b) => a.localeCompare(b))
    .map((key) => `${key}=${encodeURIComponent(object[key])}`);


/**
 * Custom SWR hook that fetches data only once. All auto-revalidations
 * are disabled. 
 * 
 * 
 * SWR fetches data when the component re-mounts. 
 * We dont have to do that in this app because once ingested, the data does not change
 */
export const useCustomSWR = <T>(url: any, fetcher: any, config?: SWRConfiguration) => {
  const { cache } = useSWRConfig();
  // true if the data hasnt been fetched yet
  const revalidateOnMount =
    (typeof url === 'string') &&
    !(
      cache.get(url) !== undefined
      && cache.get(url) !== null
    );

  return useSWRImmutable<T>(url, fetcher, {
    ...config,
    revalidateOnMount,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    revalidateIfStale: false,
    refreshWhenHidden: false,
  });
};