import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Snackbar from '@material-ui/core/Snackbar';
import fetch from 'core/api/fetch';
import { Alert } from '@material-ui/lab';
import { useState } from 'react';
import useStyles from './VerifyYourEmailPage.styles';

const VerifyYourEmailPage = () => {
  const classes = useStyles();

  const sendEmailAgain = async () => {
    const emailSent = await fetch.post('/resendemail');
    setOpen(true);
    return emailSent;
  };

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const [open, setOpen] = useState(false);

  return (
    <>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          A new verificarion e-mail has been sent. Please check your e-mail box.
        </Alert>
      </Snackbar>
      <Container component="main" maxWidth="sm" className={classes.main}>
        <Paper component="section" className={classes.section}>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              {/* Insert your logo here */}
            </Grid>
            <Grid item xs={12}>
              <Typography paragraph variant="h6" align="center">
                Please check your email to verify your account
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Link
                variant="body2"
                href="#"
                onClick={() => {
                  sendEmailAgain();
                }}
                style={{
                  alignContent: 'center',
                  justifyContent: 'center',
                  display: 'flex',
                }}
              >
                Click here if you haven&apos;t received an e-mail
              </Link>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </>
  );
};

export default VerifyYourEmailPage;
