import {
  createStyles,
  makeStyles,
} from '@material-ui/core/styles';
    
export const useStyles = makeStyles(() =>
  createStyles({
    wrapperReplyField: {
      display: 'flex',
      width: 240,
      height: 50,
      fontSize: 14,
      fontFamily: 'Open Sans',
      marginLeft: 10,
    },
    helpText: {
      color: '#f44336'
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
      position: 'absolute',
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
      overflowWrap: 'break-word',
    },
    seeMoreButton: {
      'text-transform': 'lowerCase',
      '&:hover': {
        background: 'none',
        textDecoration: 'underline',
      },
      position: 'absolute',
      fontFamily: 'Open Sans',
      width: 78,
      fontSize: 12,
      padding: 3,
      left: 2,
      bottom: 22,
      color: '#4A9AD7'
    },
    seeMoreTitle: {
      marginTop: 14,
      fontFamily: 'Open Sans',
      fontSize: 16,
      fontWeight: 'bold'
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