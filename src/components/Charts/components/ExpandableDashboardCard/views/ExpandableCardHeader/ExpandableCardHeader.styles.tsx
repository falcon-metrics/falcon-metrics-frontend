import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    box: {
      position: 'relative',
      padding: 15,
      marginRight: 25,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    titleContainer: {
      display: 'flex',
      alignItems: 'baseline',
    },
  }),
);

export default useStyles;
