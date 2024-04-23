import {
  createStyles,
  makeStyles,
} from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    titleTable: {
      width: '100%',
      paddingBottom: 30,
      paddingTop: 30,
    },
    tableContainer: {
      border: 'solid 0px #e0e0e0'
    },
    titleTableCell: {
      fontFamily: 'Open Sans',
      fontSize: 14,
      fontWeight: 'bold',
      position: 'relative',
      textTransform: 'capitalize'
    },
    titleCell: {
      fontFamily: 'Open Sans',
      fontSize: 14
    },
    contentCell: {
      fontFamily: 'Open Sans',
      fontSize: 12,
      textTransform: 'capitalize'
    }
  }),
);

export default useStyles;