import { useState } from 'react';

import useFilterPanelContext
  from 'views/Dashboard/views/Platform/views/FilterPanel/contexts/FilterPanelContext';

import Box from '@material-ui/core/Box';

import {
  customFieldsFilterFetcher,
  normalizationFiltersFetcher,
  workItemFiltersFetcher,
} from '../../utils/fetchFilterOptions';
import FilterDateRange from './components/FilterDateRange';
import { FilterGroupWithData } from './components/FilterGroup/FilterGroup.data';
import PreferencesGroup from './components/PreferencesGroup/PreferencesGroup';
import useStyles from './FilterPanelContent.styles';

const groupFetchers = [
  workItemFiltersFetcher,
  customFieldsFilterFetcher,
  normalizationFiltersFetcher,
];

const FilterPanelContent = () => {
  const classes = useStyles();

  const {
    selectedFilters: {
      departureDateLowerBoundary,
      departureDateUpperBoundary,
      delayedItemsSelection,
      dateAnalysisOption,
    },
    setSelectedFilters: {
      setDepartureDateLowerBoundary,
      setDepartureDateUpperBoundary,
      setDelayedItemsSelection,
      setDateAnalysisOption,
    },
  } = useFilterPanelContext();

  const [globalExpandedNumber, setGlobalExpandedNumber] = useState(0);
  const toggleGlobalExpanded = (expanded: boolean) =>
    setGlobalExpandedNumber(
      (globalExpandedNumber) =>
        globalExpandedNumber + (globalExpandedNumber % 2) + (expanded ? 1 : 2),
    );

  return (
    <div className={classes.filtersContainer}>
      <FilterDateRange
        lowerBoundarySelectedValue={departureDateLowerBoundary}
        onLowerBoundaryDateChange={setDepartureDateLowerBoundary}
        upperBoundarySelectedValue={departureDateUpperBoundary}
        onUpperBoundaryDateChange={setDepartureDateUpperBoundary}
      />
      <br />
      <Box className={classes.expandButtons}>
        <button onClick={() => toggleGlobalExpanded(false)}>
          Collapse All
        </button>{' '}
        <button onClick={() => toggleGlobalExpanded(true)}>Expand All</button>
      </Box>
      <Box className={classes.groupsContainer}>
        {groupFetchers.map((fetcher, i) => (
          <FilterGroupWithData
            key={i}
            globalExpandedNumber={globalExpandedNumber}
            fetcher={fetcher}
            index={i}
          />
        ))}
        <PreferencesGroup
          globalExpandedNumber={globalExpandedNumber}
          delayedItemsSelection={delayedItemsSelection}
          setDelayedItemsSelection={setDelayedItemsSelection}
          dateAnalysisOption={dateAnalysisOption}
          setDateAnalysisOption={setDateAnalysisOption}
        />
      </Box>
    </div>
  );
};

export default FilterPanelContent;
