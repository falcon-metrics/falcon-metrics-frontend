import {
  createStyles,
  makeStyles,
} from '@material-ui/core/styles';

export const useStyles = makeStyles(() =>
  createStyles({
    section: {
      border: 'solid 1px #c4c4c4',
      position: 'relative',
      paddingTop: 18,
      paddingBottom: 15,
      paddingLeft: 25,
      paddingRight: 25,
      marginBottom: 15,
      background: '#fff',
      borderRadius: 2,
    },
    titleSection: {
      color: '#4B4B4B',
      fontSize: 18,
      fontFamily: 'Open Sans',
      fontWeight: 400,
      background: '#f0f0f0',
      position: 'absolute',
      top: -10,
      left: 20,
      paddingLeft: '10px',
      paddingRight: '10px',
      display: 'flex',
      justifyContent: 'center',
    },
    periodSelectionContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 0,
    },
  })
);
