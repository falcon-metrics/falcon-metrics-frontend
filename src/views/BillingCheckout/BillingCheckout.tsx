import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import LinearProgress from '@material-ui/core/LinearProgress';

import FormTextInput from 'components/UI/FormTextInput';
import Box from '@material-ui/core/Box';
import InputLabel from '@material-ui/core/InputLabel';
import Link from '@material-ui/core/Link';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Tooltip from '@material-ui/core/Tooltip';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import useStyles from './BillingCheckout.styles';
import FormCheckBox from 'components/UI/BaseCheckBox';
import React, { useState } from 'react';

export type FormValues = {
  userFirstName: string;
  userLastName: string;
  userEmail: string;
  userRole: string;
  orgName: string; //BusinessUnit
  orgCountry: string;
  orgState: string;
  orgEnterprise: string;
  orgCompanySize: string;
  userAcceptTermsAndConditions: boolean;
  userOptInNewsletter: boolean;
  referenceCode: string;
  contactForDemo: boolean;
  needHelp: boolean;
  customerReference: string;
  businessRegNumber: string;
  technicalContact: string;
  billingContact: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  zipcode: string;
  companyDomain: string;
};

export type Props = {
  submit: (data: FormValues) => Promise<any>;
};

const BillingCheckoutPage = ({ submit }: Props) => {
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
  const [country, handleCountry] = useState('');
  const [region, handleRegion] = useState('');
  const [classCountry, setClassCountry] = useState(
    classes.controlLabelPlaceholder,
  );
  const [classState, setClassState] = useState(classes.controlLabelPlaceholder);
  const [classCountryLabel, setClassCountryLabel] = useState(
    classes.dropDownLabel,
  );
  const [classStateLabel, setClassStateLabel] = useState(classes.dropDownLabel);

  const handleChange = (_event: React.ChangeEvent<{}>, newValue: string) => {
    setValue('orgCompanySize', newValue);
    setCompanySizeValue(newValue);
  };
  setValue('orgCompanySize', value);

  const selectCountry = (newValue: string) => {
    setValue('orgCountry', newValue);
    handleCountry(newValue);
    handleRegion('');
    setValue('orgState', '');
    setClassCountry(classes.controlLabel);
    setClassCountryLabel(classes.dropDownLabel);
  };
  setValue('orgCountry', country);

  const selectRegion = (newValue: string) => {
    setValue('orgState', newValue);
    handleRegion(newValue);
    setClassState(classes.controlLabel);
    setClassStateLabel(classes.dropDownLabel);
  };
  setValue('orgState', region);

  const onValid: SubmitHandler<FormValues> = async (data) => {
    data.companyDomain = data.userEmail.slice(
      data.userEmail.lastIndexOf('@') === -1
        ? data.userEmail.length
        : data.userEmail.lastIndexOf('@') + 1,
      data.userEmail.length,
    );
    if (country === '') {
      setClassCountry(classes.controlLabelRequired);
      setClassCountryLabel(classes.dropDownLabelRed);
      return {};
    }
    if (region === '') {
      setClassState(classes.controlLabelRequired);
      setClassStateLabel(classes.dropDownLabelRed);
      return {};
    }

    submit(data)
      .then(() => {
        window.location.href = '/';
      })
      .catch((error) => {
        console.debug(error.toJSON());
        console.debug(error.response.data);
        const errorsJson = JSON.parse(error.response.data);
        const errorsArray = errorsJson.map(({ message }) => ({ message }));

        if (errorsArray) {
          errorsArray.forEach((element) => {
            switch (element.message) {
              case 'orgId must be unique':
                setError('orgName', {
                  // shouldFocus: true,
                  message:
                    'Business Unit already in use, please enter another business unit',
                });
                break;
              /*case "userId must be unique":
                setError('userEmail', {
                  shouldFocus: true,
                  message: 'User already exists for that organisation',
                });
                break;*/
            }
          });
        }
      });
  };

  const onInvalid: SubmitErrorHandler<FormValues> = (errors, event) => {
    console.log({ errors, event });
  };

  return (
    <>
      {formState.isSubmitting && (
        <LinearProgress className={classes.progress} />
      )}
      <Container component="main" maxWidth="sm" className={classes.main}>
        <Box mt={6}>
          <Typography
            paragraph
            variant="h6"
            align="center"
            className={classes.userGuideTitle}
          >
            Billing Checkout
          </Typography>
        </Box>

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
                        //autoComplete="off"
                        name="userEmail"
                        type="email"
                        control={control}
                        label="E-mail Address"
                        inputProps={{ maxLength: 250 }}
                        //error={!!formState.errors.userEmail}
                        //helperText={
                        //  !!formState.errors.userEmail &&
                        //  formState.errors.userEmail.message
                        //}
                        helperText={'Eg. lee@example.com'}
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
                    <Grid item xs={6}>
                      <FormTextInput
                        fullWidth
                        name="orgEnterprise"
                        control={control}
                        label="Company Name"
                        inputProps={{ maxLength: 150 }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <FormTextInput
                        fullWidth
                        disabled
                        value={
                          watch('userEmail')
                            ? watch('userEmail').slice(
                                watch('userEmail').lastIndexOf('@') === -1
                                  ? watch('userEmail').length
                                  : watch('userEmail').lastIndexOf('@') + 1,
                                watch('userEmail').length,
                              )
                            : ''
                        }
                        name="companyDomain"
                        control={control}
                        label="Domain"
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
                          !!formState.errors.orgName &&
                          formState.errors.orgName.message
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

                    <Grid item xs={6}>
                      <FormTextInput
                        fullWidth
                        name="businessRegNumber"
                        control={control}
                        label="Business Registration Number"
                        inputProps={{ maxLength: 150 }}
                        helperText={'Eg. ABN XX XXX XXX XXX'}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <FormTextInput
                        fullWidth
                        name="customerReference"
                        control={control}
                        label="Customer Reference"
                        inputProps={{ maxLength: 150 }}
                        helperText={'Eg. Purchase order number'}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <InputLabel>Company Size:</InputLabel>
                      <div
                      //className="company-size-container"
                      >
                        <Paper
                          style={{
                            width: '100%',
                            //borderRadius: 18,
                            //height: '36px',
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
                {/*3rd Box: Billing Information */}
                <Paper component="section" className={classes.sectionLabel}>
                  <Typography className={classes.sectionPaperLabel}>
                    Billing Information
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <FormTextInput
                        fullWidth
                        name="technicalContact"
                        type="email"
                        control={control}
                        label="Technical Contact’s Email"
                        inputProps={{ maxLength: 250 }}
                        helperText={'Eg. lee@example.com'}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FormTextInput
                        fullWidth
                        required
                        name="billingContact"
                        type="email"
                        control={control}
                        label="Billing Contact’s Email"
                        inputProps={{ maxLength: 250 }}
                        helperText={'Eg. lee@example.com'}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FormTextInput
                        fullWidth
                        name="addressLine1"
                        required
                        control={control}
                        label="Billing Address Line 1"
                        inputProps={{ maxLength: 150 }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FormTextInput
                        fullWidth
                        name="addressLine2"
                        control={control}
                        label="Billing Address Line 2"
                        inputProps={{ maxLength: 150 }}
                      />
                    </Grid>
                    <Grid item xs={8}>
                      <FormTextInput
                        fullWidth
                        required
                        name="city"
                        control={control}
                        label="City"
                        inputProps={{ maxLength: 250 }}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <FormTextInput
                        fullWidth
                        required
                        name="zipcode"
                        control={control}
                        label="Zipcode"
                        inputProps={{ maxLength: 250 }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <Typography className={classCountryLabel}>
                        Country *
                      </Typography>
                      <div className={classes.dropdown}>
                        <CountryDropdown
                          //classes={classes.controlLabelRequired}
                          classes={classCountry}
                          value={country}
                          valueType="short"
                          labelType="full"
                          onChange={(val) => selectCountry(val)}
                        />
                      </div>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography className={classStateLabel}>
                        State *
                      </Typography>
                      <div className={classes.dropdown}>
                        <RegionDropdown
                          classes={classState}
                          country={country}
                          value={region}
                          valueType="short"
                          labelType="full"
                          disableWhenEmpty={true}
                          countryValueType="short"
                          defaultOptionLabel="Select State"
                          onChange={(val) => selectRegion(val)}
                        />
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
                    startIcon={formState.isSubmitting && <HourglassEmptyIcon />}
                    disabled={
                      !watch('userAcceptTermsAndConditions') ||
                      !formState.isDirty ||
                      formState.isSubmitting
                    }
                  >
                    {!formState.isSubmitting ? 'Sign Up' : 'Signing Up...'}
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
                        startIcon={
                          formState.isSubmitting && <HourglassEmptyIcon />
                        }
                        disabled={
                          !watch('userAcceptTermsAndConditions') ||
                          !formState.isDirty ||
                          formState.isSubmitting
                        }
                      >
                        {!formState.isSubmitting ? 'Sign Up' : 'Signing Up...'}
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

export default BillingCheckoutPage;
