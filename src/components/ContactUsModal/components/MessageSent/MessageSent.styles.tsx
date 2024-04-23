import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    successMessage: {
      color: '#000',
      fontSize: 14,
      fontFamily: 'Open Sans',
      textAlign: 'center',
    },
    removeOutline: {
      outline: 0,
    },
  }),
);

export default useStyles;
