import Skeleton from '@material-ui/lab/Skeleton';
import { Box } from '@material-ui/core';
// import { useStyles } from './StrategicDriverDetailCard';

function SkeletonCard() {
  // const classes = useStyles();
  // className={classes.wrapperCardSkeleton}
  return (
    <>
      <Box>
        <Skeleton width={250} height={20} variant="text" />
        <Skeleton width={250} height={20} variant="text" />
        <Skeleton width={250} height={100} />
      </Box>
    </>
  );
}

export default SkeletonCard;