import {
  GridColDef,
  GridValueFormatterParams,
  GridCellValue,
} from '@mui/x-data-grid-pro';
import startCase from 'lodash/startCase';
import isString from 'lodash/isString';
import { DateTime } from 'luxon';
import { DATE_STYLE } from 'styles/theme';
import {
  ObjectConstraint,
  baseDefaultWidths,
  validTypes,
} from '../BaseDataGrid';

export function getDataGridUnlistedColumns<T extends ObjectConstraint>(
  dataObject: T,
  propertiesToExclude: Array<keyof T>,
  defaultWidths = baseDefaultWidths,
) {
  const isOfValidType = (k: keyof T) => {
    const value = dataObject[k];
    return !value || validTypes.includes(typeof value);
  };

  const keys = Object.keys(dataObject) as Array<keyof T>;
  const validKeys = keys.filter(isOfValidType);
  const unlistedKeys = validKeys.filter(
    (key) => !propertiesToExclude.includes(key),
  );

  return unlistedKeys.map((key) => {
    const stringKey = String(key);
    const value = dataObject[key];
    const parsedValue =
      typeof value !== 'string' || isNaN(parseFloat(value))
        ? value
        : parseFloat(value);
    const valueType = typeof parsedValue;
    const width = defaultWidths[valueType] ?? baseDefaultWidths['string'];
    return {
      field: key,
      headerName: startCase(stringKey),
      width,
    } as GridColDef;
  });
}

type DataGridFormatterFunction = (
  params: GridValueFormatterParams,
) => GridCellValue;

export const dateFormatter: DataGridFormatterFunction = ({ value }) => {
  if (isString(value) && isNaN(Number(value))) {
    const dateTime = DateTime.fromISO(value);
    if (isString(value) && !dateTime.invalidReason) {
      return dateTime.toLocaleString(DATE_STYLE);
    }
  }
  return value;
};
