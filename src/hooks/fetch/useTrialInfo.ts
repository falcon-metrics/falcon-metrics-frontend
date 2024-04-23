import fetch from 'core/api/fetch';
import useSWR from 'swr';

export interface TrialInfo {
  isTrial: boolean;
  endOfTrial?: string;
  daysRemaining?: number;
  blockAccess: boolean;
  sampleDataOptionIsVisible: boolean;
  hasDatasource: boolean;
}

export const key = '/trial-info';

// const isDevelopmentEnv = process.env.NODE_ENV === 'development';

function useTrialInfo() {
  const { data: trialInfo, ...SWRProperties } = useSWR<TrialInfo>(
    key,
    () => fetch.get(key).then(({ data }) => data),
    {
      revalidateOnFocus: false, // isDevelopmentEnv ? false : true,
      revalidateOnMount: false, // true,
    },
  );
  return {
    trialInfo,
    ...SWRProperties,
  };
}

export default useTrialInfo;
