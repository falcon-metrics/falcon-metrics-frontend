import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      marginLeft: 0,
      background: '#fff',
      height: 32,
      borderRadius: 20,
    },
  }),
);

export default useStyles;
