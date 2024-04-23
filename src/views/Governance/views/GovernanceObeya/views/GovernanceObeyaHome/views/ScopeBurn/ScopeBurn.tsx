
import DashboardCard from 'components/Charts/components/DashboardCard/DashboardCard';

import Burnup from '../Burnup';
import Burndown from '../Burndown';
import { Box } from '@material-ui/core';

interface ScopeBurnProps {
  burnData: any;
  isLoadingObeyaData: boolean;
}

const ScopeBurn = ({ isLoadingObeyaData, burnData }: ScopeBurnProps) => {

  return (
    <Box className="full-width-chart">
      <Box className="obeya-container charts-page-grid" style={{ padding: '13px 4px', gridTemplateColumns: 'repeat(2, 1fr)' }}>
        <DashboardCard
          title="Burn Down"
          fullScreen={true}
        >
          <Burndown
            data={burnData?.burndown || []}
            loading={isLoadingObeyaData}
            activeFilters={false}
            customLabelX="Date"
            customLabelY="Work Items Count"
          />
        </DashboardCard>
        <DashboardCard
          title="Burn Up"
          fullScreen={true}
        >
          <Burnup
            data={burnData?.burnup || []}
            loading={isLoadingObeyaData}
            activeFilters={false}
            customLabelX="Date"
            customLabelY="Work Items Count"
          />
        </DashboardCard>
      </Box>
    </Box>
  );
};

export default ScopeBurn;
