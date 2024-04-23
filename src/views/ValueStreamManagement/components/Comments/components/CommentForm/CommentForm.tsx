import { useEffect, useContext, useState } from 'react';
import { useForm, UseFormReset } from 'react-hook-form';
import { Controller } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from '@material-ui/core/Typography';
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

import { useStyles } from './CommentForm.styles';
import { FormFields } from '../../interfaces';
import useProfile from 'hooks/useProfile';
import { SelectedContextIdContext } from 'components/UserStateProvider/UserStateProvider';
import { CommentInfo } from '../../hooks/useComments';
import { useCheckpoints } from 'views/Settings/components/PerformanceCheckPoints/hooks/useCheckpoints';
import { useEvents } from 'views/ValueStreamManagement/components/Events/hooks/useEvents';
import { useNormalisationChartsOptions as useNormalisationChartsOptions } from 'views/ValueStreamManagement/views/DeliveryGovernance/hooks/useNormalisationChartsOptions';
import useFilterPanelContext from 'views/Dashboard/views/Platform/views/FilterPanel/contexts/FilterPanelContext';
import { useActionableInsightsData } from 'views/ValueStreamManagement/views/ContinuousImprovements/hooks/useActionableInsightsData';
import {
  elements, widgetOptions
} from './constants';
import { getFormattedOptions } from './utils';
import { WidgetDropdown, flattendWidgetOptions } from './WidgetDropDown';
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

const defaultValidatorSchema = yup.object().shape({
  effectiveDate: yup.string().required('Effective date is required'),
  title: yup.string().required('Comment title is required'),
});

const replyValidationSchema = yup.object().shape({
  comment: yup.string().required('Comment title is required'),
});

type Props = {
  onSubmit: (values: FormFields, afterSuccess: UseFormReset<FormFields>) => void;
  commentInfo?: CommentInfo;
  isReply?: boolean;
};

