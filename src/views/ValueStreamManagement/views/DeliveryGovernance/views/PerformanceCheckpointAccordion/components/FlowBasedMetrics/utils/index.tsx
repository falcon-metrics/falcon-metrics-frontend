/**
 * @deprecated
 * 
 * This is the old code. Refactored the most of performance checkpoints code
 * TODO: Remove this code
 */

import './style.css';

import startCase from 'lodash/startCase';
import { getTrendArrowImage } from 'utils/statistics/TrendAnalysis';
import {
  HeaderFormatter,
} from 'views/Governance/views/GovernanceObeya/views/GovernanceObeyaHome/views/Risk/components/RiskList/utils';
import {
  CheckpointsListResponse,
  CheckpointWithUnit,
  ComparisionWithArrowDirection,
} from '../../../interfaces';
import Box from '@material-ui/core/Box';
import Tooltip from '@material-ui/core/Tooltip';
import { GridRenderCellParams } from '@mui/x-data-grid-pro';

import { inlineStyles } from '../FlowBasedMetrics.styles';
import _ from 'lodash';

const columnDescriptions = {
  metric: '',
  lead_time_portfolio_85: 'Lead Time portfolio items (85th)',
  lead_time_team_85: 'Lead Time team level items (85th)',
  lead_time_target_met: 'Lead Time Target Met (%)',
  wip_age_85: 'WIP Age (85th)',
  total_throughput: 'Throughput (count)',
  value_demand: 'Value Demand (%)',
  expedite_pcnt: 'Expedite (%)',
  flow_efficiency: 'Flow Efficiency (%)',
  flow_debt: 'Flow Debt (%)'
};

/**
 * @deprecated
 * 
 * This is the old code. Refactored the most of performance checkpoints code
 */
export const renderTrendArrow = (trend) => {
  if (!trend || !trend.direction) {
    return null;
  }
  const { direction, colour, text } = trend;
  const image = getTrendArrowImage(direction, colour);

  return (
    <div
      style={{
        height: 20,
        position: 'relative',
      }}
    >
      <img
        src={image}
        className="sle-trend-icon"
        alt={text}
        style={{
          top: -6,
          position: 'absolute',
        }}
      />
    </div>
  );
};

/**
 * @deprecated
 * 
 * This is the old code. Refactored the most of performance checkpoints code
 */
const getColumn = (colName: string) => {
  if (colName.includes('checkpoint')) {
    const checkpointName = colName;
    return {
      field: checkpointName,
      renderHeader: HeaderFormatter,
      renderCell: (params: GridRenderCellParams) => {

        return (
          <span
            style={{
              ...inlineStyles.text,
              textAlign: 'center',
              background: params?.row?.[checkpointName]?.colour,
              paddingLeft: 35,
              color: params?.row?.[checkpointName]?.colour === 'rgba(77, 186, 232, 0.92)' ? '#ffffff' : '#444B52',
            }}
            className="dependency-name"
          >
            {`${params?.row?.[checkpointName]?.value}${params?.row?.[checkpointName]?.unit !== '%' ? ' ' : ''}${params?.row?.[checkpointName]?.unit ?? ''}` || '-'}
          </span>
        );
      },
      sortable: false,
      minWidth: 300,
      width: 200
    };
  } else {
    const staticColumns = {
      metric: {
        field: 'label',
        headerName: 'Flow-based Metrics',
        renderHeader: (params) => <HeaderFormatter {...params} customStyles={{ paddingLeft: 25, }} />,
        renderCell: (params: GridRenderCellParams) => {
          return (
            <span
              style={{ ...inlineStyles.text, paddingLeft: 35, }}
              className="dependency-name"
            >
              <Tooltip title={columnDescriptions[params?.row?.metric]} placement="top" arrow classes={{ tooltip: '.default-tooltip' }}>
                <span style={{ ...inlineStyles.text }}>
                  {params?.row?.label || '-'}
                </span>
              </Tooltip>
            </span>

          );
        },
        sortable: false,
        width: 400,
        minWidth: 420,
      },
      comparision: {
        field: 'comparision',
        headerName: 'Comparison',
        renderHeader: HeaderFormatter,
        renderCell: (params: GridRenderCellParams) => {
          // This is not good. We have to refactor both the APIs and the frontend performance checkpoints
          const value = params?.row?.comparision?.value.toLowerCase() === 'stable'
            ? 'stable'
            : `${params?.row?.comparision?.value} ${params?.row?.comparision?.unit ?? ''}`;
          return (
            <Box display="flex">
              <Box style={inlineStyles.arrow}>
                {params?.row?.comparision?.arrow
                  ? renderTrendArrow(params?.row?.comparision?.arrow) : null}
              </Box>
              <span
                style={{ ...inlineStyles.text, marginLeft: 14, }}
              >
                {value || '-'}
              </span>
            </Box>
          );
        },
        sortable: false,
        minWidth: 300,
        width: 200,
      },
    };
    return staticColumns[colName];
  }
};

