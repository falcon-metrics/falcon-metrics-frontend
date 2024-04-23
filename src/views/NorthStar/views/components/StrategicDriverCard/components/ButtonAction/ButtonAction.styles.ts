import {
  createStyles,
  makeStyles,
} from '@material-ui/core/styles';
    
export const useStyles = makeStyles(() =>
  createStyles({
    buttonAction: {
      paddingTop: 10,
      paddingRight: 0,
      height: 10,
      fontFamily: 'Open Sans',
      justifyContent: 'flex-end',
      color: '#555D62',
      '&:hover': {
        backgroundColor: 'transparent'
      },
    },
    buttonActionItem: {
      fontSize: 14,
      fontFamily: 'Open Sans',
    }
  })
);