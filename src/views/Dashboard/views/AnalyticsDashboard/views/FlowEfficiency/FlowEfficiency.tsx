import { FlowEfficiencyClient } from 'core/api/ApiClient/FlowEfficiencyClient';
import { usePageFetcher } from '../../hooks/usePageFetcher';
import useFetchFilteredData from '../../hooks/useFilteredData';
import { PageProps } from '../../interfaces/PageProps';
import { FlowEfficiencyPageQueryParameters } from './FlowEfficiency.data';
import { OptionKeys } from './views/TimeInStateAnalysis/components/ChoiceGroupStarted/interfaces/OptionKeys';
import { StateFilters } from './views/TimeInStateAnalysis/components/ChoiceGroupStepType/interfaces/StateFilters';
import FlowEfficiencyAnalysis from './views/FlowEfficiencyAnalysis';
import InOutFlowChart from './views/InOutFlowChart';
import { ChartSizes } from 'components/Charts/components/DashboardCard/interfaces/ChartSizes';
import TimeInStateAnalysis from './views/TimeInStateAnalysis';
import { getOptionFromToggles } from './views/TimeInStateAnalysis/components/ChoiceGroupStepType/utils/utils';
import { AnalyticsDashboardPageIndexes } from '../..';
import DefaultDashboardCard from 'views/Dashboard/components/Charts/components/DefaultDashboardCard';
import DashboardPage from 'views/Dashboard/components/DashboardPage';

export type Props = {
  uniqueFilters: FlowEfficiencyPageQueryParameters;
  onFlowEfficiencyToggleChange(checked?: boolean): void;
  onTimeInStateStartedChange(controlId: OptionKeys): void;
  onTimeInStateStepTypeChange(filterType: StateFilters): void;
} & PageProps;

const FlowEfficiencyPage = ({
  filters,
  uniqueFilters,
  demoDataIsSelected,
  onFlowEfficiencyToggleChange,
  onTimeInStateStartedChange,
  onTimeInStateStepTypeChange,
}: Props) => {
  const fetcher = usePageFetcher(new FlowEfficiencyClient());

  const { data: fetchedData, isValidating } = useFetchFilteredData(
    AnalyticsDashboardPageIndexes.flowOfWork,
    demoDataIsSelected,
    fetcher,
    {
      ...filters,
      ...uniqueFilters,
    },
  );

  const timeInStateData =
    !uniqueFilters?.timeInStateInProgressFilterToggle &&
    !uniqueFilters?.timeInStateProposedFilterToggle
      ? [{ state: '-', totalDays: 0 }]
      : fetchedData?.timeInStateData;

  const flowEfficiencyData = {
    ...fetchedData,
    timeInStateData,
  };

  return (
    <DashboardPage
      demoDataIsSelected={demoDataIsSelected}
      isLoading={isValidating}
    >
      <FlowEfficiencyAnalysis
        data={flowEfficiencyData.efficiencyAnalysisData}
        defaultChecked={uniqueFilters.flowEfficiencyStartingPoint}
        onToggleChange={onFlowEfficiencyToggleChange}
      />
      <TimeInStateAnalysis
        data={flowEfficiencyData.timeInStateData}
        defaultStateTypeSelected={uniqueFilters?.stateTypeFilter}
        defaultToggleOption={getOptionFromToggles(uniqueFilters)}
        onStepTypeOptionChange={onTimeInStateStepTypeChange}
        onStartedOptionChange={onTimeInStateStartedChange}
      />
      <DefaultDashboardCard
        title="Capacity Vs Demand"
        contentId="flow-capacity-vs-demand"
        Component={InOutFlowChart}
        data={flowEfficiencyData.inOutFlowData}
        dataIsUnavailable={(data) =>
          !data?.weeklyCumulativeFlow?.inflowItems?.length &&
          !data?.weeklyCumulativeFlow?.outflowItems?.length &&
          !data?.weeklyFlow?.inflowItems?.length &&
          !data?.weeklyFlow?.outflowItems?.length
        }
        size={ChartSizes.large}
      />
    </DashboardPage>
  );
};

export default FlowEfficiencyPage;
