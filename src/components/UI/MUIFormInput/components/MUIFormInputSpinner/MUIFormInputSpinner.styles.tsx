import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    progressContainer: {
      position: 'relative',
    },
    progress: {
      position: 'absolute',
      top: -9,
      right: 5,
    },
  }),
);

export default useStyles;
