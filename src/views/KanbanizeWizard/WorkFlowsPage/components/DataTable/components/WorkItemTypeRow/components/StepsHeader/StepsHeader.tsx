import { Tooltip } from '@material-ui/core';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { headerStyle } from './StepsHeader.styles';
import { HelpOutline } from "@material-ui/icons";

function StepsHeader() {
  return (
    <TableHead>
      <TableRow>
        <TableCell />
        <TableCell style={headerStyle} width={250}>
          Id
        </TableCell>
        <TableCell style={headerStyle} width={250}>
          Step
        </TableCell>
        <TableCell style={{ ...headerStyle, textAlign: 'center' }} width={250}>
          Queue/Active
        </TableCell>
        <TableCell style={{ ...headerStyle, textAlign: 'center' }} width={200}>
          <span style={{ display: 'flex', flexDirection: 'row' }}>
            Current/Discontinued
            <Tooltip
              interactive={true}
              tabIndex={-1} 
              title="
              Discontinued workflow steps are the steps which are no longer in
              use but they need to be in the right order of the workflow. ">
              <HelpOutline style={{ color: '#C4C4C4', fontSize: 16, marginLeft: 2 }} />
            </Tooltip>   
          </span>
        </TableCell>
      </TableRow>
    </TableHead>
  );
}

export default StepsHeader;
