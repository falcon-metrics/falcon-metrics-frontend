import { APIClient } from './ApiClient';

export class ObjectiveLinkTypeClient extends APIClient {
  constructor() {
    super('objective_linktypes');
  }

  async get(): Promise<string[]> {
    return await super.get();
  }
}
