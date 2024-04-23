import {
  createStyles,
  makeStyles,
} from '@material-ui/core/styles';

export const useStyles = makeStyles(() =>
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
    wrapperDrawerButton : {
      height: '100vh',
      width: 20,
      position: 'absolute',
      top: 0,
      right: 20
    },
    iconExpand: {
      width: 24,
      height: 24,
      position: 'absolute',
      top: 30,
      right: 2,
      background: '#fff',
      border: 'solid 1px #e2e2e2',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      zIndex: 999,
      "&:hover" : {
        background: '#0077C8',
      } 
    },
    iconChevronLef: {
      color: '#a7a7a7',
      fontSize: '20px',
      "&:hover" : {
        color: '#fff',
      } 
    },
    // Drawer with comments and events
    wrapperHoverDrawer: {
      height: '100vh',
      width: 14,
      position: 'absolute',
      top: 0,
      right: 0,
      borderLeft: 'solid 1px #e4e4e4',
      boxShadow: '1px 1px #e2e2e2',
    },
    paperDrawer: {
      background: '#fcfcfc'
    },
    wrapperCollapaseDrawer: {
      width: 325,
      background: '#fcfcfc'
    },
    tooltip: {
      backgroundColor: '#0077C8',
      color: '#fff',
      fontSize: 11,
    },
    wrapperCloseDrawer: {
      display: 'flex', 
      justifyContent: 'flex-end',
    },
    buttonClose: {
      marginTop: 4,
      marginRight: 4,
      cursor: 'pointer',
      display: 'flex', 
      justifyContent: 'flex-end',
    }
  })
);
