import { useCallback, FormEvent } from 'react';
import {
  ChoiceGroup,
  IChoiceGroupOption,
} from 'office-ui-fabric-react/lib/ChoiceGroup';

type ChoiceGroupProps = {
  onFilterChange(selected: 'include' | 'exclude'): void;
  defaultSelectedKey: 'include' | 'exclude';
};

const options: IChoiceGroupOption[] = [
  { key: 'include', text: 'Include Arrival point up to commitment point' },
  { key: 'exclude', text: 'Exclude Arrival point up to commitment point' },
];

const ChoiceGroupArrivalType = ({
  onFilterChange,
  defaultSelectedKey,
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
      label="Arrival Point"
      defaultSelectedKey={defaultSelectedKey}
      options={options}
      onChange={onChange}
    />
  );
};

export default ChoiceGroupArrivalType;
