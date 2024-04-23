import Box from '@material-ui/core/Box';
import Skeleton from '@material-ui/lab/Skeleton';

const SkeletonHeatMap = () => {
  return (
    <Box display="flex" flexDirection="column">
      <Box display="flex" justifyContent="center" alignItems="flex-end" style={{ marginTop: 10}}>
        <Skeleton width={32} height={150} style={{ height: 90, marginRight: 10, marginBottom: -4 }} />
        <Skeleton width={32} height={75} style={{ height: 100, marginRight: 10, marginBottom: -5 }} />
        <Skeleton width={32} height={150} style={{ height: 120, marginRight: 10, marginBottom: -8  }} />
        <Skeleton width={32} height={150} style={{ height: 80, marginBottom: -2 }} />
      </Box>
    </Box>
  );
};

export default SkeletonHeatMap;
