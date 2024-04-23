import { ClassOfService } from '../FetchConfigurations';
import { APIClient } from './ApiClient';

export class ClassOfServiceClient extends APIClient {
  constructor() {
    super('configuration/classofservice');
  }

  async get(): Promise<Array<ClassOfService>> {
    return await super.get();
  }
}
