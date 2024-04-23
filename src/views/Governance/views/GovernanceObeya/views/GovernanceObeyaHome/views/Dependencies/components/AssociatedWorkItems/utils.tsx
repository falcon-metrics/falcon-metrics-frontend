import startCase from 'lodash/startCase';

import Tooltip from '@material-ui/core/Tooltip';
import {
  GridColumnHeaderParams,
  GridRenderCellParams,
} from '@mui/x-data-grid-pro';

import { inlineStyles } from './AssociatedWorkItems.styles';

export const HeaderFormatter = (params: GridColumnHeaderParams) => {
  return (
    <strong>
      {params?.colDef?.headerName}
    </strong>
  );
};

export const cellFormatter = (fieldName) => (params: GridRenderCellParams) => {
  return (
    <span style={inlineStyles.cell}>{params?.row?.[fieldName]}</span>
  );
};

export const getBaseColumns = () => [
  {
    field: 'blockedWorkItemId',
    headerName: 'Blocked',
    renderHeader: HeaderFormatter,
    renderCell: (params: GridRenderCellParams) => {
      const content = params?.row?.blockedWorkItemId 
        ? `${params?.row?.blockedWorkItemId} - ${startCase(params?.row?.blockedWorkItemTitle)}` : '';
      return (
        <Tooltip
          title={content}
          placement="top"
          arrow
        >
          <span
            style={inlineStyles.asssociatedItem}
          >
            {content}
          </span>
        </Tooltip>
      );
    },
    width: 290,
  },
  {
    field: 'blockerId',
    headerName: '',
    renderHeader: () => {
      return (
        <strong>
          Blocked By
        </strong>
      );
    },
    renderCell: () => '',
    width: 130,
  },
  {
    field: 'blockerWorkItemId',
    headerName: 'Blocker',
    renderHeader: HeaderFormatter,
    disableColumnReorder: true,
    disableColumnResize: true,
    renderCell: (params: GridRenderCellParams) => {
      const content = params?.row?.blockerWorkItemId ? `${params?.row?.blockerWorkItemId} - ${startCase(params?.row?.blockerWorkItemTitle)}` : '';
      return (
        <Tooltip
          title={content}
          placement="top"
          arrow
        >
          <span
            style={inlineStyles.asssociatedItem}
          >
            {content}
          </span>
        </Tooltip>
      );
    },
    width: 290,
  },
];
