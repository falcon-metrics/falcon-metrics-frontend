import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    border: {
      '& > *': {
        borderBottom: 'unset',
      },
    },
  }),
);

export default useStyles;
