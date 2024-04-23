import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    title: {
      fontFamily: 'Open Sans',
      fontSize: '20px',
      textAlign: 'left',
      color: '#707070',
    },
  }),
);

export default useStyles;
