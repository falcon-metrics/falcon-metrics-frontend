import { Box } from '@material-ui/core';

import KanbanHeaderSkeleton from './components/KanbanHeaderSkeleton';
import KanbanCardSkeleton from './components/KanbanCardSkeleton';

import { useStyles } from './KanbanSkeleton.styles';

const KanbanSkeleton = () => {
  const classes = useStyles();

  return (
    <Box>
      <Box className={classes.headerSection}>
        <KanbanHeaderSkeleton />
        <KanbanHeaderSkeleton />
        <KanbanHeaderSkeleton />
      </Box>
      <Box className={classes.cardContainer}>
        <Box className={classes.column}>
          <KanbanCardSkeleton
            useArrivalDate={true}
          />
          <KanbanCardSkeleton
            useArrivalDate={true}
          />
          <KanbanCardSkeleton
            useArrivalDate={true}
          />
        </Box>
        <Box className={classes.column}>
          <KanbanCardSkeleton
            useArrivalDate={true}
            useCommitmentDate={true}
            useETD={true}
          />
          <KanbanCardSkeleton
            useArrivalDate={true}
            useCommitmentDate={true}
            useETD={true}
          />
          <KanbanCardSkeleton
            useArrivalDate={true}
            useCommitmentDate={true}
            useETD={true}
          />
        </Box>
        <Box className={classes.column}>
          <KanbanCardSkeleton
            useArrivalDate={true}
            useCommitmentDate={true}
            useDepartureDate={true}
          />
          <KanbanCardSkeleton
            useArrivalDate={true}
            useCommitmentDate={true}
            useDepartureDate={true}
          />
          <KanbanCardSkeleton
            useArrivalDate={true}
            useCommitmentDate={true}
            useDepartureDate={true}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default KanbanSkeleton;
