import { useBurndown } from 'views/Governance/views/GovernanceObeya/hooks/useBurndown';
import RiskBurndownChart from './RiskBurndown';

const RiskBurndownContainer = () => {
  const {
    data, //isDemo
  } = useBurndown('/risk-burndown');

  return (
    <RiskBurndownChart
      data={data || []}
      // isDemo={isDemo}
      // activeFilters={false}
      // missingConfigurations={[]}
    />
  );
};

export default RiskBurndownContainer;
