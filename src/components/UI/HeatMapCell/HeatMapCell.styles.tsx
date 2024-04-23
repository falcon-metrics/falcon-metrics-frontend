import { createStyles, makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(() =>
  createStyles({
    cell: {
      textAlign: 'center',
      width: '100%',
      fontWeight: 'bold',
    },
  }),
);

export default useStyles;
