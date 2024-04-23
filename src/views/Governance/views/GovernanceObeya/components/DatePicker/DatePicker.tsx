import omit from 'lodash/omit';
import { useController } from 'react-hook-form';

import DateFnsUtils from '@date-io/date-fns';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import { DEFAULT_DATE_FORMAT } from 'utils/dateTime';

export const DatePicker = ({
  classesName,
  defaultValue,
  afterChange,
  name,
  control,
  fullWidth = false,
  errors,
  clearErrors,
  ...props
}: any) => {
  const { field: inputProps } = useController({ name, control });
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        {...props}
        {...omit(inputProps, 'ref')}
        onChange={(e) => {
          inputProps.onChange(e);
          afterChange?.(e);
          clearErrors?.(name);
        }}
        emptyLabel=""
        fullWidth={fullWidth}
        required
        format={DEFAULT_DATE_FORMAT}
        variant="inline"
        defaultValue={defaultValue}
        views={['year', 'month', 'date']}
        helperText={errors?.[name] && errors?.[name].message}
        error={errors?.[name]}
        className={classesName}
      />
    </MuiPickersUtilsProvider>
  );
};