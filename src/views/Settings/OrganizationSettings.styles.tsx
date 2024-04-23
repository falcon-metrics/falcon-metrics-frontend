import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    progress: {
      position: 'absolute',
      top: 0,
      width: '100%',
    },
  }),
);

export default useStyles;
