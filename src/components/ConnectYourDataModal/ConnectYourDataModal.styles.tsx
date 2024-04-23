import Link from '@material-ui/core/Link';
import { styled } from '@material-ui/styles';

export const LinkContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  padding: '0 25px',
});

export const StyledLink = styled(Link)({
  textAlign: 'center',
  display: 'block',
  fontFamily: 'Open Sans',
});
