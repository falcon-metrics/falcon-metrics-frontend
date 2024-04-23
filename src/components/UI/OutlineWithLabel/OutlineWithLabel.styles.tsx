import { styled } from '@material-ui/styles';

const color = '#888';
export const Fieldset = styled('fieldset')({
  padding: '1.5em',
  borderRadius: '0.5em',
  border: `solid 1px ${color}`,
});
export const Legend = styled('legend')({
  margin: '0 1em',
  fontSize: '90%',
  color,
});
export const Span = styled('span')({
  whiteSpace: 'pre',
});
