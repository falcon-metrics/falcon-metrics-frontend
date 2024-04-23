import Box from '@material-ui/core/Box';
import { createStyles, makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) =>
  createStyles({
    wrapper: {
      minWidth: 110,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      marginRight: theme.spacing(4)
    },
    square: {
      width: 12,
      height: 12,
      marginLeft: 10,
      marginTop: 1
    },
    title: {
      fontFamily: 'Open Sans',
      color: '#707070',
      fontSize: 12,
      marginLeft: 6,
    },
  }),
);

const Legends = () => {
  const classes = useStyles();
  return (
    <Box className={classes.wrapper}>
      <Box className={classes.square} style={{ backgroundColor: "#26BDB5" }} />
      <Box className={classes.title}>Focus on this initiative</Box>
      
      <Box className={classes.square} style={{ backgroundColor: "#D7D7D7" }} />
      <Box className={classes.title}>Focus on others</Box>
    </Box>
  );
};

export default Legends;
