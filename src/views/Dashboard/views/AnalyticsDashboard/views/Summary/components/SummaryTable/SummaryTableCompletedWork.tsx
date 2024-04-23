import { IColumn } from '@fluentui/react';
import './SummaryTable.styles.css';
import SummaryTable, { Props } from './SummaryTable';
import compose from 'react-recompose/compose';
import mapProps from 'react-recompose/mapProps';
import { getDefaultProps } from './utils/utils';
import { renderPredictabilityFromVariability } from './utils/renderPredictabilityFromVariability';
import { renderTrendArrow } from './utils/renderTrend';

const renderServiceLevelPercent = (item) => {
  const { serviceLevelPercent } = item;
  const targetMet = serviceLevelPercent;
  let targetColour = '#ccc';
  switch (true) {
    case targetMet < 70:
      targetColour = '#E1523E';
      break;
    case targetMet >= 70 && targetMet <= 84:
      targetColour = '#F5B24B';
      break;
    case targetMet >= 85:
      targetColour = '#2AD2C9';
      break;
    default:
      break;
  }
  return (
    <div style={{ color: targetColour, fontWeight: 'bolder' }}>
      {`${targetMet}%`}
    </div>
  );
};

const defaultColumns: IColumn[] = [
  {
    ...getDefaultProps(),
    headerClassName: 'summary-table-text-size',
    name: 'Type of Demand',
    fieldName: 'itemTypeName',
    minWidth: 220,
    maxWidth: 240,
  },
  {
    ...getDefaultProps(),
    name: 'Service Level Expectation',
    fieldName: 'serviceLevelExpectationDays',
    minWidth: 170,
    maxWidth: 210,
  },
  {
    ...getDefaultProps(),
    name: 'Target Met',
    fieldName: 'serviceLevelPercent',
    minWidth: 80,
    maxWidth: 100,
    onRender: renderServiceLevelPercent,
  },
  {
    ...getDefaultProps(),
    name: 'Trend',
    fieldName: 'trendAnalysisSLE',
    onRender: renderTrendArrow,
    minWidth: 40,
    maxWidth: 50,
  },
  {
    ...getDefaultProps(),
    name: 'Lead time (85%tile)',
    fieldName: 'leadtimePercentile',
    onRender: (item) => {
      if (!item?.leadtimePercentile || item?.leadtimePercentile === '-') {
        return '-';
      }
      return <div>{`${item?.leadtimePercentile} days`}</div>;
    },
    minWidth: 130,
    maxWidth: 170,
  },
  {
    ...getDefaultProps(),
    name: 'Trend',
    fieldName: 'trendAnalysisLeadTime',
    onRender: renderTrendArrow,
    minWidth: 60,
    maxWidth: 100,
  },
  {
    ...getDefaultProps(),
    name: 'Predictability',
    fieldName: 'variabilityLeadTime',
    minWidth: 70,
    maxWidth: 200,
    onRender: renderPredictabilityFromVariability,
  },
  {
    ...getDefaultProps('throughput'),
    name: 'Throughput',
    fieldName: 'throughput',
    minWidth: 100,
    maxWidth: 200,
  },
  {
    ...getDefaultProps(),
    name: 'Trend',
    fieldName: 'trendAnalysisThroughput',
    onRender: renderTrendArrow,
    minWidth: 60,
    maxWidth: 80,
  },
  {
    ...getDefaultProps(),
    name: 'Predictability',
    fieldName: 'variabilityThroughput',
    onRender: renderPredictabilityFromVariability,
    minWidth: 100,
    maxWidth: 200,
  },
];

const getColumns = (demoDataIsSelected?: boolean) => {
  const columns = [...defaultColumns];
  if (
    demoDataIsSelected &&
    !columns.find((column) => column.name === 'discarded')
  ) {
    columns.splice(7, 0, {
      ...getDefaultProps(),
      name: 'Discarded before start',
      fieldName: 'discarded',
      onRender: (item) => {
        return <div>{item.discarded ? `${item.discarded}` : '-'}</div>;
      },
      minWidth: 150,
      maxWidth: 220,
    });
  }

  return columns;
};

const SummaryTableCompletedWork = (props: Props) => (
  <SummaryTable {...props} getColumns={getColumns} />
);

export default compose<Props, any>(
  mapProps<Props, any>((props) => {
    if (!props.data) return props;
    const dataset = props.data.map((record: any) => {
      const serviceLevel = record.serviceLevelPercent * 100;
      return {
        ...record,
        serviceLevelPercent: serviceLevel.toFixed(),
      };
    });
    const data = dataset.map((record) => {
      const sleInDays = record.serviceLevelExpectationDays;
      return {
        ...record,
        serviceLevelExpectationDays:
          sleInDays !== '-'
            ? `${record.serviceLevelExpectationDays} days or less`
            : sleInDays,
      };
    });
    return {
      data: data || [],
      demoDataIsSelected: props.demoDataIsSelected,
      activeFilters: props.activeFilters || false,
      missingConfigurations: props.missingConfigurations,
    };
  }),
)(SummaryTableCompletedWork);
