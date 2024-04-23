import fetch from 'core/api/fetch';
import useTrialInfo from 'hooks/fetch/useTrialInfo';
import useSWR from 'swr';

import { Context } from '../interfaces/Context';

const key = 'configuration/context';

const isDevelopmentEnv = process.env.NODE_ENV === 'development';

const useDashboardContexts = () => {
  
  const {
    isValidating: trialInfoValidating
  } = useTrialInfo();

  const {
    data: apiContexts,
    isValidating: contextsValidating,
  } = useSWR<Context[]>(
    key, () => fetch.get(key).then(({ data }) => data),
    {
      revalidateOnFocus: isDevelopmentEnv ? false : true,
      revalidateOnMount: true,
    }
  );
  const isValidating = contextsValidating || trialInfoValidating;

  return {
    contexts: apiContexts,
    isValidating,
  };
};

export default useDashboardContexts;
