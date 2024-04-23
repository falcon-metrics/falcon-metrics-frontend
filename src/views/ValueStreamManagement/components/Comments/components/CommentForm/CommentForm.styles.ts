import { createStyles, makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(
  createStyles({
    inputSize: {
      width: 332,
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
      justifyContent: 'flex-end'
    },
    wrapperForm: {
      marginTop: 20,
    },
    textField: {
      width: 374,
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
    }
  }),
);
