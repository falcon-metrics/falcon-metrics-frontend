import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { ReactComponent as TimeIcon } from "assets/icons/time-icon.svg";
import { ReactComponent as ChartIcon } from "assets/icons/chart-icon.svg";
import { ReactComponent as StatsIcon } from "assets/icons/stats-icon.svg";
import { ReactComponent as FilterSuccess } from "assets/icons/filter-success.svg";
import BulletPoint, { BulletPointProps } from "components/UI/BulletPoint";
import { useWizardContext } from "../../contexts/useWizardContext";
import useStyles from "./SuccessPage.styles";

const bulletPointsData: BulletPointProps[] = [
  {
    text:
      "Falcon Metrics will now begin your data import and it might take a few hours to complete it",
    iconNode: <TimeIcon title="Time Icon" />,
  },
  {
    text: "You will be able to check the import status from the Flow Analytics",
    iconNode: <ChartIcon title="Chart Icon" />,
  },
  {
    text:
      "The dashboard will gradually get populated as your data gets imported",
    iconNode: <StatsIcon title="Stats Icon" />,
  },
  {
    text:
      "You should be able to see early data on the dashboard by applying date filters on the filter panel",
    iconNode: <FilterSuccess title="Filter Icon" />,
  },
];

const SuccessPage = () => {
  const classes = useStyles();
  const { goToNext } = useWizardContext();

  return (
    <Container component="main" className={classes.main}>
      <Paper className={classes.paper}>
        <Grid container spacing={4} className={classes.removeoutline}>
          <Grid item xs={12}>
            <Box mt={2} mb={2}>
              {/* Insert your logo here */}
              <Typography
                display="inline"
                className={classes.title}
                align="left"
              >
                Congratulations!
                <br />
                Setup is complete.
              </Typography>
              <Box mt={2} mb={3}>
                <Typography
                  display="inline"
                  className={classes.description}
                  align="left"
                >
                  Now, the following things will happen
                </Typography>
              </Box>
            </Box>
            <Grid container spacing={1}>
              {bulletPointsData.map((b) => (
                <BulletPoint key={b.text} {...b} />
              ))}
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12}>
              <Box
                justifyContent="flex-start"
                alignItems="flex-end"
                display="flex"
              >
                <Box display="inline-flex" justifyContent="left" mt={2} ml={2}>
                  <Button
                    className={classes.button}
                    variant="contained"
                    onClick={goToNext}
                    color="primary"
                  >
                    Continue
                  </Button>
                </Box>
                <Box
                  display="inline-flex"
                  justifyContent="left"
                  mt={2}
                  ml={6}
                  style={{ position: "relative" }}
                >
                  {/* Insert your logo here */}
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default SuccessPage;
