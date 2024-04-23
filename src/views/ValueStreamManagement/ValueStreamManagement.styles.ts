import {
  createStyles,
  makeStyles,
} from '@material-ui/core/styles';

export const useValueStreamManagementStyles = makeStyles(() =>
  createStyles({
    navigationSection: {
      backgroundColor: '#F0F0F0',
      color: 'rgba(0, 0, 0, 0.87)',
      boxShadow: '0px 0px',
    },
    navigationSectionColor: {
      backgroundColor: '#F0F0F0 !important',
      color: 'rgba(0, 0, 0, 0.87) !important',
    },
    navigationDivider: {
      marginTop: '25px',
      marginLeft: '25px',
      marginRight: '25px',
      backgroundColor: '#AFAFAF',
    },
    generalContainer: {
      display: 'flex',
      flexDirection: 'column',
      flexGrow: 1,
    },
    noDataContainer: {
      marginTop: '20vh',
    },
    groupContainer: {
      borderRadius: '15px',
      marginTop: '4px',
      padding: '0.5rem 1.5rem',
    },
    pageContainer: {
      '& .MuiAccordionSummary-root': {
        justifyContent: 'flex-start !important',
      },
      '& .MuiAccordionSummary-content': {
        flexGrow: '0 !important',
      },
      // '& .zc-legend-frame': {
      //   width: '500px !important',
      //   left: '8px !important',
      //   border: '1px solid blue !important'
      // }
    },
    wrapperFilterDateRange: {
      width: 260,
      position: 'relative',
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
    },
    threeColumns: {
      background: 'yellow',
      'grid-template-columns': 'repeat(3, 1fr) !important',
    }
  })
);
