import fetch from 'core/api/fetch';
import useSWR from 'swr';

export interface CustomField {
  datasourceFieldName: string;
  displayName: string;
  datasourceId: string;
  enabled: boolean;
  hidden: boolean;
  orgId: string;
  type: string;
}


const isDevelopmentEnv = process.env.NODE_ENV === 'development';

function useCustomFields(provider?: string, namespace?: string) {
  const key = `/datasources/${provider}/${namespace}/customfields?#normalisation`;
  const getCustomFields = () => fetch.get(key).then(({ data }) => data);
  const { data: customFields, ...swrData } = useSWR<CustomField[]>(
    key,
    getCustomFields,
    {
      revalidateOnFocus: isDevelopmentEnv ? false : true,
      revalidateIfStale: isDevelopmentEnv ? false : true,
      revalidateOnMount: true,
    }
  );

  return {
    customFields,
    ...swrData,
  };
}

export default useCustomFields;
