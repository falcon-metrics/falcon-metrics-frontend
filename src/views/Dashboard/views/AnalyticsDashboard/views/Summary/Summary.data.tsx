import PeriodSelectorProvider from 'components/PeriodSelectorProvider/PeriodSelectorProvider';
import { PageProps } from '../../interfaces/PageProps';
import SummaryPage from './Summary';

const SummaryPageWithData = (props: PageProps) => (
  <PeriodSelectorProvider>
    <SummaryPage {...props} />
  </PeriodSelectorProvider>
);

export default SummaryPageWithData;
