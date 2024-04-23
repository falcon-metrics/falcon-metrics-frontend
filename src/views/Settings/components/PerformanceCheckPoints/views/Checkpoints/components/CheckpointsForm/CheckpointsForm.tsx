import { Dispatch, SetStateAction, useState, useEffect } from 'react';
import * as yup from 'yup';
import { DateTime } from 'luxon';
import { yupResolver } from '@hookform/resolvers/yup';
import Box from '@material-ui/core/Box';
import BaseModal from 'components/UI/BaseModal/BaseModal2';
import { Controller } from 'react-hook-form';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';
import { styled } from '@material-ui/core/styles';
import SaveButton  from 'components/NavigationButtons/components/SaveButton';
import { useForm } from 'react-hook-form';
import { CheckpointItemForm } from 'views/Settings/components/PerformanceCheckPoints/interfaces';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

import { useStyles } from './styles';
import { DEFAULT_DATE_FORMAT } from 'utils/dateTime';

const validationSchema = yup.object().shape({
  name: yup.string().required('This field is required.').min(2, 'Name must be at least 2 characters'),
  start_date: yup.date().required('This field is required.'),
  end_date: yup.date().required('This field is required.').min(
    yup.ref('start_date'),
    'End Date can not be before Start Date.'
  )
});

const resolver: any = yupResolver(validationSchema);

const CustomTextField = styled(TextField)({
  '&': {
    color: '#1890ff', 
    width: 230, 
    fontFamily: 'Open Sans'
  },
  '& .MuiFormLabel-root': {
    fontFamily: 'Open Sans',
  },
});

type Props = {
  onSubmit: (values: CheckpointItemForm) => void;
  isOpenModal: boolean;
  setIsOpenModal: Dispatch<SetStateAction<boolean>>;
  checkpoint?: CheckpointItemForm;
  checkpointToEdit?: CheckpointItemForm;
  afterClose: Dispatch<SetStateAction<CheckpointItemForm | undefined>>
};

const CheckPointsForm = (props: Props) => {
  const classes = useStyles();
  const [checkpointInfo, setCheckpointInfo] = useState<CheckpointItemForm | undefined>();

  // Default end date is definete with 1 month ahead the current day
  const defaultEndDate = DateTime.fromJSDate(new Date).plus({ months: 1 }).toJSDate();
  const defaultFormValues = {
    name: '',
    start_date: new Date(),
    end_date: defaultEndDate,
  };

  const formMethods = useForm<CheckpointItemForm>({
    resolver,
    defaultValues: props?.checkpoint || defaultFormValues,
    mode: 'onChange',
  });
  const { handleSubmit, control, getValues, setValue, reset, formState: { errors } } = formMethods;

  const onSubmitValues = () => { 
    const formValues = getValues();
    props.onSubmit(formValues);
    setCheckpointInfo(undefined);
    reset();
  };

  useEffect(() => {
    return () => {
      setCheckpointInfo(undefined);
      reset();
    };
  }, []);

  useEffect(() => {
    if (props.checkpointToEdit && !checkpointInfo) {
      const { id, name, start_date, end_date } = props.checkpointToEdit;
      setValue('id', id);
      setValue('name', name);
      setValue('start_date', start_date);
      setValue('end_date', end_date);
    }
  }, [props.checkpointToEdit]);

  const valueError =  errors && errors?.name && errors?.name?.message || undefined;
  return (
    <Box>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <form>
          <BaseModal
            maxWidth="sm"
            open={props.isOpenModal}
            setOpen={() => {
              reset();
              setCheckpointInfo(undefined);
              props?.afterClose(undefined);
              props.setIsOpenModal(false);
            }}
            title={`${props?.checkpointToEdit?.id && props?.checkpointToEdit?.name ? 'Edit' : 'Add'} Checkpoint`}
          >
            <Box className={classes.wrapperForm}>
              <Box className={classes.wrapperInputCheckBox}>
                <Controller
                  render={() => <span></span>}
                  name="id"
                  control={control}
                  defaultValue={props?.checkpoint?.id}
                />
                <Controller
                  render={({ field }) => {
                    return (
                      <CustomTextField
                        {...field}
                        onChange={field.onChange}
                        value={field.value}
                        InputLabelProps={{ shrink: true }}
                        label="Name"
                        style={{ marginLeft: 5 }}
                        error={!!valueError}
                        helperText={valueError}
                      />
                    );
                  }}
                  name="name"
                  control={control}
                  defaultValue={props?.checkpoint?.name}
                />
              </Box>
              <Box className={classes.datepickerBox}>
                <Controller
                  render={({ field }) => {
                    return (
                      <KeyboardDatePicker
                        style={{ width: 240, marginRight: 20, }}
                        {...field}
                        disableToolbar
                        variant="inline"
                        format={DEFAULT_DATE_FORMAT}
                        margin="normal"
                        label="Start Date"
                        value={field.value}
                        onChange={(value) => setValue('start_date', value || new Date())}
                        KeyboardButtonProps={{
                          'aria-label': 'change date',
                        }}
                      />
                    );
                  }}
                  name="start_date"
                  control={control}
                  defaultValue={props?.checkpoint?.start_date}
                />
                <Controller
                  render={({ field }) => {
                    return (
                      <KeyboardDatePicker
                        {...field}
                        style={{ width: 240 }}
                        disableToolbar
                        variant="inline"
                        format={DEFAULT_DATE_FORMAT}
                        margin="normal"
                        label="End Date"
                        value={field.value}
                        onChange={(value) => setValue('end_date', value || new Date())}
                        KeyboardButtonProps={{
                          'aria-label': 'change date',
                        }}
                      />
                    );
                  }}
                  name="end_date"
                  control={control}
                  defaultValue={props?.checkpoint?.end_date}
                />
              </Box>
              <Box>
                <FormHelperText style={{ color: '#d32f2f' }}>
                  {
                    errors && errors?.end_date?.message || 
                    errors && errors?.start_date?.message
                  }
                </FormHelperText>
              </Box>
            </Box>
          <Box style={{ width: 100 }}>
            <SaveButton
              onClick={handleSubmit(onSubmitValues)}
              isSubmitting={false}
              defaultText="Save"
            />
          </Box>
          </BaseModal>
        </form>
      </MuiPickersUtilsProvider>
    </Box>
  )
};

export default CheckPointsForm;
