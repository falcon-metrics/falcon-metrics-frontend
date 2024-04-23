import WorkItemTypeLevels from 'views/SetupWizard/views/WorkItemTypes/interfaces/WorkItemTypeLevels';
import { APIClient } from './ApiClient';

export type WorkItemType = {
  id: string;
  name: string;
  level: WorkItemTypeLevels;
};

export class WorkItemTypesClient extends APIClient {
  static resource = 'configuration/workitemtype';
  constructor() {
    super(WorkItemTypesClient.resource);
  }

  async get(): Promise<Array<WorkItemType>> {
    return await super.get();
  }
}
