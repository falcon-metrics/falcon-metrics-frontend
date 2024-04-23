import ProviderConnection from './ProviderConnection';
import Providers from '../../../../interfaces/Providers';

class KanbanizeConnection implements ProviderConnection {
  providerSlug = Providers.KANBANIZE;
  tokenHelpPage =
    '';
  displayName = 'Kanbanize';

  getUrlToAPITokenPage = () =>
    '';

  getNormalizedURL = (url: string) => {
    let normalizedURL = url.includes('https')
      ? url
      : `https://${url || 'your-tenant'}.kanbanize.com`;
    if (normalizedURL.includes('.com/')) {
      const [headUrl] = normalizedURL.split('.com');
      normalizedURL = `${headUrl}.com`;
    }
    return normalizedURL;
  };

  getNameSpace = (url: string) => {
    const normalizedURL = this.getNormalizedURL(url);
    console.log("normalizedURL ~", normalizedURL)
    const namespace = normalizedURL
      .replace('.kanbanize.com', '')
      .replace('https://', '');
    return encodeURI(namespace);
  };

  getWorkItemUrl = (workItemId: string, namespace: string) =>
    `https://${namespace}.kanbanize.com/browse/${workItemId}`;
}

export default KanbanizeConnection;
