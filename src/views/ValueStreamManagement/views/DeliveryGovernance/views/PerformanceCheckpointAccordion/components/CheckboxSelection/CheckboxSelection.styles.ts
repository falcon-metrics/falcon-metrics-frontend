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
    marginRight: 26,
    '& .MuiFormControlLabel-label': {
      fontSize: 16,
      fontFamily: 'Open Sans',
      fontWeight: 400,
    },
    minWidth: 130,
  },
  checked: {
    color: '#757575',
    '&$checked': {
      color: '#757575',
    },
  },
  compareButton: {
    width: 128,
    height: 28,
    fontFamily: 'Open Sans',
    marginTop: 14,
    textTransform: 'capitalize',
    marginLeft: 30
  }
});
