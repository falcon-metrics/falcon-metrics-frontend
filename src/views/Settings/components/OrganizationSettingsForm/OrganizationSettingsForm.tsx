import {
  ReactNode,
  useEffect,
  useMemo,
  useState,
} from 'react';

import FormLocker from 'components/UI/FormLocker';
import { useSendTelemetry } from 'core/api/CustomerTelemetryClient';
import { OrganizationSettings } from 'hooks/fetch/useOrganizationSettings';
import { useSnackbar } from 'notistack';
import {
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import {
  organizationSettingsFormId,
} from 'views/Settings/OrganizationSettings';

import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

import DashboardSettings
  from './components/DashboardSettings/DashboardSettings';
import SecuritySettings from './components/SecuritySettings';
import ItemAgeSettings from './components/ItemAgeSettings';
import WorkItemSettings from './components/WorkItemSettings';
import { Props } from './OrganizationSettingsForm.data';
import useStyles from './OrganizationSettingsForm.styles';

const OrganizationSettingsForm = ({
  setFormStateOnParent,
  defaultValues,
  submit,
}: Props) => {
  const [logo, setLogo] = useState<File>();
  const methods = useForm<OrganizationSettings>({ defaultValues });

  const { formState, handleSubmit, setValue, reset } = methods;


  const classes = useStyles();
  const sendTelemetry = useSendTelemetry();
  const { enqueueSnackbar } = useSnackbar();
  const [openErrorMessage, setOpenErrorMessage] = useState(false);


  useEffect(() => {
    sendTelemetry(
      'AccessedOrganizationSettings',
      'User accessed organization settings',
      { page: 'org-settings' }
    );
  }, [sendTelemetry]);

  setValue('timezone', 'UTC');

  const onValid: SubmitHandler<OrganizationSettings> = async (data) => {
    data.timezone = 'UTC';

    const payload = { ...data };

    return submit?.(payload, logo)
      .then(async () => {
        enqueueSnackbar('Organization settings updated succesfully!', {
          variant: 'success',
          persist: false,
        });
        reset(undefined, { keepValues: true });
        setLogo(undefined);
        sendTelemetry(
          'ConfiguredOrganizationSettings',
          `User configured organization settings: ${JSON.stringify(payload)}`,
        );

      })
      .catch((error) => {
        console.debug(error.toJSON());
        setOpenErrorMessage(true);
      });
  };

  const onInvalid: SubmitErrorHandler<OrganizationSettings> = (
    errors,
    event,
  ) => {
    console.log({ errors, event });
  };

  function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const handleClose = (_event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenErrorMessage(false);
  };

  const isDirty = formState.isDirty || !!logo;
  useEffect(() => {
    setFormStateOnParent({
      isSubmitting: formState.isSubmitting,
      isDirty
    });
  }, [setFormStateOnParent, isDirty, formState.isSubmitting]);

  const sections: { title: string; children: ReactNode; }[] = useMemo(() => {
    const defaultPortfolioNumberOfDays = defaultValues?.staledItemPortfolioLevelNumberOfDays ?? '60';
    const defaultTeamNumberOfDays = defaultValues?.staledItemTeamLevelNumberOfDays ?? '14';
    const defaultIndividualContributorNumberOfDays = defaultValues?.staledItemIndividualContributorNumberOfDays ?? '7';
    return [
      {
        title: 'Work Items Settings',
        children: (
          <WorkItemSettings
            defaultPortfolioNumberOfDays={defaultPortfolioNumberOfDays}
            defaultIndividualContributorNumberOfDays={defaultIndividualContributorNumberOfDays}
            defaultTeamNumberOfDays={defaultTeamNumberOfDays}
          />
        ),
      },
      {
        title: 'Lead Time Settings',
        children: <ItemAgeSettings />
      },
      {
        title: 'Dashboard Settings',
        children: (
          <DashboardSettings
            setLogo={setLogo}
            defaultLogoUrl={defaultValues.logoUrl ?? ''}
          />
        ),
      },
      {
        title: 'Security Settings',
        children: <SecuritySettings />,
      },
    ];
  }, [setLogo, defaultValues.logoUrl, defaultValues.staledItemNumberOfDays]);

  return (
    <FormProvider {...methods}>
      <Snackbar
        open={openErrorMessage}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="error">
          Error saving Settings.
        </Alert>
      </Snackbar>
      <form
        id={organizationSettingsFormId}
        autoComplete="off"
        onSubmit={handleSubmit(onValid, onInvalid)}
        className={classes.form}
      >
        <FormLocker isLocked={formState.isSubmitting}>
          <div className={classes.sectionContainer}>
            {sections.map(({ title, children }) => (
              <Accordion key={title} expanded className={classes.accordion}>
                <AccordionSummary className={classes.accordionSummary}>
                  {title}
                </AccordionSummary>
                <AccordionDetails className={classes.accordion}>
                  <br />
                  {children}
                </AccordionDetails>
              </Accordion>
            ))}
          </div>
        </FormLocker>
      </form>
    </FormProvider>
  );
};

export default OrganizationSettingsForm;
