import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
  cardColumn: {
    display: 'flex',
    flexGrow: 1,
    alignContent: 'center',
    width: '100%',
    borderRadius: '0px 0px 5px 5px',
    backgroundColor: '#efefef',
    borderLeft: '3px solid white',
    borderRight: '3px solid white',
  },
});
