import ProviderConnection from './ProviderConnection';
import Providers from '../../../../interfaces/Providers';

class AzureConnection implements ProviderConnection {
  providerSlug = Providers.AZURE;
  tokenHelpPage =
    'https://docs.microsoft.com/en-us/azure/devops/organizations/accounts/use-personal-access-tokens-to-authenticate?view=azure-devops&tabs=current-page';
  displayName = 'Azure Boards';

  getUrlToAPITokenPage = (url?: string) => {
    if (!url) {
      return this.tokenHelpPage;
    }
    return url.includes('https')
      ? this.getAzureURLSettings(url)
      : `https://dev.azure.com/${url}/_usersSettings/tokens`;
  };

  getNormalizedURL = (url: string) => {
    let normalizedURL = url?.includes('https')
      ? url
      : `https://dev.azure.com/${url || 'your-tenant'}`;
    if (normalizedURL) {
      const [headUrl, tailUrl] = normalizedURL?.split('.com') ?? [];
      if (tailUrl?.split('/')?.[1]) {
        normalizedURL = `${headUrl}.com/${tailUrl.split('/')?.[1]}`;
      }
    }
    return normalizedURL;
  };

  getNameSpace = (url: string) => {
    const normalizedURL = this.getNormalizedURL(url);
    let namespace = normalizedURL.replace('https://dev.azure.com/', '');
    namespace = namespace.replace('/', '');
    return encodeURI(namespace);
  };

  private getAzureURLSettings = (url: string): string => {
    let currentURL = url;
    if (currentURL) {
      const [headUrl, tailUrl] = currentURL?.split('.com') ?? [];
      if (tailUrl?.split('/')?.[1]) {
        currentURL = `${headUrl}.com/${tailUrl?.split('/')?.[1]
          }/_usersSettings/tokens`;
      }
    }
    return currentURL;
  };

  getWorkItemUrl = (
    workItemId: string,
    namespace: string,
    projectName: string,
  ) =>
    `https://${namespace}.visualstudio.com/${projectName}/_workitems/edit/${workItemId}/`;
}

export default AzureConnection;
