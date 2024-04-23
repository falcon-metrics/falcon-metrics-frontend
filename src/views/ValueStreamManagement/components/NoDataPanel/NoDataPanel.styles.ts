import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainMessage: {
    color: '#32383E',
    fontFamily: 'Open Sans',
    fontSize: 32,
    fontWeight: 600,
    marginTop: 15,
    wordWrap: 'break-word'
  },
});
