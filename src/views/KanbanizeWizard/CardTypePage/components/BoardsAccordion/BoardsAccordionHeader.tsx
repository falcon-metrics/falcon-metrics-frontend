
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import {
  Typography,
} from "@material-ui/core";

const BoardsAccordionHeader = () => {

  return (
    <TableHead>
      <TableRow>
        <TableCell style={{ width: 250 }}>
          <Typography>
            <b>Workspace</b>
          </Typography>
        </TableCell>
        <TableCell />
        <TableCell style={{ width: 400 }}>
          <Typography>
            <b>Board</b>
          </Typography>
        </TableCell>
        <TableCell />
        {/* <TableCell /> */}
      </TableRow>
    </TableHead>
  );
};

export default BoardsAccordionHeader;
