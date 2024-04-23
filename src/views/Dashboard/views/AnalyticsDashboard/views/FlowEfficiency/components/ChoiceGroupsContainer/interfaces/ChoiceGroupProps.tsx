export type ChoiceGroupProps<T> = {
  onFilterChange(selecetdKey: T): void;
  defaultSelectedKey: T;
};
