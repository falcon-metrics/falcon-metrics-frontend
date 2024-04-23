import Box from '@material-ui/core/Box';
import Skeleton from '@material-ui/lab/Skeleton';

export const SkeletonTitle = () => {
  return (
    <Box>
      <Skeleton width={1000} height={50} />
    </Box>
  );
};

export const SkeletonSmallTitle = () => {
  return (
    <Box>
      <Skeleton width={750} height={40} />
    </Box>
  );
};

export const SkeletonShortDescription = () => {
  return (
    <Box>
      <Skeleton width={1000} height={50} />
    </Box>
  );
};

export const SkeletonLastModified = () => {
  return (
    <Box style={{ marginTop: 2 }}>
      <Skeleton width={140} height={47} />
    </Box>
  );
};

export const SkeletonObjectives = () => {
  return (
    <Box>
      <Skeleton width={1000} height={600} />
    </Box>
  );
};