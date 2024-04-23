import { merge } from 'lodash';
import { GridColumns, GridRowData } from '@mui/x-data-grid-pro';
import { FlowItemsEntry } from '../../../interfaces/flowItems';
import _ from 'lodash';

// Move custom field properties to top level
export const convertFlowItemToRow = ({
  customFields,
  ...flowUnits
}: FlowItemsEntry): GridRowData => merge(customFields, flowUnits);


/**
 * Reorder Grid columns based on the saved order. If any of the column names is not found
 * among the saved columns, this function returns the columns without changing the order
 */
export const reorderColumns = (columns: GridColumns, savedColumnOrder: string[]) => {

  // Check if all the columns are present if not ignore the saved columns and clear the saved columns
  const columnsMatch = columns
    .map(c => c.field)
    .every(cName => cName !== undefined && savedColumnOrder.includes(cName));

  if (!columnsMatch) {
    console.warn('Ignoring the saved order as the order does not match');
    // localStorage.removeItem(SAVED_COLUMNS_KEY);
    return columns;
  }

  // Find the index of the column in the savedColumnOrder array
  // Add that index as the property of the object
  // Sort using the index
  // Remove the index (this step changes the array back to the GridColumns )
  const reordered = _
    .chain(columns)
    .map(c => ({ gridColumn: c, index: savedColumnOrder.findIndex(savedColName => c.field === savedColName) }))
    .sort((a, b) => a.index - b.index)
    .map(obj => obj.gridColumn)
    .value();
  return reordered;
};