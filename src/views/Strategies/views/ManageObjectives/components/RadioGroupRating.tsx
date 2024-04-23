import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import { makeStyles } from '@material-ui/core/styles';
import { useController } from 'react-hook-form';

export const useStyles = makeStyles(() => ({
  label: {
    '& .MuiIconButton-root': {
      padding: '2px 4px !important',
      marginLeft: 4,
    },
    '& > .MuiFormControlLabel-root .MuiFormControlLabel-label': {
      fontSize: 13,
      fontFamily: 'Open Sans !important',
      marginRight: 0,
    },
  },
}));

export default function RadioGroupRating({
  name,
  rules,
  defaultValue,
  control,
  ...props
}: any) {
  const classes = useStyles();
  const {
    field: { ref, ...inputProps },
    fieldState: { error, invalid },
  } = useController({ name, rules, defaultValue, control });
  return (
    <RadioGroup
      row
      {...inputProps}
      inputRef={ref}
      {...props}
      error={invalid}
      defaultValue={defaultValue}
      className={classes.label}
      helperText={invalid && error}
    >
      <FormControlLabel
        value="1"
        control={<Radio color="primary" />}
        label="On Track"
      />
      <FormControlLabel
        value="2"
        style={{
          fontSize: 12,
          fontFamily: 'Open Sans',
        }}
        control={<Radio color="primary" />}
        label="Behind"
      />
      <FormControlLabel
        value="3"
        control={<Radio color="primary" />}
        label="At Risk"
      />
      <FormControlLabel
        value="4"
        control={<Radio color="primary" />}
        label="Not Rated"
      />
    </RadioGroup>
  );
}
