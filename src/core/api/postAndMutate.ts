import { Key as SWRKey, mutate } from 'swr';
import fetch from './fetch';

function postAndMutate<T = unknown>(
  url: string,
  data: any,
  cacheMutate = mutate,
  key: SWRKey = url,
) {
  return fetch.post<T>(url, data).then((result) => {
    cacheMutate(key);
    return result;
  });
}

export default postAndMutate;
