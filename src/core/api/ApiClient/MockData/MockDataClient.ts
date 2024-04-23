//this user only has getObject permission from this bucket
import fetch from 'core/api/fetch';
const fetchMockDataByKey = async (objectKey: string) => {
  const response = await fetch.post('/mock-data', { objectKey: objectKey });
  return response.data;
};
export class MockDataClient {
  async getDataByKey(key: string) {
    const data = await fetchMockDataByKey(key);
    return data;
  }

  async getMockData(contextId: string) {
    const data = await fetchMockDataByKey(`${contextId}/data.json`);
    return data;
  }
}
