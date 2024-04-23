import {
  createStyles,
  makeStyles,
} from '@material-ui/core/styles';

export const useStyles = makeStyles(() =>
  createStyles({
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
