import TextField from '@material-ui/core/TextField';
import { useController } from 'react-hook-form';

export default function Input({
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
  return (
    <TextField
      {...props}
      {...inputProps}
      inputRef={ref}
      error={invalid}
      helperText={invalid && error}
      onChange={(event) => {
        inputProps.onChange(event);
      }}
    />
  );
}
