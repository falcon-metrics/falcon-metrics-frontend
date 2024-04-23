import Box from '@material-ui/core/Box';
import { makeStyles, createStyles, styled } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

export const useStyles = makeStyles(() =>
  createStyles({
    value: {
      fontSize: 50,
      fontWeight: 'bold',
    },
    text: {
      fontSize: 42,
      fontWeight: 'initial',
      lineHeight: '75px',
    },
  }),
);

export const Container = styled(Box)({
  backgroundColor: 'rgba(229, 226, 226, 0.4)',
  borderBottom: '4px #41b6e6 solid',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  minWidth: 120,
  maxWidth: 150,
  padding: '1rem',
  borderRadius: '4px 4px 0 0',
  '& > *': {
    fontFamily: 'Open Sans',
  },
  position: 'relative',
});

export const Unit = styled(Typography)({
  fontSize: 11,
});

export const Label = styled(Typography)({
  fontSize: 16,
  marginTop: '1rem',
});

export const TooltipContainer = styled('div')({
  position: 'absolute',
  top: 5,
  right: 5,
});
