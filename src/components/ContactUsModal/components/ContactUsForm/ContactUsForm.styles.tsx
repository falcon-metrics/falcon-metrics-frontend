import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    grid: {
      width: '100%',
    },
    title: {
      fontSize: '18px',
      color: '#001a70',
      fontFamily: 'Open Sans',
      fontWeight: 600,
      width: '100%',
    },
    inputLabel: {
      position: 'relative',
      fontSize: 13,
      color: '#000',
      fontFamily: 'Open Sans',
    },
    textAreaLabel: {
      marginBottom: 5,
    },
    email: {
      fontSize: 13,
      color: '#707070',
      fontFamily: 'Open Sans',
    },
    emailField: {
      fontFamily: 'Open Sans',
      padding: '12px 12px',
      fontSize: 13,
    },
    messageText: {
      fontFamily: 'Open Sans',
      fontSize: 13,
    },
    button: {
      textTransform: 'none',
      fontFamily: 'Open Sans',
      color: 'white',
      borderRadius: 5,
      fontSize: 14,
      fontWeight: 600,
      '&:hover': {
        backgroundColor: 'rgb(33, 160, 154, 1)',
      },
      width: '140px',
      height: '45px',
    },
    wrapperButton: {
      justifyContent: 'center',
      display: 'flex',
      paddingLeft: '-10px',
    },
  }),
);

export default useStyles;
