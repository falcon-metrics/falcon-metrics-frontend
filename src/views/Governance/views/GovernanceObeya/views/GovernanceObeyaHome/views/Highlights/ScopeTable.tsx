import { IColumn } from '@fluentui/react';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import SummaryTable from 'views/Dashboard/views/AnalyticsDashboard/views/Summary/components/SummaryTable';
import { HighlightsResponse } from 'views/Governance/views/GovernanceObeya/hooks/useObeya';
import {
  columnClassName,
  defaultHeaderClassName,
} from 'views/Dashboard/views/AnalyticsDashboard/views/Summary/components/SummaryTable/constants';
import { ObeyaColors } from 'views/Governance/utils/constants';

export const useStyles = makeStyles(() => ({
  baseCell: {
    width: 80,
    display: 'flex',
    justifyContent: 'center',
    borderRadius: '2px',
  },
  completed: {
    backgroundColor: ObeyaColors.COMPLETED,
    color: '#fff',
  },
  proposed: {
    backgroundColor: ObeyaColors.NOT_STARTED,
    color: '#000',
  },
  inProgress: {
    backgroundColor: ObeyaColors.IN_PROGRESS,
    color: '#fff',
  },
}));

const ScopeTable = ({ data }: { data: HighlightsResponse }) => {
  return <SummaryTable getColumns={getColumns} data={data} />;
};

const CustomCell = ({ item, type }: { item: any; type: any }) => {
  const classes = useStyles();
  return (
    <Box className={`${classes.baseCell} ${classes[type]}`}>{item[type]}</Box>
  );
};

const RenderCustomCell = (type) => (item) => (
  <CustomCell type={type} item={item} />
);

const getColumns = () => {
  const _columns: IColumn[] = [
    {
      headerClassName: 'summary-table-text-size',
      className: columnClassName,
      key: 'column1',
      name: 'Type of Demands',
      fieldName: 'demandType',
      minWidth: 220,
      maxWidth: 260,
      isResizable: true,
    },
    {
      headerClassName: 'summary-table-text-size total-items-header',
      className: columnClassName,
      key: 'obeya-total-items',
      name: 'Items',
      fieldName: 'count',
      minWidth: 30,
      maxWidth: 90,
      onRender: (item) => {
        return (
          <Box
            style={{
              width: '100%',
              display: 'flex',
              fontWeight: 'bold',
              justifyContent: 'left',
            }}
          >
            {item.count}
          </Box>
        );
      },
    },
    {
      headerClassName: defaultHeaderClassName,
      className: columnClassName,
      key: 'column5',
      name: 'Not Started',
      fieldName: 'proposed',
      maxWidth: 80,
      minWidth: 90,
      onRender: RenderCustomCell('proposed'),
    },
    {
      headerClassName: defaultHeaderClassName,
      className: columnClassName,
      key: 'column4',
      name: 'In Progress',
      fieldName: 'inProgress',
      minWidth: 70,
      maxWidth: 80,
      onRender: RenderCustomCell('inProgress'),
    },
    {
      headerClassName: defaultHeaderClassName,
      className: columnClassName,
      key: 'column3',
      name: 'Completed',
      fieldName: 'completed',
      minWidth: 60,
      maxWidth: 80,
      onRender: RenderCustomCell('completed'),
    },
  ];
  return _columns;
};

export default ScopeTable;
