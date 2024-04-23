import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import Spinner
  from 'components/UI/MUIFormInput/components/MUIFormInputSpinner/MUIFormInputSpinner';
import { useSendTelemetry } from 'core/api/CustomerTelemetryClient';
import {
  FormProvider,
  useForm,
} from 'react-hook-form';
import DatePicker
  from 'views/Governance/views/GovernanceObeya/components/DatePicker';
import Input from 'views/Governance/views/GovernanceObeya/components/Input';
import {
  DependencyItem,
  MutateObeyaType,
  ObeyaResponse,
} from 'views/Governance/views/GovernanceObeya/hooks/useObeya';
import {
  ObeyaContextItem,
  useObeyaContexts,
} from 'views/Governance/views/GovernanceObeya/hooks/useObeyaContexts';
import * as yup from 'yup';

import { yupResolver } from '@hookform/resolvers/yup';
import { Grid } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import FormControl from '@material-ui/core/FormControl';
import Snackbar from '@material-ui/core/Snackbar';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

import FormButtons from '../ManageObjectives/components/FormButtons';
import AssociatedWorkItems from './components/AssociatedWorkItems';
import Autocomplete from './components/Autocomplete';
import GroupedOptions from './components/GroupedOptions';
import Select from './components/Select';
import {
  useAssociateWorkItemDependencies,
} from './hooks/useAssociateWorkItemDependencies';
import { useStyles } from './styles';
import { AssociateWorkItemDependency } from './types';
import useAuthentication from 'hooks/useAuthentication';
import { OBEYA_ROLES_ALLOW_ACCESS } from 'utils/routes';
import { DEFAULT_DATE_FORMAT } from 'utils/dateTime';
import { default as DependencyUpdateForm } from '../../views/Updates/components/UpdateForm/components/DependencyForm/DependencyForm';
import BaseModal from 'components/UI/BaseModal/BaseModal2';

const requiredMessage = 'This field is required';

type dateOfImpact = { dateOfImpact: Date; };

export type FormValues =
  Omit<DependencyItem, 'roomId' | 'orgId' | 'dependencyId' | 'dateOfImpact'>
  & dateOfImpact;

type Props = {
  hideModal: () => void;
  obeyaRoomId?: string;
  currentDependency?: DependencyItem;
  obeyaData: ObeyaResponse;
  mutateObeyaData?: MutateObeyaType;
};

