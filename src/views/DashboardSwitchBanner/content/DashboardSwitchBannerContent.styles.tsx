import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  container: {
    position: 'relative',
  },
  banner: {
    background: 'rgba(0, 79, 112, 1)',
    height: 46,
    display: 'flex',
    justifyContent: 'center',
    fontSize: 14,
    fontFamily: 'Open Sans',
    color: 'white',
    alignItems: 'center',
  },
  contactUs: {
    marginLeft: 24,
    textTransform: 'none',
    fontFamily: 'Open Sans',
    background: 'rgb(34, 168, 161)',
    color: 'white',
    borderRadius: 5,
    fontSize: 14,
    '&:hover': {
      backgroundColor: 'rgb(33, 160, 154, 1)',
    },
  },
}));

export default useStyles;
