import Grid from '@material-ui/core/Grid';

import Jira from './images/jira.svg';
import Azure from './images/azure-boards.svg';
import Kanbanize from './images/kanbanize.svg';

import ProviderButton, {
  Props as ProviderButtonProps,
} from './components/ProviderButton';
import Providers from '../../../interfaces/Providers';
import Container from 'components/PageContainer/PageContainer';
import { UserGuideContent, UserGuideKey } from 'components/UserGuide/UserGuideContent';

const providers: ProviderButtonProps[] = [
  { imageSrc: Jira, displayName: 'Jira Cloud', provider: Providers.JIRA_CLOUD },
  { imageSrc: Azure, displayName: 'Azure Boards', provider: Providers.AZURE },
  {
    imageSrc: Jira,
    displayName: 'Jira Server',
    provider: Providers.JIRA_SERVER,
  },
  {
    imageSrc: Kanbanize,
    displayName: 'Kanbanize',
    provider: Providers.KANBANIZE,
  },
];

const ProvidersPage = () => {
  return (
    <Container
      title={UserGuideContent[UserGuideKey.CREATE_DATASOURCE].title}
      userGuideId={UserGuideKey.CREATE_DATASOURCE}>
      <Grid container spacing={4}>
        {providers.map((p) => (
          <ProviderButton key={p.provider} {...p} />
        ))}
      </Grid>
    </Container>
  );
};

export default ProvidersPage;
