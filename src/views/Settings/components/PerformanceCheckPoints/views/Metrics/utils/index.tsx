import {
  GridColumns,
} from '@mui/x-data-grid-pro';
import Box from '@material-ui/core/Box';
import Text from '@material-ui/core/Box';
import Checkbox from '@material-ui/core/Checkbox';
import { Controller } from 'react-hook-form';
import { FilterWithId, GroupedFilter, MetricItem } from '../interfaces';
import { styled } from '@material-ui/core/styles';
import _ from 'lodash';

const Header = styled(Text)({
  '&': {
    fontFamily: 'Open Sans',
    fontSize: 14,
    fontWeight: 'bold',
    position: 'relative',
    lineHeight: '14px',
    paddingTop: 14
  },
});

export const getCheckedMetrics = (defaultMetricItems: MetricItem[], checkedMetricItems: MetricItem[]): MetricItem[] => {

  const defaultMetricsCopy = _.cloneDeep(defaultMetricItems);
  return defaultMetricsCopy.map(defaultMetric => {
    const checkedMetric = checkedMetricItems.find(
      (checkedMetric) => {
        return checkedMetric.columnName === defaultMetric.columnName;
      }
    );
    //Since default metrics are on UI and its id is generated on UI, its safer to only pick the display booleans from saved data.
    if (checkedMetric) {
      return {
        ...defaultMetric,
        ...{
          display_on_benchmarking: checkedMetric.display_on_benchmarking,
          display_on_checkpoints: checkedMetric.display_on_checkpoints
        }
      };
    } else {
      return defaultMetric;
    }
  });
};


// should get default fallback customViews and merge with stored customViews on database
// to keep checked and sync all checkboxes
export const getCheckedCustomViews = (defaultCustomViews: GroupedFilter[], checkedCustomViews: FilterWithId[]): GroupedFilter[] => {
  const defaultCustomViewsCopy = _.cloneDeep(defaultCustomViews);
  return defaultCustomViewsCopy.map(defaultCustomView => {
    const mergedCustomViews = defaultCustomView.fields.map(customViewField => {
      const matchingSavedItem = checkedCustomViews.find(x => x.tag === customViewField.tag && x.filter_id === customViewField.filter_id);
      if (matchingSavedItem) {
        return matchingSavedItem;
      } else {
        return customViewField;
      }
    });

    return {
      ...defaultCustomView,
      fields: mergedCustomViews,
    };
  });
};

export const filterByActiveMetricsConfig = (metricsList: MetricItem[]): MetricItem[] => {
  const activeMetrics = metricsList.filter(metric => {
    return metric.display_on_benchmarking || metric.display_on_checkpoints;
  });
  return activeMetrics;
};

export const filterByActiveCustomViewConfig = (customViewList) => {
  const activeMetrics = (customViewList || []).filter(m => {
    return m?.display_on_benchmarking || m?.display_on_checkpoints;
  });
  return activeMetrics;
};

export const getGridColumns = (
  classes,
  control,
  onSelectAllCheckpoints,
  onSelectAllBenchmarking,
  selectAllCheckPoints,
  selectAllBenchmarking
): GridColumns => {
  const columns: GridColumns = [
    {
      field: 'metric',
      renderHeader: () => (
        <Header>
          Flow based metric
        </Header>
      ),
      editable: false,
      flex: 1,
      sortable: false,
      renderCell: (props) => {
        return (
          <Box>
            <span style={{ fontSize: 12 }}>{props.row.displayName || ''}</span>
          </Box>
        );
      },
    },
    {
      field: 'display_on_checkpoints',
      headerName: 'Performance Checkpoints',
      flex: 1,
      sortable: false,
      renderHeader: () => (
        <Header>
          <div>
            Performance Checkpoints
            <Checkbox
              style={{ color: '#1890ff' }}
              checked={selectAllCheckPoints}
              onChange={onSelectAllCheckpoints}
            />
          </div>
          <div style={{ fontSize: 12, fontWeight: 'normal' }}>
            (compare teams across time)
          </div>
        </Header>
      ),
      editable: false,
      renderCell: (props) => {
        const fieldName = `allMetrics.${props.id}.display_on_checkpoints`;
        return (
          <Box>
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
              name={fieldName}
              control={control}
              defaultValue={props.row.display_on_checkpoints}
            />
          </Box>
        );
      },
    },
    {
      field: 'display_on_benchmarking',
      headerName: 'Performance Benchmarking',
      flex: 1,
      sortable: false,
      renderHeader: () => (
        <Header>
          <div>
            Performance Benchmarking
            <Checkbox
              style={{ color: '#1890ff' }}
              checked={selectAllBenchmarking}
              onChange={onSelectAllBenchmarking}
            />
          </div>
          <div style={{ fontSize: 12, fontWeight: 'normal' }}>
            (compare teams across other teams)
          </div>
        </Header>
      ),
      editable: false,
      renderCell: (props) => {
        const fieldName = `allMetrics.${props.id}.display_on_benchmarking`;
        return (
          <Box>
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
              name={fieldName}
              control={control}
              defaultValue={props.row.display_on_benchmarking}
            />
            {props.row.isBenchmarkingRecommended ?
              <span className={classes.titleRecommended}>(Recommended)</span> : ''}
          </Box>
        );
      },
    },
  ];
  return columns;
};
