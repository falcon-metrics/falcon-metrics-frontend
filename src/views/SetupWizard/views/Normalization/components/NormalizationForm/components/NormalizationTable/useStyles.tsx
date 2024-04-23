import { makeStyles, createStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() =>
  createStyles({
    tableHeader: {
      fontSize: '14px',
      color: '#707070',
      textAlign: 'center',
      fontWeight: 'bold',
      padding: 0,
      fontFamily: 'Open Sans',
    },
    headerWithBorder: {
      borderRight: 'solid 2px #e2e2e2',
      fontFamily: 'Open Sans',
    },
    notBold: {
      fontWeight: 400,
    },
  }),
);
