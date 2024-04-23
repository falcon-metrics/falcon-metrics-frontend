import Box from '@material-ui/core/Box';
import Skeleton from '@material-ui/lab/Skeleton';

const SkeletonBarChart = () => {
  return (
    <Box display="flex" height={450} flexDirection="column">
      <Box display="flex" justifyContent="center" alignItems="flex-end" height={260}>
        <Box mr={4} ml={7} style={{ position: 'relative' }} display="flex" alignItems="flex-end" justifyContent="flex-end">
          <Skeleton width={32} height={140} style={{ position: 'absolute', height: '140px', bottom: '-20px' }} />
        </Box>
        <Box mr={4}>
          <Skeleton width={32} height={27} />
        </Box>
        <Box width={54} mr={4} style={{ position: 'relative', marginRight: 10, }}>
          <Skeleton width={32} height={83} style={{ height: 83, bottom: '-10px', position: 'absolute' }} />
        </Box>
        <Box mr={4} ml={4} style={{ position: 'relative' }} display="flex" alignItems="flex-end" justifyContent="flex-end">
          <Skeleton width={32} height={262} style={{ height: '200px', bottom: '-28px', position: 'absolute' }} />
        </Box>
        <Box mr={4}>
          <Skeleton width={32} height={42} />
        </Box>
      </Box>
      <Box display="flex" justifyContent="center" alignItems="flex-end" height={128}>
        <Box display="flex">
          <Box display="flex" style={{ marginTop: 2, marginRight: 6, }}>
            <Skeleton variant="circle" width={10} height={10} />
          </Box>
          <Skeleton width={100} height={14} variant="text" />
        </Box>
        <Box display="flex" ml={4}>
          <Box display="flex" style={{ marginTop: 2, marginRight: 6, }}>
            <Skeleton variant="circle" width={10} height={10} />
          </Box>
          <Skeleton width={100} height={14} variant="text" />
        </Box>
      </Box>
    </Box>
  );
};

export default SkeletonBarChart;
