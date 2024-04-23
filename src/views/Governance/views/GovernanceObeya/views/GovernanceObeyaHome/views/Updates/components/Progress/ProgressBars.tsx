import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { TABS } from '.';
import { Typography } from '@material-ui/core';
import SpinnerFullSize from 'components/SpinnerFullSize';
import { BoardItem } from 'hooks/fetch/useProgress';
import ThinProgress from './components/ThinProgress';
import GroupIcon from '@material-ui/icons/Group';
import { styled } from '@material-ui/styles';

type ProgressProps = { total?: number; completedCount?: number; } & BoardItem;

export interface ProgressTabProps {
  boards?: ProgressProps[];
  activeTab: TABS;
  loading?: boolean;
  boardKey: string;
  isModalOpen?: boolean;
}

const PercentValue = styled(Box)({
  fontSize: 14,
  color: '#808689',
  fontWeight: 600,
  fontFamily: 'Open Sans',
  position: 'absolute',
  right: 55,
  top: 12,
});

const useStyles = makeStyles(() =>
  createStyles({
    boardName: {
      color: '#707070',
      fontSize: 14,
      zIndex: 400,
      display: 'inline-flex',
      width: 220,
      fontFamily: 'Open Sans'
    },
    title: {
      fontFamily: 'Open Sans',
      fontSize: 16,
      color: '#2B353B',
      fontWeight: 600
    },
    progressBarContainer: {
      display: 'inline-flex',
      width: 350,
      height: 44,
      position: 'relative'
    },
    boardContainer: {
      maxHeight: 190,
    },
    boardContainerNoMaxHeight: {
      maxHeight: 'calc(100vh - 250px)',
    },
    completedText: {
      color: '#00bfb2',
      fontFamily: 'Open Sans',
    },
    completedTextContainer: {
      fontSize: 14,
      fontFamily: 'Open Sans',
      fontWeight: 'bold',
      color: '#949191',
      justifyContent: 'center',
      alignItems: 'center',
      display: 'flex',
    },
  }),
);

export const ProgressBars = ({
  boards = [],
  loading,
  isModalOpen
}: ProgressTabProps) => {
  const classes = useStyles();

  return (
    <Box className="widget-title">
      <Grid container direction="row">
        <Box pl={3} pr={3}>
          <Typography className={classes.title}>Boards</Typography>
        </Box>
      </Grid>
      {loading ? (
        <SpinnerFullSize />
      ) : (
        <Box pl={3} className={isModalOpen ? classes.boardContainerNoMaxHeight : classes.boardContainer}>
          {boards.map((board, index) => {
            const total = board.completed + board.inProgress + board.proposed;
            const completedPercent = Math.ceil((board.completed !== 0 ? board.completed / total : 0) * 100);
            return (
              <Box key={index} display="flex" alignItems="center" mt={2} >
                <Box display="flex" justifyContent="center" mr={1}>
                  <GroupIcon width={16} height={16}  />
                </Box>
                <Box className={classes.boardName}>
                  <Typography style={{ fontFamily: 'Open Sans' }} noWrap>{board?.boardName}</Typography>
                </Box>
                <Box className={classes.progressBarContainer}>
                  <ThinProgress
                    completed={board.completed}
                    inProgress={board.inProgress}
                    proposed={board.proposed}
                    isLoading={loading}
                  />
                  <PercentValue>{completedPercent}%</PercentValue>
                </Box>
                  {/* <HorizontalBar
                    donePerc={board.completed}
                    inProgressPerc={board.inProgress}
                    toDoPerc={board.proposed}
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
                  /> */}
              </Box>
            );
          })}
        </Box>
      )}
    </Box>
  );
};
