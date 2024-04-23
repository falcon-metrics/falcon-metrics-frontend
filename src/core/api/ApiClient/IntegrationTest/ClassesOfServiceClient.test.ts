import { ClassOfService } from 'core/api/FetchConfigurations';
import { ClassOfServiceClient } from '../ClassOfServiceClient';

describe('API /configuration/classesofservice endpoint', () => {
  xtest('should return class of service json data', async () => {
    //TODO: Setup integration test mocking
    console.warn(
      'WARNING: Setup integration test mocking OR set environment variable REACT_APP_API_BASE_URL point to a running instance of API service',
    );

    const classOfServices = <ClassOfService[]>(
      //await new ClassOfServiceClient('MOCK_CONTEXT').get()
      await new ClassOfServiceClient().get()
    );
    expect(classOfServices).toHaveLength(4);

    const classOfService = classOfServices[0];

    expect(classOfService.name).toBeDefined();
    expect(classOfService.id).toBeDefined();
  });
});
