import DefaultSkeleton from 'views/ValueStreamManagement/views/DeliveryGovernance/components/DefaultSkeleton';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(() => ({
  contentContainer: {
    width: 280,
    height: 200,
    fontFamily: 'Open Sans',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  description: {
    marginTop: 4,
    color: '#32383E',
    fontSize: 13,
    fontFamily: 'Open Sans',
  },
  kpiValue: {
    fontSize: 58,
    fontFamily: 'Open Sans',
    fontWeight: 'bold',
    color: '#32383E',
    textAlign: 'center',
  },
  unit: {
    fontSize: 24,
    fontFamily: 'Open Sans',
    fontWeight: 'normal',
    color: '#32383E',
    marginLeft: 20,
  },
  footer: {
    color: '#32383E',
    fontSize: 13,
    textAlign: 'center',
    fontFamily: 'Open Sans',
  },
  divider: {
    height: 45,
    alignSelf: 'stretch',
    marginTop: 70,
    marginLeft: 30,
  },
}));

type Props = {
  isLoading: boolean;
  discardedAfterCommitment?: number;
  activeDaysSpent?: number;
};

export const KPIView = ({
  isLoading,
  discardedAfterCommitment,
  activeDaysSpent: activeDaysSpent,
}: Props) => {
  const classes = useStyles();

  if (isLoading) {
    return (
      <Box display="flex">
        <Box mt={2}><DefaultSkeleton /></Box>
        <Divider orientation="vertical" flexItem variant="middle" className={classes.divider} />
        <Box mt={2}><DefaultSkeleton /></Box>
      </Box>
    )
  }

  return (
    <Box display="flex">
      <Box className={classes.contentContainer}>
        <Typography className={classes.kpiValue}>
          {discardedAfterCommitment || 0}
        </Typography>
        <Typography className={classes.footer}>
          flow items were discarded<br />
          after the commitment point
        </Typography>
      </Box>
      <Divider orientation="vertical" flexItem variant="middle" className={classes.divider} />
      <Box className={classes.contentContainer}>
        <Typography className={classes.kpiValue}>
          {activeDaysSpent || 0}
        </Typography>
        <Typography className={classes.footer}>
          active days spent
        </Typography>
      </Box>
    </Box>
  );
};