export const DependencyForm = memo(({
  hideModal, obeyaRoomId, currentDependency
}: Props) => {

  const initialSelectedAssociateItems: string[] = (currentDependency?.associateWorkItemDependencies || [])
    ?.reduce((acc: string[], w: AssociateWorkItemDependency & { deletedAt?: null | string; }) => {
      if (w?.dependencyMapId && !w?.deletedAt) {
        acc.push(w?.dependencyMapId);
      }
      return acc;
    }, []);

  const [selectedAssociateWorkItems, setSelectAssociateWorkItems] = useState<string[]>(initialSelectedAssociateItems);
  const { data: teams, isLoading: isContextLoading, } = useObeyaContexts();

  const [isOpenUpdateModal, setOpenUpdateModal] = useState<boolean>(false);

  const classes = useStyles();

  // eslint-disable-next-line
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [successAlertOpen, setSuccessAlertOpen] = useState<boolean>(false);
  const [waitingAlertOpen, setWaitingAlertOpen] = useState<boolean>(false);
  const [errorAlertOpen, setErrorAlertOpen] = useState<boolean>(false);
  const [payload, setPayload] = useState<any>({});

  const sendTelemetry = useSendTelemetry();

  const teamOptions = teams.map((team: ObeyaContextItem) => ({
    teamName: team?.name ?? team?.contextId,
    teamId: team?.contextId,
    inputValue: team?.name,
  }));

  const handleCloseAlert = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setWaitingAlertOpen(false);
    setSuccessAlertOpen(false);
    setErrorAlertOpen(false);
  };

  const resolver: any = yupResolver(validationSchema);
  const methods = useForm<FormValues>({
    resolver,
    defaultValues: {
      blockedContextAddress: '',
      blockedName: '',
      blockerContextAddress: '',
      blockerName: '',
      severity: 'medium',
      name: '',
      summary: '',
      dateOfImpact: new Date(),
      status: '',
      enabledAssociatedItems: false,
    },
  });

  const {
    getValues,
    control,
    register,
    handleSubmit,
    formState,
    clearErrors,
    setValue,
  } = methods;
  const { errors, isSubmitting, isDirty } = formState;

  useEffect(() => {
    if (currentDependency?.dependencyId && !isDirty) {
      setValue('blockedContextAddress', currentDependency?.blockedContextAddress);
      setValue('blockedName', currentDependency?.blockedName);
      setValue('blockerContextAddress', currentDependency?.blockerContextAddress);
      setValue('blockerName', currentDependency?.blockerName);
      setValue('severity', currentDependency?.severity);
      setValue('name', currentDependency?.name);
      setValue('summary', currentDependency?.summary);
      setValue('dateOfImpact', new Date(currentDependency?.dateOfImpact));
      setValue('status', currentDependency?.status);
      setValue('enabledAssociatedItems', currentDependency?.enabledAssociatedItems);
    }
  }, [currentDependency?.dependencyId, isDirty, currentDependency?.blockerContextAddress, currentDependency?.blockedContextAddress]);

  const currentBlockerContextAddress = getValues().blockerContextAddress;
  const currentBlockedContextAdress = getValues().blockedContextAddress;

  // Logic to fetch associated work items on table
  const [shouldFetchAssociatedWorkItems, setFetchAssociatedWorkItems] = useState<boolean>(false);
  const shouldEnableAssociatedItems = getValues().enabledAssociatedItems;

  useEffect(() => {
    if (
      shouldEnableAssociatedItems &&
      !shouldFetchAssociatedWorkItems &&
      (
        currentDependency?.blockerContextAddress && currentDependency?.blockedContextAddress ||
        currentBlockerContextAddress && currentBlockedContextAdress
      )
    ) {
      setFetchAssociatedWorkItems(shouldEnableAssociatedItems);
    }
  }, [shouldEnableAssociatedItems, currentDependency?.blockerContextAddress, currentDependency?.blockedContextAddress]);

  const { data: associateWorkItemsDependencies, isLoadingAssociateWorkItemDependency } = useAssociateWorkItemDependencies(
    shouldFetchAssociatedWorkItems ? {
      obeyaRoomId,
      blockerContextId: currentBlockerContextAddress ?? currentDependency?.blockerContextAddress,
      blockedContextId: currentBlockedContextAdress ?? currentDependency?.blockedContextAddress,
    } : undefined);

  // identify associate work items that is already within currentDependency
  // and replace them on this list, because the list will show the same but with a fake uuid
  const mergedAssociatedWorkItems = (associateWorkItemsDependencies ?? [])
    .reduce((acc: AssociateWorkItemDependency[], defaultAssociateItem: AssociateWorkItemDependency) => {
      const foundTheSameAssociateWorkItem = (currentDependency?.associateWorkItemDependencies ?? [])
        .find(associateWorkItemDependecy => {
          return associateWorkItemDependecy.blockedWorkItemId === defaultAssociateItem.blockedWorkItemId &&
            associateWorkItemDependecy.blockerWorkItemId === defaultAssociateItem.blockerWorkItemId;
        });
      if (foundTheSameAssociateWorkItem) {
        acc.push(foundTheSameAssociateWorkItem);
      } else if (defaultAssociateItem.blockerContextId) {
        acc.push(defaultAssociateItem);
      }
      return acc;
    }, []);

  // get default values to each autocomplete
  const defaultBlockedTeamName = teamOptions
    .find(t => {
      if (
        (t.teamId === currentDependency?.blockedContextAddress && !currentBlockedContextAdress)
        || t.teamId === currentBlockedContextAdress
      ) {
        return true;
      }
      return false;
    });
  const defaultBlockerTeamName = teamOptions
    .find(t => {
      if (
        (t.teamId === currentDependency?.blockerContextAddress && !currentBlockerContextAddress)
        || t.teamId === currentBlockerContextAddress
      ) {
        return true;
      }
      return false;
    });

  const modalType = currentDependency?.dependencyId ? 'Edit' : 'Create a new';

  const { enabledAssociatedItems } = getValues();
  // const shouldDisableDependencyItems = (!blockedContextAddress && !blockerContextAddress);
  const toggleAssociateWorkItem = useCallback((selectedAssociateWorkItems) => {
    setSelectAssociateWorkItems(selectedAssociateWorkItems);
  }, [setSelectAssociateWorkItems]);


  const onSubmitDependency = async (data) => {

    const telemetryAction = currentDependency?.dependencyId ? 'UpdateDependency' : 'CreateDependency';

    sendTelemetry(
      telemetryAction,
      `${telemetryAction} - RoomId: ${obeyaRoomId}`,
      { page: 'obeya', widget: 'dependency' }
    );

    // set all workItems removed with a shouldBeDeleted Flag
    const associateWorkItemDependenciesList: AssociateWorkItemDependency[] = mergedAssociatedWorkItems
      .reduce((acc: AssociateWorkItemDependency[], associateWorkItemDependency: AssociateWorkItemDependency) => {
        if (
          associateWorkItemDependency?.dependencyMapId &&
          selectedAssociateWorkItems.includes(associateWorkItemDependency?.dependencyMapId)
        ) {
          acc.push(associateWorkItemDependency);
        } else {
          acc.push({ ...associateWorkItemDependency, shouldBeDeleted: true });
        }
        return acc;
      },
        []
      );

    const formData = {
      roomId: obeyaRoomId,
      ...data,
      associateWorkItemDependencies: associateWorkItemDependenciesList,
    };
    setPayload(formData);
    setOpenUpdateModal(true);
  };

  const selectedAssciateMemoizedItems = useMemo(() => selectedAssociateWorkItems, [selectedAssociateWorkItems]);

  const { isInRole } = useAuthentication();
  const allowObeyaAccess = isInRole(...OBEYA_ROLES_ALLOW_ACCESS);

  const afterSubmit = () => {
    setOpenUpdateModal(false);
    hideModal();
  };

  return (
    <Box>
      <Snackbar
        open={successAlertOpen}
        autoHideDuration={4000}
        onClose={handleCloseAlert}
      >
        <Alert onClose={handleCloseAlert} severity="success">
          {successMessage}
        </Alert>
      </Snackbar>
      <Snackbar
        open={waitingAlertOpen}
        autoHideDuration={40000}
        onClose={handleCloseAlert}
      >
        <Alert onClose={handleCloseAlert} severity="info">
          Your changes are being saved...
        </Alert>
      </Snackbar>
      <Snackbar
        open={errorAlertOpen}
        autoHideDuration={4000}
        onClose={handleCloseAlert}
      >
        <Alert onClose={handleCloseAlert} severity="error">
          Error saving this dependency.
        </Alert>
      </Snackbar>
      <Box>
        <Box display="flex" alignSelf="flex-start" mt={3}>
          <Typography variant="h5" className={classes.title}>
            {modalType} dependency
          </Typography>
        </Box>
        <Box>
          <FormProvider {...methods}>
            <form
              name="dependencyForm"
              autoComplete="off"
              noValidate
              onSubmit={handleSubmit(onSubmitDependency)}
            >
              <Box mb={2}>
                <Input
                  {...register('name')}
                  required
                  label="Dependency Name"
                  fullWidth
                  name="name"
                  placeholder="Dependency Name"
                  control={control}
                  className={classes.input}
                  errors={errors}
                  customStyles={{ marginBottom: 16 }}
                  disabled={!allowObeyaAccess}
                />
                <Box className={classes.wrapperTextArea}>
                  <TextField
                    placeholder="Description"
                    label="Description"
                    multiline
                    fullWidth
                    rows={5}
                    defaultValue={currentDependency?.summary || ''}
                    variant="outlined"
                    className={classes.input}
                    name="summary"
                    error={!!errors?.['summary']}
                    helperText={errors?.['summary'] ? errors?.['summary']?.message : ''}
                    onChange={(event) => {
                      setValue('summary', event.target.value);
                      clearErrors('summary');
                    }}
                    disabled={!allowObeyaAccess}
                  />
                </Box>
                <Box className={classes.wrapperTextArea}>
                  <Typography className={classes.statusLabel}>Severity: </Typography>
                  <GroupedOptions
                    name="severity"
                    control={control}
                    defaultValue={currentDependency?.severity}
                    disabled={!allowObeyaAccess}
                  />
                </Box>
                <Box mb={2} className={!errors?.blockedName ? classes.wrapperAutoComplete : ''}>
                  <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Box>
                      <Autocomplete
                        name="blockedContextAddress"
                        label="Enter the blocked board name"
                        inputOptions={teamOptions}
                        defaultValue={defaultBlockedTeamName || ''}
                        onChange={(value) => {
                          setValue('blockedContextAddress', value?.teamId);
                          setValue('blockedName', value?.teamName);
                          clearErrors('blockedContextAddress');
                          clearErrors('blockedName');
                        }}
                        error={!!errors?.blockedName}
                        errorMessage={errors?.blockedName ? requiredMessage : ''}
                        disabled={!allowObeyaAccess}
                      />
                      <Spinner
                        isVisible={isContextLoading}
                        style={{
                          top: errors?.blockedName ? -36 : -20,
                          right: -7,
                        }}
                      />
                    </Box>
                    <Box className={classes.dependsOnLabel}>depends on</Box>
                    <Box>
                      <Autocomplete
                        name="blockerContextAddress"
                        label={"Enter the blocker team name"}
                        inputOptions={teamOptions}
                        defaultValue={defaultBlockerTeamName || ''}
                        onChange={(value) => {
                          setValue('blockerContextAddress', value?.teamId);
                          setValue('blockerName', value?.teamName);
                          clearErrors('blockerContextAddress');
                          clearErrors('blockerName');
                        }}
                        error={!!errors?.blockerName}
                        errorMessage={errors?.blockerName ? requiredMessage : ''}
                        disabled={!allowObeyaAccess}
                      />
                      <Spinner
                        isVisible={isContextLoading}
                        style={{
                          top: errors?.blockerName ? -36 : -20,
                          right: -7,
                        }}
                      />
                    </Box>
                  </Box>
                </Box>
                {/* <Box className={classes.wrapperTextArea}>
                  <Typography className={classes.statusLabel}>Associate work item dependencies:
                    <Controller
                      name="enabledAssociatedItems"
                      render={({ field }) => (
                        (allowObeyaAccess) ? 
                        <Switch
                          color="primary"
                          {...field}
                          disabled={shouldDisableDependencyItems}
                          checked={field.value}
                        /> :
                        <Switch
                          color="primary"
                          {...field}
                          disabled={true}
                          checked={field.value}
                        />
                      )}
                    />
                  </Typography>
                </Box> */}
                <Box mt={2} mb={2}>
                  {enabledAssociatedItems && (
                    <AssociatedWorkItems
                      data={mergedAssociatedWorkItems}
                      onSelect={toggleAssociateWorkItem}
                      selectionModel={selectedAssciateMemoizedItems}
                      isLoading={isLoadingAssociateWorkItemDependency}
                    />
                  )}
                </Box>
                <Box className={classes.wrapperStatus} mb={3}>
                  <Typography className={classes.statusLabel}>Status: </Typography>
                  <FormControl
                    error={!!errors?.status}
                    disabled={!allowObeyaAccess}>
                    <Select
                      {...register('status')}
                      className={classes.status}
                      required
                      displayEmpty
                      name="status"
                      defaultValue={currentDependency?.status}
                      error={!!errors?.status}
                      control={control}
                      errors={errors}
                      clearErrors={clearErrors}
                    />
                  </FormControl>
                </Box>
                <Box className={classes.wrapperDateOfEffect}>
                  <DatePicker
                    {...register('dateOfImpact')}
                    label={<span className={classes.dateOfEffectLabel}>Date Of Impact: </span>}
                    format={DEFAULT_DATE_FORMAT}
                    placeholder="Selected Date"
                    margin="normal"
                    name="dateOfImpact"
                    defaultValue={currentDependency?.dateOfImpact}
                    value={getValues().dateOfImpact}
                    control={control}
                    errors={errors}
                    clearErrors={clearErrors}
                    disabled={!allowObeyaAccess}
                  />
                </Box>
              </Box>
              <Grid container spacing={1}>
                <Grid item xs={12} container direction="column">
                  <FormButtons
                    hideModal={hideModal}
                    isSubmitting={isSubmitting || waitingAlertOpen}
                    errors={errors}
                    isDirty={isDirty}
                  />
                </Grid>
              </Grid>
            </form>
          </FormProvider>
        </Box>
      </Box>
      <BaseModal
        title='New update'
        open={isOpenUpdateModal}
        setOpen={setOpenUpdateModal}
        customStyle={{
          width: 840,
        }}
      >
        <DependencyUpdateForm
          placeholder="Write a post"
          activePlaceholder="Post your update. You've got 280 characters, so keep it concise. You can include more details with a note."
          payload={payload}
          defaultDateOfImpact={payload.dateOfImpact}
          defaultSeverity={payload.severity}
          defaultStatus={payload.status}
          afterSubmit={afterSubmit}
          dependency={currentDependency || {
            blockedName: '',
            blockerName: '',
            severity: '',
            name: "",
            summary: "",
            dateOfImpact: "",
            status: ""
          }}
          action={currentDependency ? 'edit' : 'create'}
        />
      </BaseModal>
    </Box>
  );
});

const validationSchema = yup.object().shape({
  blockedName: yup.string().required(requiredMessage),
  blockerName: yup.string().required(requiredMessage),
  severity: yup.string().required(requiredMessage),
  name: yup.string().required(requiredMessage),
  dateOfImpact: yup.date().required(requiredMessage),
  status: yup.string().required(requiredMessage),
});


function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
