import Container from 'components/PageContainer/PageContainer';
import SettingsForm from './components/SettingsForm';
import { UserGuideContent, UserGuideKey } from "components/UserGuide/UserGuideContent";

const SettingsPage = () => {
  return (
    <Container.Wizard
      title={UserGuideContent[UserGuideKey.SETTINGS].title}
      userGuideId={UserGuideKey.SETTINGS}
      showFqlGuide={true}>
      <SettingsForm />
    </Container.Wizard>
  );
};

export default SettingsPage;
