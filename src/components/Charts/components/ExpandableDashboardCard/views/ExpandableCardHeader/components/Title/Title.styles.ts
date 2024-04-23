import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    title: {
      fontFamily: 'Open Sans',
      fontWeight: 400,
      fontSize: '20px',
      textAlign: 'left',
      color: '#32383E',
    },
  }),
);

export default useStyles;
