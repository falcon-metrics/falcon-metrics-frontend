import Box from '@material-ui/core/Box';
import { styled } from '@material-ui/styles';
import { OptionKeys } from './components/ChoiceGroupStarted/interfaces/OptionKeys';
import { StateFilters } from './components/ChoiceGroupStepType/interfaces/StateFilters';
import { ChoiceGroupStepType } from './components/ChoiceGroupStepType/ChoiceGroupStepType';
import { ChoiceGroupStarted } from './components/ChoiceGroupStarted/ChoiceGroupStarted';
import { Data, TimeInStateAnalysis } from './TimeInStateAnalysis';
import { ChartSizes } from 'components/Charts/components/DashboardCard/interfaces/ChartSizes';
import ChoiceGroupsContainer from '../../components/ChoiceGroupsContainer';
import DefaultDashboardCard from 'views/Dashboard/components/Charts/components/DefaultDashboardCard';
import { ChartConfigFlags } from 'components/Charts/components/DefaultDashboardCard/interfaces/ChartConfig';

const VerticalLine = styled(Box)({
  background: 'rgba(0,0,0,.1)',
  width: '1px',
  margin: '3vh calc(min(80px, 5vw)) 2vh',
});

type Props = {
  defaultStateTypeSelected: StateFilters;
  defaultToggleOption: OptionKeys;
  onStartedOptionChange(controlId: OptionKeys): void;
  onStepTypeOptionChange(filterType: StateFilters): void;
} & Partial<Data> &
  ChartConfigFlags;

const TimeInStateAnalysisCard = ({
  data,
  onStartedOptionChange,
  onStepTypeOptionChange,
  defaultStateTypeSelected,
  defaultToggleOption,
  ...chartConfigFlags
}: Props) => {
  return (
    <DefaultDashboardCard
      {...chartConfigFlags}
      title="Time in Stage Analytics"
      contentId="flow-time-in-stage"
      Component={TimeInStateAnalysis}
      data={data}
      size={ChartSizes.small}
      fixedContent={
        <ChoiceGroupsContainer>
          <ChoiceGroupStarted
            onFilterChange={onStartedOptionChange}
            defaultSelectedKey={defaultToggleOption}
          />
          <VerticalLine />
          <ChoiceGroupStepType
            onFilterChange={onStepTypeOptionChange}
            defaultSelectedKey={defaultStateTypeSelected}
          />
        </ChoiceGroupsContainer>
      }
    />
  );
};
export default TimeInStateAnalysisCard;
