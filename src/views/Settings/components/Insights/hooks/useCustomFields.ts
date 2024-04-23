import { CustomFieldItem } from 'core/api/ApiClient/CustomFieldClient';
import fetch from 'core/api/fetch';
import useSWR from 'swr';

const fetchCustomFields = (url: string) => {
  return fetch.get(`${url}`);
};

export function useCustomFields(
  resource = 'customfields',
): {
  data: CustomFieldItem[];
  isValidating: boolean;
  isLoadingCustomFields: boolean;
  error?: unknown;
  mutate: any;
} {
  const { data: response, error, isValidating, mutate } = useSWR(
    resource,
    fetchCustomFields,
    { revalidateOnFocus: false },
  );

  return {
    data: response?.data?.customFields || [],
    mutate,
    isValidating,
    isLoadingCustomFields: !response?.data,
    error,
  };
}
