import { keys, pullAll, startCase } from 'lodash';
import { GridColDef, GridColumns } from '@mui/x-data-grid-pro';

import CenteredCell from 'components/UI/CenteredCell';
import { FlowItemsEntry } from '../../../interfaces/flowItems';

import {
  defaultColumns,
  completedWorkColumns,
  workInProcessColumns,
  upcomingWorkColumns,
} from './staticColumns';
import _ from 'lodash';

const extractFieldNames = (
  customFieldNames: Set<string>,
  flowUnit: FlowItemsEntry,
): Set<string> => {
  const { customFields } = flowUnit || {};

  // Incorporate new fields into set of names
  const newFieldNames = keys(customFields);
  newFieldNames.forEach(customFieldNames.add, customFieldNames);

  return customFieldNames;
};

const generateColumnByKey = (key: string): GridColDef => ({
  field: key,
  headerName: startCase(key),
  width: 150,
  renderCell: CenteredCell,
  headerAlign: 'center'
});

const generateCustomColumns = (items: FlowItemsEntry[]): GridColumns => {
  const emptySet = new Set<string>();
  const fieldsSet: Set<string> = items.reduce(
    extractFieldNames,
    emptySet,
  );

  const fieldNames: string[] = Array.from(fieldsSet);
  const customFieldNames: string[] = pullAll(fieldNames, defaultColumns);

  const customFieldColumns: GridColumns = customFieldNames.map(generateColumnByKey);

  return customFieldColumns;
};

const selectDefaultColumns = (perspective?: string) => {
  switch (perspective) {
    case 'past':
      return completedWorkColumns;
    case 'present':
      return workInProcessColumns;
    case 'future':
      return upcomingWorkColumns;
    default:
      return completedWorkColumns;
  }

};

export const generateColumns = (
  items?: FlowItemsEntry[],
  perspective: string | undefined = undefined,
  displayActiveTime = false
) => {
  const defaultColumns: GridColumns = selectDefaultColumns(perspective);

  const customFieldColumns: GridColumns = items
    ? generateCustomColumns(items)
    : [];

  // Filter out duplicate columns by field name
  // Having duplicates causes unit tests to fail
  const completeColumns: GridColumns = _
    .chain([...defaultColumns, ...customFieldColumns])
    .filter(col => !displayActiveTime
      ? col.field !== 'activeTime'
      : true
    )
    .filter(
      column => column.field !== 'isAboveSle' || perspective !== 'future'
    )
    .uniqBy(item => item.field)
    .value();

  return completeColumns;
};

