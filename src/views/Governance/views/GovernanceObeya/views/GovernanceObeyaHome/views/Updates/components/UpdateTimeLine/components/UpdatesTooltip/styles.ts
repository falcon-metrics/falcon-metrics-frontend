import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles(() => ({
  helpIcon: {
    color: '#C4C4C4',
    cursor: 'pointer',
    transition: 'transform 300ms',
    outline: 'none',
    "&:hover": {
      color: '#0077C8',
      transform: 'translateY(-5px)'
    }
  },
  closeIcon: {
    color: '#555D62',
    cursor: 'pointer',
    transition: 'transform 300ms',
    fontSize: '20px',
    marginRight: 10,

    "&:hover": {
      transform: 'translateY(-3px)'
    }
  },
  tooltip: {
    minWidth: 513,
    maxWidth: 513,
    backgroundColor: '#F9F9F9',
    borderRadius: '10px',
    color: '#fff',
    margin: '10px',
    padding: '20px',
    boxShadow: '0px 2px 11px 0px #C4C4C4'
  },
  tooltipWrapper: {
    display: 'flex',
    flexDirection: 'column',
  },
  tooltipHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: '10px',
  },
  tooltipFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  widgetName: {
    fontSize: '20px',
    textTransform: 'uppercase',
    userSelect: 'none',
    color: '#005FA0',
    fontWeight: 600,
    marginLeft: 23
  },
  contentWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: '-15px',
    marginRight: '-15px',
    outline: 'none',
  },
  addTopMargin: {
    marginTop: 10
  },
  descriptions: {
    fontFamily: 'Open Sans',
    color: '#2B353B',
    fontSize: '14px',
    fontWeight: 400,
    textAlign: 'left',
    paddingTop: '15px',
    lineHeight: '18px',
    userSelect: 'none',
    overflowY: 'hidden',
    overflowX: 'auto',
    marginBottom: 20,
    marginRight: 15,
    marginLeft: 15,
    width: 800,

    '&::-webkit-scrollbar': {
      width: '0.6em',
      borderRadius: '20px',
      height: '0.6em'
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#C4C4C4',
      borderRadius: '50px'
    },
    '&::-webkit-scrollbar-button': {
      height: '35px'
    }
  },
  popper: {
    zIndex: 9999999
  },
  indicator: {
    fontSize: '40px',
    cursor: 'pointer',
    userSelect: 'none',
    outline: 'none',

    "&:hover": {
      transform: 'translateY(-2px)',
    }
  },
  pageNumber: {
    color: '#005FA0',
    letterSpacing: '5px',
    fontWeight: 600,
    fontSize: '12px',
    fontFamily: 'Open Sans'
  },
  // Help Icon Wrapper
  sm: {
    display: 'flex',
    position: 'absolute',
    bottom: 10,
  },
  md: {
    display: 'flex',
    justifyContent: 'right',
    marginBottom: -3,
    marginRight: -3,
    marginTop: 10
  },
  lg: {
    display: 'flex',
    justifyContent: 'right',
    marginBottom: 10,
    marginRight: 10,
  },
  xl: {
    display: 'flex',
    justifyContent: 'right',
    marginBottom: -25,
    marginRight: -15,
    marginTop: 10
  },

  // left and right buttons
  buttonWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonLeft: {
    float: 'left',
    color: '#005FA0',
    fontWeight: 600,
    fontSize: '30px',
    fontFamily: 'Open Sans',
    cursor: 'pointer',
    marginRight: 10,

    '&:hover': {
      backgroundColor: '#D5D7D8',
    }
  },
  buttonRight: {
    float: 'right',
    color: '#005FA0',
    fontWeight: 600,
    fontSize: '30px',
    fontFamily: 'Open Sans',
    cursor: 'pointer',
    marginLeft: 10,

    '&:hover': {
      backgroundColor: '#D5D7D8',
    }
  },
  buttonLeftDisabled: {
    color: '#E4E4E4',
    cursor: 'arrow',
    float: 'left',
    fontWeight: 600,
    fontSize: '30px',
    fontFamily: 'Open Sans',
    marginRight: 10,
  },
  buttonRightDisabled: {
    color: '#E4E4E4',
    cursor: 'arrow',
    float: 'right',
    fontWeight: 600,
    fontSize: '30px',
    fontFamily: 'Open Sans',
    marginLeft: 10,
  }
}));