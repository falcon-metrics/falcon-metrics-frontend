import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import LinearProgress from '@material-ui/core/LinearProgress';

import FormTextInput from 'components/UI/FormTextInput';
import FormCheckBox from 'components/UI/BaseCheckBox';
import Box from '@material-ui/core/Box';
import InputLabel from '@material-ui/core/InputLabel';
import Link from '@material-ui/core/Link';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Tooltip from '@material-ui/core/Tooltip';
import useProfile from 'hooks/useProfile';
import './style.css';
import { ReactComponent as ArrowGreen } from 'assets/icons/arrow_green.svg';
import { ReactComponent as ArrowBlue } from 'assets/icons/arrow_lightblue.svg';
import { ReactComponent as ArrowDarkBlue } from 'assets/icons/arrow_darkblue.svg';

import {useSendTelemetry} from 'core/api/CustomerTelemetryClient';
import useStyles from './SignupPage.styles';
import { useState } from 'react';

export type FormValues = {
  userFirstName: string;
  userLastName: string;
  userEmail?: string;
  userRole: string;
  orgName: string;
  orgEnterprise: string;
  orgCompanySize: string;
  userAcceptTermsAndConditions: boolean;
  userOptInNewsletter: boolean;
  referenceCode: string;
  contactForDemo: boolean;
  needHelp: boolean;
};

export type Props = {
  submit: (data: FormValues) => Promise<any>;
};

