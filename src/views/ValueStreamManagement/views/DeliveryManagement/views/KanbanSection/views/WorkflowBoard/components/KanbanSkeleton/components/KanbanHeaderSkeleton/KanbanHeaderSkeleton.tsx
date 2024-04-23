import { Box } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";

import { useStyles } from './KanbanHeaderSkeleton.styles';

const KanbanHeaderSkeleton = () => {
  const classes = useStyles();

  return (
    <Box className={classes.header}>
      <Skeleton width={100} height={20} />
      <Skeleton width={40} height={20} />
    </Box>
  );
}

export default KanbanHeaderSkeleton;
