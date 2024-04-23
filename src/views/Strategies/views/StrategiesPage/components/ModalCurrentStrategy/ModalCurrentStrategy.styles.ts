import { makeStyles, styled } from '@material-ui/styles';
import { Box } from '@material-ui/core';

export const Wrapper = styled(Box)({
  height: '100vh',
  display: 'flex',
  justifyContent: 'flex-end',
  marginTop: 20,
  marginRight: 20,
});

export const WrapperButtonEdit = styled(Box)({
  display: 'flex',
  justifityItems: 'flex-end',
  padding: 20,
});

export const useStyles = makeStyles(() => ({
  createButton: {
    position: 'absolute',
    left: 7,
    top: -6,
    zIndex: 20,
    pointerEvents: 'auto',
  },
  sm: {
    display: 'flex',
    position: 'relative',
  },
  chartIcon: {
    color: '#555D62',
    cursor: 'pointer',
    transition: 'transform 300ms',
    
    '&:hover' : {
      color: '#0077C8',
      transform: 'translateY(-5px)'
    }
  },
  closeIcon: {
    color: '#fcfcfc',
    cursor: 'pointer',
    transition: 'transform 300ms',
    fontSize: '18px',
    '&:hover' : {
      transform: 'translateY(-3px)'
    }
  },
  modalTitle: {
    display: 'flex',
    position: 'absolute',
    fontFamily: 'Open Sans',
    fontSize: '20px',
    color: '#707070',
    textAlign: 'left',
    fontWeight: 400,
    paddingTop: 15
  },
  modalBody: {
    paddingTop: 50,
    fontFamily: 'Open Sans',
    padding: 10,
    width: '100%'
  }
}));
