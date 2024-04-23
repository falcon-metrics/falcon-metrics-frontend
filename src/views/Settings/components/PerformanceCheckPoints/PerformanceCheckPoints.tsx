import Box from '@material-ui/core/Box';
import TabView from 'views/ValueStreamManagement/components/TabView';
import CheckPoints from './views/Checkpoints';
import Metrics from './views/Metrics/Metrics';

export const PerformanceCheckPoints = () => {
  return (
    <Box>
      <TabView
        tabTitles={['Metrics', 'Checkpoints']}
        tabContents={[Metrics, CheckPoints]}
        customProps={{
          setFormStateOnParent: '',
        }}
      />
    </Box>
  );
};
