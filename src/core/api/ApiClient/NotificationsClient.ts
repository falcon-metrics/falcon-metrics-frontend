import { APIClient } from './ApiClient';

export class NotificationsClient extends APIClient {
  constructor() {
    super('notifications');
  }

  async get(): Promise<Array<string>> {
    const result = await super.get();
    if (!(result instanceof Array)) {
      console.warn("Notifications did not return an array");
      return [];
    }
    return result.map((n) => n.message);
  }
}
