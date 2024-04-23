import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    heading: {
      fontSize: theme.typography.pxToRem(16),
      //fontWeight: theme.typography.fontWeightBold,
    },
    chips: {
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
      '& > *': {
        margin: theme.spacing(0.5),
      },
    },
    padding: {
      padding: 30,
      '& ul': {
        marginTop: 10,
      },
      '& li': {
        listStylePosition: 'inside',
      },
    },
  }),
);

export default useStyles;
