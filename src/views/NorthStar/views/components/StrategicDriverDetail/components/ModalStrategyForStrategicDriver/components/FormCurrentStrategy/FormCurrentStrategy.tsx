import { useEffect, useState } from 'react';
import { useForm, UseFormReset } from 'react-hook-form';
import { Controller } from 'react-hook-form';

import FormHelperText from '@material-ui/core/FormHelperText';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { styled } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';

import { useStyles } from './FormCurrentStrategy.styles';
import useProfile from 'hooks/useProfile';
import TextEditor from 'views/Strategies/views/StrategiesPage/components/TextEditor';
import { debounce } from 'lodash';
import SpinnerFullSize from 'components/SpinnerFullSize';

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

const WrapperStrategyDescription = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
});

const maxLengths = {
  strategyStatement: 255,
  strategyDescription: 2000,
};

type Props = {
  onSubmit: (values: any, afterSuccess: UseFormReset<any>) => void;
  strategyInfo?: any;
};

const FormCurrentStrategy = ({ onSubmit, strategyInfo }: Props) => {
  const classes = useStyles();

  /*
  * Get user info from useProfile hook
  */
  const { data: user } = useProfile();

  const formMethods = useForm<any>({
    defaultValues: {
      strategyDescription: '',
      strategyStatement: '',
    },
});
const {
    handleSubmit, control, getValues, setValue, reset,
    setError, clearErrors,
    formState: {
      errors, isSubmitting, isDirty,
    },
  } = formMethods;

  const onSubmitValues = () => {
    if (Object.keys(errors).length) {
      console.log('errors', errors);
      return;
    }

    onSubmit(
      getValues(),
      reset
    );
  };

  useEffect(() => {
    setValue('userCreated', user?.user_id);
  }, [user?.user_id])

  useEffect(() => {
    if (strategyInfo?.id && !isDirty) {
      setValue('strategyDescription', strategyInfo?.strategyDescription);
      setValue('strategyStatement', strategyInfo?.strategyStatement);
    }
  }, [strategyInfo])

  // Check current Strategic driver
  const afterChangeDescription = (newValue) => {
    if (newValue === "<p><br></p>") newValue = "";

    // The component contains html tags and it's being counted
    // Before counting, make sure to clean/strip the value of the html tags
    const strippedHtml = newValue.replaceAll(/<\/?p[^>]*>/g, '').replaceAll(/<br\/?>/g, ' ');
    setValue('strategyDescription', newValue);
    updateCharacterCount("strategyDescription", strippedHtml);
  };

  const defaultDescription = getValues()?.strategyDescription || strategyInfo?.strategyDescription;
  
  const [characterCounts, setCharacterCounts] = useState({
    strategyStatement: strategyInfo?.strategyStatement?.length || 0,
    strategyDescription: strategyInfo?.strategyDescription?.length || 0,
  });

  const updateCharacterCount = debounce((field, value) => {
    const characterCount = value.length;
    const maxLength = maxLengths[field];

    if (characterCount > maxLength) {
      setError(field, {
        type: "maxLength",
        message: `Maximum characters allowed is ${maxLength}`,
      });
    } else {
      clearErrors(field);
    }

    // Update the character count in the state
    setCharacterCounts((prevCounts) => ({
      ...prevCounts,
      [field]: characterCount,
    }));
  }, 50);

  return (
    <Box>
      <form
        // className={classes.form}
        onSubmit={handleSubmit(onSubmitValues)}
      >
        <WrapperStrategyDescription>
          <Controller
            render={({ field }) => {
              return (
                <>
                  <FormControl className={classes.inputSize}>
                    <CustomTextField
                      {...field}
                      fullWidth
                      className={classes.textField && classes.inputStrategyStatement}
                      
                      onChange={(e) => {
                        const { value } = e.target;
                        field.onChange(e);
                        updateCharacterCount("strategyStatement", value);
                      }}
                      value={field.value}
                      InputLabelProps={{ shrink: true }}
                      error={!!errors?.strategyStatement}
                      label="Strategy Title"
                      inputProps={{ style: { fontFamily: 'Open Sans' } }}
                      multiline
                      minRows={1}
                    />
                  </FormControl>
                  <Box display="flex" justifyContent="space-between" mb={1}>
                    <FormHelperText className={classes.helpText} error>
                      {errors && errors?.strategyStatement?.message}
                    </FormHelperText>
                    <FormHelperText className={classes.helpText} error={!!errors?.strategyStatement?.message}> 
                      {characterCounts["strategyStatement"]}/{maxLengths["strategyStatement"]}
                    </FormHelperText>
                  </Box>              
                </>
              );
            }}
            name="strategyStatement"
            control={control}
          />
          {/* <br />
          <span>
            {strategyStatementLength || 0 ? (
              <AmountOfCharacters style={{ color: 'rgba(0, 0, 0, 0.58)' }}>
                {strategyStatementLength}/{250}
              </AmountOfCharacters>
            ): null}
          </span> */}
        </WrapperStrategyDescription>
        <WrapperStrategyDescription>
          <TextEditor
            maxLength={2000}
            onAfterChange={afterChangeDescription}
            defaultContent={defaultDescription}
            customStyles={{ width: "100%" }}
            hideCharacters
          />
          <Box display="flex" justifyContent="space-between" mb={1}>
            <FormHelperText className={classes.helpText} error>
              {errors && errors?.strategyDescription?.message}
            </FormHelperText>
            <FormHelperText className={classes.helpText} error={!!errors?.strategyDescription?.message}> 
              {characterCounts["strategyDescription"]}/{maxLengths["strategyDescription"]}
            </FormHelperText>
          </Box>
        </WrapperStrategyDescription>
        <Box className={classes.publishButton}>
          <SaveButton
            size="large"
            type="submit"
            variant="contained"
            color="primary"
            className={classes.saveButton}
            disabled={isSubmitting || !!Object.keys(errors)?.length}
            startIcon={isSubmitting ? <SpinnerFullSize /> : ''}
          >
            Save
          </SaveButton>
        </Box>
      </form>
    </Box>
  );
}

export default FormCurrentStrategy;
