import Box from '@material-ui/core/Box';
import Skeleton from '@material-ui/lab/Skeleton';

type DefaultConfig = {
  width: number;
  height: number;
  style: any;
};

type Props = {
  firstBlock?: DefaultConfig;
  secondBlock?: DefaultConfig;
  thirdBlock?: DefaultConfig;
};

const DefaultSkeleton = ({
  firstBlock = {
    width:  90,
    height: 30,
    style: { marginLeft: 76, marginTop: 40 },
  },
  secondBlock = {
    width:  168,
    height: 14,
    style: { marginLeft: 30, marginTop: 0 },
  },
  thirdBlock = {
    width:  120,
    height: 14,
    style: { marginLeft: 30 },
  }
}: Props) => {
  return (
    <Box display="flex" justifyContent="center" flexDirection="column">
      <Skeleton
        width={firstBlock.width}
        height={firstBlock.height}
        style={firstBlock.style}
        variant="text"
      />
      <br/>
      <Skeleton width={secondBlock.width} height={secondBlock.height} style={secondBlock.style} variant="text" />
      <Skeleton width={thirdBlock.width} height={thirdBlock.height} style={thirdBlock.style} variant="text" />
    </Box>
  );
};

export default DefaultSkeleton;
