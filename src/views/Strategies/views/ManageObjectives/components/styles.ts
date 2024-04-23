import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) =>
  createStyles({
    grid: {
      height: '350px',
      overflow: 'hidden'
    },
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
      },
      overflow: 'hidden'
    },
    checkboxAchieved: {
      marginTop: 0,
    },
    achievedObjectives: {
      paddingBottom: 4,
      marginTop: 4,
      position: 'relative',
    },
    achievedText: {
      position: 'absolute',
      top: 0,
      fontFamily: 'Open Sans',
      marginLeft: -2,
    },
    title: {
      fontWeight: 'bold',
      fontSize: 16,
      fontFamily: 'Open Sans',
    },
    typographySm: {
      color: 'rgba(0, 0, 0, 0.7)',
      fontSize: 14,
      fontFamily: 'Open Sans',
      fontWeight: 'bold',
    },
    typographyMd: {
      fontSize: 16,
    },
    paper: {
      padding: theme.spacing(2),
      color: theme.palette.text.secondary,
      cursor: 'pointer',
      maxHeight: 350,
      overflow: 'auto',
    },
    buttons: {
      paddingTop: theme.spacing(2),
    },
    button: {
      padding: theme.spacing(1),
    },
    saveButton: {
      marginRight: 10,
      paddingLeft: 30,
      paddingRight: 30,
    },
    wrapper: {
      position: 'relative',
      overflow: 'hidden'
    },
    spacingRight: {
      paddingRight: 4,
    },
  }),
);

export default useStyles;
