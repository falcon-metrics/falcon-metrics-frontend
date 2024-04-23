import memo from "utils/typescript/memo";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
import { WorkflowColors } from "views/Governance/utils/constants";
import FlagRoundedIcon from "@material-ui/icons/FlagRounded";
import { formatDate } from "utils/dateTime";

const useStyles = makeStyles({
  root: {
    width: 340,
    minHeight: 80,
    padding: 0,
    margin: 0,
    borderRadius: 0,
    borderTop: "1px solid #c8c8c8",
    borderBottom: "1px solid #c8c8c8",
    borderRight: "1px solid #c8c8c8",
    fontFamily: "Open Sans",
    transition: "all .3s ease-in-out",
    willChange: "auto",
    "&:hover": {
      transform: "scale(1.05)",
      backgroundColor: "#e9f2eb",
      borderLeft: "3px solid rgb(51 153 71 / 100%)",
    },
  },
  cardContent: {
    padding: "10px !important",
  },
  wrapperTitle: {
    fontSize: 12,
    color: "#000",
    display: "flex",
  },
  titleDescription: {
    marginLeft: 4,
    fontSize: 14,
    width: 292,
  },
  titleIcon: {
    color: "#339947",
    fontSize: 16,
    marginTop: 4,
  },
  cardDescriptionContainer: {
    display: "flex",
  },
  wrapperState: {
    display: "flex",
  },
  state: {
    fontSize: 12,
    display: "flex",
    alignItems: "center",
    marginTop: 2,
    color: "#807e7e",
  },
  statesColor: {
    width: 9,
    height: 9,
    borderRadius: 9,
    marginLeft: 6,
  },
  statesText: {
    width: 190,
    marginLeft: 5,
    color: "#000",
    fontFamily: "Open Sans",
    fontSize: 13,
  },
  tooltip: {
    fontSize: 12,
    fontFamily: "Open Sans",
  },
  workItemId: {
    maxWidth: 92,
    fontWeight: "bold",
    marginLeft: 3,
    fontSize: 14,
    fontFamily: "Open Sans",
  },
});

interface Props {
  title?: string;
  workItemId?: string;
  stateCategory: string;
  state: string;
  workItemType?: string;
  arrivalDate?: string;
  commitmentDate?: string;
  departureDate?: string;
  flagged?: boolean;
}

const WorkflowCard = memo(
  ({
    stateCategory,
    title,
    workItemId,
    state,
    workItemType,
    arrivalDate,
    commitmentDate,
    departureDate,
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
            <Box className={classes.state}>State</Box>
            <Box className={classes.state}>
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
            <Box className={classes.state}>Flow Item Type:</Box>
            <Box className={classes.state}>
              <Typography noWrap className={classes.statesText}>
                {workItemType}
              </Typography>
            </Box>
          </Box>
          <Box>
            {arrivalDate && (
              <Box className={classes.state}>
                Arrival Date:
                <Typography noWrap className={classes.statesText}>
                  {formatDate(arrivalDate)}
                </Typography>
              </Box>
            )}
            {commitmentDate && (
              <Box className={classes.state}>
                Commitment Date:
                <Typography noWrap className={classes.statesText}>
                  {formatDate(commitmentDate)}
                </Typography>
              </Box>
            )}
            {departureDate && (
              <Box
                className={classes.state}
                display="flex"
                justifyContent="space-between"
              >
                Departure Date:
                <Typography noWrap className={classes.statesText}>
                  {formatDate(departureDate)}
                </Typography>
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
