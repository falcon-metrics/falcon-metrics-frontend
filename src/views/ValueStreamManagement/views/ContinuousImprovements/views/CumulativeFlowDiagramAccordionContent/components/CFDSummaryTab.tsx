import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { cfdColourPalletLine } from './CFDChart';
import { CFDSummaryItem } from "../../../hooks/useCumulativeFlowDiagramData";
import Skeleton from '@material-ui/lab/Skeleton';

type Props = {
  data?: {
    [state: string]: CFDSummaryItem
  };
  isLoading?: boolean;
}

const useStyles = makeStyles(() =>
  createStyles({
    headerGrid: {
      marginTop: 26,
    },
    firstHeader: {
      fontSize: 12,
      fontFamily: 'Open Sans',
      fontWeight: 'bold',
      textAlign: 'left',
    },
    header: {
      fontSize: 12,
      fontFamily: 'Open Sans',
      fontWeight: 'bold',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
    },
    contentGrid: {
      borderBottom: '1px solid #E9E9E9',
      height: 39,
    },
    firstColumn: {
      textAlign: 'left',
      fontSize: 12,
      fontFamily: 'Open Sans',
      display: 'flex',
      alignItems: 'center',
    },
    firstColumnLabel: {
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
    },
    column: {
      fontSize: 12,
      fontFamily: 'Open Sans',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
    },
    circle: {
      width: 12,
      height: 12,
      minWidth: 12,
      minHeight: 12,
      borderRadius: 24,
      marginRight: 4,
    },
  }),
);

export const CFDSummaryTab = ({
  data,
  isLoading,
}: Props) => {
  const classes = useStyles();
  let tableContent;
  if (isLoading) {
    tableContent = (
      [0, 1].map((index) =>
      <Grid key={index} className={classes.contentGrid} container>
        <Grid className={classes.firstColumn} item xs={2}>
          <Box display="flex" justifyContent="center" alignItems="center">
            <Skeleton width={14} height={14} variant="circle" />
            <Skeleton width={50} height={14} style={{ marginLeft: 5, }}  variant="text" />
          </Box>
        </Grid>
        <Grid className={classes.column} item xs={2}><Skeleton width={80} height={14} variant="text" /></Grid>
        <Grid className={classes.column} item xs={2}><Skeleton width={80} height={14} variant="text" /></Grid>
        <Grid className={classes.column} item xs={3}><Skeleton width={100} height={14} variant="text" /></Grid>
        <Grid className={classes.column} item xs={3}><Skeleton width={100} height={14} variant="text" /></Grid>
      </Grid>
    )
    )
  } else {
    const stateList = !data ? [] : Object.keys(data).map(
      (state) => ({
        state,
        ...data[state]
      })
    );

    tableContent = stateList.map((summaryItem, index) =>
      <Grid key={summaryItem.state} className={classes.contentGrid} container>
        <Grid className={classes.firstColumn} item xs={2}>
          <div className={classes.circle} style={{width: 12, height: 12, backgroundColor: cfdColourPalletLine[index % cfdColourPalletLine.length], borderRadius: 24}}></div>
          <div className={classes.firstColumnLabel}>{summaryItem.state}</div>
        </Grid>
        <Grid className={classes.column} item xs={2}>{(summaryItem.arrivalRate || 0).toFixed(2)}</Grid>
        <Grid className={classes.column} item xs={2}>{(summaryItem.departureRate || 0).toFixed(2)}</Grid>
        <Grid className={classes.column} item xs={3}>{(summaryItem.dailyAverage || 0).toFixed(2)}</Grid>
        <Grid className={classes.column} item xs={3}>{(summaryItem.averageCycleTime || 0).toFixed(0)}</Grid>
      </Grid>
    )
  }
  // console.log(Object.keys(data).map((state) => ({state, arrival: data[state].averageCycleTime })))
  return (
    <Box className="cfd-summary-tab">
      <Box fontFamily="Open Sans" fontSize="14px" fontWeight="bold">Summary</Box>
      <Box paddingLeft="21px" maxHeight="260px" overflow="hidden auto">
        <Grid className={classes.headerGrid} container>
          <Grid className={classes.firstHeader} item xs={2}>Stages</Grid>
          <Grid className={classes.header} item xs={2}>Arrival rate<br/>(items/day)</Grid>
          <Grid className={classes.header} item xs={2}>Departure rate<br/>(items/day)</Grid>
          <Grid className={classes.header} item xs={3}>Average Daily WIP<br/>(items)</Grid>
          <Grid className={classes.header} item xs={3}>Average Cycle time<br/>(days)</Grid>
        </Grid>
        {
          tableContent
        }
      </Box>
    </Box>
  );
};
