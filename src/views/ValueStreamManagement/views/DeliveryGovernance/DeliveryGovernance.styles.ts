import {
  createStyles,
  makeStyles,
} from '@material-ui/core/styles';

export const useStyles = makeStyles(() =>
  createStyles({
    dateRange: {
      top: '4px !important',
      left: 14,
    },
    wrapperFilter: {
      alignItems: 'flex-end',
    }
  })
);
