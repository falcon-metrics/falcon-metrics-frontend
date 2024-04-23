import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles(() => ({
    label: {
      fontSize: '90%',
      marginBottom: '0.5em',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center'
    },
    select: {
      '&::-webkit-scrollbar': {
        width: '0.6em',
        borderRadius: '20px'
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: '#C4C4C4',
        borderRadius: '50px'
      },
      '&::-webkit-scrollbar-button': {
        height: '35px'
      }
    }
  }),
);
