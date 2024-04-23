import FluentUIToolTip from 'components/UI/FluentUI/InfoIconWithTooltip';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import useAuthentication from 'hooks/useAuthentication';
import useContactUs, { ContactTypes } from 'hooks/useContactUs';
import { useState } from 'react';
import { styled } from '@material-ui/styles';
import classNames from 'classnames';
import useStyles from './ContactUsForm.styles';

type Props = {
  onSubmit(result: { errorMessage?: string }): void;
  contactType: ContactTypes;
};

const GridItem = styled(Box)({
  marginTop: '1rem',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
});

function ContactUsForm({ onSubmit, contactType }: Props) {
  const classes = useStyles();
  const [message, setMessage] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isAttemptingSubmit, setIsAttemptingSubmit] = useState(false);
  const { submitMessage } = useContactUs();
  const {
    userInfo: { email },
  } = useAuthentication();

  const handleSubmit = () => {
    setIsAttemptingSubmit(true);
    submitMessage({ message, contactType, phoneNumber })
      .then(onSubmit)
      .catch(() => setIsAttemptingSubmit(false));
  };

  const handleChange = (event) => {
    setMessage(event?.target?.value);
  };

  return (
    <>
      <Grid
        container
        xs={12}
        direction="column"
        justifyContent="center"
        className={classes.grid}
      >
        <GridItem>
          <Typography display="inline" className={classes.title}>
            Contact Us
          </Typography>
        </GridItem>
        <GridItem>
          <Typography className={classes.inputLabel}>
            Your registered email address{' '}
            <FluentUIToolTip contentId="contact-us" />
          </Typography>
          <TextField
            disabled
            fullWidth
            defaultValue={email}
            InputProps={{
              classes: {
                input: classes.emailField,
              },
            }}
          />
        </GridItem>
        <GridItem>
          <Typography className={classes.inputLabel}>
            You may also add a phone number if you wish us to call you{' '}
          </Typography>
          <TextField
            fullWidth
            onChange={(e) => setPhoneNumber(e.target.value)}
            InputProps={{
              classes: {
                input: classes.emailField,
              },
            }}
          />
        </GridItem>
        <GridItem>
          <Typography
            className={classNames(classes.inputLabel, classes.textAreaLabel)}
          >
            If you would like to share any additional information with us, or
            have any questions please include it below:
          </Typography>
          <TextField
            id="outlined-multiline-static"
            label=""
            multiline
            rows={3}
            fullWidth
            defaultValue=""
            variant="outlined"
            onChange={handleChange}
            InputProps={{
              classes: {
                input: classes.messageText,
              },
            }}
          />
        </GridItem>
      </Grid>
      <Box className={classes.wrapperButton} ml={2} mt={1}>
        <Button
          className={classes.button}
          size="small"
          variant="contained"
          color="primary"
          onClick={handleSubmit}
        >
          {isAttemptingSubmit ? (
            <CircularProgress color="secondary" />
          ) : (
            'Contact us'
          )}
        </Button>
      </Box>
    </>
  );
}

export default ContactUsForm;
