import {
  ChoiceGroup,
  IChoiceGroupOption,
} from '@fluentui/react/lib/ChoiceGroup';

const options: IChoiceGroupOption[] = [
  { key: 'wip', text: 'Show on WIP' },
  { key: 'inventory', text: 'Show on Inventory' },
];

type Props = {
  onCheckedCallback(value: string): any;
  currentSelection?: string;
  label: string;
};

const FilterByDelayedItems = ({
  onCheckedCallback,
  currentSelection,
  label,
}: Props) => {
  return (
    <div>
      <ChoiceGroup
        label={label}
        selectedKey={currentSelection}
        options={options}
        onChange={async (
          ev?: React.FormEvent<HTMLElement | HTMLInputElement>,
          option?: IChoiceGroupOption,
        ) => {
          if (option) {
            onCheckedCallback(option?.key);
          }
        }}
      />
    </div>
  );
};

export default FilterByDelayedItems;
