import React, {
  useEffect,
  useState,
} from 'react';

import Spinner
  from 'components/UI/MUIFormInput/components/MUIFormInputSpinner/MUIFormInputSpinner';
import { useSendTelemetry } from 'core/api/CustomerTelemetryClient';
import {
  FormProvider,
  useForm,
} from 'react-hook-form';
import NumberFormat from 'react-number-format';
import Input from 'views/Governance/views/GovernanceObeya/components/Input';
import {
  ObeyaResponse
} from 'views/Governance/views/GovernanceObeya/hooks/useObeya';
import {
  ObeyaContextItem
} from 'views/Governance/views/GovernanceObeya/hooks/useObeyaContexts';
import * as yup from 'yup';

import { yupResolver } from '@hookform/resolvers/yup';
import { Grid } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import FormControl from '@material-ui/core/FormControl';
import InputAdornment from '@material-ui/core/InputAdornment';
import Snackbar from '@material-ui/core/Snackbar';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

import FormButtons from '../ManageObjectives/components/FormButtons';
import Autocomplete from './components/Autocomplete';
import HelpPopover from './components/HelpPopover';
import Select from './components/Select';
import { useStyles } from './styles';
import { RiskItem } from './types';
import useAuthentication from 'hooks/useAuthentication';
import { OBEYA_ROLES_ALLOW_ACCESS } from 'utils/routes';
import BaseModal from 'components/UI/BaseModal/BaseModal2';
import { default as RiskUpdateForm } from '../../views/Updates/components/UpdateForm/components/RiskForm/RiskForm';

const requiredMessage = 'This field is required';

export type FormValues = Omit<RiskItem, 'RiskId'>;

type Props = {
  hideModal: () => void;
  obeyaRoomId?: string;
  currentRisk?: RiskItem,
  obeyaData: ObeyaResponse,
  teams: ObeyaContextItem[],
  isContextLoading: boolean;
};

