import TableCell from "@material-ui/core/TableCell";
import { createStyles, withStyles } from "@material-ui/styles";

const styles = createStyles({
  root: {
    border: "none",
    verticalAlign: "top",
  },
});

const StyledTableCell = withStyles(styles)(TableCell);

export default StyledTableCell;
