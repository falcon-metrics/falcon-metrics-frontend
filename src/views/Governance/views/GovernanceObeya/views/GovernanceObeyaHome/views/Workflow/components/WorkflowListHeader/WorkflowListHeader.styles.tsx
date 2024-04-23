import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import { styled } from '@material-ui/styles';

const useStyles = makeStyles({
  header: {
    background: '#fff',
    color: '#000',
    height: 42,
    display: 'flex',
    alignItems: 'space-between',
    justifyContent: 'space-between',
    padding: 10,
    fontFamily: 'Open Sans',
    borderBottom: '2px solid rgb(200, 200, 200)',
  },
});

export default useStyles;

export const Title = styled(Box)({
  fontWeight: 'bold',
});
