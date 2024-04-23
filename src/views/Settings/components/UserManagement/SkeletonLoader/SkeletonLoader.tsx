import Skeleton from "@material-ui/lab/Skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@material-ui/core";

const SkeletonLoader = () => {
  return (
    <TableContainer>
      <Table>
        <TableBody>
          <TableRow>
            {Array.from({ length: 3 }).map((_, colIndex) => (
              <TableCell key={colIndex} width={300}>
                <Skeleton variant="text" animation="wave" />
              </TableCell>
            ))}
          </TableRow>
          {Array.from({ length: 3 }).map((_, rowIndex) => (
            <TableRow key={rowIndex}>
              {Array.from({ length: 3 }).map((_, colIndex) => (
                <TableCell key={colIndex}>
                  <Skeleton variant="text" animation="wave" />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SkeletonLoader;
