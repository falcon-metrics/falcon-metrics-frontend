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

export const WrapperContent = styled(Box)({
  padding: '1rem 1rem',
  marginTop: 14,
});

export const IconButtonWrapper = styled(IconButton)({
  width: 34,
  height: 34,
  background: '#0077c8',
  '&:hover': {
    background: '#0077c8'
  }
});

export const EditIconWrapper = styled(EditIcon)({
  color: '#fff'
});
