import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) =>
  createStyles({
    closeButton: {
      position: 'absolute',
      right: 4,
      top: 4,
      color: theme.palette.grey[500],
      cursor: 'pointer',
    },
    description: {
      parddingTop: 40,
      position: 'relative',
      fontFamily: 'Open Sans',
      color: 'rgba(0, 0, 0, 0.87)',
    },
  }),
);

export default useStyles;
