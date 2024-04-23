import { makeStyles, createStyles } from '@material-ui/core/styles';

const flexStart = 'flex-start';

export const useStyles = makeStyles(() =>
  createStyles({
    emptyProgressSVGCircle: {
      zIndex: 100,
      position: 'absolute',
      marginLeft: 10,
      background: 'transparent',
      '& circle': {
        background: 'transparent',
        strokeDashoffset: 0,
        transition: 'stroke-dashoffset 1s linear',
        stroke: '#F3F2F1',
        strokeWidth: '0.85em',
      },
    },
    container: {
      width: '100%',
      height: 327,
      display: 'flex',
      padding: '1rem 0px',
      justifyContent: flexStart,
      flexDirection: 'column',
      border: '1px solid #efefef',
      overflow: 'hidden',
    },
    progressBarLabelText: {
      fontFamily: 'Open Sans',
      fontSize: 11,
      color: '#333',
      position: 'absolute',
      bottom: -5,
    },
    scopeContainer: {
      display: 'flex',
      justifyContent: flexStart,
      flexDirection: 'column',
    },
    title: {
      fontFamily: 'Open Sans',
      fontSize: '18px',
      color: '#707070',
      marginLeft: 20
    },
    wrapperChartIndicator: {
      marginTop: 0,
      paddingTop: 0,
      display: 'flex',
      justifyContent: flexStart,
      justifyItems: flexStart,
    },
    valueZeroStateWrapper: {
      display: 'flex',
      width: '100%',
      justifyContent: 'center',
    },
    valueProgressContainer: {
      display: 'flex',
      width: '100%',
    },
    circularProgressWrapper: {
      width: 220,
      position: 'relative',
    },
    addObjectiveBtn: {
      position: 'absolute',
      zIndex: 100,
      top: 90,
      left: 54,
      fontFamily: 'Open Sans',
      display: 'flex',
      cursor: 'pointer',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'transparent',
      border: 'none',
      fontWeight: 'bold',
      color: '#0175ca',
      fontSize: 12.5,
    },
  }),
);
