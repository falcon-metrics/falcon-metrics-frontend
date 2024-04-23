import useSWR from 'swr';
import fetch from 'core/api/fetch';

type DataSource = {
  namespace: string;
  datasourceId: string;
};

const fetchDatasources = (
  url: string,
): Promise<{ data: Array<DataSource> }> => {
  return fetch.get(`${url}`);
};

export function useDatasources(resource = '/datasources') {
  const { data: response, error } = useSWR(resource, fetchDatasources, {
    revalidateOnFocus: false,
  });

  return {
    data: response?.data || [],
    loading: !response?.data,
    error,
  };
}
