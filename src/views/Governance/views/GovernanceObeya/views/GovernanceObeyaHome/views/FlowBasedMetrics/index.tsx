import PeriodSelectorProvider from 'components/PeriodSelectorProvider';
import FlowBasedMetrics from './FlowBasedMetrics';

interface Props {
  obeyaRoomId?: string;
}

const FlowBasedMetricsContainer = ({ obeyaRoomId }: Props) => {
  return (
    <PeriodSelectorProvider selectorIsVisible={false}>
      <FlowBasedMetrics obeyaRoomId={obeyaRoomId} demoDataIsSelected={false} />
    </PeriodSelectorProvider>
  );
};

export default FlowBasedMetricsContainer;
