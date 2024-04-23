import { FormEvent } from 'react';
import {
  ChoiceGroup,
  IChoiceGroupOption,
} from 'office-ui-fabric-react/lib/ChoiceGroup';
import { ChoiceGroupProps } from '../../../../components/ChoiceGroupsContainer/interfaces/ChoiceGroupProps';
import { OptionKeys, startedOptions } from './interfaces/OptionKeys';

export const ChoiceGroupStarted = ({
  onFilterChange,
  defaultSelectedKey,
}: ChoiceGroupProps<OptionKeys>) => {
  const onChange = (
    _?: FormEvent<HTMLElement | HTMLInputElement>,
    option?: IChoiceGroupOption,
  ) => {
    onFilterChange(
      (option?.key ?? OptionKeys.inProgressFilterToggle) as OptionKeys,
    );
  };
  return (
    <ChoiceGroup
      defaultSelectedKey={defaultSelectedKey}
      options={startedOptions}
      onChange={onChange}
      label="Workflow Steps"
    />
  );
};
