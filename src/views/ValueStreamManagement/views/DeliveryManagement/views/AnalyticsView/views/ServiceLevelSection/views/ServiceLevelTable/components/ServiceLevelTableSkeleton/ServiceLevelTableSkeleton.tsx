import { Divider } from '@material-ui/core';

import ServiceLevelRowSkeleton from '../ServiceLevelRowSkeleton';
import { useStyles } from './ServiceLevelTableSkeleton.styles';

const ServiceLevelTableSkeleton = () => {
  const classes = useStyles();

  return (
    <>
      <ServiceLevelRowSkeleton />
      <Divider className={classes.divider} />
      <ServiceLevelRowSkeleton />
      <Divider className={classes.divider} />
      <ServiceLevelRowSkeleton />
      <Divider className={classes.divider} />
      <ServiceLevelRowSkeleton />
      <Divider className={classes.divider} />
      <ServiceLevelRowSkeleton />
      <Divider className={classes.divider} />
      <ServiceLevelRowSkeleton />
      <Divider className={classes.divider} />
    </>
  );
}

export default ServiceLevelTableSkeleton;
