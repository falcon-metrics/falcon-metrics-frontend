import { DetailsList, DetailsListLayoutMode, IColumn } from '@fluentui/react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import { styled } from '@material-ui/styles';

const useStyles = makeStyles(() =>
  createStyles({
    tooltip: {
      fontSize: '1em',
    },
  }),
);

const TableHeader = styled('div')({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

export interface Props {
  data?: any[]; //SummaryPastItem[] | SummaryInprogressItem[];
  demoDataIsSelected?: boolean;
  customHeadFormatter?(columns: any): any;
  onRenderRow?: any;
}

interface PropsWithColumns extends Props {
  getColumns: (demoDataIsSelected?: boolean) => IColumn[];
}

const SummaryTable = ({
  data,
  demoDataIsSelected,
  getColumns,
  customHeadFormatter,
  onRenderRow,
}: PropsWithColumns) => {
  const classes = useStyles();
  const getColumnsWithTooltipName = (columns: IColumn[]) =>
    columns.map((c) => ({
      ...c,
      name: ((
        <Tooltip title={c.name} classes={classes} placement="top">
          <TableHeader className={c?.key}>{c.name}</TableHeader>
        </Tooltip>
      ) as unknown) as string,
    }));

  let formattedColumns = getColumnsWithTooltipName(
    getColumns(demoDataIsSelected),
  );

  if (customHeadFormatter) {
    formattedColumns = customHeadFormatter?.(getColumns(demoDataIsSelected));
  }

  return (
    <DetailsList
      items={data || []}
      columns={formattedColumns}
      setKey="set"
      selectionMode={0}
      layoutMode={DetailsListLayoutMode.justified}
      checkButtonAriaLabel="select row"
      onRenderRow={onRenderRow}
    />
  );
};
export default SummaryTable;
