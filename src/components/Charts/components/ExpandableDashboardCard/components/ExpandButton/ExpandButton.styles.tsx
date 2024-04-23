import {
  createStyles,
  makeStyles,
} from '@material-ui/core/styles';

export const useStyles = makeStyles(() =>
  createStyles({
    button: {
      minWidth: 20,
      minHeight: 25,
    },
  })
);
