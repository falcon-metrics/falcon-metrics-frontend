import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import CloseIcon from '@material-ui/icons/Close';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { ReactComponent as ScreenShareIcon } from 'assets/icons/screenshare_Icon.svg';
import { ReactComponent as BookingIcon } from 'assets/icons/booking_Icon.svg';
import BulletPoint, { BulletPointProps } from 'components/UI/BulletPoint';
import useStyles, { GreenSpan } from 'styles/ModalStyles';
import { LinkContainer, StyledLink } from './ConnectYourDataModal.styles';

const bulletPointsData: BulletPointProps[] = [
  {
    text: 'You book a session with us',
    iconNode: <BookingIcon title="Booking Icon" />,
  },
  {
    text:
      'We connect on a call and assist you in adding your data to Falcon Metrics through a screen sharing session',
    iconNode: <ScreenShareIcon title="Screen Share Icon" />,
  },
];

interface Props {
  modalIsOpen: boolean;
  hideModal(): void;
}

const ConnectYourDataModal = (props: Props) => {
  const classes = useStyles();

  return (
    <div className="widget-expand-icon">
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={props.modalIsOpen}
        onClose={props.hideModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={props.modalIsOpen}>
          <Paper className={classes.paper}>
            <Grid container spacing={4} className={classes.removeoutline}>
              <Grid item xs={12}>
                <Box className={classes.closeButton}>
                  <IconButton aria-label="close" onClick={props.hideModal}>
                    <CloseIcon />
                  </IconButton>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box mt={6}>
                  <Typography className={classes.label}>
                    Book an online session with one of our experts to{' '}
                    <GreenSpan>connect your data</GreenSpan> to Falcon Metrics and
                    start your <GreenSpan>14-day trial</GreenSpan>
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} style={{ paddingTop: '40px' }}>
                <Typography
                  display="inline"
                  className={classes.labelBlack}
                  align="center"
                >
                  How it works?
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={1}>
                  {bulletPointsData.map((b) => (
                    <BulletPoint key={b.text} {...b} />
                  ))}
                </Grid>
              </Grid>
              <Grid item>
                <LinkContainer>
                  <StyledLink
                    target="_blank"
                    href="https://example.atlassian.net/wiki"
                  >
                    Click here to find out more about how we connect and handle
                    you data
                  </StyledLink>
                </LinkContainer>
              </Grid>
              <Grid
                item
                xs={12}
                style={{
                  marginTop: 10,
                  justifyContent: 'center',
                  display: 'flex',
                }}
              >
                <Box>
                  <Button
                    className={classes.button}
                    target="_blank"
                    href=""
                    size="small"
                    variant="contained"
                    color="primary"
                  >
                    BOOK SESSION
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Fade>
      </Modal>
    </div>
  );
};

export default ConnectYourDataModal;
