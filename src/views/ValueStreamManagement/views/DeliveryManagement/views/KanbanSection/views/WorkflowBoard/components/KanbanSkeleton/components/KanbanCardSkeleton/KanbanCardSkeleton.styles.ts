import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
  card: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    margin: 25,
  },
  sidebar: {
    display: 'flex',
    flexDirection: 'column',
  },
  cardContent: {
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'column',
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
  },
  title: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleIcon: {
    color: '#E4E4E4',
    fontSize: 16,
    marginRight: 5,
  },
  info: {
    display: 'flex',
    flexDirection: 'row',
  },
  labels: {
    display: 'flex',
    flexGrow: 1,
    alignItems: 'flex-start',
    flexDirection: 'column',
  },
  labelText: {
    fontFamily: 'Open Sans',
    fontWeight: 400,
    fontSize: 12,
    color: '#808083'
  },
  entries: {
    display: 'flex',
    flexGrow: 2,
    flexDirection: 'column',
    justifyContent: 'space-around',
  }
});
