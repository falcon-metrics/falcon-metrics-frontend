import Box from '@material-ui/core/Box';
import Skeleton from '@material-ui/lab/Skeleton';

type DefaultConfig = {
  width?: number;
  height?: number;
  style?: any;
};

type Props = {
  invertOrder?: boolean;
  container?: DefaultConfig;
  firstLine?: DefaultConfig;
  secondLine?: DefaultConfig;
};

const SkeletonWithTwoBars = ({
  invertOrder,
  container = {
    style: { marginTop: 8, }
  },
  firstLine = {
    width:  190,
    height: 14,
    style: { marginLeft: 0, marginTop: 0 },
  },
  secondLine = {
    width:  150,
    height: 14,
    style: { marginLeft: 0 },
  },
}: Props) => {
  return (
    <Box display="flex" style={container.style}>
      <Box display="flex" justifyContent="center" width={220} style={{ order: invertOrder ? 2 : 1 }}>
        <Skeleton
          width={20}
          height={180}
          variant="text"
          style={{ marginLeft: 10 }}
        />
        <Skeleton
          width={20}
          height={180}
          variant="text"
          style={{ marginLeft: 10 }}
        />
      </Box>
      <Box display="flex" flexDirection="column" justifyContent="center" style={{ order: invertOrder ? 1 : 2 }}>
        <Skeleton width={firstLine.width} height={firstLine.height} style={firstLine.style} variant="text" />
        <Skeleton width={secondLine.width} height={secondLine.height} style={secondLine.style} variant="text" />
        <Skeleton width={firstLine.width} height={firstLine.height} style={{ ...firstLine.style, marginTop: 10, }} variant="text" />
        <Skeleton width={secondLine.width} height={secondLine.height} style={secondLine.style} variant="text" />
      </Box>
    </Box>
  );
};

export default SkeletonWithTwoBars;
