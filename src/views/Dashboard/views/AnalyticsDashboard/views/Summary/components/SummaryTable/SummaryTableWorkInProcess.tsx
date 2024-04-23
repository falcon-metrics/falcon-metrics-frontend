import { IColumn } from '@fluentui/react';
import SummaryTable, { Props } from './SummaryTable';
import { getDefaultProps } from './utils/utils';
import { renderPredictabilityFromVariability } from './utils/renderPredictabilityFromVariability';

const defaultColumns: IColumn[] = [
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
    name: 'WIP',
    fieldName: 'wipCount',
    minWidth: 40,
    maxWidth: 50,
  },
  {
    ...getDefaultProps(),
    name: '% Stale',
    fieldName: 'percentageOfStaleWorkItem',
    minWidth: 40,
    maxWidth: 50,
  },
  {
    ...getDefaultProps(),
    name: 'WIP Age (Avg)',
    fieldName: 'wipAgeAverage',
    minWidth: 100,
    maxWidth: 120,
  },
  {
    ...getDefaultProps(),
    name: 'WIP Age (85%tile)',
    fieldName: 'wipAge85Percentile',
    onRender: (item) => {
      const { wipAge85Percentile } = item;
      if (!wipAge85Percentile) {
        return '-';
      }
      return <div>{`${wipAge85Percentile} days`}</div>;
    },
    minWidth: 100,
    maxWidth: 120,
  },
  {
    ...getDefaultProps(),
    name: 'WIP Predictability',
    fieldName: 'wipVariability',
    onRender: renderPredictabilityFromVariability,
    minWidth: 40,
    maxWidth: 100,
  },
  {
    ...getDefaultProps('flowDebt'),
    name: 'Flow Debt',
    fieldName: 'flowDebt',
    minWidth: 60,
    maxWidth: 70,
  },
  {
    ...getDefaultProps('flowEfficiencyAverage'),
    name: 'Avg. Flow Efficiency',
    fieldName: 'flowEfficiencyAverage',
    minWidth: 100,
    maxWidth: 130,
  },
  {
    ...getDefaultProps('keySourceOfDelay'),
    name: 'Key Source of Delay',
    fieldName: 'keySourceOfDelay',
    minWidth: 100,
    maxWidth: 130,
  },
  {
    ...getDefaultProps('demandVsCapacity'),
    name: 'In/Out Flow',
    fieldName: 'demandVsCapacity',
    minWidth: 100,
    maxWidth: 200,
  },
];

const getColumns = (demoDataIsSelected?: boolean) => {
  const columns = [...defaultColumns];
  if (demoDataIsSelected) {
    columns.push({
      ...getDefaultProps('keyBounceBackStep'),
      name: 'Key Bounce-back Step',
      fieldName: 'keyBounceBackStep',
      minWidth: 100,
      maxWidth: 200,
    });

    columns.splice(8, 0, {
      ...getDefaultProps('discarded'),
      name: 'Discarded after start',
      fieldName: 'discarded',
      minWidth: 100,
      maxWidth: 150,
    });
  }
  return columns;
};

const SummaryTableWorkInProcess = (props: Props) => (
  <SummaryTable {...props} getColumns={getColumns} />
);

export default SummaryTableWorkInProcess;
