import {
  createStyles,
  makeStyles,
} from '@material-ui/core/styles';
      
export const useStyles = makeStyles(() =>
  createStyles({
    heading: {
      fontFamily: 'Open Sans',
      fontSize: 13,
      fontWeight: 'bold'
    },
    iconOpenModal: {
      fontSize: 18, 
      cursor: 'pointer', 
      marginLeft: 8
    },
    accordion: {
      background: '#fcfcfc',
      boxShadow: 'none'
    },
    wrapperSortedButton: {
      marginRight: 80,
      marginTop: 18,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      position: 'absolute',
      top: '29px',
      right: '20px'
    },
    helperText: {
      fontFamily: 'Open Sans',
      marginTop: 0,
    },
    buttonGroup: {
      width: 20,
      fontSize: 10,
      marginTop: 6,
      marginBottom: 10
    },
    buttonSorted: {
      fontFamily: 'Open Sans',
      fontSize: 10,
    },
    '& .MuiAccordion-root.Mui-expanded': {
      marginTop: 0,
    },
    wrapperAccordionContent: {
      width: 325,
      minHeight: 334,
      maxHeight: 340,
      overflowY: 'auto',
      padding: '0px 10px 10px 16px',
    },
    wrapperEmptyState: {
      marginTop: 0,
      borderTop: 'solid 1px #ebebeb',
      paddingBottom: 5,
    },
  })
);
