import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
  container: {
    height: 500,
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: '3em',
  },
  containerFullScreen: {
    height: 'calc(100vh - 300px) !important'
  },
  gridToolbarExport: {
    textAlign: 'right',
    padding: 10
  },
});
