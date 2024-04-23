import {
  createStyles,
  makeStyles,
} from '@material-ui/core/styles';

export const useStyles = makeStyles(() => 
  createStyles({
    container: {
      display: 'flex',
      flexDirection: 'row',
    },
    switchLabel: {
      color: '#323130',
      fontSize: 12,
      fontFamily: 'Open Sans',
      fontWeight: 600,
      marginRight: 30,
    },
    tooltipText: {
      color: '#32383E',
      fontSize: 10,
      fontFamily: 'Open Sans',
      fontWeight: 400,
    }
  })
);
