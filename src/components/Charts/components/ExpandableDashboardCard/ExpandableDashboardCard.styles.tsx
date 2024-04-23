import {
  createStyles,
  makeStyles,
} from '@material-ui/core/styles';

export const useStyles = makeStyles(() =>
  createStyles({
    foldedContainer: {
      marginTop: '20px',
      marginBottom: '20px',
      height: '800px',
    },
    unfoldedContainer: {
      marginTop: '20px',
      marginBottom: '20px',
      flexGrow: 1,
    },
    buttonRelativeContainer: {
      position: 'relative',
    },
    buttonIconContainer: {
      position: 'absolute',
      right: 10,
      top: 5,
      zIndex: 1,
    },
    card: {
      height: 'inherit',
      display: 'flex',
      flexDirection: 'column',
      maxHeight: '100%',
    },
    content: {
      display: 'flex',
      flexGrow: 1,
      minHeight: '300px',
      paddingLeft: 15,
      paddingRight: 15,
      paddingBottom: 15,
      justifyContent: 'center',
    },
  })
);
