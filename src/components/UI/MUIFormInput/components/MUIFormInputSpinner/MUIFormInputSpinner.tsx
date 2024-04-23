import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import useStyles from './MUIFormInputSpinner.styles';

interface Props {
  isVisible: boolean;
  style?: any;
}

function Spinner({ isVisible, style = {} }: Props) {
  const classes = useStyles();

  if (!isVisible) return null;
  return (
    <Box className={classes.progressContainer} style={style}>
      <CircularProgress size={20} className={classes.progress} />
    </Box>
  );
}

export default Spinner;
