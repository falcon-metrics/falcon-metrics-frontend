import { FormEvent, useCallback } from 'react';
import {
  ChoiceGroup,
  IChoiceGroupOption
} from 'office-ui-fabric-react/lib/ChoiceGroup';

type ChoiceGroupProps = {
  onFilterChange(selected: 'inprogress' | 'completed'): void;
  defaultSelectedKey: 'inprogress' | 'completed';
};

const options: IChoiceGroupOption[] = [
  { key: 'inprogress', text: 'Work In Progress' },
  { key: 'completed', text: 'Completed Work' },
];

export const ChoiceGroupPerspective = ({
  onFilterChange, defaultSelectedKey,
}: ChoiceGroupProps) => {

  const onChange = useCallback((
    _?: FormEvent<HTMLElement | HTMLInputElement>,
    option?: IChoiceGroupOption
  ) => {
    if (!option) {
      console.warn('Unknown option');
      return;
    }
    const matchingOption = options.find(allowedOption => allowedOption.key === option.key);
    if (!matchingOption) {
      console.warn('Option not allowed');
      return;
    }
    onFilterChange(option.key as any);
  }, [onFilterChange]);

  return (
    <ChoiceGroup
      label="Perspective"
      defaultSelectedKey={defaultSelectedKey}
      options={options}
      onChange={onChange}
    />
  );
};
