import { makeStyles, createStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() =>
  createStyles({
    loader: {
      color: '#fff',
    },
    progressContainer: {
      display: 'flex',
      textAlign: 'center',
      justifyContent: 'center',
      margin: '25px auto',
      width: 70,
      height: 70,
    },
    img: {
      margin: '25px auto',
      objectFit: 'contain',
    },
  }),
);
