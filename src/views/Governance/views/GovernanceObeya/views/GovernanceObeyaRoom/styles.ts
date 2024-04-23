import {
  createStyles,
  makeStyles,
} from '@material-ui/core/styles';

export const useStyles = makeStyles(() =>
  createStyles({
    main: {
      flexGrow: 1,
      height: '100%',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: 'Open Sans',
    },
    container: {
      width: 800,
    },
    includeChildren: {
      display: 'inline-flex',
      alignItems: 'center',
      marginRight: 4,
    },
    includeCheckboxLabel: {
      color: 'rgba(0, 0, 0, 0.54)',
      fontFamily: 'Open Sans',
      marginLeft: 4,
      flexGrow: 1
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
    subtitle: {
      textAlign: 'center',
      fontFamily: 'Open Sans',
      fontSize: 15,
      color: '#4d4d4d',
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
      width: 800,
      background: '#fff',
      padding: 20,
    },
    wrapperSystemFields: {
      background: '#fff',
      padding: 20,
    },
    wrapper: {
      width: 760,
      background: '#fff',
    },
    customTextField: {
      '& input::placeholder': {
        fontSize: '14px',
        fontFamily: 'Open Sans',
      },
    },
    title: {
      fontSize: 18,
      fontFamily: 'Open Sans',
      marginBottom: 30,
      padding: 10,
    },
    includeLabel: {
      marginTop: -2,
      marginRight: 6,
      fontWeight: 'bold',
      color: '#585858',
      fontSize: 14,
      fontFamily: 'Open Sans',
      background: '#fff',
      display: 'inline-flex',
      alignSelf: 'center',
    },
    input: {
      margin: '8px',
    },
    datesSelectionContainer: {
      display: 'flex',
    },
    datepickerBox: {
      marginRight: '40px',
    },
    datepicker: {
      margin: '8px',
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
      display: 'inline-flex',
      background: 'rgb(0, 116, 200)',
      color: 'white',
      padding: '0.6rem',
    },
    buttonCancel: {
      display: 'inline-flex',
      padding: '0.6rem',
    },
    error: {
      color: '#f44336',
      padding: 10,
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
      display: 'flex',
      alignItems: 'center',
      color: '#585858',
      fontSize: 14,
      fontWeight: 'lighter',
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
      paddingLeft: '15px',
      paddingRight: '15px',
      fontWeight: 'bold',
    },
    titleFilter: {
      paddingLeft: '15px',
      paddingRight: '15px',
      fontWeight: 'bold',
    },
    titlePermissions: {
      width: 150,
    },
    sectionPermission: {
      height: 200,
      marginBottom: 5,
    },
    selector: {
      width: 120,
      marginLeft: 50
    },
    includeRelatedChild: {
      width: 340,
    }
  }),
);
