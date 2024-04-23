import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) =>
  createStyles({
    main: {
      flexGrow: 1,
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    section: {
      width: '100%',
      padding: theme.spacing(4),
    },
    progress: {
      position: 'absolute',
      top: 0,
      width: '100%',
    },
  }),
);

export default useStyles;
