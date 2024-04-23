import {
  createStyles,
  makeStyles,
} from '@material-ui/core/styles';

export const useStyles = makeStyles(() =>
  createStyles({
    tableContainer: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      flexGrow: 1,
      justifyContent: 'space-between',
      marginLeft: 20,
      marginRight: 15,
      marginTop: 15,
      marginBottom: 15,
    },
    skeletonCell: {
      alignItems: 'center',
      height: 10,
      marginLeft: 25,
      marginRight: 25,
    },
    highlightsContainer: {
      display: 'flex',
      flexDirection: 'row',
      width: '30%',
      justifyContent: 'space-between',
      marginRight: 50,
    },
    indicatorsContainer: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      width: '30%',
      marginRight: 40,
    },
    loneContainer: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      width: '10%',
      marginRight: 25,
    },
    otherFieldsContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '25%',
    },
  })
);
