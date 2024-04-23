import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    description: {
      fontSize: 20,
      fontFamily: 'Open Sans',
    },
  }),
);

export default useStyles;
