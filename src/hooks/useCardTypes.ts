import fetch from 'core/api/fetch';
import useSWR from 'swr';

const isDevelopmentEnv = process.env.NODE_ENV === 'development';

function useCardTypes(provider?: string, namespace?: string) {
    const key = `/datasources/${provider}/${namespace}/workitemtypes`;
    const getCardTypes = () => fetch.get(key).then(({ data }) => data);
    const { data, ...swrData } = useSWR<any>(
        key,
        getCardTypes,
        {
            revalidateOnFocus: !isDevelopmentEnv,
            revalidateIfStale: !isDevelopmentEnv,
            revalidateOnMount: true,
        }
    );

    return {
        data,
        ...swrData,
    };
}
export default useCardTypes;
