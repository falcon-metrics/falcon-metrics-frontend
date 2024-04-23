import { IChoiceGroupOption } from 'office-ui-fabric-react/lib/ChoiceGroup';

export enum OptionKeys {
  allStatesFilterToggle = 'allStatesFilterToggle',
  inProgressFilterToggle = 'inProgressFilterToggle',
  proposedFilterToggle = 'proposedFilterToggle',
}

export const startedOptions: IChoiceGroupOption[] = [
  { key: OptionKeys.allStatesFilterToggle, text: 'All' },
  {
    key: OptionKeys.inProgressFilterToggle,
    text: 'Started',
  },
  { key: OptionKeys.proposedFilterToggle, text: 'Not Started' },
];
