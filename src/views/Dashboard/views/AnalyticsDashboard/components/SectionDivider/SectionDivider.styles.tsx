import {
  createStyles,
  makeStyles,
} from '@material-ui/core/styles';

export const useStyles = makeStyles(() =>
  createStyles({
    dividerContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    dividerLeftUnit: {
      width: '100px',
      alignSelf: 'center',
      marginLeft: '30px',
      marginRight: '30px',
      marginBottom: '25px',
      marginTop: '25px',
      backgroundColor: '#0077C8'
    },
    dividerRightUnit: {
      flexGrow: 1,
      alignSelf: 'center',
      marginLeft: '30px',
      marginRight: '30px',
      marginBottom: '25px',
      marginTop: '25px',
      backgroundColor: '#0077C8'
    },
    dividerText: {
      fontFamily: 'Open Sans',
      fontSize: '22px',
      fontWeight: 'normal',
      color: 'rgba(75,75,75,1)',
      alignSelf: 'center',
    }
  })
);
