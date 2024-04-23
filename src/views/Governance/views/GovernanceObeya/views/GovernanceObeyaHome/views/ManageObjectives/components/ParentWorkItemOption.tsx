import { useState, useEffect } from 'react';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useFormContext } from 'react-hook-form';
import Tooltip from '@material-ui/core/Tooltip';
import { useParentWorkItemStyles } from './styles';

type ParentWorkItemOption = {
  parentWorkItemId: string;
  parentWorkItemTitle: string;
};

const getOptionLabel = (option?: ParentWorkItemOption) =>
  option?.parentWorkItemId
    ? `${option.parentWorkItemId} - ${option.parentWorkItemTitle}`
    : '';

type AutoCompleteFieldProps = {
  loadingParentWorkItems: any;
  parentWorkItemsOptions: any;
  field: any;
  currentIndex: any;
  setKeyResultIndex: any;
  onSearch: any;
  keyResultIndex: any;
  updateIdAndTitle: (id:string, title:string)=> void;
};

export const AutoCompleteField = ({
  loadingParentWorkItems,
  parentWorkItemsOptions,
  field,
  currentIndex,
  setKeyResultIndex,
  onSearch,
  keyResultIndex,
  updateIdAndTitle
}: AutoCompleteFieldProps) => {
  const classes = useParentWorkItemStyles();

  const [selectedOption, setOptionValue] = useState<ParentWorkItemOption>({
    parentWorkItemId: field?.parentWorkItemId || '',
    parentWorkItemTitle: field?.parentWorkItemTitle || '',
  });

  const [inputValue, setInputValue] = useState<string>('');
  const { setValue } = useFormContext();

  useEffect(() => {
    const fieldName = `keyResults.${currentIndex}`;
    setValue(
      `${fieldName}.parentWorkItemId`,
      selectedOption?.parentWorkItemId ?? '',
    );
    setValue(
      `${fieldName}.parentWorkItemTitle`,
      selectedOption?.parentWorkItemTitle ?? '',
    );

    updateIdAndTitle(selectedOption?.parentWorkItemId ?? '', selectedOption?.parentWorkItemTitle ?? '')

  }, [selectedOption, setValue, currentIndex]);

  const handleSelectedOption = (
    option?: any,
    value?: { parentWorkItemId: any },
  ) => {
    const shouldSelect = option?.parentWorkItemId === value?.parentWorkItemId;
    return shouldSelect;
  };

  return (
    <Box className={classes.autoComplete}>
      <Tooltip
        title={getOptionLabel(selectedOption)}
        placement="top"
        classes={{ tooltip: classes.tooltip }}
        arrow
      >
        <Autocomplete
          value={selectedOption}
          onInputChange={(_: any, newInputValue) => {
            setInputValue(newInputValue);
          }}
          inputValue={inputValue}
          onChange={(_: any, newValue: any) => {
            setOptionValue(newValue);
          }}
          clearOnBlur={false}
          options={parentWorkItemsOptions}
          getOptionLabel={getOptionLabel}
          autoSelect={true}
          defaultValue={field}
          getOptionSelected={handleSelectedOption}
          renderInput={(params: any) => {
            return (
              <div ref={params.InputProps.ref}>
                <TextField
                  fullWidth
                  className={classes.autoCompleteTextField}
                  {...params}
                  onChange={(event: any) => {
                    setKeyResultIndex(currentIndex);
                    params?.inputProps?.onChange(event);
                    onSearch(event?.target?.value);
                  }}
                  label=""
                  margin="normal"
                  placeholder="eg. FLO-8, Add new widget"
                />
              </div>
            );
          }}
        />
      </Tooltip>
      <Box display="inline-flex" className={classes.parentWorkItemLoad}>
        {loadingParentWorkItems && keyResultIndex === currentIndex ? (
          <CircularProgress size={20} />
        ) : null}
      </Box>
    </Box>
  );
};
