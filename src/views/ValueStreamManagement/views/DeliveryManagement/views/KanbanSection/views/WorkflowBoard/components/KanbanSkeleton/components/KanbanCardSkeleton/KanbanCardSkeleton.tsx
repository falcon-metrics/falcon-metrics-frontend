import { Box } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';

import { useStyles } from './KanbanCardSkeleton.styles';

export interface KanbanCardSkeletonProps {
  useArrivalDate?: boolean;
  useCommitmentDate?: boolean;
  useDepartureDate?: boolean;
  useETD?: boolean;
}

const KanbanCardSkeleton = ({
  useArrivalDate = false,
  useCommitmentDate = false,
  useDepartureDate = false,
  useETD = false
}: KanbanCardSkeletonProps) => {
  const classes = useStyles();

  return (
    <Box className={classes.card}>
      <Box className={classes.sidebar}>
        <Skeleton width={5} height="100%" style={{ transform: 'scale(1, 1)' }}/>
      </Box>
      <Box className={classes.cardContent}>
        <Box className={classes.title}>
          <AssignmentTurnedInIcon
            className={classes.titleIcon}
          />
          <Skeleton width={200} height={20} />
        </Box>
        <Box className={classes.info}>
          <Box className={classes.labels}>
            <Box className={classes.labelText}>State:</Box>
            <Box className={classes.labelText}>Flow Item Type:</Box>
            {useArrivalDate && <Box className={classes.labelText}>Arrival Date:</Box>}
            {useCommitmentDate && <Box className={classes.labelText}>Commitment Date:</Box>}
            {useDepartureDate && <Box className={classes.labelText}>Departure Date:</Box>}
            {useETD && <Box className={classes.labelText}>ETD:</Box>}
          </Box>
          <Box className={classes.entries}>
            <Box>
              <Skeleton width="40%" height={10} />
            </Box>
            <Box>
              <Skeleton width="60%" height={10} />
            </Box>
            {useArrivalDate &&
              <Box>
                <Skeleton width="80%" height={10} />
              </Box>
            }
            {useCommitmentDate &&
              <Box>
                <Skeleton width="40%" height={10} />
              </Box>
            }
            {useDepartureDate &&
              <Box>
                <Skeleton width="60%" height={10} />
              </Box>
            }
            {useETD &&
              <Box>
                <Skeleton width="80%" height={10} />
              </Box>
            }
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default KanbanCardSkeleton;
