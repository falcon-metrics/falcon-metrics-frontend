import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
  radioButtonContainer: {
    display: 'flex',
    flexDirection: 'row',
    color: 'rgba(0, 0, 0, 0.7)',
    paddingLeft: 15,
    paddingRight: 15,
  },
  checked: {
    color: '#757575',
    '&$checked': {
      color: '#757575',
    },
  },
  tooltip: {
    display: 'flex',
    alignItems: 'center',
    '& img': {
      width: 16,
    },
  },
  operatorLabel: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: 10,
    fontSize: 16,
    fontWeight: 600,
  },
});
