import memo from "utils/typescript/memo";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
import { DateTime } from "luxon";

import { WorkflowColors } from "views/ValueStreamManagement/views/DeliveryManagement/utils/constants";
import { useStyles } from "./WorkflowCard.styles";
import FlagRoundedIcon from "@material-ui/icons/FlagRounded";
import { formatDate } from "utils/dateTime";

interface Props {
  workItemId?: string;
  title?: string;
  workItemType?: string;
  state: string;
  stateCategory: string;
  arrivalDateTime?: DateTime;
  commitmentDateTime?: DateTime;
  departureDateTime?: DateTime;
  flagged?: boolean;
}

const WorkflowCard = memo(
  ({
    stateCategory,
    title,
    workItemId,
    state,
    workItemType,
    arrivalDateTime,
    commitmentDateTime,
    departureDateTime,
    flagged,
  }: Props) => {
    const classes = useStyles();
    const currentColor = WorkflowColors[stateCategory];
    return (
      <Card
        className={classes.root}
        style={{ borderLeft: `3px solid ${currentColor}` }}
        variant="outlined"
      >
        <CardContent className={classes.cardContent}>
          <Box className={classes.wrapperTitle}>
            <AssignmentTurnedInIcon
              className={classes.titleIcon}
              style={{ color: currentColor }}
            />
            <Box className={classes.cardDescriptionContainer}>
              <Tooltip
                title={`${workItemId} - ${title}`}
                arrow
                placement="top"
                classes={{ tooltip: classes.tooltip }}
              >
                <Box maxWidth={290} display="flex">
                  <Typography className={classes.titleDescription}>
                    <span className={classes.workItemId}>{workItemId}</span> -{" "}
                    {title}
                  </Typography>
                </Box>
              </Tooltip>
            </Box>
          </Box>
          <Box className={classes.wrapperState}>
            <Box className={classes.fieldTitle}>State</Box>
            <Box className={classes.fieldContent}>
              <Box
                className={classes.statesColor}
                style={{ background: currentColor }}
              ></Box>
              <Typography noWrap className={classes.statesText}>
                {state}
              </Typography>
            </Box>
          </Box>
          <Box className={classes.wrapperState}>
            <Box className={classes.fieldTitle}>Flow Item Type:</Box>
            <Box className={classes.fieldContent}>
              <Typography noWrap className={classes.statesText}>
                {workItemType}
              </Typography>
            </Box>
          </Box>
          <Box>
            {arrivalDateTime && (
              <Box className={classes.wrapperState}>
                <Box className={classes.fieldTitle}>Arrival Date:</Box>
                <Box className={classes.fieldContent}>
                  <Typography noWrap className={classes.statesText}>
                    {formatDate(arrivalDateTime)}
                  </Typography>
                </Box>
              </Box>
            )}
            {commitmentDateTime && (
              <Box className={classes.wrapperState}>
                <Box className={classes.fieldTitle}>Commitment Date:</Box>
                <Box className={classes.fieldContent}>
                  <Typography noWrap className={classes.statesText}>
                    {formatDate(commitmentDateTime)}
                  </Typography>
                </Box>
              </Box>
            )}
            {departureDateTime && (
              <Box
                className={classes.wrapperState}
                display="flex"
                justifyContent="space-between"
              >
                <Box className={classes.fieldTitle}>Departure Date:</Box>
                <Box className={classes.fieldContent}>
                  <Typography noWrap className={classes.statesText}>
                    {formatDate(departureDateTime)}
                  </Typography>
                </Box>
              </Box>
            )}
            <Box display="flex" justifyContent="flex-end">
              {flagged && (
                <Typography style={{ color: "#FF585D" }}>
                  <FlagRoundedIcon color="inherit" />
                </Typography>
              )}
            </Box>
          </Box>
        </CardContent>
      </Card>
    );
  }
);

export default WorkflowCard;
