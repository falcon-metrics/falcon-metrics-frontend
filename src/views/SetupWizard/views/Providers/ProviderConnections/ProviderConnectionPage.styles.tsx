import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    progress: {
      position: 'absolute',
      top: 0,
      width: '100%',
    },
    customButton: {
      maxWidth: '90%',
    },
    tokenLink: {
      color: 'white',
      padding: 10,
      background: '#6886c0',
      borderRadius: 5,
      cursor: 'pointer',
      textDecoration: 'none',
    },
    emailHintText: {
      backgroundColor: '#335da9',
      fontStyle: 'Open Sans',
      '& span': {
        position: 'absolute',
        right: 2,
        top: 2,
        fontSize: 10,
      },
    },
  }),
);

export default useStyles;
