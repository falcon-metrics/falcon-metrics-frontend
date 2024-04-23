
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import {
  Typography,
} from "@material-ui/core";

const WorkItemTypeHeader = () => {

  return (
    <TableHead>
      <TableRow>
        <TableCell />
        <TableCell style={{ width: 150 }}>
          <Typography>
            <b>Workflow Id</b>
          </Typography>
        </TableCell>
        <TableCell style={{ width: 400 }}>
          <Typography>
            <b>Workspace</b>
          </Typography>
        </TableCell>
        <TableCell style={{ width: 300 }}>
          <Typography>
            <b>Board</b>
          </Typography>
        </TableCell>
        <TableCell style={{ width: 500 }}>
          <Typography>
            <b>Workflow</b>
          </Typography>
        </TableCell>
        <TableCell />
        <TableCell />
      </TableRow>
    </TableHead>
  );
};

export default WorkItemTypeHeader;
