import {
  createStyles,
  makeStyles,
} from '@material-ui/core/styles';

const iFlex = 'inline-flex';

export const useStyles = makeStyles(() =>
  createStyles({
    dependsOnLabel: {
      fontFamily: 'Open Sans',
      fontSize: 14,
      fontWeight: 'bold',
      alignSelf: 'center',
    },
    wrapperAutoComplete: {
      marginTop: 12,
      marginBottom: 20,
    },
    container: {
      width: 800,
    },
    includeChildren: {
      width: 165,
      display: iFlex,
      alignItems: 'center',
      marginRight: 4,
    },
    includeCheckboxLabel: {
      color: 'rgba(0, 0, 0, 0.54)',
      fontFamily: 'Open Sans',
      marginLeft: 4,
    },
    checkboxIncludeChildren: {
      padding: 0,
      color: '#757575',
    },
    fqlError: {
      fontSize: 12,
      color: '#f44336',
      fontFamily: 'Open Sans',
    },
    loading: {
      '& .MuiInput-underline:after': {
        borderBottomColor: '#4caf50',
      },
    },
    valid: {
      '& .MuiInput-underline:after': {
        borderBottomColor: '#4caf50',
      },
    },
    title: {
      textAlign: 'center',
      fontFamily: 'Open Sans',
      fontSize: 20,
      color: 'rgba(0, 0, 0, 0.7)',
      fontWeight: 700,
      marginBottom: 20,
      fontWeigth: 'bold',
    },
    general: {
      width: '100%',
      background: '#f1f1f1',
      display: 'flex',
      justifyContent: 'center',
    },
    wrapperGeneral: {
      width: 640,
      background: '#fff',
      padding: 20,
    },
    wrapper: {
      width: 600,
      background: '#fff',
    },
    customTextField: {
      '& input::placeholder': {
        fontSize: '14px',
        fontFamily: 'Open Sans',
      },
    },
    includeLabel: {
      marginTop: -2,
      marginRight: 6,
      fontWeight: 'bold',
      color: '#585858',
      fontSize: 14,
      fontFamily: 'Open Sans',
      background: '#fff',
      display: iFlex,
      alignSelf: 'center',
    },
    noStatus: {
      color: '#9E9E9E',
    },
    status: {
      width: 250,
      fontSize: 14,
      fontFamily: 'Open Sans',
    },
    wrapperStatus: {
      paddingTop: 0,
      marginBottom: 5,
    },
    wrapperDateOfEffect: {
      paddingTop: 15,
      marginBottom: 15,
    },
    statusLabel: {
      color: '#4D4D4D',
      fontWeight: 'bold',
      fontSize: 14,
      fontFamily: 'Open Sans',
    },
    dateOfEffectLabel: {
      color: '#4D4D4D',
      fontWeight: 'bold',
      fontSize: 18,
      fontFamily: 'Open Sans',
      marginBottom: 10,
    },
    statusOption: {
      fontSize: 14,
      fontFamily: 'Open Sans',
    },
    defaultFont: {
      fontFamily: 'Open Sans',
      fontSize: 13,
    },
    riskExposureLabel: {
      fontSize: 14,
      fontWeigth: 'normal',
      fontFamily: 'Open Sans',
    },
    helpRiskExposureRiskIcon: {
      cursor: 'pointer',
      color: '#9E9E9E',
      display: 'inline-flex',
    },
    input: {
      margin: 0,
    },
    inputMedium: {
      width: 360,
    },
    percentSymbol: {
      color: '#a2a2a2'
    },
    datepicker: {
      margin: 0,
      marginBottom: 15,
    },
    generalButton: {
      flex: 1,
      flexFlow: 'row',
      width: '100%',
      height: 100,
      border: '1px solid blue',
      background: 'blue',
    },
    buttonSave: {
      display: iFlex,
      background: 'rgb(0, 116, 200)',
      color: 'white',
      padding: '0.6rem',
    },
    buttonCancel: {
      display: iFlex,
      padding: '0.6rem',
    },
    error: {
      color: '#f44336',
      padding: 0,
      marginBottom: 15,
    },
    section: {
      border: 'solid 1px #c4c4c4',
      position: 'relative',
      padding: 18,
      marginBottom: 30,
    },
    titleSection: {
      color: '#585858',
      fontSize: 14,
      fontFamily: 'Open Sans',
      background: '#fff',
      position: 'absolute',
      top: -10,
      left: 20,
      display: 'flex',
      justifyContent: 'center',
    },
    textSectionType: {
      width: 50,
    },
    backToLink: {
      color: '#585858',
      fontSize: 16,
      fontWeight: 'bold',
      fontFamily: 'Open Sans',
      '&:visited': {
        textDecoration: 'none',
      },
      '&:link': {
        textDecoration: 'none',
      },
      '&:hover': {
        textDecoration: 'underline',
      },
    },
    infoTypeSection: {
      color: '#585858',
      fontSize: 14,
      fontFamily: 'Open Sans',
      marginTop: 20,
      padding: 0,
    },
    radio: {
      color: '#585858',
    },
    titleObeyaInfo: {
      width: 150,
      fontWeight: 'bold',
    },
    titleFilter: {
      width: 50,
      fontWeight: 'bold',
    },
    titlePermissions: {
      width: 150,
    },
    sectionPermission: {
      height: 200,
      marginBottom: 5,
    },
  }),
);
