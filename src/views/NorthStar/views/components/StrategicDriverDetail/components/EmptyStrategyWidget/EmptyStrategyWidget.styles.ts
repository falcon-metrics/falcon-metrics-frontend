import {
  createStyles,
  makeStyles,
} from '@material-ui/core/styles';
  
export const useStyles = makeStyles(() =>
  createStyles({
    wrapperCard: {
      width: 270,
      minHeight: 198,
      marginTop: 14,
      background: '#fcfcfc',
      fontSize: 14,
      fontFamily: 'Open Sans',
      borderRadius: 8,
      boxShadow: '0px 2px 11px 0px #dcdcdc',
      position: 'relative',
      backgroundImage: 'radial-gradient(circle at 100% 0,#008ff0 40%,#04548a 86%)',
      color: '#fff',
    },
    wrapperReplyCardSkeleton: {
      width: 260,
      height: 150,
      marginTop: 14,
      background: 'rgb(240, 240, 240)',
      fontSize: 14,
      fontFamily: 'Open Sans',
      borderRadius: 8,
      position: 'relative',
      padding: 10
    },
    wrapperCardSkeleton: {
      width: 270,
      height: 150,
      marginTop: 14,
      background: '#fcfcfc',
      fontSize: 14,
      fontFamily: 'Open Sans',
      borderRadius: 8,
      boxShadow: '0px 2px 11px 0px #dcdcdc',
      position: 'relative',
      padding: 10
    },
    wrapperTitle: {
      display: 'flex',
      flexDirection: 'column',
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
    buttonAction: {
      paddingTop: 10,
      paddingRight: 0,
      height: 10,
      fontFamily: 'Open Sans',
      justifyContent: 'flex-end',
      color: '#555D62',
      '&:hover': {
        backgroundColor: 'transparent'
      },
    },
    buttonActionItem: {
      fontSize: 14,
      fontFamily: 'Open Sans',
    },
    seeMoreDate: {
      fontSize: 14,
    },
    mainCardAuthorName: {
      color: '#323130',
      fontFamily: 'Open Sans',
      fontSize: 12,
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
    seeMoreAuthorName: {
      color: '#323130',
      paddingTop: 14,
      fontFamily: 'Open Sans',
      textAlign: 'right',
      fontSize: 12,
      position: 'absolute',
      right: 34,
      bottom: 18,
    },
    wrapperDescription: {
      color: '#323130',
      fontSize: 12,
      fontFamily: 'Open Sans',
      whiteSpace: 'pre-line',
      width: 242,
      overflowWrap: 'break-word',
    },
    seeMoreButton: {
      'text-transform': 'lowerCase',
      '&:hover': {
        background: 'none',
        textDecoration: 'underline',
        color: '#fff',
      },
      textDecoration: 'underline',
      fontFamily: 'Open Sans',
      fontSize: 12,
      color: '#fff',
      width: '100%',
      display: 'flex',
      justifyContent: 'flex-start',
      cursor: 'pointer'
    },
    seeMoreTitle: {
      marginTop: 14,
      fontFamily: 'Open Sans',
      fontSize: 16,
      fontWeight: 'bold',
      paddingTop: 10,
    },
    seeMoreDescription: {
      fontFamily: 'Open Sans',
      height: 100,
      width: '100%',
      paddingTop: 10
    },
    tooltipTitle: {
      fontSize: 12,
      fontFamily: 'Open Sans',
    },
  })
);