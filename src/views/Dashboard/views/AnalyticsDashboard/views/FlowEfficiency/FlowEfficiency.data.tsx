import { getBasicReducer, reduceToSetters } from 'contexts/contextApi';
import { useMemo, useReducer } from 'react';
import { RequiredKeys } from 'utils/typescript/types';
import { PageProps } from '../../interfaces/PageProps';
import FlowEfficiencyPage from './FlowEfficiency';
import { OptionKeys } from './views/TimeInStateAnalysis/components/ChoiceGroupStarted/interfaces/OptionKeys';
import { StateFilters } from './views/TimeInStateAnalysis/components/ChoiceGroupStepType/interfaces/StateFilters';
import { getTimeInStateStartedToggles } from './views/TimeInStateAnalysis/components/ChoiceGroupStepType/utils/utils';

export type TimeInStateToggles = {
  timeInStateProposedFilterToggle: boolean;
  timeInStateInProgressFilterToggle: boolean;
};

export type FlowEfficiencyPageQueryParameters = {
  flowEfficiencyStartingPoint: boolean;
  timeInStateCompletedFilterToggle?: boolean;
  stateTypeFilter: StateFilters;
} & TimeInStateToggles;

const initialState: RequiredKeys<FlowEfficiencyPageQueryParameters> = {
  flowEfficiencyStartingPoint: true,
  timeInStateInProgressFilterToggle: true,
  timeInStateProposedFilterToggle: false,
  timeInStateCompletedFilterToggle: undefined,
  stateTypeFilter: StateFilters.queue,
};

const reducer = getBasicReducer(initialState);

function FlowEfficiencyPageWithData(props: PageProps) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const onTimeInStateStartedChange = (controlId: OptionKeys) =>
    dispatch({ payload: getTimeInStateStartedToggles(controlId) });

  const { setFlowEfficiencyStartingPoint, setStateTypeFilter } = useMemo(
    () =>
      reduceToSetters(initialState, (value) => dispatch({ payload: value })),
    [dispatch],
  );

  return (
    <FlowEfficiencyPage
      {...props}
      uniqueFilters={state}
      onFlowEfficiencyToggleChange={setFlowEfficiencyStartingPoint}
      onTimeInStateStepTypeChange={setStateTypeFilter}
      onTimeInStateStartedChange={onTimeInStateStartedChange}
    />
  );
}

export default FlowEfficiencyPageWithData;
