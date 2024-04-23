import JiraCloudConnection from './JiraCloudConnection';
import JiraServerConnection from './JiraServerConnection';
import AzureConnection from './AzureConnection';
import Providers from 'views/SetupWizard/interfaces/Providers';
import ProviderConnection from './ProviderConnection';
import KanbanizeConnection from './KanbanizeConnection';

export const providers: Record<Providers, ProviderConnection> = {
  [Providers.JIRA_CLOUD]: new JiraCloudConnection(),
  [Providers.JIRA_SERVER]: new JiraServerConnection(),
  [Providers.AZURE]: new AzureConnection(),
  [Providers.KANBANIZE]: new KanbanizeConnection(),
};

export const getProviderConnection = (providerKey: string) => {
  if (!isValidProviderKey(providerKey)) {
    return;
  }
  return providers[providerKey];
};

const isValidProviderKey = (key: string): key is Providers => key in providers;
