import memo from 'utils/typescript/memo';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import WorkFlowCard from './WorkflowCard';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles({
  root: {
    width: '100%',
    height: '100%',
    background: '#efefef',
    marginRight: 3,
    marginTop: 0,
    flexGrow: 1,
    paddingBottom: '3.8rem',
    position: 'relative',
  },
  inline: {
    display: 'inline',
  },
  listItem: {
    display: 'flex',
    background: '#efefef',
    marginTop: 4,
    paddingBottom: 0,
  },
  showMoreButton: {
    fontFamily: 'Open Sans',
    fontSize: 14,
  },
  showMoreContainer: {
    justifyContent: 'center',
    width: '100%',
    height: 40,
    display: 'flex',
    background: '#efefef',
    position: 'absolute',
    bottom: 0,
    flexGrow: 1,
  },
});

export type Data = {
  name?: string;
  title?: string;
  id?: string;
};

export interface Props {
  data?: Array<Data> | any;
  id?: string;
  enableLoadButton?: boolean;
  isLoadingMore?: boolean;
  onLoadMore?: () => void;
}

const WorkflowList = memo(
  ({ data = [], enableLoadButton, onLoadMore, isLoadingMore }: Props) => {
    const classes = useStyles();
    return (
      <List className={classes.root}>
        <>
          {data.map((item, index) => {
            return (
              <Grid
                container
                direction="column"
                justifyContent="flex-start"
                alignItems="flex-start"
                spacing={0}
                key={index}
              >
                <Grid item xs={12}>
                  <ListItem key={index} className={classes.listItem}>
                    <WorkFlowCard
                      arrivalDate={item?.arrivalDate}
                      commitmentDate={item?.commitmentDate}
                      departureDate={item?.departureDate}
                      workItemId={item.workItemId}
                      stateCategory={item.stateCategory}
                      title={item.title}
                      state={item.state}
                      workItemType={item.workItemType}
                      flagged={item.flagged}
                    />
                  </ListItem>
                </Grid>
              </Grid>
            );
          })}
          {enableLoadButton && (
            <Box className={classes.showMoreContainer}>
              <Button
                className={classes.showMoreButton}
                color="primary"
                variant="outlined"
                onClick={() => onLoadMore?.()}
                endIcon={isLoadingMore ? <CircularProgress size={18} /> : null}
              >
                Show more
              </Button>
            </Box>
          )}
        </>
      </List>
    );
  },
);

export default WorkflowList;