const CommentForm = ({ onSubmit, commentInfo, isReply }: Props) => {
  const classes = useStyles();
  const [selectedElement, setElement] = useState('-1');
  const [widgetValue, setWidgetValue] = useState<string[]>([]);
  const [optionSelected, setOptionSelected] = useState([]);

  const { data: checkpoints } = useCheckpoints();
  const { data: events } = useEvents();
  const { apiQueryParameters } = useFilterPanelContext();
  const {
    data: normalisationChartsOptions,
  } = useNormalisationChartsOptions(
    apiQueryParameters,
    false
  );
  const {
    data: actionableInsightsData
  } = useActionableInsightsData(apiQueryParameters, false);

  const insights = actionableInsightsData?.patterns || [];

  /*
  * Get user info from useProfile hook
  */
  const { data: user } = useProfile();

  const { contextId } = useContext(SelectedContextIdContext);

  /*
  * Setup form with react-hook-form
  */
  const validation = isReply ? replyValidationSchema : defaultValidatorSchema;
  const resolver = yupResolver(validation);

  const formMethods = useForm<FormFields>({
    resolver,
    defaultValues: {
      effectiveDate: commentInfo?.effective_date || new Date(),
      title: commentInfo?.title || '',
      comment: commentInfo?.comment || '',
      id: commentInfo?.id || '',
      userId: commentInfo?.user_id || user?.user_id || '',
      username: commentInfo?.username || user?.name || '',
      contextId,
      parentId: commentInfo?.parentId || '',
      elementFields: commentInfo?.elementFields || '',
      widget: commentInfo?.widget || '',
      elementId: '-1',
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
    setValue('username', commentInfo?.username || user?.name || '');
  }, [user, contextId])

  useEffect(() => {
    if (commentInfo) {
      setValue('contextId', commentInfo?.context_id);
      setValue('comment', commentInfo?.comment?.trim() || '');
      setValue('title', commentInfo?.title || '');
      setValue('id', commentInfo?.id);
      setValue('userId', commentInfo?.user_id);
      setValue('effectiveDate', commentInfo?.effective_date);
      setValue('username', commentInfo?.username || user?.name);
      setValue('parentId', commentInfo?.parentId || '');
      setValue('elementFields', commentInfo?.elementFields || '');

      // Populate widget element dropdown
      if (commentInfo?.elementFields) {
        if (commentInfo?.elementFields?.elementId) {
          setElement(commentInfo?.elementFields?.elementId);
        }
        if (commentInfo?.elementFields?.widgets) {
           // set values when widgets come from elementFields
          const newWidgetValue = (commentInfo?.elementFields?.widgets || []).map(w => w.id);

          setWidgetValue(newWidgetValue);
          setValue('widget', commentInfo?.elementFields?.widgets);
        }
      }
    }
  }, [commentInfo])

  // we will map each data from hooks depending of each element dropdownValue
  const elementDataMap = {
    '0': widgetOptions,
    '1': normalisationChartsOptions,
    '2': checkpoints,
    '3': events,
    '4': insights
  };

  /*
  * The form will be reseted after submit values
  */
   const onSubmitValues = () => {
    // when user selectes checkpoints we will go through each checkpoint and 
    // get the selected checkpoints by widget Input
    // Current array of data that depends on the current element selected
    let elementData = elementDataMap?.[selectedElement];

    // when widget is selected check in a flat list of widgets
    // there are a group by each accordion
    // here we normalize to see all on the same row
    if (selectedElement === '0') {
      elementData = flattendWidgetOptions;
    }

    const formattedWidgetIds = (widgetValue || []).map((widgetId: string) => String(widgetId));

    const widgetsById = (elementData || []).filter((elementInfo: any) => {
      return formattedWidgetIds.includes(String(elementInfo?.id));
    });

    const elementFields = {
      // option of the current selected element
      element: elements?.[selectedElement],

      // id of current element selected
      elementId: selectedElement,

      // each widget value info
      widgets: widgetsById
    };

    const formValues = {
      ...getValues(),
      elementFields
    };

    onSubmit(
      formValues,
      reset,
    );
 };

  const handleChangeSelectElement = (event) => {
    setWidgetValue([]);
    const value = event.target.value;
    setElement(value);
    setValue('elementId', value, { shouldDirty: true })
  };

  const handleChangeWidget = (event) => {
    setWidgetValue(event.target.value);
    setValue('widget', event.target.value, { shouldDirty: true })
  };

  useEffect(() => {
    if (selectedElement !== '-1') {
      getFormattedOptions(
        setOptionSelected,
        selectedElement,
        widgetOptions,
        normalisationChartsOptions,
        checkpoints,
        events,
        insights
      );
    }
  }, [selectedElement])

  return (
    <Box className={classes.wrapperForm}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <form
          className={classes.form}
          onSubmit={handleSubmit(onSubmitValues)}
        >
          {!isReply ? (
            <>
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
                          onChange={(value) => setValue('effectiveDate', value || new Date())}
                          KeyboardButtonProps={{
                            'aria-label': 'change date',
                          }}
                          inputProps={{ style: { fontFamily: 'Open Sans' } }}
                        />
                      </FormControl>
                      <FormHelperText className={classes.helpText}>
                        {errors && errors?.effectiveDate?.message}
                      </FormHelperText>
                    </>
                  );
                }}
                name="effectiveDate"
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
                        error={!!errors?.title}
                        label="Title"
                        inputProps={{ style: { fontFamily: 'Open Sans' } }}
                      />
                      </FormControl>
                        <FormHelperText className={classes.helpText}>
                        {errors && errors?.title?.message}
                      </FormHelperText>
                    </>
                  );
                }}
                name="title"
                control={control}
              />
            </>
          ) : null}
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
                      error={!!errors?.comment}
                      label="Comment"
                      multiline
                      rows={5}
                      inputProps={{ maxLength: 255, style: { fontFamily: 'Open Sans' } }}
                    />
                  </FormControl>
                  <FormHelperText className={classes.helpText}>
                    {errors && errors?.comment?.message}
                  </FormHelperText>
                </>
              );
            }}
            name="comment"
            control={control}
          />
          {!isReply ? (
            <>
              <Box className={classes.inputElement}>
                <Typography className={classes.titleElementInput}>Associated with:</Typography>
                <Controller
                  render={({ field }) => {
                    return (
                      <>
                        <FormControl className={classes.inputSize}>
                          <InputLabel id="demo-mutiple-chip-label">Element</InputLabel>
                          <Select
                            label="Element"
                            {...field}
                            onChange={handleChangeSelectElement}
                            className={classes.selectElement}
                            value={selectedElement}
                            inputProps={{ style: { fontFamily: 'Open Sans' } }}
                          >
                            {elements.map((elementOption, index) => {
                              return (
                                <MenuItem 
                                  key={index}
                                  value={elementOption.value}
                                  className={classes.titleSelectElement}>
                                  {elementOption.label}
                                </MenuItem>
                              ) 
                            })}
                          </Select>
                        </FormControl>
                        <FormHelperText className={classes.helpText}>
                        </FormHelperText>
                      </>
                    );
                  }}
                  name="elementFields"
                  control={control}
                />
              </Box>
              <Box className={classes.inputWidget}>
                <Controller
                  name="widget"
                  control={control}
                  render={() => {
                    return (
                      <>
                        <FormControl>
                          <InputLabel id="demo-mutiple-chip-label">Widgets</InputLabel>
                          <WidgetDropdown
                            selectedElement={selectedElement}
                            optionSelected={optionSelected}
                            widgetValue={widgetValue}
                            handleChangeWidget={handleChangeWidget}
                          /> 
                        </FormControl>
                      </>
                      )
                    }
                  }
                />
              </Box>
            </>
          ) : null}
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
            name="parentId"
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

export default CommentForm;
