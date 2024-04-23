import {
  createStyles,
  makeStyles,
} from '@material-ui/core/styles';

export const useStyles = makeStyles(() =>
  createStyles({
    groupContainer: {
      borderRadius: '15px',
      marginTop: '15px',
      padding: '0.5rem 1.5rem',
    },
  })
);
