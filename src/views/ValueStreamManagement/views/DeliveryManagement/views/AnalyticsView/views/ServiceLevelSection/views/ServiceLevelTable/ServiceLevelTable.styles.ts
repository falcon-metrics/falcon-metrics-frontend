import {
  createStyles,
  makeStyles,
} from '@material-ui/core/styles';

export const useStyles = makeStyles(() =>
  createStyles({
    tabsContainer: {
      position: 'relative',
    },
    tableContainer: {
      height: '350px',
      position: 'relative'
    },
    tableContainerFullScreen: {
      height: 'calc(100vh - 200px) !important'
    }
  })
);
