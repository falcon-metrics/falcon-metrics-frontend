import { Divider, Box } from '@material-ui/core';

import FlowUnitsRowSkeleton from '../FlowItemsRowSkeleton/FlowItemsRowSkeleton';
import { useStyles } from './FlowItemsTableSkeleton.styles';

const FlowItemsTableSkeleton = () => {
  const classes = useStyles();

  return (
    <Box className={classes.table}>
      <FlowUnitsRowSkeleton />
      <Divider />
      <FlowUnitsRowSkeleton />
      <Divider />
      <FlowUnitsRowSkeleton />
      <Divider />
      <FlowUnitsRowSkeleton />
      <Divider />
      <FlowUnitsRowSkeleton />
      <Divider />
      <FlowUnitsRowSkeleton />
      <Divider />
      <FlowUnitsRowSkeleton />
      <Divider />
      <FlowUnitsRowSkeleton />
      <Divider />
      <FlowUnitsRowSkeleton />
      <Divider />
    </Box>
  );
}

export default FlowItemsTableSkeleton;
