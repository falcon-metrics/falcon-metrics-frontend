import {
  createStyles,
  makeStyles,
} from '@material-ui/core/styles';

export const useStyles = makeStyles(() =>
  createStyles({
  root: {
    display: 'flex',
    flexGrow: 1,
    minHeight: 80,
    padding: 0,
    margin: 0,
    borderRadius: 0,
    borderTop: '1px solid #c8c8c8',
    borderBottom: '1px solid #c8c8c8',
    borderRight: '1px solid #c8c8c8',
    fontFamily: 'Open Sans',
    transition: 'all .3s ease-in-out',
    willChange: 'auto',
    '&:hover': {
    transform: 'scale(1.05)',
    backgroundColor: '#e9f2eb',
    borderLeft: '3px solid rgb(51 153 71 / 100%)',
    },
  },
  cardContent: {
    padding: '10px !important',
    width: '100%',
  },
  wrapperTitle: {
    fontSize: 12,
    width: '100%',
    color: '#000',
    display: 'flex',
  },
  titleDescription: {
    marginLeft: 4,
    fontSize: 14,
  },
  titleIcon: {
    color: '#339947',
    fontSize: 16,
    marginTop: 4,
  },
  cardDescriptionContainer: {
    display: 'flex',
  },
  wrapperState: {
    display: "flex",
    alignItems: "center",
    justifyContent: 'space-between',
  },
  fieldTitle: {
    width: '100%',
    fontSize: 12,
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 2,
    color: '#807e7e',
    whiteSpace: 'nowrap',
  },
  fieldContent: {
    width: '100%',
    fontSize: 12,
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 2,
    color: '#807e7e',
    whiteSpace: 'nowrap',
  },
  statesColor: {
    width: 9,
    height: 9,
    borderRadius: 9,
    marginLeft: 6,
  },
  statesText: {
    marginLeft: 5,
    color: '#000',
    fontFamily: 'Open Sans',
    fontSize: 13,
  },
  tooltip: {
    fontSize: 12,
    fontFamily: 'Open Sans',
  },
  workItemId: {
    maxWidth: 92,
    fontWeight: 'bold',
    marginLeft: 3,
    fontSize: 14,
    fontFamily: 'Open Sans',
  },
  })
);
