import {
  createStyles,
  makeStyles,
} from '@material-ui/core/styles';

export const useStyles = makeStyles(() =>
  createStyles({
    container: {
      display: 'flex',
      flexDirection: 'column',
      marginTop: 100,
      marginBottom: 100,
      justifyContent: 'center',
      alignItems: 'center',
    },
    donutChartContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '10vw',
      maxWidth: '225px',
      height: '10vw',
      maxHeight: '225px',
    },
    legendContainer: {
      display: 'flex',
      flexDirection: 'row',
      flexGrow: 1,
      width: '100%',
      alignItems: 'flex-start',
      justifyContent: 'center',
      paddingTop: 50,
    },
    legend: {
      display: 'flex',
      flexDirection: 'row',
      padding: 20
    }
  })
);
