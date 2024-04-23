import Skeleton from '@material-ui/lab/Skeleton';
import Box from '@material-ui/core/Box';

export const SkeletonObjectivesTitle = () => {
  return (
    <Box>
      <Skeleton width={150} height={60} variant="text" />
    </Box>
  );
};

export const SkeletonObjectivesTabs = () => {
  return (
    <Box>
      <Skeleton width={800} height={100} variant="text" />
    </Box>
  );
};


export const SkeletonObjectivesAdd = () => {
  return (
    <Box>
      {/* @ts-ignore */}
      <Skeleton variant="circle" width={50} height={50} />
    </Box>
  );
};
