import fetch from 'core/api/fetch';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import useStyles from './DashboardSwitchBannerContent.styles';

const DashboardSwitchBannerContent = ({
  label,
  buttonText,
}: {
  label: string;
  buttonText: string;
}) => {
  const classes = useStyles();

  const switchDashboard = async () => {
    try {
      await fetch.post('/user-switch-dashboard', {});
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Grid container>
      {(
        <>
          <Grid item xs={12}>
            <Paper className={classes.container}>
              <Typography
                variant="body1"
                align="center"
                className={classes.banner}
              >
                {label}
                {'  '}
                <Button
                  className={classes.contactUs}
                  size="small"
                  variant="contained"
                  color="primary"
                  onClick={switchDashboard}
                >
                  {buttonText}
                </Button>
              </Typography>
            </Paper>
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default DashboardSwitchBannerContent;
