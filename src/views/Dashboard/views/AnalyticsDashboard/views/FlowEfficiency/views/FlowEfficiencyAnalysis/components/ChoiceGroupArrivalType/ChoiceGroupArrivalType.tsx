import { FormEvent } from 'react';
import {
  ChoiceGroup,
  IChoiceGroupOption,
} from 'office-ui-fabric-react/lib/ChoiceGroup';

export type ChoiceGroupProps = {
  onFilterChange(checked: boolean): void;
  defaultChecked: boolean;
};

enum Keys {
  include = 'include',
  exclude = 'exclude',
}

const arrivalPointOptions: IChoiceGroupOption[] = [
  { key: Keys.include, text: 'Include Arrival point up to commitment point' },
  { key: Keys.exclude, text: 'Exclude Arrival point up to commitment point' },
];

const getIsChecked = (key?: string) => key === Keys.include;
const getCheckedKey = (checked: boolean) =>
  checked ? Keys.include : Keys.exclude;

const ChoiceGroupArrivalType = ({
  onFilterChange,
  defaultChecked,
}: ChoiceGroupProps) => {
  const onChange = (
    _?: FormEvent<HTMLElement | HTMLInputElement>,
    option?: IChoiceGroupOption,
  ) => {
    onFilterChange(getIsChecked(option?.key));
  };
  return (
    <ChoiceGroup
      defaultSelectedKey={getCheckedKey(defaultChecked)}
      options={arrivalPointOptions}
      onChange={onChange}
      label="Arrival Point"
    />
  );
};

export default ChoiceGroupArrivalType;
