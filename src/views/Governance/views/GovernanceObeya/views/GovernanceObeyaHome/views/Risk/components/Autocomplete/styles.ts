import {
  createStyles,
  makeStyles,
} from '@material-ui/core/styles';

export const useStyles = makeStyles(() =>
  createStyles({
    font: {
      fontFamily: 'Open Sans',
      fontSize: 14,
    },
    error: {
      color: 'red',
      borderBottom: '1px solid red'
    }
  })
);