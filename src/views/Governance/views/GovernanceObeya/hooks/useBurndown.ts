import useSWR from 'swr';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { MockData } from 'core/api/ApiClient/MockData/MockData';
import useTrialInfo from 'hooks/fetch/useTrialInfo';
import useConfiguredCategories from 'hooks/useConfiguredCategories';

const client = axios.create({
  headers: { Authorization: `Bearer ${window.token}` },
});

const mock = new MockAdapter(client);

mock.onGet('/burndown').reply(() => {
  return [200, [40, 30, 20, 20, 10, 10, 8, 10, 7, 4]];
});

mock.onGet('/risk-burndown').reply(() => {
  return [200, [40, 30, 20, 20, 10, 10, 8, 10, 7, 4]];
});

const fetchBurndown = (url: string, showDemo?: boolean) => {
  if (showDemo) {
    const mockData = new MockData();
    return mockData.getMockDataByKey('parent-context-1', 'SummaryData');
  }
  return client.get(`${url}`);
};

export function useBurndown(resource = '/burndown') {
  const { trialInfo } = useTrialInfo();
  const isDemoTrial = trialInfo?.isTrial && !trialInfo?.hasDatasource;
  const { missingCategories } = useConfiguredCategories(isDemoTrial);

  const { data: response, error } = useSWR(resource, (url) => {
    return fetchBurndown(url, isDemoTrial);
  });

  return {
    data: response?.data,
    loading: !response?.data,
    isDemo: isDemoTrial,
    error,
    missingCategories,
  };
}
