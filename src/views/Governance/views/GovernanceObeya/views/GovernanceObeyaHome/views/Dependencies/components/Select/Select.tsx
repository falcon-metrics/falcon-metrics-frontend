import { useController } from 'react-hook-form';

import { Select as SelectMui } from '@material-ui/core';
import FormHelperText from '@material-ui/core/FormHelperText';
import MenuItem from '@material-ui/core/MenuItem';

import { useStyles } from '../../styles';

const requiredMessage = 'This field is required';

export const Select = ({
  className,
  defaultValue,
  afterChange,
  name,
  control,
  errors,
  clearErrors,
}: any) => {
  const { field: inputProps } = useController({ name, control });
  const classes = useStyles();
  return (
    <>
      <SelectMui
        className={`${classes.status} ${className}`}
        required
        displayEmpty
        name="status"
        defaultValue={defaultValue}
        error={!!errors?.status}
        onChange={(e) => {
          inputProps.onChange(e);
          afterChange?.(e);
          clearErrors?.(name);
        }}
      >
        <MenuItem value="open" selected className={classes.statusOption}>Open</MenuItem>
        <MenuItem value="resolved" className={classes.statusOption}>Resolved</MenuItem>
        <MenuItem value="blocked" className={classes.statusOption}>Blocked</MenuItem>
      </SelectMui>
      {!!errors?.status && <FormHelperText>{requiredMessage}</FormHelperText>}
    </>
  );
};

