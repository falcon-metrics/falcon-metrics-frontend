import {
  createStyles,
  makeStyles,
} from '@material-ui/core/styles';

export const useStyles = makeStyles(() =>
  createStyles({
  root: {
    width: '100%',
    height: '100%',
    marginRight: 3,
    marginTop: 0,
    flexGrow: 1,
    paddingBottom: '3.8rem',
    position: 'relative',
  },
  inline: {
    display: 'inline',
  },
  cardContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    spacing: 0,
  },
  listItem: {
    display: 'flex',
    background: '#efefef',
    marginTop: 4,
    paddingBottom: 0,
  },
  showMoreButton: {
    fontFamily: 'Open Sans',
    fontSize: 14,
  },
  showMoreContainer: {
    justifyContent: 'center',
    width: '100%',
    height: 40,
    display: 'flex',
    background: '#efefef',
    position: 'absolute',
    bottom: 0,
    flexGrow: 1,
  },
  })
);
