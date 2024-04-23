import Box from '@material-ui/core/Box';
import { createStyles, makeStyles } from '@material-ui/core/styles';

interface Props {
  color?: string;
  title?: string;
}

const useStyles = makeStyles(() =>
  createStyles({
    wrapper: {
      minWidth: 110,
      display: 'flex',
      alignItems: 'center',
    },
    square: {
      width: 12,
      height: 12,
    },
    title: {
      fontFamily: 'Open Sans',
      color: '#707070',
      fontSize: 12,
      marginLeft: 6,
    },
  }),
);

const Legends = ({ color, title }: Props) => {
  const classes = useStyles();
  return (
    <Box className={classes.wrapper}>
      <Box className={classes.square} style={{ backgroundColor: color }} />
      <Box className={classes.title}>{title}</Box>
    </Box>
  );
};

export default Legends;
