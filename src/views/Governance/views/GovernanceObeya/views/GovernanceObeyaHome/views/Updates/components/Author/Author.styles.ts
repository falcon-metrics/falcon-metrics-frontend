import Box from '@material-ui/core/Box';
import { styled } from '@material-ui/styles';
  
export const Wrapper = styled(Box)({
  display: 'flex',
});

export const RoundImage = styled('img')({
  width: 42,
  height: 42,
  borderRadius: '50%',
  background: '#D5D7D8'
});

export const TextName = styled(Box)({
  fontSize: 16,
  fontFamily: 'Open Sans',
  fontWeight: 'bold',
  marginLeft: 10,
  marginTop: 5,
  color: '#2B353B'
});

export const Ellispe = styled(Box)({
  width: 2,
  height: 2,
  borderRadius: '50%',
  background: '#2B353B'
});

export const WrapperEllipse = styled(Box)({
  paddingLeft: 10,
  paddingRight: 10,
  display: 'flex',
  alignItems: 'center'
});