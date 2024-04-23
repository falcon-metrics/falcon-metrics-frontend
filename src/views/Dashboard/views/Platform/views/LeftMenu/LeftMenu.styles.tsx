import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) =>
  createStyles({
    appLeftColumn: {
      backgroundColor: theme.palette.primary.main,
      height: '100%',
      width: 105,
      position: 'fixed',
    },
    container: {
      justifyContent: 'space-between',
      height: '100%',
    },
    column: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
  }),
);

export default useStyles;
