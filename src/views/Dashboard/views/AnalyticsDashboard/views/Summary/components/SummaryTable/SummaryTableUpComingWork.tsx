import { IColumn } from '@fluentui/react';
import SummaryTable, { Props } from './SummaryTable';
import { renderPredictabilityFromVariability } from './utils/renderPredictabilityFromVariability';
import { renderTrendArrow } from './utils/renderTrend';
import { getDefaultProps } from './utils/utils';

const getColumns = (demoDataIsSelected?: boolean) => {
  const columns: IColumn[] = [
    {
      ...getDefaultProps(),
      headerClassName: 'summary-table-text-size',
      name: 'Type of Demand',
      fieldName: 'itemTypeName',
      minWidth: 200,
      maxWidth: 220,
    },
    {
      ...getDefaultProps(),
      name: 'Inventory Size',
      fieldName: 'inventoryCount',
      minWidth: 80,
      maxWidth: 120,
    },
    {
      ...getDefaultProps(),
      name: 'Inventory Age (85%tile)',
      fieldName: 'inventoryAgePercentile85th',
      minWidth: 100,
      maxWidth: 180,
    },
    {
      ...getDefaultProps(),
      name: 'Trend Inventory Age',
      fieldName: 'trendAnalysisInventoryAge',
      onRender: renderTrendArrow,
      minWidth: 100,
      maxWidth: 150,
    },
    {
      ...getDefaultProps(),
      name: 'Inventory Predictability',
      fieldName: 'inventoryVariability',
      onRender: renderPredictabilityFromVariability,
      minWidth: 100,
      maxWidth: 150,
    },
    {
      ...getDefaultProps(),
      name: 'Commitment Rate',
      fieldName: 'commitmentRate',
      minWidth: 100,
      maxWidth: 150,
    },
    {
      ...getDefaultProps('timeToCommitPercentile85th'),
      name: 'Time to Commit (85%tile) ',
      fieldName: 'timeToCommitPercentile85th',
      minWidth: 200,
      maxWidth: 200,
    },
  ];
  if (demoDataIsSelected) {
    columns.push({
      ...getDefaultProps('workLate'),
      name: '% of Work Late',
      fieldName: 'workLate',
      minWidth: 80,
      maxWidth: 200,
    });
  }
  return columns;
};

const SummaryTableUpComingWork = (props: Props) => (
  <SummaryTable {...props} getColumns={getColumns} />
);

export default SummaryTableUpComingWork;
