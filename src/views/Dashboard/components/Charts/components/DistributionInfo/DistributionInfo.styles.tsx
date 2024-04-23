import Box from '@material-ui/core/Box';
import { styled } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';

export const Container = styled(Box)({
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
});

export const Wrapper = styled(Box)({
  width: '98%',
  maxWidth: 'min(900px, max(450px, calc((1550px - 100vw) * 1000)))',
});

export const TilesContainer = styled(Box)({
  margin: '0 auto',
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, 150px)',
  justifyContent: 'center',
  flexWrap: 'wrap',
  transform: 'translateX(1vw)',
  '& > *': {
    marginTop: '2rem',
    marginRight: '2vw',
  },
});

export const ShapeText = styled(Typography)({
  fontSize: 14,
  margin: '4rem auto 0 auto',
  fontFamily: 'Open Sans',
  textAlign: 'center',
});
