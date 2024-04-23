import useSWR from 'swr';
import fetch from 'core/api/fetch';

const isDevelopmentEnv = process.env.NODE_ENV === 'development';

const labelKey = 'analytics-context-labels';

type LevelsData = {
  portfolio: string;
  initiative: string;
  team: string;
};

export const useContextLabels = () => {
  const { data } = useSWR<LevelsData>(labelKey, () =>
    fetch.get(labelKey).then(({ data }) => data),
    {
      revalidateOnFocus: isDevelopmentEnv ? false : true,
      revalidateIfStale: isDevelopmentEnv ? false : true,
      revalidateOnMount: true,
    }
  );

  return {
    data,
  };
};
