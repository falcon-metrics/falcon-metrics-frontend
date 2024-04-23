import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    accordion: {
      boxShadow: 'none',
    },
    accordionSummary: {
      backgroundColor: '#e4e4e4',
      cursor: 'initial',
      minHeight: '48px !important',
      margin: '0 -32px 20px',
    },
    form: {
      position: 'relative',
    },
    sectionContainer: {
      marginTop: 0,
    },
  }),
);

export default useStyles;
