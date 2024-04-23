import {
  useEffect,
  useState,
} from 'react';

import axios from 'axios';
import {
  ButtonTypes,
} from 'components/NavigationButtons/components/NavigateButton';
import SpinnerFullSize from 'components/SpinnerFullSize';
import useSharedState from 'hooks/useSharedState';
import { useHistory } from 'react-router-dom';
import useFilterPanelContext
  from 'views/Dashboard/views/Platform/views/FilterPanel/contexts/FilterPanelContext';
import {
  getFilterUrlSearchParams,
} from 'views/Dashboard/views/Platform/views/FilterPanel/contexts/FilterPanelContext/utils';
import {
  getDropDownOptionsForVariableField,
} from 'views/Dashboard/views/Platform/views/FilterPanel/utils/fetchFilterOptions';
import FilterDropdown
  from 'views/Dashboard/views/Platform/views/FilterPanel/views/FilterPanelContent/components/FilterDropdown';
import ContextNavigationWithData
  from 'views/Dashboard/views/Platform/views/Header/views/ContextNavigation/ContextNavigation.data';

import Box from '@material-ui/core/Box';
import Snackbar from '@material-ui/core/Snackbar';
import Typography from '@material-ui/core/Typography';
import MuiAlert, {
  AlertProps,
  Color,
} from '@material-ui/lab/Alert';

import InsightsButtons from './components/InsightsButtons';
import WorkItemLevels from './components/WorkItemLevels';
import { useCustomFields } from './hooks/useCustomFields';
import { useInsights } from './hooks/useInsights';
import useStyles from './Insights.styles';


/**
 * @deprecated
 * 
 * We're not going to use this form anymore. Instead of doing the performance
 * checkpoints extract only for the configured insights views, we're going to 
 * extract performance checkpoints for every context
 */
export const Insights = () => {
  const classes = useStyles();
  const {
    selectedFilters,
    applyFiltersFromPanel,
    synchronizeSelectedFilters,
    clearSelectedFilters,
  } = useFilterPanelContext();

  const history = useHistory();
  const params = new URLSearchParams(history.location.search);
  const { data, isLoadingInsights, postInsightsView, mutateInsights } = useInsights();
  const { data: customFields, isLoadingCustomFields } = useCustomFields();
  const [isSubmitting, setSubmitting] = useState<boolean>(false);
  const [alertOpen, setAlertOpen] = useState<boolean>(false);
  const [alertSeverity, setAlertSeverity] = useState<Color>('info');
  const [alertMessage, setAlertMessage] = useState<string>('Your changes are being saved...');

  const onAfterChange = (checkedItems: string[]) => {
    applyFiltersFromPanel({
      contextId: params.get('contextId') || '',
      workItemLevels: checkedItems,
    });
    synchronizeSelectedFilters(history.location.search);
  };

  useEffect(() => {
    const currentInsight = data.find(
      insightObject =>
        insightObject.context_id === params.get('contextId')
    );
    if (currentInsight) {
      clearSelectedFilters();
      synchronizeSelectedFilters(currentInsight.query_parameters);
    } else {
      clearSelectedFilters();
    }
  }, [params.get('contextId')]);

  useEffect(() => {
    if (selectedFilters?.customFields?.length) {
      applyFiltersFromPanel({
        customFields: selectedFilters?.customFields,
      });
      const newURLWithCustomFields = getFilterUrlSearchParams(selectedFilters);
      history.push({ pathname: '/organization-settings', search: newURLWithCustomFields });
    }
  }, [selectedFilters?.customFields]);

  // Disable loading indicator on header by setting shared state to false
  const [sharedState, setSharedState] = useSharedState('ANALYTICS_DASHBOARD_IS_LOADING');
  useEffect(() => {
    if (sharedState) {
      setSharedState(false);
    }
  }, [sharedState]);

  const onSubmit = async () => {
    const currentContextInfo = data.find(
      insightObject =>
        insightObject.context_id === params.get('contextId')
    );
     
    let formData: {
      context_id?: string;
      query_parameters?: string;
      name?: NamedCurve;
      rolling_window_in_days?: number;
    } = {};

    if (currentContextInfo) {
      formData = {
        ...(currentContextInfo || {}),
        query_parameters: history.location.search,
      };
    } else {
      formData = {
        context_id: new URLSearchParams(history.location.search).get('contextId') || '',
        query_parameters: history.location.search || '',
        name: '',
        rolling_window_in_days: 30,
      };
    }
    if (!formData?.context_id) {
      setAlertMessage('You should select a board or aggregation. This field is required.');
      setAlertOpen(true);
      setSubmitting(false);
      setAlertSeverity('error');
      return;
    }

    try {
      setAlertOpen(true);
      setAlertMessage('Your changes are being saved...');
      setAlertSeverity('info');
      await postInsightsView('insights-views', formData);
      setAlertOpen(false);
      setAlertMessage('Insight view saved successfully.');
      setAlertSeverity('success');
      setAlertOpen(true);
      mutateInsights();
    } catch(e) {
      console.log("error insight view ==>", e);
    
      if (axios.isAxiosError(e)) {
        const errResp = e.response;
        setAlertMessage(errResp?.data?.message);
      } else {
        setAlertMessage('Error when try to save insight view.');
      }
      setAlertSeverity('error');
      setAlertOpen(true);
      setSubmitting(false);
    }
  };

  const handleCloseAlert = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setAlertOpen(false);
  };
  return (
    <>
      {isLoadingInsights || isLoadingCustomFields ? <SpinnerFullSize /> : (
        <>
          <Snackbar
            open={alertOpen}
            autoHideDuration={4000}
            onClose={handleCloseAlert}
          >
            <Alert onClose={handleCloseAlert} severity={alertSeverity}>
              {alertMessage}
            </Alert>
          </Snackbar>
          <Typography className={classes.boardTitle}>Board or Aggregation</Typography>
          <ContextNavigationWithData />
          <Typography className={classes.workItemLevelTitle}>Work Item Level</Typography>
          <WorkItemLevels
            onAfterChange={onAfterChange}
            defaultChecked={selectedFilters.workItemLevels || []}
          />
          <Typography className={classes.workItemLevelTitle}>Custom Filters</Typography>
            <Box display="grid">
              <Box className={classes.customFieldsContainer}>
                {customFields.map(
                  ({ customFieldName, values, displayName }) =>
                    <FilterDropdown
                      key={customFieldName}
                      camelCaseLabel={displayName}
                      groupKey={'customFields'}
                      options={getDropDownOptionsForVariableField(customFieldName, values, true)}
                      emptyOptionPreffix={`${customFieldName}#`}
                      shouldShowEmptyOption={true}
                      multiSelect={true}
                    />
                  )
                }
              </Box>
            </Box>
            <Box mt={4}>
              <InsightsButtons
                onClick={onSubmit}
                isSubmitting={false}
                backPath={'/'}
                backButtonProps={{
                  path: '/',
                  content: 'Back',
                  buttonType: ButtonTypes.back,
                  shouldRequestConfirmation: false,
                }}
                saveButtonProps={{
                  isSubmitting: isSubmitting,
                  defaultText: 'Save',
                  submittingText: 'Saving',
                }}
              />
            </Box>
        </>
      )}
    </>
  );
};

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
