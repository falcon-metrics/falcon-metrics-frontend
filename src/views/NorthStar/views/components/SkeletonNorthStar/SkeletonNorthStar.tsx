import Skeleton from '@material-ui/lab/Skeleton';
import Box from '@material-ui/core/Box';

export const SkeletonVisionStatement = () => {
  return (
    <Box>
      <Skeleton width={800} height={30} variant="text" />
      <Skeleton width={800} height={30} variant="text" />
    </Box>
  );
};

export const SkeletonMissionStatement = () => {
  return (
    <Box>
      <Skeleton width={800} height={120} />
    </Box>
  )
};

export const SkeletonTitleStrategic = () => {
  return (
    <Box>
       <Skeleton width={800} height={50} variant="text" />
    </Box>
  )
};

export const SkeletonStrategicDrivers = () => {
  return (
    <Skeleton width={230} height={380} />
  )
};
