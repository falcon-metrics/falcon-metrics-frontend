import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) =>
  createStyles({
    main: {
      flexGrow: 1,
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    section: {
      width: '100%',
      padding: theme.spacing(4),
    },
    progress: {
      position: 'absolute',
      top: 0,
      width: '100%',
    },
  }),
);

export type Props = {};

const EndOfTrialPage = () => {
  const classes = useStyles();

  return (
    <>
      <Container component="main" maxWidth="sm" className={classes.main}>
        <Paper component="section" className={classes.section}>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              {/* Insert your logo here */}
            </Grid>
            <Grid item xs={12}>
              <Typography paragraph variant="h6" align="center">
                Your trial license has expired
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </>
  );
};

export default EndOfTrialPage;
