import Skeleton from '@material-ui/lab/Skeleton';
import { Box } from '@material-ui/core';

function SkeletonScoreCard() {
    return (
        <Box style={{ padding: 100, width: '100%' }}>
            <Skeleton width={'100%'} height={400} variant="rect" style={{ marginBottom: '20px' }}>
            </Skeleton>
            <Skeleton width={'100%'} height={400} variant="rect">
            </Skeleton>
        </Box>
    );
}

export default SkeletonScoreCard;