export const RiskForm = ({ hideModal, obeyaRoomId, currentRisk, teams, isContextLoading }: Props) => {
  const classes = useStyles();

  // eslint-disable-next-line
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [successAlertOpen, setSuccessAlertOpen] = useState<boolean>(false);
  const [waitingAlertOpen, setWaitingAlertOpen] = useState<boolean>(false);
  const [errorAlertOpen, setErrorAlertOpen] = useState<boolean>(false);

  const [isOpenUpdateModal, setOpenUpdateModal] = useState<boolean>(false);
  const [payload, setPayload] = useState<any>({});

  const sendTelemetry = useSendTelemetry();

  const teamOptions = teams.map((team: ObeyaContextItem) => ({
    teamName: team?.name || team?.contextId,
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

  const onSubmitRisk = async (data) => {

    console.log("here");
    const telemetryAction = currentRisk?.riskId ? 'UpdateRisk' : 'CreateRisk';

    sendTelemetry(
      telemetryAction,
      `${telemetryAction} - RoomId: ${obeyaRoomId}`,
      { page: 'obeya', widget: 'risk', item: 'settings' }
    );

    const formData = {
      roomId: obeyaRoomId,
      ...data,
    };
    setPayload(formData);
    setOpenUpdateModal(true);
  };

  const afterSubmit = () => {
    setOpenUpdateModal(false);
    hideModal();
  };

  const resolver: any = yupResolver(validationSchema);
  const methods = useForm<FormValues>({
    resolver,
    defaultValues: {
      name: '',
      ownerName: '',
      description: '',
      owner: '',
      likelihood: 0,
      impactOnCost: 0,
      impactOnSchedule: 0,
      riskExposureDays: 0,
      riskExposureAmount: 0,
      status: 'open',
    },
  });

  const {
    control,
    register,
    handleSubmit,
    formState,
    clearErrors,
    getValues,
    setValue,
  } = methods;
  const { errors, isSubmitting, isDirty } = formState;
  const { riskExposureDays, riskExposureAmount, impactOnCost, impactOnSchedule, likelihood } = getValues();

  useEffect(() => {
    if (currentRisk?.riskId && !isDirty) {
      setValue('name', currentRisk?.name);
      setValue('ownerName', currentRisk?.ownerName);
      setValue('description', currentRisk?.description);
      setValue('owner', currentRisk?.owner);
      setValue('likelihood', currentRisk?.likelihood);
      setValue('impactOnCost', currentRisk?.impactOnCost);
      setValue('impactOnSchedule', currentRisk?.impactOnSchedule);
      setValue('riskExposureDays', currentRisk?.riskExposureDays);
      setValue('riskExposureAmount', currentRisk?.riskExposureAmount);
      setValue('status', currentRisk?.status);
    }
  }, [currentRisk?.riskId, isDirty]);

  useEffect(() => {
    setValue('riskExposureDays', impactOnSchedule || 0);
    setValue('riskExposureAmount', ((likelihood && impactOnCost ? Math.round(impactOnCost * (likelihood / 100)) : 0)));
  }, [impactOnCost, impactOnSchedule, likelihood]);

  const defaultowner = teamOptions
    .find(t => t.teamId === currentRisk?.owner);

  const modalType = currentRisk?.riskId ? 'Edit' : 'Create a new';

  const { isInRole } = useAuthentication();
  const allowObeyaAccess = isInRole(...OBEYA_ROLES_ALLOW_ACCESS);


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
          Error saving this risk.
        </Alert>
      </Snackbar>
      <Box>
        <Box display="flex" alignSelf="flex-start" mt={3}>
          <Typography variant="h5" className={classes.title}>
            {modalType} risk
          </Typography>
        </Box>
        <Box>
          <FormProvider {...methods}>
            <form
              name="Form"
              autoComplete="off"
              noValidate
              onSubmit={handleSubmit(onSubmitRisk, (error) => console.log(error))}
            >
              <Box>
                <Input
                  {...register('name')}
                  required
                  fullWidth
                  label="Name"
                  name="name"
                  placeholder="Name*"
                  control={control}
                  className={classes.input}
                  errors={errors}
                  customStyles={{ marginBottom: 16 }}
                  disabled={!allowObeyaAccess}
                />
                <Box>
                  <TextField
                    {...register('description')}
                    placeholder="Description"
                    label="Description"
                    name=""
                    multiline
                    fullWidth
                    rows={5}
                    defaultValue={currentRisk?.description || ''}
                    variant="outlined"
                    className={classes.input}
                    error={!!errors?.description}
                    helperText={errors?.description ? errors?.description?.message : ''}
                    onChange={(event) => {
                      setValue('description', event.target.value);
                      clearErrors('description');
                    }}
                    disabled={!allowObeyaAccess}
                  />
                </Box>
                <Box className={!errors?.owner ? classes.wrapperAutoComplete : ''}>
                  <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Box>
                      <Autocomplete
                        name="ownerName"
                        label="Owner*"
                        inputOptions={teamOptions}
                        defaultValue={defaultowner || ''}
                        onChange={(value) => {
                          setValue('owner', value?.teamId);
                          setValue('ownerName', value?.teamName);
                          clearErrors('owner');
                          clearErrors('ownerName');
                        }}
                        error={!!errors?.owner}
                        errorMessage={errors?.owner ? requiredMessage : ''}
                        disabled={!allowObeyaAccess}
                      />
                      <Spinner
                        isVisible={isContextLoading}
                        style={{
                          top: errors?.owner ? -36 : -20,
                          right: -7,
                        }}
                      />
                    </Box>
                  </Box>
                </Box>
                <Box mb={1}>
                  <Input
                    {...register('likelihood')}
                    required
                    name="likelihood"
                    label="Likelihood"
                    placeholder="Likelihood*"
                    control={control}
                    type="number"
                    className={`${classes.input} ${classes.inputMedium}`}
                    errors={errors}
                    customStyles={{ marginBottom: 16 }}
                    InputProps={{
                      inputProps: { min: 0, max: 100 },
                      endAdornment: (
                        <InputAdornment position="end">
                          <span className={classes.percentSymbol}>%</span>
                        </InputAdornment>
                      ),
                    }}
                    disabled={!allowObeyaAccess}
                  />
                </Box>
                <Box>
                  <Input
                    {...register('impactOnSchedule')}
                    required
                    label="Impact on Schedule (in days)"
                    name="impactOnSchedule"
                    placeholder="Impact on Schedule (in days)"
                    control={control}
                    type="number"
                    className={`${classes.input} ${classes.inputMedium}`}
                    errors={errors}
                    customStyles={{ marginBottom: 16 }}
                    helpText={<span className={classes.defaultFont}>Please fill <b>Impact on schedule</b> or <b>Impact on cost</b> or both</span>}
                    disabled={!allowObeyaAccess}
                  />
                  <Input
                    {...register('impactOnCost')}
                    required
                    label="Impact on Cost (amount)"
                    name="impactOnCost"
                    placeholder="Impact on Cost (amount)"
                    control={control}
                    type="number"
                    className={`${classes.input} ${classes.inputMedium}`}
                    errors={errors}
                    customStyles={{ marginLeft: 20, }}
                    disabled={!allowObeyaAccess}
                  />
                </Box>
                <Box className={classes.wrapperStatus} mb={1} display="flex" alignItems="center">
                  <span className={classes.statusLabel}>Risk Exposure:</span>
                  &nbsp;&nbsp; <span className={classes.riskExposureLabel}>{riskExposureDays} days</span>
                  &nbsp;&nbsp;
                  <span className={classes.riskExposureLabel}>
                    <NumberFormat
                      value={riskExposureAmount ? Number(Number(riskExposureAmount).toFixed(2)) : 0}
                      displayType={'text'}
                      thousandSeparator={true}
                      prefix={'$'}
                    />
                    {' '}
                    amount
                  </span>
                  &nbsp;&nbsp;
                  <HelpPopover
                    className={classes.helpRiskExposureRiskIcon}
                    helpText="Risk exposure is auto calculated based on Likelihood, Impact in days and amount of impact in cost."
                  />
                </Box>
                <Box className={classes.wrapperStatus} mb={1}>
                  <Typography className={classes.statusLabel}>Status: </Typography>
                  <FormControl
                    error={!!errors?.status}
                    disabled={!allowObeyaAccess}>
                    <Select
                      {...register('status')}
                      className={`${classes.input} ${classes.inputMedium}`}
                      required
                      displayEmpty
                      name="status"
                      defaultValue={currentRisk?.status || 'open'}
                      error={!!errors?.status}
                      control={control}
                      errors={errors}
                      clearErrors={clearErrors}
                    />
                  </FormControl>
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
        <RiskUpdateForm
          placeholder="Write a post"
          activePlaceholder="Post your update. You've got 280 characters, so keep it concise. You can include more details with a note."
          payload={payload}
          defaultImpactOnCost={payload.impactOnCost}
          defaultLikelihood={payload.likelihood}
          defaultImpactOnSchedule={payload.impactOnSchedule}
          defaultStatus={payload.status}
          risk={currentRisk || {
            riskId: '',
            name: '',
            description: '',
            riskExposureAmount: 0,
            riskExposureDays: 0,
            status: ''
          }}
          afterSubmit={afterSubmit}
          action={currentRisk ? 'edit' : 'create'}
        />
      </BaseModal>
    </Box>
  );
};

const positiveNumberMessage = 'The minimum value must be a positive number';

const validationSchema = yup.object().shape({
  name: yup.string().required(requiredMessage),
  ownerName: yup.string().required(requiredMessage),
  likelihood: yup.number().required(requiredMessage)
    .min(0, positiveNumberMessage).max(100, 'Must be a value less than 100.'),
  impactOnCost: yup.number().required(requiredMessage).min(0, positiveNumberMessage),
  impactOnSchedule: yup.number().required(requiredMessage).min(0, positiveNumberMessage),
  status: yup.string().required(requiredMessage),
});

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
