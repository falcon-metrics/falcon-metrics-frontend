import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    filtersContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'left',
      alignContent: 'stretch',
      flexWrap: 'wrap',
      backgroundColor: '#ffffff',
      height: '100%',
    },
    expandButtons: {
      marginLeft: 'auto',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 10,
      marginBottom: 10,
      '& > button': {
        fontSize: 10,
        cursor: 'pointer',
        color: 'grey',
        '&:hover': {
          textDecoration: 'underline',
        },
      },
    },
    groupsContainer: {
      margin: '0 -24px 0px',
      borderTop: '1px solid lightgrey',
      maxWidth: 'calc(100% + 48px)',
      overflow: 'hidden',
    },
  }),
);

export default useStyles;
