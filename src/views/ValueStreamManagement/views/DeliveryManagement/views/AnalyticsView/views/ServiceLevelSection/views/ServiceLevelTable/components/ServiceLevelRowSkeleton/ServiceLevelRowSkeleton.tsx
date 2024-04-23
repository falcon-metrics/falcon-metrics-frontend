import { Box } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

import { useStyles } from './ServiceLevelRowSkeleton.styles';

const ServiceLevelRowSkeleton = () => {
  const classes = useStyles();

  return (
    <Box className={classes.tableContainer}>
        <Box className={classes.highlightsContainer}>
          <Skeleton style={{ width: '20%' }} className={classes.skeletonCell} variant="text" />
          <Skeleton style={{ width: '10%' }} className={classes.skeletonCell} variant="text" />
          <Skeleton style={{ width: '20%' }} className={classes.skeletonCell} variant="text" />
        </Box>
        <Box className={classes.indicatorsContainer}>
          <Skeleton style={{ width: '20%' }} className={classes.skeletonCell} variant="text" />
          <Skeleton height={20} style={{ width: '20%' }} className={classes.skeletonCell} variant="text" />
        </Box>
        <Box className={classes.loneContainer}>
          <Skeleton style={{ width: '20%' }} className={classes.skeletonCell} variant="text" />
        </Box>
        <Box className={classes.statisticsContainer}>
          <Skeleton style={{ width: '15%' }} className={classes.skeletonCell} variant="text" />
          <Skeleton style={{ width: '15%' }} className={classes.skeletonCell} variant="text" />
          <Skeleton style={{ width: '15%' }} className={classes.skeletonCell} variant="text" />
          <Skeleton style={{ width: '15%' }} className={classes.skeletonCell} variant="text" />
          <Skeleton style={{ width: '15%' }} className={classes.skeletonCell} variant="text" />
        </Box>
      </Box>
  );
}

export default ServiceLevelRowSkeleton;
