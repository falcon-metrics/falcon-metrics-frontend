import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import useLockPage from 'hooks/useLockPage';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { ReactComponent as LockIcon } from 'assets/icons/lock_icon.svg';
import { ReactComponent as ChartIcon } from 'assets/icons/stats-icon.svg';
import { Props } from 'views/Trial/TrialModal/TrialModal';
import BulletPoint, { BulletPointProps } from 'components/UI/BulletPoint';
import useStyles, { GreenSpan } from 'styles/ModalStyles';

const bulletPointsData: BulletPointProps[] = [
  {
    text: 'Your access to Falcon Metrics with demo data has been locked',
    iconNode: <LockIcon title="Lock Icon" />,
  },
  {
    text: 'Start your 14-day free trial by linking your data to Falcon Metrics',
    iconNode: <ChartIcon title="Chart Icon" />,
  },
];

const LockDemoModal = (props: Props) => {
  const classes = useStyles();
  useLockPage();

  return (
    <div className="widget-expand-icon">
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        id="lock"
        open={true}
      >
        <Fade in={props.modalIsOpen}>
          <Paper className={classes.paper}>
            <Grid container spacing={4} className={classes.removeoutline}>
              <Grid item xs={12}>
                <Box mt={2}>
                  {/* Insert your logo here */}
                </Box>
                <Box mt={1}>
                  <Typography
                    display="inline"
                    className={classes.label}
                    align="center"
                  >
                    Your <GreenSpan>7-day</GreenSpan> demo access is now over
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
              <Box display="flex" justifyContent="center" mt={4} mb={4}>
                <Grid container xs={12}>
                  <Grid
                    item
                    xs={12}
                    className={classes.labelBulletPoints}
                    style={{
                      justifyContent: 'center',
                      display: 'flex',
                      fontSize: 14,
                    }}
                  >
                    Ask Falcon Metrics team to contact me, because I want to
                  </Grid>
                  <Grid item xs={12}>
                    <Box display="flex" justifyContent="center" mt={2}>
                      <Button
                        className={classes.button}
                        target="_blank"
                        href=""
                        size="small"
                        variant="contained"
                        color="primary"
                      >
                        START MY TRIAL
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Paper>
        </Fade>
      </Modal>
    </div>
  );
};

export default LockDemoModal;
