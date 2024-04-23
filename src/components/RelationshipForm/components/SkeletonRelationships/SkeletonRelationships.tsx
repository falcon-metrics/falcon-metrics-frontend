import { Box } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";

const SkeletonRelationships = () => {
    return (<Box style={{ padding: 20, width: '100%', height: '100%' }}>
        <Skeleton width={'100%'} height={'100%'} variant="rect" style={{ marginBottom: '20px' }}>
        </Skeleton>
    </Box>);
};

export default SkeletonRelationships;