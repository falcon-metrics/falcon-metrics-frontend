import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) =>
  createStyles({
    main: {
      flexGrow: 1,
      height: '100%',
      // minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      // justifyContent: 'center',
      alignItems: 'center',
      fontFamily: 'Open Sans',
    },
    section: {
      width: '100%',
      padding: theme.spacing(4),
      marginBottom: 20
    },
    grid: {
      height: '350px',
    },
    title: {
      fontFamily: 'Open Sans',
      fontSize: 36,
      fontWeight: 700,
    },
    subtitle: {
      fontFamily: 'Open Sans',
    },
    description: {
      fontSize: 20,
      fontFamily: 'Open Sans',
    },
    tinyIntroText: {
      fontSize: 14,
    },
  }),
);

export default useStyles;
