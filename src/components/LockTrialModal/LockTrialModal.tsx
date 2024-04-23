import { makeStyles, createStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { ReactComponent as LockIcon } from 'assets/icons/lock_icon.svg';
import { ReactComponent as BookingIcon } from 'assets/icons/booking_Icon.svg';
import { ReactComponent as TimeIcon } from 'assets/icons/time-icon.svg';
import ContactUsModal from 'components/ContactUsModal';
import { successMessage } from 'views/Trial/TrialModal/TrialModal';
import { ContactTypes } from 'hooks/useContactUs';
import useLockPage from 'hooks/useLockPage';
import BulletPoint, { BulletPointProps } from 'components/UI/BulletPoint';

const useStyles = makeStyles(() =>
  createStyles({
    logo: {
      marginTop: -10,
      display: 'flex',
      width: '100%',
      maxHeight: '10vh',
    },
    label: {
      fontSize: 18,
      color: '#001a70',
      fontFamily: 'Open Sans',
      fontWeight: 600,
      width: '100%',
    },
    bulletPointsContainer: {
      fontSize: 13,
    },
  }),
);

export interface Props {
  modalIsOpen: boolean;
  hideModal(): void;
}

const bulletPointsData: BulletPointProps[] = [
  {
    text:
      'Your access to Falcon Metrics with your data has been blocked, please Sign-up to get full access',
    iconNode: <LockIcon title="Lock Icon" />,
  },
  {
    text:
      'Express your interest to sign up with us using the form below. Our team will get in touch with you to assist you in the process',
    iconNode: <BookingIcon title="Lock Icon" />,
  },
  {
    text:
      'If you decide not to subscribe your data will be deleted from our system after 30 days',
    iconNode: <TimeIcon title="Lock Icon" />,
  },
];

const LockTrialModal = () => {
  const classes = useStyles();
  useLockPage();

  return (
    <div id="lock">
      <ContactUsModal
        modalIsOpen={true}
        successMessage={successMessage}
        contactType={ContactTypes.trialExpired}
      >
        <Box>
          <Grid item xs={12}>
            {/* Insert your logo here */}
            <Box mt={1} mb={2}>
              <Typography
                display="inline"
                className={classes.label}
                align="center"
              >
                Your 14-day free trial is now over
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Grid
              container
              spacing={1}
              className={classes.bulletPointsContainer}
            >
              {bulletPointsData.map((b) => (
                <BulletPoint key={b.text} {...b} />
              ))}
            </Grid>
          </Grid>
        </Box>
      </ContactUsModal>
    </div>
  );
};

export default LockTrialModal;
