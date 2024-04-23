import React, { useEffect } from 'react';

import { useController } from 'react-hook-form';

import TextField from '@material-ui/core/TextField';
import SelectAutocomplete, {
  createFilterOptions,
} from '@material-ui/lab/Autocomplete';

import { useStyles } from './styles';

const filter = createFilterOptions<any>();

export type TeamOption = {
  teamId?: string;
  inputValue?: string;
  teamName?: string;
};

type Props = {
  name: string;
  control?: any;
  label?: string;
  inputOptions?: TeamOption[];
  onChange?: (string) => void;
  error?: boolean;
  errorMessage?: string;
  defaultValue?: any;
  disabled?: boolean;
};

export const Autocomplete = ({
  name, control,
  label, inputOptions = [], onChange, error, errorMessage, defaultValue,
  disabled
}: Props) => {
  const [value, setValue] = React.useState<any | null>(null);
  const classes = useStyles();
  const { field: inputProps } = useController({ name, control });

  useEffect(() => {
    if (inputOptions?.length && defaultValue && !value) {
      inputProps.onChange(defaultValue.teamId);
      setValue(defaultValue);
    }
  }, [inputOptions?.length, defaultValue]);

  return (
    <SelectAutocomplete
      disabled={disabled}
      className={classes.font}
      value={value}
      defaultValue={defaultValue?.inputValue}
      onChange={(event, newValue) => {
        if (typeof newValue === 'string') {
          setValue({
            teamName: newValue,
          });
          const currentValue = {
            teamName: newValue.replace('Add: ', ''),
            teamId: 'no-context-id',
          };
          onChange?.(currentValue);
          inputProps.onChange(currentValue);
        } else if (newValue && newValue.inputValue) {
          // Create a new value from the user input
          setValue({
            teamName: newValue.inputValue.replace('Add: ', ''),
          });
          const currentValue = {
            teamName: newValue.teamName.replace('Add: ', ''),
            teamId: newValue.teamId,
          };
          onChange?.(currentValue);
          inputProps.onChange(currentValue.teamId);
        } else {
          setValue(newValue);
          onChange?.(newValue);
          inputProps.onChange(newValue);
        }
      }}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);
        // Suggest the creation of a new value
        if (params.inputValue !== '') {
          filtered.push({
            inputValue: params.inputValue,
            teamName: `Add: ${params.inputValue}`,
          });
        }
        return filtered;
      }}
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      id="free-solo-with-text-demo"
      options={inputOptions}
      getOptionLabel={(option) => {
        // Value selected with enter, right from the input
        if (typeof option === 'string') {
          return option;
        }
        // Add "xxx" option created dynamically
        if (option.inputValue) {
          return option.inputValue;
        }
        // Regular option
        return option.teamName;
      }}
      renderOption={(option) => option.teamName}
      style={{ width: 360 }}
      freeSolo
      renderInput={(params) => (
        <TextField
          {...params} placeholder={label} variant="standard"
          error={error}
          helperText={errorMessage}
          defaultValue={defaultValue?.inputValue}
        />
      )}
    />
  );
};
