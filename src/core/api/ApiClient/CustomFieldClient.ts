import { APIClient } from './ApiClient';

export type CustomFields = {
  customFields: Array<CustomFieldItem>;
};

export type CustomFieldItem = {
  customFieldName: string;
  displayName: string;
  values: Array<string>;
};

export class CustomFieldClient extends APIClient {
  constructor() {
    super('customfields');
  }

  async get(): Promise<CustomFields> {
    return await super.get();
  }
}
