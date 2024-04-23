import {
  createStyles,
  makeStyles,
} from '@material-ui/core/styles';

export const useStyles = makeStyles(() =>
  createStyles({
    generalContainer: {
      display: 'flex',
      flexDirection: 'column',
      flexGrow: 1,
    },
    viewContainer: {
      borderRadius: '15px',
      padding: '0rem 1.5rem',
    },
  })
);
