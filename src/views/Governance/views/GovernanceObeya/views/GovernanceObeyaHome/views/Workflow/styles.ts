import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
  container: {
    flexDirection: 'column',
    flexGrow: 1,
    display: 'flex',
  },
  boardContainer: {
    height: 500,
    overflowX: 'auto',
    overflowY: 'auto',
    display: 'flex',
    backgroundColor: '#efefef',
    paddingBottom: 40,
  },
  boardContainerFullScreen: {
    height: 'calc(100vh - 300px)'
  },
  selectWorkflowBoard: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 10,
    marginBottom: 10,
  },
  wrapperSearch: {
    width: 340,
    marginRight: 15,
    marginTop: 30,
    height: 32,
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  dropdownContainer: {
    display: 'flex'
  },
  cursorPointer: {
    cursor: 'pointer'
  }
});