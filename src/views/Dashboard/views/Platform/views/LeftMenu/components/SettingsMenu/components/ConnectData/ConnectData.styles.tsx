import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    cursor: 'pointer',
  },
  typography: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'Open Sans',
    textAlign: 'center',
  },
});

export default useStyles;
