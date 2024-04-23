import {
  useState,
  useEffect,
} from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { postMetrics } from './services/metrics';
import Box from '@material-ui/core/Box';
import { ButtonTypes } from 'components/NavigationButtons/components/NavigateButton';
import {
  DataGridPro,
} from '@mui/x-data-grid-pro';
import {
  getGridColumns, getCheckedMetrics, filterByActiveCustomViewConfig,
  filterByActiveMetricsConfig, getCheckedCustomViews,
} from './utils';
import { FilterWithId, GroupedFilter, MetricItem } from './interfaces';
import { useMetrics, defaultResource } from './hooks/useMetrics';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from './components/Alert';
import MetricsButtons from './components/MetricsButtons';
import CustomView from './components/CustomViews';
import { styled } from '@material-ui/core/styles';

import useStyles from './Metrics.styles';
import CustomGridPanel from 'components/UI/CustomGridPanel';
import { Skeleton } from '@material-ui/lab';

const DataGridContainer = styled(Box)({
  '&': {
    height: 700,
    width: '100%',
    marginTop: 10,
    fontFamily: 'Open Sans',
    marginBottom: 40,
  },
  '& .MuiDataGrid-main': {
    fontFamily: 'Open Sans'
  },
});

const DataGridContainerCustomView = styled(Box)({
  '&': {
    height: 'auto',
    width: '100%',
    marginTop: 10,
    fontFamily: 'Open Sans',
    marginBottom: 94,
  },
  '& .MuiDataGrid-main': {
    fontFamily: 'Open Sans'
  },
});

