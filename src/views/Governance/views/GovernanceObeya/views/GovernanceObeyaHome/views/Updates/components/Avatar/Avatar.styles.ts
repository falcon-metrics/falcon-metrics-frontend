import { styled } from '@material-ui/styles';
import { Box } from '@material-ui/core';

export const AvatarRound = styled(Box)({
  width: 40,
  height: 40,
  borderRadius: '50%',
  background: '#D5D7D8',
  fontFamily: 'Open Sans',
  fontSize: 16,
  color: '#fff',
  fontWeight: 'bold',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
});
