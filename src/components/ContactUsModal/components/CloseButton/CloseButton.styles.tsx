import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    closeButton: {
      display: 'flex',
      alignContent: 'flex-end',
      justifyContent: 'flex-end',
      width: '100%',
      position: 'absolute',
      right: 2,
      top: 0,
    },
  }),
);

export default useStyles;
