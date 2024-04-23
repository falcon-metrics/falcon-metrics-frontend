import {
  createStyles,
  makeStyles,
} from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    boardTitle: {
      fontFamily: 'Open Sans',
      fontSize: 14,
      color: '#323130',
      fontWeight: 'bold',
      marginTop: 30,
      marginBottom: 10,
    },
    workItemLevelTitle: {
      fontFamily: 'Open Sans',
      fontSize: 14,
      color: '#323130',
      fontWeight: 'bold',
      marginTop: 30,
      marginBottom: 10,
    },
    customFieldsContainer: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
    },
  }),
);

export default useStyles;
