import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '100%',
    paddingBottom: 15,
  },
  countLabel: {
    display: 'flex',
    alignItems: 'center',
    fontSize: 20,
    fontFamily: 'Open Sans',
    fontWeight: 600,
    color: '#32383E',
    width: 250,
  },
  selectionContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
});
