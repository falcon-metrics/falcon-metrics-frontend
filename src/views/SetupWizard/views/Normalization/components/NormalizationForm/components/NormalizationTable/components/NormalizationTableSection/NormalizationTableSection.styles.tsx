import { createStyles, makeStyles } from '@material-ui/styles';

const border = 'solid 2px #e2e2e2';
const useStyles = makeStyles(() =>
  createStyles({
    addButtonContainer: {
      display: 'flex',
      margin: '0 auto',
      justifyContent: 'center',
    },
    addButton: {
      margin: '1em 0',
    },
    container: {
      paddingTop: '2em',
      borderTop: border,
      borderBottom: border,
    },
    sectionLabel: {
      fontFamily: 'Open Sans',
      textAlign: 'center',
    },
  }),
);

export default useStyles;
