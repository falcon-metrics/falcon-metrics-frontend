import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import useStyles from './UnavailablePage.styles';

const UnavailablePage = () => {
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
              <Typography
                paragraph
                variant="h6"
                align="center"
                className={classes.paragraph}
              >
                Access Denied
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </>
  );
};

export default UnavailablePage;
