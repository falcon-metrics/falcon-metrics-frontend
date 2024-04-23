import { PortfolioLevel } from '../FetchConfigurations';
import { APIClient } from './ApiClient';

export class PortfolioLevelsClient extends APIClient {
  constructor() {
    super('configuration/portfoliolevels');
  }

  async get(): Promise<Array<PortfolioLevel>> {
    return await super.get();
  }
}
