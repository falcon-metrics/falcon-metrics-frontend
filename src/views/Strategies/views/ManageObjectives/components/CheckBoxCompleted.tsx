import { useController } from 'react-hook-form';

import Checkbox, { CheckboxProps } from '@material-ui/core/Checkbox';
import { green } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/styles';

const GreenCheckbox = withStyles({
  root: {
    '&$checked': {
      color: green[600],
    },
  },
  checked: {},
})((props: CheckboxProps) => <Checkbox color="default" {...props} />);

export default function CheckBoxCompleted({
  name,
  rules,
  defaultValue,
  control,
  color,
  afterChange,
  disabled,
  ...props
}: any) {
  const {
    field: { ref, ...inputProps },
    fieldState: { error, invalid },
  } = useController({ name, rules, defaultValue, control });
  const CheckComponent = color ? Checkbox : GreenCheckbox;
  return (
    <CheckComponent
      color={color}
      inputRef={ref}
      error={invalid}
      helperText={invalid && error}
      {...props}
      {...inputProps}
      checked={
        props.value !== undefined
          ? props.value && inputProps.value
          : inputProps.value
      }
      onChange={(event) => {
        afterChange?.(event?.target?.checked);
        inputProps.onChange(event?.target?.checked);
      }}
      disabled={disabled}
    />
  );
}
