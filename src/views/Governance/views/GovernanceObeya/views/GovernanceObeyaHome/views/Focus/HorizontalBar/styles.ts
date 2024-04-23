import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(() => ({
  barchartContainer: {
    width: '100%',
    marginBottom: 2,
    display: 'flex',
    justifyContent: 'flex-end',
    overflow: 'hidden',
    height: 100,
    '& > div': {
      height: '104px !important',
    },
  },
}));