import { styled } from '@material-ui/styles';
import Box from '@material-ui/core/Box';
import { createStyles, makeStyles } from '@material-ui/core/styles';

export const WrapperContent = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  margin: '0 32px',
});

export const useStyles = makeStyles(
  createStyles({
    inputSize: {
      marginTop: 20,
      width: "100%"
    },
    inputSizeEfectiveDate: {
      width: 250,
      marginTop: 0,
    },
    form: {
      width: '100%',
      backgroundColor: "#fcfcfc",
      position: "sticky",
      top: 0
    },
    publishButton: {
      display: 'flex',
      width: '100%',
      marginBottom: 30,
      marginTop: 30,
      alignSelf: 'flex-end',
    },
    wrapperForm: {
      border: '1px solid blue',
      marginTop: 20,
    },
    textField: {
      width: 500,
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
      alignItems: 'center',
      cursor: 'pointer',
      marginTop: 6,
    },
    TypographyIconSearch: {
      marginLeft: 5
    }
  }),
);
