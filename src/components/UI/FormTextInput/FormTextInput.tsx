import TextField from '@material-ui/core/TextField';
import { useController } from 'react-hook-form';

function FormTextInput({ name, rules, defaultValue, control, ...props }: any) {
  const {
    field: { ref, ...inputProps },
    fieldState: { error, invalid },
  } = useController({ name, rules, defaultValue, control });

  return (
    <TextField
      {...inputProps}
      inputRef={ref}
      error={invalid}
      helperText={invalid && error}
      {...props}
    />
  );
}

export default FormTextInput;
