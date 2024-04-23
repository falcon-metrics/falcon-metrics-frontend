import NormalizationForm from './components/NormalizationForm/NormalizationForm.data';
import { RouteComponentProps } from 'react-router-dom';
import Container from 'components/PageContainer/PageContainer';
import { UserGuideContent, UserGuideKey } from "components/UserGuide/UserGuideContent";

export type Props = RouteComponentProps<any>;

const NormalizationPage = (props: Props) => (
  <Container.Wizard
    title={UserGuideContent[UserGuideKey.CUSTOMVIEWS].title}
    userGuideId={UserGuideKey.CUSTOMVIEWS}
    showFqlGuide={true}
    maxWidth="lg">
    <NormalizationForm {...props} />
  </Container.Wizard>
);

export default NormalizationPage;
