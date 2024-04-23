import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    box: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      height: '100%',
    },
    content: {
      flex: '1 1',
      minHeight: '300px',
      padding: 15,
    },
    noTopPadding: {
      paddingTop: 0
    }
  }),
);

export default useStyles;
