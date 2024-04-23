import startCase from 'lodash/startCase';
/* eslint-disable-next-line */
import NumberFormat from 'react-number-format';

import Box from '@material-ui/core/Box';
import {
  GridColumnHeaderParams,
  GridRenderCellParams,
} from '@mui/x-data-grid-pro';

import { inlineStyles } from './RiskList.styles';

const headerStyles = {
  fontFamily: 'Open Sans',
  fontSize: 14,
  fontWeigth: 'bold',
  color: '#444B52'
};

const headerStyle = {
  width: '100%',
  paddingLeft: 25,
};

export const HeaderFormatter = (params: GridColumnHeaderParams, customStyles = {}) => {
  return (
    <span style={headerStyle}>
      <strong style={{ ...inlineStyles, ...headerStyles, ...customStyles }}>
        {params?.colDef?.headerName || '-'}
      </strong>
    </span>
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
    headerName: 'Risk',
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
    field: 'likelihood',
    headerName: 'Likelihood',
    renderCell: ({ value }: GridRenderCellParams) => {
      return (
        <Box style={{ ...inlineStyles.cell, ...inlineStyles.center }}>
          {value}%
        </Box>
      );
    },
    renderHeader: HeaderFormatter,
    width: 138,
  },
  {
    field: 'impactOnSchedule',
    headerName: 'Impact (in days)',
    renderCell: ({ value }: GridRenderCellParams) => {
      return (
        <Box style={{ ...inlineStyles.cell, ...inlineStyles.center }}>
          {value}
        </Box>
      );
    },
    renderHeader: HeaderFormatter,
    width: 175,
  },
  {
    field: 'impactOnCost',
    headerName: 'Impact (in cost)',
    renderCell: ({ value }: GridRenderCellParams) => {
      return (
        <Box style={{ ...inlineStyles.cell, ...inlineStyles.center }}>
          <NumberFormat
            value={Number(value)}
            displayType={'text'}
            thousandSeparator={true}
            prefix={'$'}
          />
        </Box>
      );
    },
    renderHeader: HeaderFormatter,
    width: 175,
  },
  {
    field: 'status',
    headerName: 'Status',
    renderCell: cellFormatter('status'),
    renderHeader: HeaderFormatter,
    width: 110,
  },
  {
    field: 'riskExposureDays',
    headerName: 'Risk Exposure Days',
    renderCell: ({ value }: GridRenderCellParams) => {
      return (
        <Box style={{ ...inlineStyles.cell, ...inlineStyles.center }}>
          {value} days
        </Box>
      );
    },
    renderHeader: HeaderFormatter,
    width: 210,
  },
  {
    field: 'riskExposureAmount',
    headerName: 'Risk Exposure Amount',
    renderCell: ({ value }: GridRenderCellParams) => {
      return (
        <Box style={{ ...inlineStyles.cell, ...inlineStyles.center }}>
          <NumberFormat
            value={value ? Number(Number(value).toFixed(2)) : 0}
            displayType={'text'}
            thousandSeparator={true}
            prefix={'$'}
          />
        </Box>
      );
    },
    renderHeader: HeaderFormatter,
    width: 220,
  },
  {
    field: 'ownerName',
    headerName: 'Owner',
    renderCell: cellFormatter('ownerName'),
    renderHeader: HeaderFormatter,
    width: 200,
  },
];
