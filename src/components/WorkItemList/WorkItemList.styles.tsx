import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  container: {
    marginBottom: '3em',
  },
  dataGrid: {
    root: {
      width: '200vw',
    },
    columnHeader: {
      fontWeight: 'bold',
    },
  },
  gridToolbarExport: {
    position: 'absolute',
    right: 0,
    top: 510,
  },
});

export default useStyles;
