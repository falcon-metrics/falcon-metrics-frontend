import { useController } from 'react-hook-form';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

export type SelectOptions = {
  key: string;
  value: string;
};

function Dropdown({
  itemsList,
  name,
  rules,
  defaultValue,
  control,
  ...props
}: any) {
  const {
    field: { ref, ...inputProps },
    fieldState: { error, invalid },
  } = useController({ name, rules, defaultValue, control });

  const items: Array<SelectOptions> = itemsList;

  return (
    <Select
      {...inputProps}
      inputRef={ref}
      error={invalid}
      helperText={invalid && error}
      {...props}
    >
      {items.map(({ value, key }) => {
        return (
          <MenuItem key={key} value={key}>
            {value}
          </MenuItem>
        );
      })}
    </Select>
  );
}

export default Dropdown;
