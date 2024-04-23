import { useEffect, useContext } from 'react';
import { useForm, UseFormReset } from 'react-hook-form';
import { Controller } from 'react-hook-form';

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import FormHelperText from '@material-ui/core/FormHelperText';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { styled } from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';
import FormControl from '@material-ui/core/FormControl';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';

import { useStyles } from './EventForm.styles';
import { FormFields } from '../../interfaces';
import useProfile from 'hooks/useProfile';
import { SelectedContextIdContext } from 'components/UserStateProvider/UserStateProvider';
import { EventInfo } from '../../hooks/useEvents';
import { DEFAULT_DATE_FORMAT } from 'utils/dateTime';

const CustomTextField = styled(TextField)({
  '&': {
    color: '#1890ff', 
    fontFamily: 'Open Sans'
  },
  '& .MuiFormLabel-root': {
    fontFamily: 'Open Sans',
  },
});

const SaveButton = styled(Button)({
  'MuiButton-containedSizeLarge': {
    padding: '8px 56px'
  }
});

const validatorSchema = yup.object().shape({
  efectiveDate: yup.string().required('Effective date is required'),
  eventName: yup.string().max(60, 'Max characters are 60'),
  description: yup.string().max(225, 'Max characters are 225')
});

const resolver = yupResolver(validatorSchema);

type Props = {
  onSubmit: (values: FormFields, afterSuccess: UseFormReset<FormFields>) => void;
  eventInfo?: EventInfo;
};

const EventForm = ({ onSubmit, eventInfo }: Props) => {
  const classes = useStyles();

  /*
  * Get user info from useProfile hook
  */
  const { data: user } = useProfile();

  const { contextId } = useContext(SelectedContextIdContext);

  /*
  * Setup form with react-hook-form
  */
  const formMethods = useForm<FormFields>({
    resolver,
    defaultValues: {
      efectiveDate: eventInfo?.efective_date || new Date(),
      eventName: eventInfo?.event_name || '',
      description: eventInfo?.description || '',
      id: eventInfo?.id || '',
      userId: eventInfo?.user_id || user?.user_id || '',
      username: eventInfo?.username || user?.name || '',
      contextId,
    },
  });
  const {
    handleSubmit, control, getValues, setValue, reset, 
    formState: {
      errors, isSubmitting, isSubmitted, isDirty
    },
  } = formMethods;
  /*
  * Sync the contextId and user info to default values form
  */
  useEffect(() => {
    setValue('userId', user?.user_id);
    setValue('username', eventInfo?.username || user?.name || '');
  }, [user, contextId])

  useEffect(() => {
    if (eventInfo) {
      setValue('contextId', eventInfo?.context_id);
      setValue('description', eventInfo?.description?.trim() || '');
      setValue('eventName', eventInfo?.event_name || '');
      setValue('id', eventInfo?.id);
      setValue('userId', eventInfo?.user_id);
      setValue('efectiveDate', eventInfo?.efective_date);
      setValue('username', eventInfo?.username || user?.name);
    }
  }, [eventInfo])

  /*
  * The form will be reseted after submit values
  */
  const onSubmitValues = () => {
    if (!Object.keys(errors).length) {
      onSubmit(
        getValues(),
        reset,
      );
    }
  };

  return (
    <Box className={classes.wrapperForm}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <form
          className={classes.form}
          onSubmit={handleSubmit(onSubmitValues)}
        >
          <Controller
            render={({ field }) => {
              return (
                <>
                  <FormControl className={classes.inputSizeEfectiveDate}>
                    <KeyboardDatePicker
                      className={classes.textField}
                      {...field}
                      disableToolbar
                      variant="inline"
                      format={DEFAULT_DATE_FORMAT}
                      margin="normal"
                      label="Efective Date"
                      size="medium"
                      value={field.value}
                      onChange={(value) => setValue('efectiveDate', value || new Date())}
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                      inputProps={{ style: { fontFamily: 'Open Sans' } }}
                    />
                  </FormControl>
                  <FormHelperText className={classes.helpText}>
                    {errors && errors?.efectiveDate?.message}
                  </FormHelperText>
                </>
              );
            }}
            name="efectiveDate"
            control={control}
          />
          <Controller
            render={({ field }) => {
              return (
                <>
                  <FormControl className={classes.inputSize}>
                  <CustomTextField
                    {...field}
                    className={classes.textField}
                    size="medium"
                    onChange={field.onChange}
                    value={field.value}
                    InputLabelProps={{ shrink: true }}
                    error={!!errors?.eventName}
                    label="Event Name"
                    inputProps={{ style: { fontFamily: 'Open Sans' }}}
                  />
                  </FormControl>
                    <FormHelperText className={classes.helpText}>
                    {errors && errors?.eventName?.message}
                  </FormHelperText>
                </>
              );
            }}
            name="eventName"
            control={control}
          />
          <Controller
            render={({ field }) => {
              return (
                <>
                  <FormControl className={classes.inputSize}>
                    <CustomTextField
                      {...field}
                      className={classes.textField}
                      onChange={field.onChange}
                      value={field.value}
                      size="medium"
                      InputLabelProps={{ shrink: true }}
                      error={!!errors?.description}
                      label="Event Description"
                      multiline
                      rows={5}
                      inputProps={{ maxLength: 255, style: { fontFamily: 'Open Sans' } }}
                    />
                  </FormControl>
                  <FormHelperText className={classes.helpText}>
                    {errors && errors?.description?.message}
                  </FormHelperText>
                </>
              );
            }}
            name="description"
            control={control}
          />
          {' '}
          <br/>
          <Controller
            render={() => <span>{' '}</span>}
            name="id"
            control={control}
          />
          <Controller
            render={() => <span>{' '}</span>}
            name="user_id"
            control={control}
          />
          <Controller
            render={() => <span>{' '}</span>}
            name="userId"
            control={control}
            defaultValue={user?.user_id}
          />
          <Controller
            render={() => <span>{' '}</span>}
            name="username"
            control={control}
            defaultValue={user?.name}
          />
          <Controller
            render={() => <span>{' '}</span>}
            name="contextId"
            control={control}
          />
          <Box className={classes.publishButton}>
            <SaveButton
              size="large"
              type="submit"
              variant="contained"
              color="primary"
              className={classes.saveButton}
              disabled={isSubmitting || !!(isSubmitted && Object.keys(errors)?.length) || !isDirty}
              startIcon={isSubmitting ? <HourglassEmptyIcon /> : ''}
            >
              {isSubmitting? 'Publishing...' : 'Publish'} 
            </SaveButton>
          </Box>
        </form>
      </MuiPickersUtilsProvider>
    </Box>
  );
}

export default EventForm;
