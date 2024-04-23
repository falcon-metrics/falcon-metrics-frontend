import { useForm } from 'react-hook-form';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { Controller } from 'react-hook-form';
import { styled } from '@material-ui/core/styles';

const CustomTextField = styled(TextField)({
  '&': {
    color: '#1890ff', 
    maxWidth: 165, 
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

type GlobalTargetProps = {
  value?: string;
  unit?: string;
  fieldNameValue: string;
  fieldNameUnit: string;
  id?: string | number;
  onSubmitCustomViewTarget: (values: any) => void;
  setOpenModal: (boolean) => void;
  sumOfGlobalTargets?: number;
};

function GlobalTargetForm(props: GlobalTargetProps) {
  const formMethods = useForm<GlobalTargetProps>({
    defaultValues: props || { value: 50, unit: '%', id: 0 },
  });
  const { control, getValues, setError, formState } = formMethods;

  const onSubmitValues = (event) => {
    event.preventDefault();

    const values = getValues();

    const sumGlobalTargetValue = props?.sumOfGlobalTargets ? props?.sumOfGlobalTargets : 0;
    const shouldSubtractLastValue = props.value 
      ? sumGlobalTargetValue - (Number(props.value) || 0) : sumGlobalTargetValue;
    const totalGlobalTargetValue = Number(values.value) + shouldSubtractLastValue;

    props.onSubmitCustomViewTarget(values);

    if (Number(values.value) < 0) {
      setError(
        'value',
        {
          type: 'custom',
          message: 'The sum of all target values should be greater than or equal 1%. Please input an absolute value.'
        }
      );
      props.onSubmitCustomViewTarget(props);
      return;
    }

    // should show the error and prevent user to add a value that are exceeding 100% of the sum
    // of all target values
    if (totalGlobalTargetValue > 100) {
      setError(
        'value',
        {
          type: 'custom',
          message: 'The sum of all target values should not exceed 100%.'
        }
      );
      props.onSubmitCustomViewTarget(props);
      return;
    }
    props.onSubmitCustomViewTarget(values);
    props.setOpenModal(false);
  };

  const valueError = formState
    && formState?.errors
    && formState?.errors.value
    && formState?.errors.value?.message || undefined;

  return (
    <Box style={{ marginTop: 20 }}>
      <form>
        <Controller
          render={() => <span>{' '}</span>}
          name="id"
          control={control}
          defaultValue={props.id}
        />
        {' '}
        <Controller
          render={({ field }) => {
            return (
              <TextField
                {...field}
                type="number"
                error={!!valueError}
                helperText={valueError}
                inputProps={{
                  inputProps: { 
                    max: 100,
                    min: 10
                  }
                }}
                onChange={field.onChange}
                value={field.value}
                InputLabelProps={{ shrink: true }}
                label="Value"
              />
            );
          }}
          name="value"
          control={control}
          defaultValue={props.value}  
        />
        {' '}
        <Controller
          render={({ field }) => {
            return (
              <CustomTextField
                {...field}
                type="text"
                inputProps={{
                  readOnly: true,
                }}
                disabled
                onChange={field.onChange}
                value={field.value}
                InputLabelProps={{ shrink: true }}
                label="Unit"
              />
            );
          }}
          name="unit"
          control={control}
          defaultValue="%"  
        />
        <br/>
        <Box style={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
          <SaveButton
            size="large"
            variant="contained"
            color="primary"
            style={{ background: '#1976d2', color: '#fff', marginTop: 30, }}
            onClick={onSubmitValues}
          >
            Save
          </SaveButton>
        </Box>
      </form>
    </Box>
  );
}

export default GlobalTargetForm;
