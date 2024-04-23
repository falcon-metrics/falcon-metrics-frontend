import { PortfolioLevel } from 'core/api/FetchConfigurations';
import { PortfolioLevelsClient } from '../PortfolioLevelsClient';

describe('API /configuration/portfoliolevels endpoint', () => {
  xtest('should return portfolio levels json data', async () => {
    //TODO: Setup integration test mocking
    console.warn(
      'WARNING: Setup integration test mocking OR set environment variable REACT_APP_API_BASE_URL point to a running instance of API service',
    );

    const portfolioLevels = <PortfolioLevel[]>(
      //await new PortfolioLevelsClient('MOCK_CONTEXT').get()
      await new PortfolioLevelsClient().get()
    );
    expect(portfolioLevels).toHaveLength(3);

    const portfolioLevel = portfolioLevels[0];

    expect(portfolioLevel.name).toBeDefined();
    expect(portfolioLevel.id).toBeDefined();
  });
});
