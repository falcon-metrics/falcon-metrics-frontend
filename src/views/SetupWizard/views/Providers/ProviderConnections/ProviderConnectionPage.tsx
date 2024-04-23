import { BaseSyntheticEvent } from 'react';

import Container from 'components/PageContainer/PageContainer';
import {
  SubmitErrorHandler,
  SubmitHandler,
  useController,
  useForm,
} from 'react-hook-form';
import WizardFormProvider from 'views/SetupWizard/components/WizardFormProvider/WizardFormProvider';

import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';

import InputWithTooltip from '../InputWithTooltip';
import ProviderConnection from './interfaces/ProviderConnection';
import useStyles from './ProviderConnectionPage.styles';
import Providers from 'views/SetupWizard/interfaces/Providers';
import { useSeedData } from 'views/SetupWizard/utils/utils';
import { UserGuideContent, UserGuideKey } from 'components/UserGuide/UserGuideContent';

export type FormValues = {
  username: string;
  password: string;
  namespace: string;
  serviceUrl: string;
};

export type Props = {
  defaultValues: Partial<FormValues>;
  submit: (data: FormValues) => Promise<any>;
  connection: ProviderConnection;
};

function Input({ name, rules, defaultValue, control, ...props }: any) {
  const {
    field: { ref, ...inputProps },
    fieldState: { error, invalid },
  } = useController({ name, rules, defaultValue, control });

  return (
    <TextField
      {...inputProps}
      inputRef={ref}
      error={invalid}
      helperText={invalid && error}
      {...props}
    />
  );
}

const ProviderConnectionPage = ({
  submit,
  defaultValues,
  connection,
}: Props) => {
  const classes = useStyles();
  const methods = useForm<FormValues>({
    defaultValues,
  });
  const { control, handleSubmit, formState, watch } = methods;

  useSeedData();

  const onValid: SubmitHandler<FormValues> = (data) => {
    const payload = data;
    const namespace = data.namespace ?? defaultValues.namespace;
    payload.namespace = connection.getNameSpace(namespace);
    payload.serviceUrl = connection.getNormalizedURL(namespace);

    return submit(payload);
  };

  const onInvalid: SubmitErrorHandler<FormValues> = (errors, event) => {
    console.log({ errors, event });
  };

  const currentURL = watch('namespace') ?? '';
  const normalizedURL = connection.getNormalizedURL(
    (currentURL || defaultValues.namespace) ?? '',
  );

  const urlToTokenPage = connection.getUrlToAPITokenPage(currentURL);

  const onSubmit = (e: BaseSyntheticEvent) => {
    const namespace = connection.getNameSpace(
      e.target.elements.namespace.value,
    );
    return handleSubmit(
      onValid,
      onInvalid,
    )(e).then(() => ({
      params: {
        namespace,
      },
    }));
  };

  const isJiraServer = () => {
    return connection.providerSlug === Providers.JIRA_SERVER;
  };

  const isKanbanize = () => {
    return connection.providerSlug === Providers.KANBANIZE;
  };

  return (
    <>
      {formState.isSubmitting && (
        <LinearProgress className={classes.progress} />
      )}
      <Container.Wizard
        title={UserGuideContent[UserGuideKey.DATASOURCE].title}
        userGuideId={isKanbanize() ? UserGuideKey.KANBANIZE_DATASOURCE : UserGuideKey.DATASOURCE}>
        <WizardFormProvider
          hookFormMethods={methods}
          noValidate
          autoComplete="off"
          onSubmit={onSubmit}
        >
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <Input
                fullWidth
                required
                name="namespace"
                defaultValue={normalizedURL}
                label="Datasource URL"
                disabled={!!defaultValues.namespace}
                control={control}
                helperText={normalizedURL}
              />
            </Grid>
            {/* Username/Email Address is not required for Kanbanize */}
            {!isKanbanize() &&
              <Grid item xs={6}>
                <InputWithTooltip
                  control={control}
                  fullWidth
                  required
                  name="username"
                  label={isJiraServer() ? "Username" : "Email Address"}
                  tooltipStyle={{ position: 'absolute', top: 46, left: 118 }}
                  tooltipContent={
                    <>
                      <Box p={1} className={classes.emailHintText}>
                        <span>
                          <CloseIcon
                            style={{ fontSize: 14, cursor: 'pointer' }}
                          />
                        </span>
                        <Typography variant="body2">
                          {isJiraServer() ? "Username" : "Email Address"} used for selected
                          <br />
                          data-source log in.
                        </Typography>
                      </Box>
                    </>
                  }
                />
              </Grid>}
            {/* Jira Server uses Password, the rest uses api key/token */}
            <Grid item xs={isKanbanize() ? 12 : 6}>
              <InputWithTooltip
                fullWidth
                required
                type="password"
                name="password"
                label={isJiraServer() ? "Password" : isKanbanize() ? "API Key" : "Personal Access Token"}
                control={control}
                showTooltip={isKanbanize() ? false : true}
                tooltipStyle={{ position: 'absolute', top: 46, left: 150 }}
                tooltipContent={
                  !isKanbanize() &&
                  (<>
                    <Box p={1} bgcolor="#335da9">
                      <span
                        style={{
                          position: 'absolute',
                          right: 2,
                          top: 2,
                          fontSize: 10,
                          textDecoration: 'none',
                        }}
                      >
                        <CloseIcon
                          style={{ fontSize: 14, cursor: 'pointer' }}
                        />
                      </span>
                      <Typography variant="body2">
                        Don&apos;t have a Personal Access Token or API token?
                        <br />
                        <br />
                        <a
                          href={urlToTokenPage}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={classes.tokenLink}
                        >
                          Click here and get one
                        </a>
                        <br />
                      </Typography>
                      <div style={{ height: 8 }}></div>
                    </Box>
                  </>)
                }
              />
            </Grid>
          </Grid>
        </WizardFormProvider>
      </Container.Wizard>
    </>
  );
};

export default ProviderConnectionPage;
