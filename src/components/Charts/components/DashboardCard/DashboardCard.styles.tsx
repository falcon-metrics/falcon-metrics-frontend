import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  relativeContainer: {
    position: 'relative',
  },
  buttonContainer: {
    position: 'absolute',
    right: 10,
    top: 18,
    zIndex: 1,
  },
});

export default useStyles;
