import { IdropdownItems } from 'components/UI/FluentUI/BaseDropdown';
import { DataAggregations } from 'views/Dashboard/views/Platform/views/FilterPanel/contexts/FilterPanelContext/interfaces';

type SupportedDropdownEnums = 
    typeof DataAggregations;

export const buildOptionsForEnum = (optionsEnum: SupportedDropdownEnums): IdropdownItems[] | string[] => {
  // Prepares Dropdown Options for a Given Filter Enum
  const convertKeyToDropdownItem = (key: string): IdropdownItems => {
    return {
      key,
      text: optionsEnum[key],
    } 
  }
  const options = Object.keys(optionsEnum).map(
    convertKeyToDropdownItem
  );

  return options;
}
