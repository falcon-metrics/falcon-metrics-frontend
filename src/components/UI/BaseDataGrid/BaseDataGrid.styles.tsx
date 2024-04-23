import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  box: {
    height: 500,
    margin: 20,
    border: 'solid 0.5px lightgray',
    borderRadius: 5,
  },
  boxFullScreen: {
    height: 'calc(100vh - 250px)'
  }
});

export default useStyles;
