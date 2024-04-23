import startCase from 'lodash/startCase';

import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';
import {
  GridColumnHeaderParams,
  GridRenderCellParams,
} from '@mui/x-data-grid-pro';

import { inlineStyles } from './Dependencies.styles';
import { formatDate } from 'utils/dateTime';

export const HeaderFormatter = (params: GridColumnHeaderParams) => {
  return (
    <strong>
      {params?.colDef?.headerName || '-'}
    </strong>
  );
};

export const cellFormatter = (fieldName) => (params: GridRenderCellParams) => {
  return (
    <span style={inlineStyles.cell}>{params?.row?.[fieldName] || '-'}</span>
  );
};

export const getBaseColumns = (onClick) => [
  {
    field: 'name',
    headerName: 'Title',
    renderHeader: HeaderFormatter,
    renderCell: (params: GridRenderCellParams) => {
      return (
        <span
          style={inlineStyles.dependencyName}
          className="dependency-name"
          onClick={onClick}
        >
          {startCase(params?.row?.name) || '-'}
        </span>
      );
    },
    width: 280,
  },
  {
    field: 'status',
    headerName: 'Status',
    renderCell: cellFormatter('status'),
    renderHeader: HeaderFormatter,
    width: 120,
  },
  {
    field: 'severity',
    headerName: 'Severity',
    renderCell: ({ value }: GridRenderCellParams) => {
      const severityValue = value as string;
      return (
        <Box
          style={{ ...inlineStyles?.cell, ...inlineStyles.center,  width: 60 }}
        >
          <Chip
            size="small"
            classes={{
              root: `severity-${severityValue}`,
            }}
            label={startCase(severityValue)}
            variant="outlined"
          />
        </Box>
      );
    },
    renderHeader: HeaderFormatter,
    width: 120,
  },
  {
    field: 'blockerName',
    headerName: 'Blocker Team',
    renderCell: cellFormatter('blockerName'),
    renderHeader: HeaderFormatter,
    width: 200,
  },
  {
    field: 'blockedName',
    headerName: 'Blocked Team',
    renderCell: cellFormatter('blockedName'),
    renderHeader: HeaderFormatter,
    width: 200,
  },
  {
    field: 'dateOfImpact',
    headerName: 'Date Of Impact',
    renderHeader: HeaderFormatter,
    width: 180,
    renderCell: ({ value }: GridRenderCellParams) => {
      return (
        <Box style={inlineStyles.cell}>
          {value && typeof value === 'string'
            ? formatDate(value)
            : '-'}
        </Box>
      );
    },
  },
  {
    field: 'createdBy',
    headerName: 'Created By',
    renderCell: cellFormatter('createdBy'),
    renderHeader: HeaderFormatter,
    width: 200,
  },
];
