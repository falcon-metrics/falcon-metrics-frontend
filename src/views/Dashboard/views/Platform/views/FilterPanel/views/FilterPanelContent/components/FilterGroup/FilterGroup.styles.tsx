import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      '&.MuiAccordion-root.Mui-expanded': {
        minHeight: 48,
        '&:before': {
          opacity: 1,
        },
      },
      '&, &.Mui-expanded': {
        margin: '0 0 1px',
      },
      '.MuiAccordionDetails-root': {
        paddingTop: 0,
      },
    },
    ungroupedContainer: {
      padding: 24,
    },
    font: {
      fontFamily: 'Segoe UI Semibold',
    },
    content: {
      display: 'grid',
      gap: 10,
      paddingLeft: 24,
    },
    summaryContent: {
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    summary: {
      background: 'transparent',
    },
  }),
);

export default useStyles;
