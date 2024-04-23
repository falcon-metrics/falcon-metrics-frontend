import { isArray } from 'lodash';
import isEqual from 'lodash/isEqual';
import omit from 'lodash/omit';
import { useMemo } from 'react';
import { FilterPanelQueryParameters } from 'views/Dashboard/views/Platform/views/FilterPanel/contexts/FilterPanelContext/interfaces';
import useFilterPanelContext from '../../Platform/views/FilterPanel/contexts/FilterPanelContext';

import { RollingWindowDates } from '../../Platform/views/FilterPanel/contexts/FilterPanelContext/interfaces';
import { useGetDefaultRollingWindow } from '../AnalyticsDashboard.data';

export const getSelected = (
  keys: Array<keyof FilterPanelQueryParameters>,
  apiFilters: FilterPanelQueryParameters,
) => {
  return keys.reduce((result, key) => {
    const _filter = apiFilters[key];
    if (isArray(_filter)) {
      const _keys: string[] = [];
      if (_filter.length > 0) {
        _filter.forEach((filter) => {
          if (filter === undefined) return 0;
          const val = filter.substring(0, filter.indexOf('#'));
          if (!_keys.includes(val)) {
            _keys.push(val);
          }
        });
      }
      const res = _keys.length > 1 ? 1 : _keys.length;
      return result + res;
    }
    return result + (_filter ? 1 : 0);
  }, 0);
};

export function useGetTotalFilterCount(
  appliedFilters: FilterPanelQueryParameters,
  rollingWindowDates: RollingWindowDates,
) {
  const defaultRollingWindow = useGetDefaultRollingWindow();
  const defaultFilterCount = 6;
  const filterKeys = Object.keys(
    omit(appliedFilters, [
      'departureDateLowerBoundary',
      'departureDateUpperBoundary'
    ]),
  );
  const dateKeys = Object.keys(
    omit(rollingWindowDates, [
      ...filterKeys
    ]),
  );
  const otherKeys = [
    'currentDataAggregation',
    'delayedItemsSelection'
  ];


  const { selectedFilters } = useFilterPanelContext();
  const selectedFilterCount = useMemo(() => {
    const keys = [...filterKeys] as Array<
      keyof FilterPanelQueryParameters
    >;
    return getSelected(keys, selectedFilters);
  }, [
    selectedFilters
  ]);

  const defaultAggregation = {
    currentDataAggregation: 'Weeks',
    delayedItemsSelection: 'inventory'
  };

  const otherFilterCount = otherKeys.reduce((result, k) => {
    const sameAsInitial = isEqual(
      { ...defaultAggregation }[k],
      appliedFilters[k],
    );
    result += sameAsInitial ? 0 : 1;
    return result;
  }, 0);

  let dateCount = dateKeys.reduce((result, k) => {
    const sameAsInitial = isEqual(
      { ...defaultRollingWindow }[k],
      appliedFilters[k],
    );
    result += sameAsInitial ? 0 : 1;
    return result;
  }, 0);

  dateCount = dateCount >= 1 ? 1 : dateCount;

  const count = (selectedFilterCount - defaultFilterCount) < 0 ? 0 : (selectedFilterCount - defaultFilterCount);

  return count + dateCount + otherFilterCount;
}
