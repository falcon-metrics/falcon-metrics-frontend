import {
  createStyles,
  makeStyles,
} from '@material-ui/core/styles';

export const useStyles = makeStyles(() =>
  createStyles({
    messageText: {
      fontFamily: 'Open Sans',
      fontSize: 18,
      textAlign: 'left',
      color: '#8E8E8E'
    },
    btn: {
      fontFamily: 'Open Sans',
      textTransform: 'none',
      marginTop: 10,
      fontSize: 14,
    },
    wrapper: {
      width: '100%',
      height: 520,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      flexDirection: 'column',
    },
  }),
);