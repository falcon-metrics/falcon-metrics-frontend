import { DateTime } from 'luxon';
import { ObeyaColors } from 'views/Governance/utils/constants';
import {
  defaultHorizontalBarConfig,
} from 'views/Governance/views/GovernanceObeya/utils';

import {
  Box,
  Typography,
} from '@material-ui/core';

import HorizontalBar from '../../components/HorizontalBar';
import Legends from '../Progress/Legends';
import { HighlightsProps } from './Highlights';
import { useStyles } from './styles';
import Timelapse from './Timelapse';

type HighlightProgressKeys =
  | 'progressValues'
  | 'completedCount'
  | 'remainingCount'
  | 'activeRoom';

type HighlightProgressCardProps = Pick<HighlightsProps, HighlightProgressKeys> & { titleChart?: string; };

export const HighlightsProgressCard = ({
  progressValues,
  completedCount,
  remainingCount,
  activeRoom,
  titleChart
}: HighlightProgressCardProps) => {
  const formattedEndDate = DateTime.fromISO(
    activeRoom?.endDate ?? DateTime.now(),
  );
  const diff = formattedEndDate.diff(DateTime.now());

  const remainingDays = activeRoom?.endDate
    ? Math.ceil(diff.as('days'))
    : 0;

  const classes = useStyles();
  const daysLabel = remainingDays === 1 ? 'day' : 'days';
  return (
    <Box>
      <Box pl={2} style={{ position: 'relative' }}>
        <Typography className={classes.title}>{titleChart}</Typography>
        <Box
          style={{
            position: 'absolute',
            right: 20,
            top: 4,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Box
            mr={0.5}
            style={{
              fontFamily: 'Open Sans',
              background: '#F3F2F1',
              color: '#707070',
              fontSize: 16,
              padding: '0 4px',
              borderRadius: 5,
            }}
          >
            {remainingDays > 0 ? remainingDays : 0}
          </Box>
          <Typography
            style={{
              fontSize: 14,
              fontFamily: 'Open Sans',
              color: '#707070',
            }}
          >
            {daysLabel} left
          </Typography>
        </Box>
      </Box>
      <Box display="flex">
        <Box
          flex="1"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          style={{ position: 'relative' }}
        >
          <Box mt={3}>
            <Timelapse
              completedCount={completedCount || 0}
              remainingCount={remainingCount || 0}
              startDate={activeRoom?.beginDate}
              endDate={activeRoom?.endDate}
            />
          </Box>
          <Box mb={2} style={{ position: 'relative', width: '100%' }}>
            <HorizontalBar
              customProps={{
                ...defaultHorizontalBarConfig,
                plot: {
                  valueBox: {
                    ...defaultHorizontalBarConfig.plot.valueBox,
                    text: '%npv% ',
                    fontSize: 12,
                    decimals: 0,
                  },
                },
              }}
              donePerc={progressValues.completed}
              inProgressPerc={progressValues.inProgress}
              toDoPerc={progressValues.proposed}
            />
            <Box ml={3} className={classes.progressBarLabelText}>
              All Boards
            </Box>
          </Box>
          <Box
            mt={1}
            mb={1}
            display="flex"
            alignSelf="flex-end"
            justifyContent="center"
          >
            <Legends title="Completed" color={ObeyaColors.COMPLETED} />
            <Legends title="In Progress" color={ObeyaColors.IN_PROGRESS} />
            <Legends title="Not Started" color={ObeyaColors.NOT_STARTED} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
