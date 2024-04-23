import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Providers from 'views/SetupWizard/interfaces/Providers';
import { providers } from '../../Providers/ProviderConnections/interfaces/providers';

const useStyles = makeStyles(() =>
  createStyles({
    defaultParagraph: {
      fontFamily: 'Open Sans',
    },
  }),
);

const CustomisedDescription = ({ provider }: { provider?: Providers }) => {
  const classes = useStyles();
  const connection = providers[provider ?? Providers.JIRA_CLOUD];

  return (
    <Box>
      <Typography
        paragraph
        variant="body1"
        className={classes.defaultParagraph}
      >
        <Box mt={3}>
          How would you like to consume perfomance data? Is it by product,
          project, service? Would you like to aggregate several teams working on
          the same product into one view? or several programs into a portfolio
          view?
        </Box>
        <Box mt={3}>
          Falcon Metrics works with three levels of hierarchy, which you can fully
          customise to mimic your organisational design and operating model e.g:{' '}
          <b>
            Nations {'>'} Tribes {'>'} Squads | Portfolios {'>'} Programs {'>'}{' '}
            Teams | Business Units {'>'} Team of Teams {'>'} Teams
          </b>
        </Box>

        <Box mt={3}>
          That’s the time for you to design how Falcon Metrics will consume and
          analyse your performance data. Create the structure you want using the
          tree view component below. For each line you create, you will need to
          map it to a specific board in your data source or define it as an{' '}
          <b>“Aggregation board”.</b>
        </Box>
        {connection?.specificInstructionNode ?? null}
      </Typography>
    </Box>
  );
};

export default CustomisedDescription;
