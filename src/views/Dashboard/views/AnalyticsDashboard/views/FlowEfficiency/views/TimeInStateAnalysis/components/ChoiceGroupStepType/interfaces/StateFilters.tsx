import { IChoiceGroupOption } from 'office-ui-fabric-react/lib/ChoiceGroup';
import { TimeInStateToggles } from '../../../../../FlowEfficiency.data';
import { OptionKeys } from '../../ChoiceGroupStarted/interfaces/OptionKeys';

export enum StateFilters {
  allSteps = 'allSteps',
  active = 'active',
  queue = 'queue',
}

export const stepTypeOptions: IChoiceGroupOption[] = [
  { key: StateFilters.allSteps, text: 'All' },
  { key: StateFilters.active, text: 'Active' },
  { key: StateFilters.queue, text: 'Queued' },
];

export const mapOptions: Record<OptionKeys, TimeInStateToggles> = {
  proposedFilterToggle: {
    timeInStateProposedFilterToggle: true,
    timeInStateInProgressFilterToggle: false,
  },
  inProgressFilterToggle: {
    timeInStateProposedFilterToggle: false,
    timeInStateInProgressFilterToggle: true,
  },
  allStatesFilterToggle: {
    timeInStateProposedFilterToggle: true,
    timeInStateInProgressFilterToggle: true,
  },
};
