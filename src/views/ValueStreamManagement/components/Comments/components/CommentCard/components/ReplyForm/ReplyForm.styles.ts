import {
    createStyles,
    makeStyles,
  } from '@material-ui/core/styles';

export const useStyles = makeStyles(() =>
  createStyles({
    wrapperCard: {
      fontFamily: 'Open Sans',
      fontSize: 14,
      width: 250,
      background: '#f3f3f3',
      marginTop: 0,
      boxShadow: 'none',
      borderRadius: 0,
      marginLeft: '9px',
      paddingTop: 0,
      flexDirection: 'column',
      minHeight: 115,
      paddingLeft: 8,
      paddingRight: 8,
      position: 'relative',
    },
    dividerAndDateCard: {
      display:'flex',
      alignSelf: 'center',
      justifyContent: 'center',
      alignItems: 'center'
    },

    wrapperContent: {
      padding: 13
    },
    titleCard: {
      fontWeight: 'bold',
      marginTop: 4,
      marginBottom: 4,
      fontFamily: 'Open Sans',
      'max-width': 242,
      overflow: 'hidden',
      'white-space': 'nowrap',
      'text-overflow': 'ellipsis'
    },
    dateCard: {
      padding: '14px 2px 0px 12px',
      fontSize: 12,
      display: 'flex',
      fontFamily: 'Open Sans',
      justifyContent: 'space-between',
    },
    authorName: {
      color: '#323130',
      paddingTop: 14,
      fontFamily: 'Open Sans',
      textAlign: 'right',
      fontSize: 12,
      right: 10,
      bottom: 10,
    },
    wrapperDescription: {
      color: '#323130',
      fontSize: 12,
      fontFamily: 'Open Sans',
      whiteSpace: 'pre-line',
      width: 242,
      overflowWrap: 'break-word',
    },
    tooltipTitle: {
      fontSize: 12,
      fontFamily: 'Open Sans',
    },
    divider: {
      width: '100%',
      background: 'rgba(0, 0, 0, 0.08)',
    },
    wrapperComment: {
      display: 'flex',
      flexDirection: 'column'
    }
  })
);
