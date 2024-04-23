import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) =>
  createStyles({
    main: {
      flexGrow: 1,
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 100,
    },
    removeoutline: {
      outline: 0,
    },
    paper: {
      width: '62vh',
      backgroundColor: theme.palette.background.paper,
      borderRadius: 10,
      boxShadow: theme.shadows[1],
      padding: '0 50px 55px 50px',
      outline: 0,
      marginTop: '3.5rem',
      '&:focus': {
        outline: 0,
      },
    },
    logo: {
      display: 'flex',
      width: '80%',
      marginLeft: '-25px',
    },
    title: {
      fontSize: '35px',
      color: '#1277c8',
      fontFamily: 'Open Sans',
      fontWeight: 600,
      width: '100%',
      display: 'flex',
      alignItems: 'flex-start',
    },
    description: {
      fontSize: 18,
      color: 'rgba(0, 0, 0, 0.7)',
      fontFamily: 'Open Sans',
    },
    button: {
      textTransform: 'none',
      fontFamily: 'Open Sans',
      color: 'white',
      borderRadius: 3,
      width: 221,
      fontSize: 20,
      boxShadow: theme.shadows[5],
      fontWeight: 600,
      '&:hover': {
        backgroundColor: 'rgb(33, 160, 154, 1)',
      },
    },
  }),
);

export default useStyles;
