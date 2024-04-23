import DefaultDashboardCard from 'views/Dashboard/components/Charts/components/DefaultDashboardCard';
import { ChartConfigFlags } from 'components/Charts/components/DefaultDashboardCard/interfaces/ChartConfig';
import { ChartSizes } from 'components/Charts/components/DashboardCard/interfaces/ChartSizes';
import ChoiceGroupArrivalType from './components/ChoiceGroupArrivalType';
import ChoiceGroupsContainer from '../../components/ChoiceGroupsContainer';
import FlowEfficiencyAnalysis, { Data } from './FlowEfficiencyAnalysis';

export type PageProps = {
  onToggleChange(checked?: boolean): void;
  defaultChecked: boolean;
} & Partial<Data> &
  ChartConfigFlags;

const FlowEfficiencyAnalysisCard = ({
  data,
  defaultChecked,
  onToggleChange,
  ...chartConfigFlags
}: PageProps) => {
  return (
    <DefaultDashboardCard
      {...chartConfigFlags}
      title="Flow Efficiency Analysis"
      contentId="flow-flow-efficiency"
      data={data}
      dataIsUnavailable={(data) =>
        !data?.valueAddingTimeDays && !data?.waitingTimeDays
      }
      size={ChartSizes.small}
      Component={FlowEfficiencyAnalysis}
      fixedContent={
        <ChoiceGroupsContainer>
          <ChoiceGroupArrivalType
            defaultChecked={defaultChecked}
            onFilterChange={onToggleChange}
          />
        </ChoiceGroupsContainer>
      }
    />
  );
};
export default FlowEfficiencyAnalysisCard;
