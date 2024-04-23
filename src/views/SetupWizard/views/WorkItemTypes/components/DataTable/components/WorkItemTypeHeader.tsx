
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import {
  Typography,
} from "@material-ui/core";
import { RequiredSymbol } from "../DataTable.styles";

const WorkItemTypeHeader = () => {

  return (
    <TableHead>
      <TableRow>
        <TableCell />
        <TableCell style={{ width: 25 }}>
          <Typography>
            <b>Id</b>
          </Typography>
        </TableCell>
        <TableCell style={{ width: 250 }}>
          <Typography>
            <b>Projects</b>
          </Typography>
        </TableCell>
        <TableCell style={{ width: 250 }}>
          <Typography>
            <b>Work Item Type</b>
          </Typography>
        </TableCell>
        <TableCell style={{ width: 250 }}>
          <b>Display Name</b> <RequiredSymbol />
        </TableCell>
        <TableCell style={{ width: 250 }}>
          <b>Level</b> <RequiredSymbol />
        </TableCell>
        <TableCell style={{ width: 300 }}>
          <b>SLE</b>
          <span style={{ fontSize: 12 }}> (Days)</span>
          <RequiredSymbol />
        </TableCell>
        <TableCell />
        <TableCell />
      </TableRow>
    </TableHead>
  );
};

export default WorkItemTypeHeader;
