import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
  headersContainer: {
    display: 'flex',
    flex: 1,
    maxHeight: '100%',
    flexDirection: 'row',
    spacing: 0,
    paddingBottom: 5,
  },
  header: {
    flex: 1,
    flexGrow: 1,
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    overflowX: 'auto',
    overflowY: 'auto',
  },
  navigationSection: {
    zIndex: 1,
    boxShadow: '0px 0px',
  },
  navigationSectionColor: {
    backgroundColor: '#FFFFFF !important',
  },
  boardContainer: {
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'column',
    marginTop: '0px',
    paddingBottom: 30,
  },
  columnsContainer: {
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'row',
    marginTop: '0px',
  },
  cardColumn: {
    display: 'flex',
    flexGrow: 1,
    alignContent: 'center',
    width: '100%',
  },
  selectWorkflowBoard: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 10,
    marginBottom: 10,
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
    flexGrow: 1,
  },
});
