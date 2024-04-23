import Box from '@material-ui/core/Box';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import Paper from '@material-ui/core/Paper';
import Row from './components/Row';
import useStyles from './CustomViews.styles';
import { Skeleton } from '@material-ui/lab';
import { GroupedFilter } from '../../interfaces';

type Props = {
  customViewsData: GroupedFilter[];
  control: any;
  isLoading: boolean;
};

const CustomViews = ({ customViewsData, control, isLoading }: Props) => {
  const classes = useStyles();
  let currentLengthOfFields = 0;

  return (
    <>
      <Box className={classes.titleTable}>
        <h1>Custom Views</h1>
      </Box>
      {isLoading ? <Skeleton variant='rect' height={500} /> :
        <TableContainer className={classes.tableContainer} component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell width='50%' className={classes.titleTableCell}>Custom View</TableCell>
                <TableCell width='25%' className={classes.titleTableCell}>Performance Checkpoints</TableCell>
                <TableCell width='25%' className={classes.titleTableCell}>Performance benchmarking</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customViewsData.map((row, index) => {

                if (index > 0) {
                  currentLengthOfFields = currentLengthOfFields + (customViewsData[index - 1].fields.length || 0);
                }
                return (
                  <Row
                    key={index}
                    row={row}
                    control={control}
                    previousFieldsLength={currentLengthOfFields}
                    openDefault={index === 0}
                  />
                );
              })
              }
            </TableBody>
          </Table>
        </TableContainer>
      }
    </>
  );
};

export default CustomViews;
