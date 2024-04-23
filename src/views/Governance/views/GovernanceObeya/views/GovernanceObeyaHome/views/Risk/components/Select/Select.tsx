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
        <MenuItem
          value=""
          selected
          style={{ color: '#9E9E9E',}}
          className={`${classes.statusOption} ${classes.noStatus}`}
        >
          No Status
        </MenuItem>
        <MenuItem value="Open" className={classes.statusOption}>Open</MenuItem>
        <MenuItem value="Mitigated" className={classes.statusOption}>Mitigated</MenuItem>
        <MenuItem value="Resolved" className={classes.statusOption}>Resolved</MenuItem>
      </SelectMui>
      {!!errors?.status && <FormHelperText>{requiredMessage}</FormHelperText>}
    </>
  );
};