/**
 * @deprecated
 * 
 * This is the old code. Refactored the most of performance checkpoints code
 */
export const getBaseColumns = (data: CheckpointsListResponse, headerNamesMap: ColumnsNamesMap) => {
  const columNames: string[] = getColumnNames(data);
  const currentColumns = columNames.map((column: string) => {
    const configColumn = getColumn(column);
    if (configColumn.field.includes('checkpoint')) {
      configColumn.headerName = headerNamesMap[column] || startCase(column);
    }
    return configColumn;
  });
  return currentColumns;
};

const columnLabels = {
  metric: 'Flow-based Metrics',
  lead_time_portfolio_85: 'Lead Time portfolio items (85th)',
  lead_time_team_85: 'Lead Time team level items (85th)',
  lead_time_target_met: 'Lead Time Target Met (%)',
  wip_age_85: 'WIP Age (85th)',
  total_throughput: 'Throughput (count)',
  flow_efficiency: 'Flow Efficiency (%)',
  flow_debt: 'Flow Debt (%)',
  throughput_predictability: 'Throughput Predictability',
  lead_time_predictability: 'Lead Time Predictability',
  wip_count: 'WIP Count',
  fitness_level: 'Fitness Level',
  stale_work: 'Stale Work',
  average_throughput: 'Average Throughput',
  wip_age_avg: 'Average WIP Age',
  lead_time_team_avg: 'Average Lead Time - Team',
  lead_time_portfolio_avg: 'Average Lead Time - Portfolio',
};



/**
 * @deprecated
 * 
 * This is the old code. Refactored the most of performance checkpoints code
 */
export const getColumnNames = (data: CheckpointsListResponse): string[] => {
  const firstColumnOfResponse = Object.keys(data)?.[0];
  const columnsToAddOnTable: any = data?.[firstColumnOfResponse] || {};
  const columnBase: string[] = Object.keys(columnsToAddOnTable);
  return ['metric', ...columnBase];
};

export type ColumnsNamesMap = { [columnName: string]: string; };

// get all names of each checkpoint to generate the columns
export const getColumnsNamesMap = (data: CheckpointsListResponse): ColumnsNamesMap => {
  const firstColumnOfResponse = Object.keys(data)?.[0];
  const columnsToAddOnTable: ColumnsNamesMap = data?.[firstColumnOfResponse] || {};
  const columnNamesMap: ColumnsNamesMap = Object.keys(columnsToAddOnTable)
    .reduce((acc: ColumnsNamesMap, columnName: string) => {
      if (columnName.includes('checkpoint')) {
        acc[columnName] = data?.[firstColumnOfResponse]?.[columnName]?.name || columnName;
      }
      return acc;
    }, {});
  return columnNamesMap;
};

/**
 * @deprecated
 * 
 * This is the old code. Refactored the most of performance checkpoints code
 */
export type RowDataGridCheckpointItem = {
  id?: string | number;
  checkpoint1?: { value: number, unit: string, colour: string, name: string; };
  checkpoint2?: { value: number, unit: string, colour: string, name: string; };
  checkpoint3?: { value: number, unit: string, colour: string, name: string; };
  checkpoint4?: { value: number, unit: string, colour: string, name: string; };
  comparison?: { value: string | number, arrow: { direction: 'down', colour: '#000'; }; };
  metric?: string;
  label?: string;
  tooltipText?: string;
};

/**
 * @deprecated
 * 
 * This is the old code. Refactored the most of performance checkpoints code
 * 
 * This function will format the response to return a valid format to use on 
 * Datagrid table pro
 */
export const getFormattedCheckpointsRows = (data: CheckpointsListResponse): RowDataGridCheckpointItem[] => {
  const rowsData: RowDataGridCheckpointItem[] = [];
  const metricKeys = Object.keys(data);
  const columns = getColumnNames(data);
  const checkpoints = _.slice(columns, 1);

  metricKeys.forEach((metricKey, index) => {
    const column1 = columns[0]; // metric

    let checkpointRow: RowDataGridCheckpointItem = {
      [column1]: metricKey,
      label: columnLabels[metricKey],
      id: index,
      tooltipText: columnDescriptions?.[metricKey] || '',
    };

    checkpoints.forEach(checkpointName => {
      const currentMetricValue: CheckpointWithUnit | ComparisionWithArrowDirection | undefined = data?.[metricKey];

      if (currentMetricValue?.[checkpointName]) {
        checkpointRow = { ...checkpointRow, [checkpointName]: currentMetricValue[checkpointName] };
      }
    });


    // prevent to show empty rows
    if (checkpointRow.label) {
      rowsData.push(checkpointRow);
    }
  });
  return rowsData;
};
