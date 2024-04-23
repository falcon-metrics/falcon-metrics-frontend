import {
  createStyles,
  makeStyles,
} from '@material-ui/core/styles';

export const useStyles = makeStyles(() =>
  createStyles({
    table: {
      border: '1px solid rgba(224, 224, 224, 1)',
      borderRadius: 4,
      marginLeft: 20,
      marginRight: 20,
      marginBottom: 20,
    },
  })
);
