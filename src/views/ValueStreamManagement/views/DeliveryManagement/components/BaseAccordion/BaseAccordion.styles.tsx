import {
  createStyles,
  makeStyles,
} from '@material-ui/core/styles';

export const useStyles = makeStyles(() =>
  createStyles({
    accordionTitle: {
      fontSize: '18px',
      fontFamily: 'Open Sans',
      fontWeight: 600,
      fontStyle: 'normal',
      color: 'rgba(0, 0, 0, 0.7)',
    },
    accordionDetails: {
      backgroundColor: '#fbfbfb',
    }
  })
);
