import HorizontalBar from '../../components/HorizontalBar';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { defaultHorizontalBarConfig } from 'views/Governance/views/GovernanceObeya/utils';
import { TABS } from '.';
import SpinnerFullSize from 'components/SpinnerFullSize';
import { BoardItem } from 'hooks/fetch/useProgress';

type ProgressProps = { total?: number; completedCount?: number; } & BoardItem;

export interface ProgressTabProps {
  boards?: ProgressProps[];
  activeTab: TABS;
  loading?: boolean;
  boardKey: string;
  isModalOpen?: boolean;
}

const useStyles = makeStyles(() =>
  createStyles({
    boardName: {
      color: '#707070',
      fontSize: 14,
      position: 'absolute',
      zIndex: 400,
    },
    boardContainer: {
      overflow: 'auto',
      maxHeight: 400,
    },
    boardContainerNoMaxHeight: {
      maxHeight: 'calc(100vh - 250px)',
      overflow: 'auto'
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
      marginTop: 16,
    },
    progressBarContainer: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      position: 'relative',
    },
  }),
);

export const ProgressBars = ({
  boards = [],
  loading,
  boardKey,
  isModalOpen
}: ProgressTabProps) => {
  const classes = useStyles();

  return (
    <Box className="widget-title">
      {loading ? (
        <SpinnerFullSize />
      ) : (
        <Box className={isModalOpen ? classes.boardContainerNoMaxHeight : classes.boardContainer}>
          {boards.map((board, index) => {
            return (
              <Box key={index}>
                <Grid container className={classes.progressBarContainer}>
                  <Grid item xs={10}>
                    <Box ml={3} className={classes.boardName}>
                      {board[boardKey]}
                    </Box>
                    <HorizontalBar
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
                    />
                  </Grid>
                  <Grid item xs={2} className={classes.completedTextContainer}>
                    <Box justifyContent="center" display="flex">
                      <span className={classes.completedText}>
                        {`${board?.completed}`}
                      </span>
                      {` / ${board?.completed + board?.inProgress + board?.proposed}`}
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            );
          })}
        </Box>
      )}
    </Box>
  );
};
