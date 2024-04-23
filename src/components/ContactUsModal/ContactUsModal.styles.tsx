import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    removeOutline: {
      outline: 0,
    },
    paper: {
      width: 600,
      position: 'relative',
      backgroundColor: theme.palette.background.paper,
      borderRadius: 15,
      boxShadow: theme.shadows[5],
      outline: 0,
      '&:focus': {
        outline: 0,
      },
      maxHeight: '95vh',
    },
    column: {
      justifyContent: 'center',
      display: 'flex',
      flexDirection: 'column',
      flexWrap: 'wrap',
    },
  }),
);

export default useStyles;
