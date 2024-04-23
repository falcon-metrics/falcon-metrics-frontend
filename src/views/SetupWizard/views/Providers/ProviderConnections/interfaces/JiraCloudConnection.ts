import ProviderConnection from './ProviderConnection';
import Providers from '../../../../interfaces/Providers';

class JiraCloudConnection implements ProviderConnection {
  providerSlug = Providers.JIRA_CLOUD;
  tokenHelpPage =
    'https://confluence.atlassian.com/enterprise/using-personal-access-tokens-1026032365.html';
  displayName = 'Jira Cloud';

  getUrlToAPITokenPage = () =>
    'https://id.atlassian.com/manage-profile/security/api-tokens';

  getNormalizedURL = (url: string) => {
    let normalizedURL = url.includes('https')
      ? url
      : `https://${url || 'your-tenant'}.atlassian.net`;
    if (normalizedURL.includes('.net/')) {
      const [headUrl] = normalizedURL.split('.net');
      normalizedURL = `${headUrl}.net`;
    }
    return normalizedURL;
  };

  getNameSpace = (url: string) => {
    const normalizedURL = this.getNormalizedURL(url);
    const namespace = normalizedURL
      .replace('.atlassian.net', '')
      .replace('https://', '');
    return encodeURI(namespace);
  };

  getWorkItemUrl = (workItemId: string, namespace: string) =>
    `https://${namespace}.atlassian.net/browse/${workItemId}`;
}

export default JiraCloudConnection;
