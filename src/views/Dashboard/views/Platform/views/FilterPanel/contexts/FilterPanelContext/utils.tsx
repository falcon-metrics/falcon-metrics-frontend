import { APIClient } from 'core/api/ApiClient/ApiClient';
import history from 'core/history';
import cloneDeep from 'lodash/cloneDeep';
import isArray from 'lodash/isArray';
import merge from 'lodash/merge';
import omit from 'lodash/omit';
import pick from 'lodash/pick';

import {
  ApiQueryParameters,
  initialFilters,
  RollingWindowDates,
} from './interfaces';

export const getSelectedFilterCount = (
  keys: Array<keyof ApiQueryParameters>,
  apiFilters: ApiQueryParameters,
) => {
  return keys.reduce((result, key) => {
    const _filter = apiFilters[key];
    if (isArray(_filter)) {
      const _keys : string[] = [];
      if (_filter.length > 0) {
        _filter.map((filter) => {
          if (filter === undefined) return 0;
          const val = filter.substring(0, filter.indexOf('#'));

          if (!_keys.includes(val)) {
            _keys.push(val);
          }
        });
      }
      return result + _keys.length;
    }
    return result + (_filter ? 1 : 0);
  }, 0);
};

export const getAppliedFilters = (search: string) => {
  const searchParams = new URLSearchParams(search);
  const result = APIClient.urlQueryToFilterPanelObject(searchParams);

  // Solves a cloneDeep bug where empty cloned properties ended up as stringified null values ("null")
  if ((result.departureDateLowerBoundary as any) === 'null' || (result.departureDateLowerBoundary as any) === 'undefined') {
    result.departureDateLowerBoundary = undefined;
  }
  if ((result.departureDateUpperBoundary as any) === 'null' || (result.departureDateUpperBoundary as any) === 'undefined') {
    result.departureDateUpperBoundary = undefined;
  }
  
  return result;
};

export function applyUrlParams(
  ...args: Partial<ApiQueryParameters | undefined>[]
) {
  history.push({
    search: getFilterUrlSearchParams(Object.assign({}, ...args)),
  });
}

export function getFilterUrlSearchParams(
  appliedFilters: Record<string, unknown>,
): string {
  return new URLSearchParams(
    APIClient.getMappedQueryParams(appliedFilters),
  ).toString();
}

export const getClearedFilters = (rollingWindowDates?: RollingWindowDates) => {
  return cloneDeep(merge({}, initialFilters, rollingWindowDates));
}

export const nonPanelKeys = ['contextId'];
export const getPanelParams = (params: Partial<ApiQueryParameters>) =>
  omit(params, nonPanelKeys);
export const getNonPanelParams = (params: Partial<ApiQueryParameters>) =>
  pick(params, nonPanelKeys);
