//import {WorkItemType} from '../../components/configuration/configuration';

import { WorkItemType, WorkItemTypesClient } from '../WorkItemTypesClient';

describe('API /configuration/workitemtypes endpoint', () => {
  xtest('should return work item types json data', async () => {
    //TODO: Setup integration test mocking
    console.warn(
      'WARNING: Setup integration test mocking OR set environment variable REACT_APP_API_BASE_URL point to a running instance of API service',
    );

    const workitemtypes = <WorkItemType[]>(
      //await new WorkItemTypesClient('MOCK_CONTEXT').get()
      await new WorkItemTypesClient().get()
    );
    expect(workitemtypes).toHaveLength(5);

    const workitemtype = workitemtypes[0];

    expect(workitemtype.name).toBeDefined();
    expect(workitemtype.id).toBeDefined();
    expect(workitemtype.level).toBeDefined();
    //expect(workitemtype.serviceLevelExpectationInDays).toBeDefined();
  });
});
