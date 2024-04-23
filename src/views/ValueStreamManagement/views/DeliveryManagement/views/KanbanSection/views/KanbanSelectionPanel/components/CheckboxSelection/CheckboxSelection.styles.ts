import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
  checkboxContainer: {
    display: 'flex',
    flexDirection: 'row',
    color: 'rgba(0, 0, 0, 0.7)',
    paddingLeft: 15,
    paddingRight: 15,
  },
  checkboxItem: {
    fontSize: 16,
    fontFamily: 'Open Sans',
    fontWeight: 400,
    paddingLeft: 15,
    paddingRight: 15,
  },
  checked: {
    color: '#757575',
    '&$checked': {
      color: '#757575',
    },
  },
});
