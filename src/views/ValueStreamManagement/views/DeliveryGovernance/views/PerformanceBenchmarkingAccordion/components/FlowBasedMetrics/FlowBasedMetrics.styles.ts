import {
  createStyles,
  makeStyles,
} from '@material-ui/core/styles';

export const inlineStyles = {
  text: {
    width: '100%',
    color: '#444B52',
    fontFamily: 'Open Sans',
    fontSize: 14,
    paddingLeft: 4,
    display: 'inline-flex',
  },
  arrow: {
    height: 20,
    display: 'inline-flex',
    width: 30,
    alignSelf: 'center',
  }
};

export const useStyles = makeStyles(() =>
  createStyles({
    box: {
      height: 500,
      border: 'solid 0.5px lightgray',
      borderRadius: 5,
      '& .MuiDataGrid-root .MuiDataGrid-columnHeader, & .MuiDataGrid-root .MuiDataGrid-cell': {
        padding: '0px !important',
      },
    },
    boxFullScreen: {
      height: 'calc(100vh - 300px) !important'
    },
    dataGrid: {
      border: '0px solid #000 !important',
      root: {
        width: '200vw',
      },
      columnHeader: {
        fontWeight: 'bold',
      },
    },
  })
);
