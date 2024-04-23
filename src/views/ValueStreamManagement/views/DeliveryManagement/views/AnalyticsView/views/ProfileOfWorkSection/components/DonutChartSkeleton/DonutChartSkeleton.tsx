import { Box } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";

import { useStyles } from './DonutChartSkeleton.styles';

const DonutChartSkeleton = () => {
  const classes = useStyles();

  return (
    <Box className={classes.container}>
      <Box className={classes.donutChartContainer}>
        <Skeleton
          variant="circle"
          style={{ width: '100%', height: '100%', border: "17px solid silver", backgroundColor: "transparent" }}
        />
      </Box>
      <Box className={classes.legendContainer}>
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
}

export default DonutChartSkeleton;
