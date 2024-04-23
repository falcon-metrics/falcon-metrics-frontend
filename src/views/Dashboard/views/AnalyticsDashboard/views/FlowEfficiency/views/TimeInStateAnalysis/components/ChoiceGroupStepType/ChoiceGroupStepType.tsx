import { FormEvent } from 'react';
import {
  ChoiceGroup,
  IChoiceGroupOption,
} from 'office-ui-fabric-react/lib/ChoiceGroup';
import { ChoiceGroupProps } from '../../../../components/ChoiceGroupsContainer/interfaces/ChoiceGroupProps';
import { StateFilters, stepTypeOptions } from './interfaces/StateFilters';

export const ChoiceGroupStepType = ({
  onFilterChange,
  defaultSelectedKey = StateFilters.queue,
}: ChoiceGroupProps<StateFilters>) => {
  const onChange = (
    _?: FormEvent<HTMLElement | HTMLInputElement>,
    option?: IChoiceGroupOption,
  ) => {
    onFilterChange((option?.key ?? StateFilters.queue) as StateFilters);
  };
  return (
    <ChoiceGroup
      defaultSelectedKey={defaultSelectedKey}
      options={stepTypeOptions}
      onChange={onChange}
      label="Step Type"
    />
  );
};
