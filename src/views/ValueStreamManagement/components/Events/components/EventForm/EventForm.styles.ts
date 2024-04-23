import { createStyles, makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(
  createStyles({
    inputSize: {
      width: 250,
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
      width: 332,
    },
    saveButton: {
      background: '#1976d2',
      color: '#fff',
    },
    helpText: {
      color: '#f44336'
    }
  }),
);

