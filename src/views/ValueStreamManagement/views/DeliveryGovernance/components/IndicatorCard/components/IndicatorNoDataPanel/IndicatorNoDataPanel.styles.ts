import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  mainMessage: {
    color: '#32383E',
    fontFamily: 'Open Sans',
    fontSize: 18,
    fontWeight: 600,
    textAlign: 'center',
    marginTop: 15,
  },
  icon: {
    transform: 'scale(1)',
  },
});
