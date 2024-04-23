import { useMemo } from 'react';

import memo from 'utils/typescript/memo';
import DashboardCard, {
  ChartSizes,
} from 'views/Dashboard/components/Charts/components/DashboardCard';
import {
  HighlightsResponse,
} from 'views/Governance/views/GovernanceObeya/hooks/useObeya';

import {
  Box,
  Grid,
  Typography,
} from '@material-ui/core';

import { RatingSeries } from '.';
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
  HighlightsValueCardProps?: any;
}

const Highlights = ({
  scopeData,
  title,
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
    <DashboardCard title={title ?? 'Highlights'} size={ChartSizes.large} fullScreen={true}>
      <Grid container spacing={2} direction="row" justifyContent="center">
        <Grid container item xs={5}>
          <Box className={classes.container}>
            <HighlightsValueCard
              ratingSeries={ratingSeries}
              objectivesCount={objectivesCount}
              keyResultsCount={keyResultsCount}
            />
          </Box>
        </Grid>
        <Grid container item xs={7}>
          <Box className={classes.container}>
            <HighlightsProgressCard
              progressValues={{ completed, inProgress, proposed }}
              completedCount={completed}
              remainingCount={proposed}
              activeRoom={activeRoom}
            />
          </Box>
        </Grid>
      </Grid>
      <Box className={classes.scopeContainer} mt={2} ml={4} mr={4} mb={2}>
        <Box pl={2} mt={2}>
          <Typography className={classes.title}>Scope</Typography>
        </Box>
        <Box>
          <ScopeTable data={scopeData} />
        </Box>
      </Box>
    </DashboardCard>
  );
};

export default memo(Highlights);
