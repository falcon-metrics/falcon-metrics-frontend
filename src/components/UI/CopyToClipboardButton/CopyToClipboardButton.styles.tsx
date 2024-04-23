import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    button: {
      display: 'inline',
      width: 'min-content',
      margin: '8px',
      flex: '0 0',
    },
    icon: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      color: '#707070',
    },
  }),
);

export default useStyles;
