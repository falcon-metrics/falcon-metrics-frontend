import { Fragment, useState, useEffect } from 'react';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useFormContext } from 'react-hook-form';
import { useStyles } from './KeyResults';
import Tooltip from '@material-ui/core/Tooltip';

type ParentWorkItemOption = {
  initiativeId: string;
  initiativeTitle: string;
};

const getOptionLabel = (option?: ParentWorkItemOption) =>
  option?.initiativeId
    ? option.initiativeTitle
    : '';

type AutoCompleteFieldProps = {
  loadingParentWorkItems: any;
  parentWorkItemsOptions: any;
  currentIndex: any;
  setKeyResultIndex: any;
  onSearch?: any;
  keyResultIndex: any;
  updateIdAndTitle: (id:string, title:string)=> void;
  defaultAutoCompleteValue?: any;
  loading?: boolean;
};

export const AutoCompleteField = ({
  loadingParentWorkItems,
  parentWorkItemsOptions,
  currentIndex,
  setKeyResultIndex,
  onSearch,
  keyResultIndex,
  updateIdAndTitle,
  defaultAutoCompleteValue,
  loading,
}: AutoCompleteFieldProps) => {
  const classes = useStyles();

  const [selectedOption, setOptionValue] = useState<ParentWorkItemOption>({
    initiativeId: '',
    initiativeTitle: '',
  });

  // should set default value
  useEffect(() => {
    if (defaultAutoCompleteValue && !selectedOption.initiativeId) {
      setOptionValue(defaultAutoCompleteValue);
    }
  }, [defaultAutoCompleteValue, parentWorkItemsOptions]);

  const [inputValue, setInputValue] = useState<string>('');
  const { setValue } = useFormContext();

  useEffect(() => {
    const fieldName = `keyResults.${currentIndex}`;
    setValue(
      `${fieldName}.initiativeId`,
      selectedOption?.initiativeId ?? '',
      {
        shouldDirty: true
      }
    );

    setValue(
      `${fieldName}.initiativeTitle`,
      selectedOption?.initiativeTitle ?? '',
      {
        shouldDirty: true
      }
    );

    updateIdAndTitle(selectedOption?.initiativeId ?? '', selectedOption?.initiativeTitle ?? '')

  }, [selectedOption, setValue, currentIndex]);

  const handleSelectedOption = (
    option?: any,
    value?: { initiativeId: any },
  ) => {
    const shouldSelect = option?.initiativeId === value?.initiativeId;
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
          loading={loading}
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
          defaultValue={defaultAutoCompleteValue}
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
                    onSearch?.(event?.target?.value);
                  }}
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <Fragment>
                        {loading ? <CircularProgress color="inherit" size={20} /> : null}
                        {params.InputProps.endAdornment}
                      </Fragment>
                    ),
                  }}
                  defaultValue={defaultAutoCompleteValue}
                  label=""
                  margin="normal"
                  placeholder="eg. Sass, Marketplace"
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
