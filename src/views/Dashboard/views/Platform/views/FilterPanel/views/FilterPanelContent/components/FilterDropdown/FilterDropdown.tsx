import {
  BaseDropdown,
  IdropdownItems,
} from 'components/UI/FluentUI/BaseDropdown/BaseDropdown';
import { getSetterKey } from 'contexts/contextApi';
import isArray from 'lodash/isArray';
import isString from 'lodash/isString';
import noop from 'lodash/noop';
import startCase from 'lodash/startCase';
import { isKeyOf } from 'utils/typescript/assertions';
import useFilterPanelContext
  from 'views/Dashboard/views/Platform/views/FilterPanel/contexts/FilterPanelContext';
import {
  FilterPanelQueryParameters,
} from 'views/Dashboard/views/Platform/views/FilterPanel/contexts/FilterPanelContext/interfaces';

const EMPTY_FIELD = 'EMPTY_FIELD';

export type DropDownConfig = {
  multiSelect?: boolean;
  options: IdropdownItems[] | string[];
  onSelect?: (value) => void;
  emptyOptionPreffix?: string;
  shouldShowEmptyOption?: boolean;
  placeholder?: string;
};

type Props = DropDownConfig & {
  camelCaseLabel: string;
  groupKey?: keyof FilterPanelQueryParameters;
};

function FilterDropdown({
  camelCaseLabel,// used to access the value or set function on useFilterPanelContext such as setCustomField, setWorkItemLevel
  onSelect,
  groupKey,
  options,
  multiSelect,
  emptyOptionPreffix = '',
  shouldShowEmptyOption = false,
  placeholder,
}: Props) {
  const { setSelectedFilters, selectedFilters } = useFilterPanelContext();
  const setterKey = isKeyOf(camelCaseLabel, selectedFilters)
    ? getSetterKey<typeof selectedFilters>(camelCaseLabel)
    : groupKey
    ? getSetterKey<typeof selectedFilters>(groupKey)
    : undefined;

  const onSelectionChange =
    onSelect ??
    (setterKey
      ? setSelectedFilters[setterKey]
      : groupKey
      ? setSelectedFilters[groupKey]
      : noop);

  const onSelectSingleItem = (valueInArray: [any]) =>
    onSelectionChange(valueInArray[0]);

  const selectedKeys = isKeyOf(camelCaseLabel, selectedFilters)
    ? selectedFilters[camelCaseLabel]
    : groupKey
    ? selectedFilters[groupKey]
    : undefined;

  const typeSafeSelectedKeys = isArray(selectedKeys)
    ? selectedKeys
    : [String(selectedKeys)];

  const label = startCase(camelCaseLabel);
  const formattedOptions = isStringArray(options)
    ? options.map((option) => ({
        key: option,
        text: option,
      }))
    : options;

  const optionsWithEmpty = shouldShowEmptyOption
    ? [
        ...formattedOptions,
        { key: `${emptyOptionPreffix}${EMPTY_FIELD}`, text: 'Empty' },
      ]
    : formattedOptions;

  return (
    <BaseDropdown
      label={label}
      onSelectionChange={multiSelect ? onSelectionChange : onSelectSingleItem}
      selectedKeys={typeSafeSelectedKeys}
      options={optionsWithEmpty}
      multiSelect={multiSelect}
      // data-cy={'filter-dropdown'}
      placeholder={placeholder}
      // minWidth={300}
    />
  );
}

export default FilterDropdown;

const isStringArray = (arg: unknown): arg is Array<string> => {
  return isArray(arg) && isString(arg[0]);
};
