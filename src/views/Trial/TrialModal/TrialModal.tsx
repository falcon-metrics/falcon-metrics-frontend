import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import BulletPoint, { BulletPointProps } from 'components/UI/BulletPoint';
import ContactUsModal from 'components/ContactUsModal';
import { ContactTypes } from 'hooks/useContactUs';
import useStyles, { Icon } from './TrialModal.styles';

const bulletPointsData: BulletPointProps[] = [
  {
    text: 'Express your interest to sign up with us using the form below',
    iconNode: <Icon />,
  },
  {
    text: 'Our team will get in touch with you to help you come onboard',
    iconNode: <Icon />,
  },
];

export interface Props {
  modalIsOpen: boolean;
  hideModal(): void;
}

export const successMessage =
  'Thank you for expressing your interest in subscribing to Falcon Metrics. Our team will get back to you within 24 hours.';

const TrialModal = (props: Props) => {
  const classes = useStyles();

  return (
    <ContactUsModal
      {...props}
      successMessage={successMessage}
      contactType={ContactTypes.trialOngoing}
    >
      <Grid item xs={12}>
        <Box mt={1} mb={4} ml={2} mr={2}>
          <Typography display="inline" align="center" className={classes.label}>
            Sign-up and get on top of your time-to-market, productivity,
            predictability, quality and flow efficiency.
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={1}>
          {bulletPointsData.map((b) => (
            <BulletPoint key={b.text} {...b} />
          ))}
        </Grid>
      </Grid>
    </ContactUsModal>
  );
};

export default TrialModal;
