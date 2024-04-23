import { useForm } from 'react-hook-form';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { Controller } from 'react-hook-form';
import { styled } from '@material-ui/core/styles';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


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
  description?: string;
  value?: string;
  unit?: string;
  fieldNameDescription: string;
  fieldNameValue: string;
  fieldNameUnit: string;
  id?: string | number;
  onSubmit: (values: any) => void;
};

function GlobalTargetForm(props: GlobalTargetProps) {
  const formMethods = useForm<GlobalTargetProps>({
    defaultValues: props || { description: '', value: '', unit: '' },
  });
  const { control, getValues } = formMethods;

  const onSubmitValues = () => props.onSubmit(getValues());

  return (
    <Box style={{ marginTop: 20 }}>
      <form>
        <Controller
          render={() => <span>{' '}</span>}
          name="id"
          control={control}
          defaultValue={props.id}
        />
        <Controller
          render={({ field }) => {
            return (
              <FormControl style={{ minWidth: 170 }}>
                <InputLabel id="demo-simple-select-helper-label">Description</InputLabel>
                <Select
                  label="Global description"
                  {...field}
                  onChange={field.onChange}
                  value={field.value}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="min of">min of</MenuItem>
                  <MenuItem value="max of">max of</MenuItem>
                </Select>
              </FormControl>
            );
          }}
          name="description"
          control={control}
          defaultValue={props.description}  
        />
        {' '}
        <Controller
          render={({ field }) => {
            return (
              <CustomTextField
                {...field}
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
              <FormControl style={{ minWidth: 170 }}>
                <InputLabel id="demo-simple-select-helper-label">Unit</InputLabel>
                <Select
                  label="units"
                  {...field}
                  onChange={field.onChange}
                  value={field.value}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="days">days</MenuItem>
                  <MenuItem value="%">%</MenuItem>
                  <MenuItem value="flow items">flow items</MenuItem>
                </Select>
              </FormControl>
            );
          }}
          name="unit"
          control={control}
          defaultValue={props.unit}  
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
