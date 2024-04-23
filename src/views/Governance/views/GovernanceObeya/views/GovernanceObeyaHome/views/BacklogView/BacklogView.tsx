import {
  DetailsRow,
  IDetailsListProps,
  IDetailsRowStyles,
} from '@fluentui/react';
import Box from '@material-ui/core/Box';
import { data } from './mockData';
import { getColumns } from './config';
import SummaryTable from 'views/Dashboard/views/AnalyticsDashboard/views/Summary/components/SummaryTable';
import { TableHeader, useStyles } from './BacklogView.styles';

const headerFormatter = (columns: any) =>
  columns.map((c) => ({
    ...c,
    name: ((<TableHeader>{c.name}</TableHeader>) as unknown) as string,
  }));

const onRenderRow: IDetailsListProps['onRenderRow'] = (props) => {
  const customStyles: Partial<IDetailsRowStyles> = {
    root: {
      borderBottom: '1px solid rgba(0, 0, 0, 0)',
    },
  };
  if (props) {
    // if (props.itemIndex % 2 === 0) {
    // Every other row renders with a different background color
    // customStyles.root = { backgroundColor: theme.palette.themeLighterAlt };
    // }

    return <DetailsRow {...props} styles={customStyles} />;
  }
  return null;
};

const BacklogView = () => {
  const classes = useStyles();
  return (
    <Box>
      <Box style={{ overflow: 'auto', maxWidth: 1800, maxHeight: 600 }}>
        <SummaryTable
          data={data}
          demoDataIsSelected={false}
          onRenderRow={onRenderRow}
          getColumns={getColumns(classes)}
          customHeadFormatter={headerFormatter}
        />
      </Box>
    </Box>
  );
};

export default BacklogView;
