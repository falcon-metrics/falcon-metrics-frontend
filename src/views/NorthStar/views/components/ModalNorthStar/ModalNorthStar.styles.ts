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
  right: 68,
  top: 16,
  border: 0,
  background: '#0077C8',
  '&:hover': {
    color: '#9e9e9e',
    background: '#0077C8'
  }
});

export const EditIconWrapper = styled(EditIcon)({
  color: '#fff',
  fontSize: 18
});