function Metrics() {
  const classes = useStyles();
  const [successAlertOpen, setSuccessAlertOpen] = useState<boolean>(false);
  const [waitingAlertOpen, setWaitingAlertOpen] = useState<boolean>(false);
  const [errorAlertOpen, setErrorAlertOpen] = useState<boolean>(false);
  const [selectAllCheckPoints, setSelectAllCheckPoints] = useState<boolean>(false);
  const [selectAllBenchmarking, setSelectAllBenchmarking] = useState<boolean>(false);

  const handleCloseAlert = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setWaitingAlertOpen(false);
    setSuccessAlertOpen(false);
    setErrorAlertOpen(false);
  };

  // Fetch data
  const { data, isLoadingMetrics, mutate } = useMetrics();
  const [allMetrics, setAllMetrics] = useState<MetricItem[]>([]);

  // All customViews
  const [allCustomViews, setAllCustomViews] = useState<GroupedFilter[]>([]);

  // Form
  const formMethods = useForm<{ allMetrics: MetricItem[], customViews: FilterWithId[]; }>({
    defaultValues: {
      allMetrics: [],
      customViews: [],
    },
    mode: 'onChange',
  });
  const { control, formState, setValue, getValues, handleSubmit } = formMethods;
  // Form of Flow-based Metrics
  // create the nested form to manage each row value on the datagrid
  useFieldArray({
    control,
    name: 'allMetrics',
  });

  // Form of CustomViews
  useFieldArray({
    control,
    name: 'customViews',
  });


  // format and generate rows
  // get default metrics to mount the form and merge with the fecthed active
  // metric stored on database
  useEffect(() => {
    // set up metrics in flow based metrics
    // console.log(data);
    const checkedMetrics = getCheckedMetrics(
      data.defaultMetrics,
      data.savedMetrics.metrics || []
    );

    setAllMetrics(checkedMetrics);
    setValue('allMetrics', checkedMetrics);
  }, [data.defaultMetrics?.length, data.savedMetrics.metrics?.length]);

  // format and generate rows to custom views
  // get default metrics to mount the form and merge with the fecthed active
  // metric stored on database
  useEffect(() => {
    // set up customViews form
    if (data.defaultCustomViews.length || data.savedMetrics.customViews) {
      const checkedCustomViews = getCheckedCustomViews(
        data.defaultCustomViews,
        data.savedMetrics.customViews || [],
      );
      setAllCustomViews(checkedCustomViews);
      let a: FilterWithId[] = [];
      checkedCustomViews.forEach(group => {
        a = [...a, ...group.fields];
      });
      // console.log("🚀 ~ a ~ a:", a);
      setValue("customViews", a);
    }
  }, [data.defaultCustomViews?.length, data.savedMetrics.customViews?.length]);

  // store each metric that had changes
  const submitMetrics = async () => {
    const formValues = getValues();
    const activeMetrics = filterByActiveMetricsConfig(formValues.allMetrics);
    const activeCustomViews = filterByActiveCustomViewConfig(formValues.customViews);

    // console.log(activeMetrics);
    // console.log(activeCustomViews);
    setWaitingAlertOpen(true);
    try {
      const payload = {
        ...data,
        metrics: JSON.stringify(activeMetrics),
        customViews: JSON.stringify(activeCustomViews),
      };

      await postMetrics(defaultResource, payload);
      setWaitingAlertOpen(false);
      setSuccessAlertOpen(true);
      mutate();
    } catch (e) {
      setWaitingAlertOpen(false);
      setErrorAlertOpen(true);
      console.log('submitMetrics error', e);
    }
  };

  // Update all checkboxes
  const onSelectAllCheckpoints = (event) => {
    allMetrics.forEach((_, index) => {
      setValue(`allMetrics.${index}.display_on_checkpoints`, event.target.checked);
    });
    setSelectAllCheckPoints(event.target.checked);
  };
  const onSelectAllBenchmarking = (event) => {
    allMetrics.forEach((_, index) => {
      setValue(`allMetrics.${index}.display_on_benchmarking`, event.target.checked);
    });
    setSelectAllBenchmarking(event.target.checked);
  };

  // get columns config
  const columns = getGridColumns(
    classes,
    control,
    onSelectAllCheckpoints,
    onSelectAllBenchmarking,
    selectAllCheckPoints,
    selectAllBenchmarking
  );

  return (
    <Box style={{ width: '100%', height: 'auto' }}>
      <Box style={{ marginTop: 20 }}>
        <h3 style={{ fontSize: 26, marginBottom: 40, marginTop: 40 }}>Flow-based metrics</h3>
      </Box>
      <DataGridContainer>
        {isLoadingMetrics ? <Skeleton variant='rect' height={500} /> :
          <DataGridPro
            loading={isLoadingMetrics}
            rows={allMetrics}
            columns={columns}
            checkboxSelection={false}
            editMode="row"
            hideFooter
            headerHeight={80}
            disableSelectionOnClick={true}
            components={{ Panel: CustomGridPanel }}
            disableColumnMenu
          />
        }
        <Snackbar
          open={successAlertOpen}
          autoHideDuration={4000}
          onClose={handleCloseAlert}
        >
          <Alert onClose={handleCloseAlert} severity="success">
            Metrics config were updated successfully!
          </Alert>
        </Snackbar>
        <Snackbar
          open={waitingAlertOpen}
          autoHideDuration={4000}
          onClose={handleCloseAlert}
        >
          <Alert onClose={handleCloseAlert} severity="info">
            Your changes are being saved...
          </Alert>
        </Snackbar>
        <Snackbar
          open={errorAlertOpen}
          autoHideDuration={3000}
          onClose={handleCloseAlert}
        >
          <Alert onClose={handleCloseAlert} severity="error">
            Error saving Metrics config.
          </Alert>
        </Snackbar>
      </DataGridContainer>
      <Box>
        <DataGridContainerCustomView>
          <CustomView
            customViewsData={allCustomViews || []}
            isLoading={isLoadingMetrics}
            control={control}
          />
        </DataGridContainerCustomView>
      </Box>
      <Box style={{ marginTop: 20, }}>
        <MetricsButtons
          onClick={handleSubmit(submitMetrics)}
          isSubmitting={false}
          backPath='/'
          backButtonProps={{
            path: '/',
            content: 'Back',
            buttonType: ButtonTypes.back,
            shouldRequestConfirmation: formState.isDirty,
          }}
          saveButtonProps={{
            disabled: !formState.isDirty,
            isSubmitting: formState.isSubmitting,
            defaultText: 'Save',
            submittingText: 'Saving',
          }}
        />
      </Box>
    </Box>
  );
}

export default Metrics;
