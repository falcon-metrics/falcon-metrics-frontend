import { DateTime } from "luxon";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import {
  TabProps,
  TableRow,
  TableCell,
  Table,
  TableHead,
  TableBody,
} from "@material-ui/core";
import { useStyles } from "./styles";
import { DEFAULT_DATE_TIME_FORMAT, formatDateTime } from "utils/dateTime";

interface AssigneeTransitionTabRow {
  fromAssignee: string | null;
  fromTimeInState: string;
  toAssignee: string | null;
  toTimeStamp: string;
}

interface AssigneeTransitionTabProps extends TabProps {
  initAssignee?: {
    fromAssignee: string | null;
    fromTimeStamp: string;
  };
  descAssigneeTransitions: AssigneeTransitionTabRow[];
  sort: "asc" | "desc";
}

const AssigneeTransitionTab: any = ({
  initAssignee,
  descAssigneeTransitions,
  sort,
}: AssigneeTransitionTabProps) => {
  const classes = useStyles();

  const renderInitAssignee = () => {
    if (!initAssignee) {
      return null;
    }

    return (
      <TableRow>
        <TableCell className={classes.tabCells} colSpan={4}>
          {`This item was initially ${
            initAssignee.fromAssignee !== null ? "assigned to " : ""
          }`}
          <b>
            {initAssignee.fromAssignee !== null
              ? initAssignee.fromAssignee
              : "Unassigned"}
          </b>{" "}
          {`on ${formatDateTime(initAssignee.fromTimeStamp)}. `}
        </TableCell>
      </TableRow>
    );
  };

  const renderAssigneeTransitions = () => {
    if (!descAssigneeTransitions || descAssigneeTransitions.length === 0) {
      return (
        <TableRow>
          <TableCell className={classes.tabCells} colSpan={4}>
            {`This item has no assignee history.`}
          </TableCell>
        </TableRow>
      );
    }

    return descAssigneeTransitions.map((row, index) => (
      <TableRow key={index}>
        <TableCell className={classes.tabCells}>
          {`${row.fromAssignee === null ? "Unassigned" : row.fromAssignee} (${
            row.fromTimeInState
          })`}
        </TableCell>
        <TableCell className={classes.tabCellArrow}>
          <ArrowForwardIcon fontSize="small" style={{ color: "#707070" }} />{" "}
        </TableCell>
        <TableCell className={classes.tabCells}>
          {`${row.toAssignee === null ? "Unassigned" : row.toAssignee} `}
        </TableCell>
        <TableCell className={classes.tabCells}>
          {`on ${DateTime.fromISO(row.toTimeStamp).toFormat(
            DEFAULT_DATE_TIME_FORMAT
          )}`}
        </TableCell>
      </TableRow>
    ));
  };

  return (
    <Table>
      <TableHead>
        <TableCell className={classes.tabTitles}>From Assignee</TableCell>
        <TableCell className={classes.tabTitles}>&nbsp;</TableCell>
        <TableCell className={classes.tabTitles}>To Assignee</TableCell>
        <TableCell className={classes.tabTitles}>&nbsp;</TableCell>
      </TableHead>
      <TableBody>
        {sort === "asc" && renderInitAssignee()}
        {renderAssigneeTransitions()}
        {sort === "desc" && renderInitAssignee()}
      </TableBody>
    </Table>
  );
};

export default AssigneeTransitionTab;
