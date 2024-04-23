import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    position: 'absolute',
    right: 10,
    top: 7,
    width: 25,
    height: 60,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  defaultCircle: {
    background: '#C4C4C4',
    width: 10,
    height: 10,
    borderRadius: '50%',
    marginTop: 4,
  },
  red: {
    background: '#E1523E',
  },
  yellow: {
    background: '#FFB633',
  },
  green: {
    background: '#22A8A1',
  },
  gray: {
    background: '#C4C4C4',
  }
}));

export enum LightTypes {
  RED = 'red',
  YELLOW = 'yellow',
  GREEN = 'green',
  GRAY ='gray'
}

type Props = {
  activeLight?: LightTypes,
};

export const TrafficLights = ({ activeLight }: Props) => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Box className={`${classes.defaultCircle} ${activeLight === LightTypes.RED ? classes[LightTypes.RED] : null}`} />
      <Box className={`${classes.defaultCircle} ${activeLight === LightTypes.YELLOW ? classes[LightTypes.YELLOW] : null}`} />
      <Box className={`${classes.defaultCircle} ${activeLight === LightTypes.GREEN ? classes[LightTypes.GREEN] : null}`} />
    </Box>
  );
}
