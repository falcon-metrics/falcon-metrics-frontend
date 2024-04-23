import { makeStyles } from '@material-ui/core/styles';
import { Tooltip, Typography } from '@material-ui/core';

type Props = {
  progress: any;
  size?: "large";
}

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    flexGrow: 1,
    flexShrink: 1
  },
  progressBar: {
    position: 'relative',
    width: '100%',
    height: 10,
    borderRadius: theme.spacing(3),
    backgroundColor: '#F0F0F0',
    overflow: 'hidden',
  },
  sections: {
    height: '100%',
    position: 'absolute',
    borderRadius: theme.spacing(3),
  },
  sectionTooltip: {
    fontFamily: 'Open Sans',
    fontSize: 10,
    color: '#fefefe',
    backgroundColor: '#858A8E',
    '&.progress-tooltip': {
      backgroundColor: '#005FA0',
    },
    '&.completed-tooltip': {
      backgroundColor: '#10CFC9',
    },
  },
  percentage: {
    fontWeight: 600,
    fontFamily: 'Open Sans',
    fontSize: 12,
    marginLeft: theme.spacing(1),
    color: "#323130",
    width: "15%",
  }
}));

const ProgressBar = ({ progress, size }: Props) => {

  const classes = useStyles();
  const { remaining, completed, inProgress, notStarted, overall, total } = progress;

  return (
    <div className={classes.container}>
      <div className={classes.progressBar} style={{
        height: size === "large" ? 15 : 10
      }}>

        {/* Reverse the order because of the overlapping style */}
        {/* Proposed Section */}
        {/* {overall === 100 && */}
          <Tooltip
            title={`${notStarted} work items not started`}
            classes={{ tooltip: classes.sectionTooltip }}
            placement="bottom-end"
          >
            <div
              className={classes.sections}
              style={{
                width: `100%`,
                backgroundColor: '#D7D7D7',
                left: completed > 0 && remaining > 0 ? '2%' : 0,
              }}
            />
          </Tooltip>
        {/* } */}

        {/* In Progress Section */}
        {/* {overall === 100 && */}
          <Tooltip
            title={`${inProgress} work items in progress`}
            classes={{ tooltip: `${classes.sectionTooltip} progress-tooltip` }}
            placement="bottom-end"
          >
            <div
              className={classes.sections}
              style={{
                width: `${(completed + inProgress) / total * 100}%`,
                backgroundColor: '#005FA0',
                left: completed > 0 && remaining > 0 ? '2%' : 0,
              }}
            />
          </Tooltip>
        {/* } */}

        {/* Completed Section */}
        <Tooltip
          title={`${completed} work items completed`}
          classes={{ tooltip: `${classes.sectionTooltip} completed-tooltip` }}
          placement="bottom-end"
        >
          <div
            className={classes.sections}
            style={{
              width: `${(completed / total) * 100}%`,
              backgroundColor: '#10CFC9',
              border: overall === 100 ? '1px solid #10CFC9' : "",
              left: 0,
            }}
          />
        </Tooltip>
      </div>
      <Typography className={classes.percentage}
        style={{ width: size === "large" ? "8%" : "15%" }}> {overall}% </Typography>
    </div>
  );
};

export default ProgressBar;
