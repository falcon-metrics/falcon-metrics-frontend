import { styled } from '@material-ui/styles';
import { Box } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';

export const Wrapper = styled(Box)({
  height: '100vh',
  display: 'flex',
  justifyContent: 'flex-end',
  marginTop: 20,
  marginRight: 20,
});

export const IconButtonWrapper = styled(IconButton)({
  width: 28,
  height: 28,
  position: 'absolute',
  right: 32,
  top: 30,
  border: 0,
  zIndex: 100,
  color: '#fff',
  '& svg': {
    color: '#fff',
  }, 
  background: '#009CDE',
  '&:hover': {
    color: '#fff',
    background: '#009CDE'
  }
});

export const EditIconWrapper = styled(EditIcon)({
  color: 'rgba(0, 0, 0, 0.54)',
  fontSize: 18
});
