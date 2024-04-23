import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import useStyles from './CustomDescription.styles';

const CustomDescription = () => {
  const classes = useStyles();
  return (
    <Box>
      <Typography
        paragraph
        variant="subtitle1"
        align="justify"
        className={classes.description}
      >
        Encapsulate your work items under archetypical labels that summarises
        the details that are at team level to something commonly understood by
        leadership and decision makers.
      </Typography>
      <Box mb={3}>
        <Typography
          paragraph
          variant="subtitle1"
          align="justify"
          className={classes.description}
        >
          This allows leadership to understand what actually is happening on the
          ground and to steer the work at the team, team of teams and portfolio
          levels regardless of how teams have set up their work management
          systems and their ways of working.
        </Typography>
      </Box>
      <Box mb={3}>
        <Typography
          paragraph
          variant="subtitle1"
          align="left"
          className={classes.description}
        >
          The more data normalisation you configure, greater will be the
          insights Falcon Metrics can provide.
        </Typography>
      </Box>
    </Box>
  );
};

export default CustomDescription;
