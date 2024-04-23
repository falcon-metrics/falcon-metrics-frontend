import { Box } from "@material-ui/core";
  import { styled } from '@material-ui/styles';

export const WrapperEmptyState = styled(Box)({
  zIndex: 600, 
  width: 120, 
  height: 120,
  border: 'solid 10px #F0F0F0',
  borderRadius: '50%',
  background: '#fff',
  position: 'relative',
  left: 38,
  top: 43,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center'
});

export const Title = styled(Box)({
  fontSize: 14,
  fontFamily: 'Open Sans', 
  color: '#707070', 
  fontWeight: 'normal'
});


export const TitleNumber = styled(Box)({
  fontSize: 26,
  fontFamily: 'Open Sans',
  color: '#707070'
});
