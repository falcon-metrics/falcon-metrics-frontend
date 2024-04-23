import { useController } from 'react-hook-form';
import Checkbox, { CheckboxProps } from '@material-ui/core/Checkbox';
import { createStyles, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { green } from '@material-ui/core/colors';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const GreenCheckbox = withStyles({
  root: {
    '&$checked': {
      color: green[600],
    },
  },
  checked: {},
})((props: CheckboxProps) => <Checkbox color="default" {...props} />);

const styles: any = createStyles({
  formControlLabel: {
    fontSize: '12px',
    '& label': { fontSize: '12px' },
    marginRight: '0px',
  },
});

function FormCheckBox({
  name,
  rules,
  defaultValue,
  control,
  label,
  ...props
}: any) {
  const {
    field: { ref, ...inputProps },
    fieldState: { error, invalid },
  } = useController({ name, rules, defaultValue, control });
  return (
    <FormControlLabel
      style={styles.formControlLabel}
      control={
        <GreenCheckbox
          inputRef={ref}
          error={invalid}
          helperText={invalid && error}
          {...props}
          {...inputProps}
          checked={inputProps.value}
        />
      }
      //label={label}
      label={<Typography style={styles.formControlLabel}>{label}</Typography>}
    />
  );
}

export default FormCheckBox;
