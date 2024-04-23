import {
  createStyles,
  makeStyles,
} from '@material-ui/core/styles';

export const useStyles = makeStyles(() =>
  createStyles({
    perspectiveLabel: {
      display: 'flex',
      alignItems: 'center',
      paddingTop: 5,
      paddingBottom: 5,
      marginLeft: 35,
      fontFamily: 'Open Sans',
      fontSize: 12,
      fontWeight: 400,
      color: 'rgba(112, 112, 112, 1)',
    },
    selectionTabs: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      paddingBottom: 15,
      paddingLeft: 15,
      paddingRight: 15,
    },
    root: {
      display: 'flex',
      flexGrow: 1,
      alignItems: 'center',
      marginLeft: 0,
      background: '#fff',
      minHeight: 32,
      borderRadius: 20,
    },
    divider: {
      backgroundColor: '#AFAFAF',
    }
  })
);
