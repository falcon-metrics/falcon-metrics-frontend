import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) =>
  createStyles({
    box: {
      backgroundColor: theme.palette.secondary.main,
      borderRadius: '8px',
      minHeight: '406px',
      boxShadow: '0px 2px 11px 0px #dcdcdc',
      overflow: 'hidden',
      height: 'inherit',
      display: 'flex',
      flexDirection: 'column',
      maxHeight: '100%',
      paddingTop: 5,
      paddingRight: 10,
      paddingLeft: 10,
      paddingBottom: 20,
    },
  }),
);

export default useStyles;
