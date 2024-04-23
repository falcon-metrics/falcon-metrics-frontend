import { Box } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

import { useStyles } from './FlowItemsRowSkeleton.styles';

const FlowItemsRowSkeleton = () => {
  const classes = useStyles();

  return (
    <Box className={classes.tableContainer}>
        <Box className={classes.highlightsContainer}>
          <Skeleton style={{ width: '10%' }} className={classes.skeletonCell} variant="text" />
          <Skeleton style={{ width: '45%' }} className={classes.skeletonCell} variant="text" />
        </Box>
        <Box className={classes.indicatorsContainer}>
          <Skeleton style={{ width: '45%' }} className={classes.skeletonCell} variant="text" />
          <Skeleton style={{ width: '10%' }} className={classes.skeletonCell} variant="text" />
        </Box>
        <Box className={classes.loneContainer}>
          <Skeleton style={{ width: '20%' }} className={classes.skeletonCell} variant="text" />
        </Box>
        <Box className={classes.otherFieldsContainer}>
          <Skeleton style={{ width: '20%' }} className={classes.skeletonCell} variant="text" />
          <Skeleton style={{ width: '80%' }} className={classes.skeletonCell} variant="text" />
        </Box>
      </Box>
  );
}

export default FlowItemsRowSkeleton;
