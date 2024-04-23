import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) =>
  createStyles({
    main: {
      flexGrow: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      maxWidth: '900px',
      maxHeight: '4000px',
      paddingBottom: '3rem',
      paddingTop: '3rem',
    },
    section: {
      width: '100%',
      padding: theme.spacing(3),
      minHeight: '180px',
    },
    sectionCheckBox: {
      width: '100%',
      padding: theme.spacing(2),
    },
    sectionLabel: {
      width: '100%',
      padding: theme.spacing(3),
      minHeight: '180px',
      position: 'relative',
    },
    sectionPaperLabel: {
      position: 'absolute',
      left: 20,
      top: -8,
      background: 'white',
      fontSize: '12px',
      color: '#C0C0C0',
      paddingRight: '10px',
      paddingLeft: '10px',
    },
    progress: {
      position: 'absolute',
      top: 0,
      width: '100%',
    },
    root: {
      flexGrow: 1,
      background: '#fff',
      borderRadius: 18,
      marginLeft: 0,
      minHeight: '36px !important',
    },
    tabsButtons: {
      '& button': {
        minWidth: 15,
        minHeight: 48,
      },
    },
    dropdown: {
      height: '5vh',
      display: 'flex',
      flexGrow: 1,
      minWidth: '250px',
      width: '100%',
    },
    controlLabel: {
      fontSize: '14px',
      color: '#000000',
      fontFamily: 'Open Sans',
      width: '100%',
    },
    controlLabelPlaceholder: {
      fontSize: '14px',
      color: '#C0C0C0',
      fontFamily: 'Open Sans',
      width: '100%',
    },
    controlLabelRequired: {
      fontSize: '14px',
      color: '#C0C0C0',
      borderColor: 'red',
      fontFamily: 'Open Sans',
      width: '100%',
    },
    formControlLabel: {
      fontSize: '12px',
      '& label': {
        fontSize: '12px',
      },
    },
    dropDownLabel: {
      color: 'rgba(0, 0, 0, 0.54)',
      fontSize: '12px',
      '& label': {
        fontSize: '12px',
      },
    },
    dropDownLabelRed: {
      color: 'red',
      fontSize: '12px',
      '& label': {
        fontSize: '12px',
      },
    },
    userGuideTitle: {
      fontFamily: 'Open Sans',
      fontSize: 22,
      fontWeight: 700,
    },
    tooltip: {
      background: '#EB5757',
      color: 'white',
    },
    trialLabel: {
      fontSize: '18px',
      color: '#001a70',
      fontFamily: 'Open Sans',
      width: '100%',
    },
    trialLabelGreen: {
      fontSize: '18px',
      color: '#00BBB4',
      fontFamily: 'Open Sans',
      width: '100%',
      padding: theme.spacing(1),
    },
    trialLabelBulletPoints: {
      fontSize: '14px',
      color: '#303030',
      fontFamily: 'Open Sans',
      width: '100%',
    },
    logo: {
      display: 'flex',
      width: '40%',
      marginLeft: '-25px',
    },
    trialLabelBig: {
      fontSize: '18px',
      fontFamily: 'Open Sans',
      width: '100%',
    },
  }),
);

export default useStyles;
