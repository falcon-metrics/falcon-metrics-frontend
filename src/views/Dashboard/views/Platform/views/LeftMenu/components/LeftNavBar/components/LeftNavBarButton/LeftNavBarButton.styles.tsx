import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  button: {
    cursor: 'pointer',
    backgroundColor: '#0077c8',
    color: '#ffffff',
    width: '100%',
    justifyContent: 'center',
    alignSelf: 'center',
    padding: 10,
  },
  selectedButton: {
    backgroundColor: '#00bfb2',
  },
  iconContainer: {
    textAlign: 'center',
  },
  icon: {
    cursor: 'pointer',
    width: 32,
    height: 32,
  },
  title: {
    textAlign: 'center',
    fontFamily: 'Open Sans',
    fontSize: 12,
    fontWeight: 'bold',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 1.19,
    letterSpacing: 'normal',
    cursor: 'pointer',
    '&:focus': {
      outline: 'none',
    },
  },
});

export default useStyles;
