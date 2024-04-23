import Skeleton from '@material-ui/lab/Skeleton';
import { Box } from '@material-ui/core';
import { useStyles } from './CommentCard.styles';

function SkeletonReplyCard() {
  const classes = useStyles();
  return (
    <Box className={classes.wrapperReplyCardSkeleton}>
      <Skeleton width={250} height={20} variant="text" />
      <Skeleton width={250} height={20} variant="text" />
      <Skeleton width={250} height={100} />
    </Box>
  );
}

export default SkeletonReplyCard;