import {
  useState,
  Fragment
} from 'react';
import useStyles from '../../CustomViews.styles';
import { Controller } from 'react-hook-form';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { GroupedFilter } from '../../../../interfaces';

type Props = {
  row: GroupedFilter;
  control: any;
  previousFieldsLength: number;
  openDefault: boolean;
};
function Row({
  row, control, previousFieldsLength, openDefault
}: Props) {
  const [open, setOpen] = useState(openDefault);
  const classes = useStyles();
  return (
    <Fragment>
      {/* @ts-ignore */}
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }} className={classes.titleTableCell}>
        <TableCell style={{ fontFamily: 'Open Sans', fontSize: 14 }} colSpan={3}>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
          {row.displayName} {' '}{`(${row.fields.length})`}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small" aria-label="purchases">
                <colgroup>
                  <col style={{ width: '50%' }} />
                  <col style={{ width: '25%' }} />
                  <col style={{ width: '25%' }} />
                </colgroup>
                <TableBody>
                  {(row.fields || []).map((item, index) => {
                    const currentFieldIndex = previousFieldsLength + index;
                    const checkboxCheckPointName = `customViews.${currentFieldIndex}.display_on_checkpoints`;
                    const checkboxBenchmarking = `customViews.${currentFieldIndex}.display_on_benchmarking`;
                    return (
                      <TableRow key={item.filter_id} style={{ fontFamily: 'Open Sans' }}>
                        <TableCell colSpan={1} className={classes.contentCell}>
                          {item.filter_displayName}
                        </TableCell>
                        <TableCell>
                          <Controller
                            render={({ field }) => {
                              return (
                                <Checkbox
                                  style={{ color: '#1890ff' }}
                                  {...field}
                                  checked={field.value}
                                  onChange={field.onChange}
                                />
                              );
                            }}
                            name={checkboxCheckPointName}
                            control={control}
                            defaultValue={item.display_on_checkpoints}
                          />
                        </TableCell>
                        <TableCell>
                          <Controller
                            render={({ field }) => {
                              return (
                                <Checkbox
                                  style={{ color: '#1890ff' }}
                                  {...field}
                                  checked={field.value}
                                  onChange={field.onChange}
                                />
                              );
                            }}
                            name={checkboxBenchmarking}
                            control={control}
                            defaultValue={item.display_on_benchmarking}
                          />
                        </TableCell>
                      </TableRow>
                    );
                  }
                  )}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  );
}

export default Row;
