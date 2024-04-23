import { useController } from 'react-hook-form';

import TextField from '@material-ui/core/TextField';

export const Input = ({
  name,
  afterChange,
  control,
  errors,
  ref,
  className,
  InputLabelProps = {},
  fullWidth,
  helpText = '',
  customStyles = { margin: 8 },
  ...props
}: any) => {
  const {
    field: { ...inputProps },
  } = useController({ name, control });
  const customHelpText = errors?.[name] ? errors?.[name].message : helpText;
  return (
    <TextField
      className={className}
      style={customStyles}
      {...props}
      {...inputProps}
      {...InputLabelProps}
      margin="normal"
      onChange={(e) => {
        inputProps.onChange(e);
        afterChange?.(e);
      }}
      onBlur={(e) => {
        inputProps.onChange(e);
      }}
      fullWidth={fullWidth}
      InputLabelProps={{
        shrink: true,
      }}
      inputRef={ref}
      error={errors?.[name]}
      helperText={customHelpText}
    />
  );
};
