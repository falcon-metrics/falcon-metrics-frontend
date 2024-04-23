import { useController, Path, useFormContext } from 'react-hook-form';
import TextField, { TextFieldProps } from '@material-ui/core/TextField';

type InputProps<T> = {
  name: Path<T>;
  defaultValue: any;
} & Omit<TextFieldProps, 'name'>;

export function Input<T>({ name, defaultValue, ...props }: InputProps<T>) {
  const { control } = useFormContext<T>();
  const {
    field: { ref, ...inputProps },
    fieldState: { error, invalid },
  } = useController({ name, defaultValue, control });

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
