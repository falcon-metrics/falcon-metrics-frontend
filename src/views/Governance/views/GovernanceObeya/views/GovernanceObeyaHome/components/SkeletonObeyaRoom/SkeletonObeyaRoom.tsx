import Skeleton from "@material-ui/lab/Skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@material-ui/core";

const SkeletonObeyaRoom = () => {
  return (
    <TableContainer style={{ display: "flex", justifyContent: "center", margin: 20, width: "96%" }}>
      <Table>
        <TableBody>
          <TableRow>
            {Array.from({ length: 2 }).map((_, rowIndex) => (
            <TableCell key={rowIndex} style={{ border: 'none' }}>
              <Skeleton variant="rect" animation="wave" height={500} style={{ borderRadius: 10 }} />
            </TableCell>
          ))}
          </TableRow>
          {Array.from({ length: 5 }).map((_, rowIndex) => (
            <TableRow key={rowIndex}>
              <TableCell style={{ border: 'none' }} colSpan={2}>
                <Skeleton variant="rect" animation="wave" height={40} style={{ borderRadius: 10 }} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SkeletonObeyaRoom;
