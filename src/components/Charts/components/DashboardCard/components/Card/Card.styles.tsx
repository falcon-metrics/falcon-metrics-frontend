import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) =>
  createStyles({
    box: {
      backgroundColor: theme.palette.secondary.main,
      borderRadius: '16px',
      minHeight: '406px',
      boxShadow: '0px 2px 11px 0px #dcdcdc',
      overflow: 'hidden',
      padding: '10px'
    },
  }),
);

export default useStyles;
