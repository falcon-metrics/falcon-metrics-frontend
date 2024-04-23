import { createStyles, makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(
  createStyles({
    inputSize: {
      marginTop: 20,
    },
    inputSizeEfectiveDate: {
      width: 250,
      marginTop: 0,
    },
    form: {
      display: 'flex',
      flexDirection: 'column'
    },
    publishButton: {
      display: 'flex',
      width: '100%',
      marginBottom: 30,
      marginTop: 30,
      alignSelf: 'flex-end',
    },
    textField: {
      width: '100%',
    },
    saveButton: {
      background: '#1976d2',
      color: '#fff',
    },
    helpText: {
      color: '#f44336'
    },
    titleElementInput: {
      marginTop: 22,
      fontFamily: 'Open Sans'
     },
    titleSelectElement: {
      fontFamily: 'Open Sans'
    },
    inputWidget: {
      width: 332,
      marginTop: 40
    },
    inputElement: {
      marginTop: 5,
      width: 332,
    },
    selectElement: {
      width: 380
    },
    multiSelectTags: {
      width: 374,
      height: 'auto',
      display: 'flex',
      flexWrap: 'wrap',
    },
    wrapperIconSearch: {
      display: 'flex',
      width: '100%',
      alignItems: 'center',
      cursor: 'pointer',
      marginTop: 6,
    },
    TypographyIconSearch: {
      width: 110,
      color: '#2196F3',
      borderColor: '#2196F3',
      fontSize: 14,
      textTransform: 'capitalize',
      padding: '2px 10px',
    },
    datepickerBox: {
      display: 'flex',
      padding: 0,
      height: 64,
    },
    datapickerClass: {
      marginRight: 10,
    },
    wrapperForm: {
      height: 170
    },
    wrapperInputCheckBox: {
      display: 'flex',
      justifyItems: 'flex-start',
      marginBottom: 20,
      marginTop: 30,
    }
  }),
);
