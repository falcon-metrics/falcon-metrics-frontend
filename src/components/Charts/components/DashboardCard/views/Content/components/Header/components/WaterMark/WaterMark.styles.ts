import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    text: {
      fontFamily: 'Open Sans',
      fontSize: 16,
      fontWeight: 'bold',
      color: 'rgba(255, 0, 0, 0.2)',
    },
  }),
);

export default useStyles;
