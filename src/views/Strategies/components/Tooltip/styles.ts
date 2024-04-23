import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles(() => ({
    tooltip: {
      minWidth: 300,
      maxWidth: 300,
      backgroundColor: '#fcfcfc',
      color: '#fff',
    },
    
    header: {
      display: 'flex',
      marginTop: 10,
      marginLeft: 10
    },
    text: {
      fontWeight: 500,
      fontFamily: 'Open Sans',
      fontSize: 14,
      color: '#555d62',
      paddingTop: '5px',
    },
    icon: {
      color: '#d22730',
      fontSize: '24px',
      marginRight: '5px',
    },
    
    body: {
      display: 'flex',
      margin: 10,
    },
}));