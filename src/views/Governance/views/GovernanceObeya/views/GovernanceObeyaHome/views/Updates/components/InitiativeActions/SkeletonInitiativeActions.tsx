import {
  makeStyles,
} from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';


export const useStyles = makeStyles(theme => ({
  wrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",

    '& .MuiInput-underline:before': {
      borderBottom: '0px !important',
    },
    '& .MuiInput-underline:after': {
      borderBottom: '0px !important',
    },
  },
  divider: {
    border: "1px solid #e8e8e8",
    height: "1px",
    marginTop: theme.spacing(2),
  }
}));

const SkeletonInitiativeActions = () => {
  const classes = useStyles();
  
  return (
    <>
      {/* <Wrapper> */}
      <div className={classes.wrapper}>
        <Skeleton
          variant="rect"
          style={{
            width: 120,
            height: 28,
            marginRight: 10,
            borderRadius: 6
          }} />
        <Skeleton
          variant="rect"
          style={{
            width: 300,
            height: 28,
            borderRadius: 6
          }} />
      </div>

      <div className={classes.divider} />
    </>
  );
};

export default SkeletonInitiativeActions;
