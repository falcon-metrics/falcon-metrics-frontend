import {
  createStyles,
  makeStyles,
} from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    actionColumn: {
      display: 'inline-flex',
      alignItems: 'center',
    },
    boardTitle: {
      fontFamily: 'Open Sans',
      fontSize: 14,
      color: '#323130',
      fontWeight: 'bold',
      marginTop: 30,
      marginBottom: 10,
    },
    addButton: {
      color: '#323130',
      fontFamily: 'Open Sans',
      fontSize: 14,
      lineHeight: 0,
    },
    toolbarContainer: {
      display: 'flex',
      justifyContent: 'flex-end',
    },
    titleRecommended: {
      color: '#a9a9a9',
      fontSize: 12
    }
  }),
);

export default useStyles;
