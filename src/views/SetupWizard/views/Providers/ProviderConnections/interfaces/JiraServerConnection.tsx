import ProviderConnection from './ProviderConnection';
import Providers from '../../../../interfaces/Providers';
import Box from '@material-ui/core/Box';

class JiraServerConnection implements ProviderConnection {
  providerSlug = Providers.JIRA_SERVER;
  tokenHelpPage =
    'https://confluence.atlassian.com/enterprise/using-personal-access-tokens-1026032365.html';
  displayName = 'Jira Server';
  specificInstructionNode = (
    <Box mt={3}>
      <b>
        In Jira Server, in order for your Jira Filters to appear on the list
        below, it needs to be favourited.
      </b>
    </Box>
  );

  getUrlToAPITokenPage = () =>
    'https://id.atlassian.com/manage-profile/security/api-tokens';

  getNormalizedURL = (url: string) => {
    //TODO: change this function
    //1. add https:// in the beginning if it is not there
    let normalizedURL = url.includes('https')
      ? url
      : `https://${url || 'your-instance-url'}`; //add https:// in the beginning so we can control which element will be the domain during splitting
    //2.split after the first / https://jira.ermpower.com.au/secure/Dashboard.jspa

    if (normalizedURL.split('/')[3])
      normalizedURL = 'https://' + normalizedURL.split('/')[2] + "/" + normalizedURL.split('/')[3];
    else
      normalizedURL = 'https://' + normalizedURL.split('/')[2];

    return normalizedURL;
  };

  getNameSpace = (url: string) => {
    const normalizedURL = this.getNormalizedURL(url);
    const namespace = normalizedURL.split('.')[1];
    return namespace;
  };

  getWorkItemUrl = (workItemId: string, serviceUrl: string) => {
    const domain = serviceUrl.split('/')[2]
    return `https://${domain}/browse/${workItemId}`;
  }
}

export default JiraServerConnection;
