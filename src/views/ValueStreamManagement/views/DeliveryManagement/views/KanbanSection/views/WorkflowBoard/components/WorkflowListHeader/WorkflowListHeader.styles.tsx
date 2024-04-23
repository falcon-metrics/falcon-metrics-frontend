import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import { styled } from '@material-ui/styles';

const useStyles = makeStyles({
  header: {
    background: '#fff',
    color: '#000',
    height: 42,
    display: 'flex',
    flexGrow: 1,
    flexShrink: 0,
    flexBasis: 'auto',
    alignItems: 'space-between',
    justifyContent: 'space-between',
    padding: 10,
    fontFamily: 'Open Sans',
    borderRadius: '5px 5px 0px 0px',
  },
  title: {
    fontFamily: 'Open Sans',
    fontSize: '16px',
    fontStyle: 'normal',
    fontWeight: 700,
    paddingLeft: 10,
  },
  count: {
    fontFamily: 'Open Sans',
    fontSize: '18px',
    fontStyle: 'normal',
    fontWeight: 600,
    paddingRight: 10,
  }
});

export default useStyles;

export const Title = styled(Box)({
  fontWeight: 'bold',
});
