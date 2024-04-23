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

interface StateTransitionTabRow {
  fromState: string | null;
  fromTimeInState: string;
  toState: string | null;
  toTimeStamp: string;
}

interface StateTransitionTabProps extends TabProps {
  initState?: {
    fromState: string | null;
    fromTimeStamp: string;
  };
  descStateTransitions: StateTransitionTabRow[];
  sort: "asc" | "desc";
}

const StateTransitionTab: any = ({
  initState,
  descStateTransitions,
  sort,
}: StateTransitionTabProps) => {
  const classes = useStyles();

  const renderInitState = () => {
    if (!initState) {
      return null;
    }

    return (
      <TableRow>
        <TableCell className={classes.tabCells} colSpan={4}>
          {`This item was initially ${
            initState.fromState !== null ? "set as " : ""
          }`}
          <b>{initState.fromState}</b>{" "}
          {`on ${DateTime.fromISO(initState.fromTimeStamp).toFormat(
            DEFAULT_DATE_TIME_FORMAT
          )}. `}
        </TableCell>
      </TableRow>
    );
  };

  const renderStateTransitions = () => {
    if (!descStateTransitions || descStateTransitions.length === 0) {
      return (
        <TableRow>
          <TableCell className={classes.tabCells} colSpan={4}>
            {`This item has no state history.`}
          </TableCell>
        </TableRow>
      );
    }

    return descStateTransitions.map((row, index) => (
      <TableRow key={index}>
        <TableCell className={classes.tabCells}>
          {`${row.fromState} (${row.fromTimeInState})`}
        </TableCell>
        <TableCell className={classes.tabCellArrow}>
          <ArrowForwardIcon fontSize="small" style={{ color: "#707070" }} />{" "}
        </TableCell>
        <TableCell className={classes.tabCells}>{`${row.toState}`}</TableCell>
        <TableCell className={classes.tabCells}>
          {`on ${formatDateTime(row.toTimeStamp)} `}
        </TableCell>
      </TableRow>
    ));
  };

  return (
    <Table>
      <TableHead>
        <TableCell className={classes.tabTitles}>From State</TableCell>
        <TableCell className={classes.tabTitles}>&nbsp;</TableCell>
        <TableCell className={classes.tabTitles}>To State</TableCell>
        <TableCell className={classes.tabTitles}>&nbsp;</TableCell>
      </TableHead>
      <TableBody>
        {sort === "asc" && renderInitState()}
        {renderStateTransitions()}
        {sort === "desc" && renderInitState()}
      </TableBody>
    </Table>
  );
};

export default StateTransitionTab;