const SignupPage = ({ submit }: Props) => {
  const classes = useStyles();
  const {
    control,
    setValue,
    handleSubmit,
    formState,
    setError,
    watch,
  } = useForm<FormValues>({
    mode: 'onBlur',
  });

  const [value, setCompanySizeValue] = useState('50-200');
  const [submitting, setSubmitting] = useState(false);
  const sendTelemetry = useSendTelemetry();
  const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    setValue('orgCompanySize', newValue);
    setCompanySizeValue(newValue);
  };
  setValue('orgCompanySize', value);

  const { data: profile } = useProfile();
  setValue('userEmail', profile?.email);

  const onValid: SubmitHandler<FormValues> = async (data) => {
    setSubmitting(true);
    data.userEmail = profile?.email;
    submit(data)
      .then(() => {
        window.location.href = '/';
      })
      .catch((error) => {
        setSubmitting(false);
        console.debug(error.toJSON());
        console.debug(error.response.data);
        const errorsJson = JSON.parse(error.response.data);
        const errorsArray = errorsJson.map(({ message }) => ({ message }));

        if (errorsArray) {
          errorsArray.forEach((element) => {
            switch (element.message) {
              case 'id must be unique':
              case 'orgId must be unique':
                setError('orgName', {
                  message:
                    'Business Unit already in use, please enter another business unit',
                });
                break;
            }
          });
        }
      });
    sendTelemetry('Signup', 'User signed up', {page: 'sign-up'});
  };

  const onInvalid: SubmitErrorHandler<FormValues> = (errors, event) => {
    setSubmitting(false);
    console.log({ errors, event });
  };

  return (
    <>
      {formState.isSubmitting && (
        <LinearProgress className={classes.progress} />
      )}
      <Container component="main" maxWidth="sm" className={classes.main}>
        <Grid container>
          <Grid item xs={12}>
            {/* Insert your logo */}
          </Grid>
          <Grid item xs={12}>
            <Typography
              noWrap
              display="inline"
              className={classes.trialLabel}
              align="center"
            >
              Unlock free
            </Typography>
            <Typography
              noWrap
              display="inline"
              className={classes.trialLabelGreen}
              align="center"
            >
              7-day
            </Typography>
            <Typography
              noWrap
              display="inline"
              className={classes.trialLabel}
              align="center"
            >
              demo access
            </Typography>
          </Grid>

          <Grid item xs={12} style={{ paddingTop: '60px' }}>
            <Grid container spacing={1}>
              <Box style={{ display: 'inline-flex', minHeight: '50px' }}>
                <Box>
                  <ArrowGreen title="arrowGreen" />
                </Box>
                <Box pl={2}>
                  <Typography className={classes.trialLabelBulletPoints}>
                    During 7-day demo access you can explore the analytics
                    dashboard with sample data.
                  </Typography>
                </Box>
              </Box>
              <Box style={{ display: 'inline-flex', minHeight: '50px' }}>
                <Box>
                  <ArrowBlue title="arrowBlue" />
                </Box>
                <Box pl={2}>
                  <Typography className={classes.trialLabelBulletPoints}>
                    Connect your own data to start your 14-day free trial and
                    experience the full capability of Falcon Metrics.
                  </Typography>
                </Box>
              </Box>
              <Box style={{ display: 'inline-flex', minHeight: '50px' }}>
                <Box>
                  <ArrowDarkBlue title="arrowDarkBlue" />
                </Box>
                <Box pl={2}>
                  <Typography className={classes.trialLabelBulletPoints}>
                    If you decide not to subscribe at the conclusion of 14-day
                    trial, your data will be deleted after 30 days.
                  </Typography>
                </Box>
              </Box>
              <Grid item xs={12} style={{ paddingTop: '50px' }}>
                <Typography className={classes.trialLabelBig}>
                  Please complete your registration to unlock the 7-day demo
                  access to Falcon Metrics.
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Paper component="section" className={classes.section}>
          <form onSubmit={handleSubmit(onValid, onInvalid)}>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                {/*1st box: Personal Information */}
                <Paper component="section" className={classes.sectionLabel}>
                  <Typography className={classes.sectionPaperLabel}>
                    Personal Information
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <FormTextInput
                        fullWidth
                        required
                        name="userFirstName"
                        control={control}
                        label="First Name"
                        inputProps={{ maxLength: 150 }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <FormTextInput
                        fullWidth
                        required
                        name="userLastName"
                        control={control}
                        label="Last Name"
                        inputProps={{ maxLength: 150 }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FormTextInput
                        fullWidth
                        required
                        name="userRole"
                        control={control}
                        label="Role"
                        inputProps={{ maxLength: 250 }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FormTextInput
                        fullWidth
                        required
                        name="userEmail"
                        type="email"
                        control={control}
                        label="E-mail Address"
                        disabled
                        inputProps={{ maxLength: 250 }}
                        //helperText={'Eg. lee@example.com'}
                      />
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
              <Grid item xs={12}>
                {/*2nd Box: Company Information */}
                <Paper component="section" className={classes.sectionLabel}>
                  <Typography className={classes.sectionPaperLabel}>
                    Company Information
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <FormTextInput
                        fullWidth
                        required
                        name="orgEnterprise"
                        control={control}
                        label="Company Name"
                        inputProps={{ maxLength: 150 }}
                        helperText={'Eg. Falcon Metrics'}
                      />
                    </Grid>
                    <Grid item xs={9}>
                      <FormTextInput
                        fullWidth
                        required
                        name="orgName"
                        control={control}
                        label="Business Unit"
                        autoComplete="off"
                        inputProps={{ maxLength: 250 }}
                        error={!!formState.errors.orgName}
                        helperText={
                          formState.errors.orgName
                            ? formState.errors.orgName.message
                            : 'Eg. Marketing, Sales …'
                        }
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <FormTextInput
                        fullWidth
                        name="referenceCode"
                        control={control}
                        label="Referral Code"
                        inputProps={{ maxLength: 10 }}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <InputLabel>Company Size:</InputLabel>
                      <div>
                        <Paper
                          style={{
                            width: '100%',
                            marginTop: '10px',
                          }}
                        >
                          <Tabs
                            name="orgCompanySize"
                            value={value}
                            onChange={handleChange}
                            variant="fullWidth"
                            className={classes.tabsButtons}
                            indicatorColor="primary"
                            textColor="primary"
                            defaultValue="50-200"
                          >
                            <Tab label="1-49" value="1-49" />
                            <Tab selected label="50-200" value="50-200" />
                            <Tab label="201-999" value="201-999" />
                            <Tab label="1000+" value="1000+" />
                          </Tabs>
                        </Paper>
                      </div>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper component="section" className={classes.sectionCheckBox}>
                  <Grid container spacing={1}>
                    <Grid item xs={12} className={classes.formControlLabel}>
                      <FormCheckBox
                        name="userAcceptTermsAndConditions"
                        defaultValue={false}
                        control={control}
                        label=""
                      />
                      {'I have read and agreed to the '}
                      <Link
                        href="https://www.example.com/terms-of-use"
                        target="_blank"
                        className={classes.formControlLabel}
                      >
                        Terms And Conditions
                      </Link>
                      {' and the '}
                      <Link
                        href="https://www.example.com/privacy-policy"
                        target="_blank"
                        className={classes.formControlLabel}
                      >
                        Privacy Policy
                      </Link>
                    </Grid>
                    <Grid item xs={12}>
                      <FormCheckBox
                        name="userOptInNewsletter"
                        defaultValue={true}
                        control={control}
                        label="Yes, I would like to receive marketing communications regarding Falcon Metrics services and events. I can unsubscribe at any time."
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FormCheckBox
                        name="contactForDemo"
                        defaultValue={true}
                        control={control}
                        label="I would like to be contacted for a product demo."
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FormCheckBox
                        name="needHelp"
                        defaultValue={false}
                        control={control}
                        label="We might need help with change management, on the ground support or training."
                      />
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>

              <Grid item xs={12}>
                {watch('userAcceptTermsAndConditions') ? (
                  <Button
                    fullWidth
                    size="large"
                    variant="contained"
                    color="primary"
                    type="submit"
                    startIcon={submitting && <HourglassEmptyIcon />}
                    disabled={
                      !watch('userAcceptTermsAndConditions') || submitting
                    }
                  >
                    {!submitting ? 'Register' : 'Processing...'}
                  </Button>
                ) : (
                  <Tooltip
                    classes={{ tooltip: classes.tooltip }}
                    //placement="bottom-end"
                    title="You will need to accept the T&Cs to be able to continue"
                  >
                    <span>
                      <Button
                        fullWidth
                        size="large"
                        variant="contained"
                        color="primary"
                        type="submit"
                        startIcon={submitting && <HourglassEmptyIcon />}
                        disabled={
                          !watch('userAcceptTermsAndConditions') || submitting
                        }
                      >
                        {!submitting ? 'Register' : 'Processing...'}
                      </Button>
                    </span>
                  </Tooltip>
                )}
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </>
  );
};

export default SignupPage;
