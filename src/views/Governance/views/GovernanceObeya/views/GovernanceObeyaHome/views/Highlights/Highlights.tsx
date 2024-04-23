import { useMemo } from 'react';

import memo from 'utils/typescript/memo';
import {
  HighlightsResponse,
} from 'views/Governance/views/GovernanceObeya/hooks/useObeya';
import InitiativeActions from 'views/Governance/views/GovernanceObeya/views/GovernanceObeyaHome/views/Updates/components/InitiativeActions/InitiativeActions';
import {
  Box,
  Grid,
  Typography,
} from '@material-ui/core';

import { RatingSeries } from './';
import { HighlightsProgressCard } from './HighlightsProgressCard';
import { HighlightsValueCard } from './HighlightsValueCard';
import ScopeTable from './ScopeTable';
import { useStyles } from './styles';

export interface HighlightsProps {
  scopeData: HighlightsResponse;
  title?: string;
  ratingSeries?: RatingSeries;
  objectivesCount?: number | string;
  keyResultsCount: number;
  progressValues: { completed: number; inProgress: number; proposed: number; };
  completedCount?: number;
  remainingCount?: number;
  activeRoom?: any;
}

const Highlights = ({
  scopeData,
  ratingSeries,
  objectivesCount = 0,
  keyResultsCount = 0,
  activeRoom,
}: HighlightsProps): JSX.Element => {
  const classes = useStyles();

  const { completed, inProgress, proposed } = useMemo(() => {
    return scopeData.reduce((acc, item) => {
      acc.completed = acc.completed + item.completed;
      acc.inProgress = acc.inProgress + item.inProgress;
      acc.proposed = acc.proposed + item.proposed;
      return acc;
    }, { completed: 0, inProgress: 0, proposed: 0 });
  },
    [scopeData]
  );

  return (
    <Box>
      <Grid container spacing={2} direction="row" justifyContent="center">
        <Grid container item>
          <Box display="flex" alignItems="center" justifyContent="right" style={{
            // border: '1px solid #efefef',
            width: '100%',
            padding: '8px 10px'
          }}>
            <InitiativeActions />
          </Box>
        </Grid>
      </Grid>
      <Grid container spacing={2} direction="row" justifyContent="center">
        <Grid container item xs={5}>
          <Box className={classes.container}>
            <Typography className={classes.title}>Value</Typography>
            <HighlightsValueCard
              ratingSeries={ratingSeries}
              objectivesCount={objectivesCount}
              keyResultsCount={keyResultsCount}
            />
          </Box>
        </Grid>
        <Grid container item xs={7}>
          <Box className={classes.container}>
            <Typography className={classes.title}>Progress</Typography>
            <HighlightsProgressCard
              progressValues={{ completed, inProgress, proposed }}
              completedCount={completed}
              remainingCount={proposed}
              activeRoom={activeRoom}
            />
          </Box>
        </Grid>
      </Grid>
      <Box className={classes.scopeContainer} mt={2}>
        <Box className={classes.container}>
          <Typography className={classes.title}>Scope</Typography>
          <ScopeTable data={scopeData} />
        </Box>
      </Box>
    </Box>
  );
};

export default memo(Highlights);
