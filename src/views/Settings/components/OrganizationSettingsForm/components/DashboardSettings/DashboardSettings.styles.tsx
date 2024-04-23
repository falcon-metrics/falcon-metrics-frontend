import { makeStyles, createStyles } from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors';

const useStyles = makeStyles(() =>
  createStyles({
    input: {
      display: 'none',
    },
    button: {
      color: blue[900],
      margin: 10,
    },
    image: {
      width: 128,
      height: 128,
      backgroundColor: '#0077c8',
    },
    img: {
      margin: 'auto',
      marginTop: '8px',
      display: 'block',
      maxWidth: '90%',
      maxHeight: '90%',
      backgroundColor: '#0077c8',
    },
  }),
);

export default useStyles;
