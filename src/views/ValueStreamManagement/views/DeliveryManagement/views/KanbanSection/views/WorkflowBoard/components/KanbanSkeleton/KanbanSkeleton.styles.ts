import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
  headerSection: {
    display: 'flex',
    flexDirection: 'row',
  },
  header: {
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'space-between',
    padding: 15,
    margin: 3,
    backgroundColor: '#F9F9F9',
  },
  cardContainer: {
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'row',
    backgroundColor: '#F9F9F9',
    margin: 3,
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
});
