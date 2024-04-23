import { APIClient } from './ApiClient';

export class LinkTypeClient extends APIClient {
  constructor() {
    super('linktypes');
  }

  async get(): Promise<string[]> {
    return await super.get();
  }
}
