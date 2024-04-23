import {
  useContext,
  useEffect,
  useMemo,
} from 'react';

import {
  getBasicContext,
  useContextSetters,
} from 'contexts/contextApi';
import history from 'core/history';
import isEqual from 'lodash/isEqual';
import omit from 'lodash/omit';
import pick from 'lodash/pick';
import { useHistory } from 'react-router';
import { RequiredKeys } from 'utils/typescript/types';

import {
  DataAggregations,
  DateAnalysisOptions,
  FilterPanelQueryParameters,
  GeneralQueryParameters,
  State,
} from './interfaces';
import {
  applyUrlParams,
  getAppliedFilters,
  getClearedFilters,
  getFilterUrlSearchParams,
  getNonPanelParams,
  getPanelParams,
  nonPanelKeys,
} from './utils';
import { SelectedContextIdContext } from 'components/UserStateProvider/UserStateProvider';
import { DateTime, Interval } from 'luxon';


const initialState: RequiredKeys<State> = {
  selectedFilters: getClearedFilters(),
  defaultRollingWindowDates: {
    departureDateLowerBoundary: undefined,
    departureDateUpperBoundary: undefined,
  },
};

const reducerActions = {
  clearSelectedFilters: ({ defaultRollingWindowDates }) => ({
    selectedFilters: getClearedFilters(defaultRollingWindowDates),
  }),
  applyFiltersFromPanel: (
    { selectedFilters },
    additionalFilters?: Partial<FilterPanelQueryParameters>,
  ) => {
    const currentUrlParams = getAppliedFilters(history.location.search);
    const nonPanelParams = getNonPanelParams(currentUrlParams);
    // Add context id to the list of selected filters
    if (nonPanelParams.contextId && selectedFilters && selectedFilters.contextId !== nonPanelParams.contextId) {
      selectedFilters.contextId = nonPanelParams.contextId;
    }
    applyUrlParams(nonPanelParams, selectedFilters, additionalFilters);
    return {};
  },
  applyOtherFilters: (
    _,
    additionalFilters?: Partial<GeneralQueryParameters>,
  ) => {
    const currentUrlParams = getAppliedFilters(history.location.search);
    const panelParams = getPanelParams(currentUrlParams);
    applyUrlParams(panelParams, additionalFilters);
    return {};
  },
  synchronizeSelectedFilters: (_, searchParams: string) => {
    return {
      selectedFilters: getAppliedFilters(searchParams),
    };
  },
};

const { Context, ContextProvider } = getBasicContext(
  initialState,
  reducerActions,
);

export { ContextProvider as FilterPanelProvider };

/**
 * Same method is in the backend too. Therefore the UI must 
 * set the same aggregation. Or else the labels in the graphs
 * will not match the data
 * 
 * See `setSafeAggregation` in `filters_v2.ts`
 */
const getSafeAggregation = (aggregation: DataAggregations, interval: Interval) => {
  const start = interval.start;
  const end = interval.end;
  const months = end.diff(start, 'months').months;
  // const days = end.diff(start, 'days').days;
  if (months <= 3) {
    aggregation = DataAggregations.weeks;
  } else if (months > 3 && months <= 12) {
    aggregation = DataAggregations.months;
  } else if (months <= 24) {
    aggregation = DataAggregations.quarters;
  } else {
    aggregation = DataAggregations.years;
  }
  return aggregation;
};

export type AppliedFilters = Partial<{
  departureDateLowerBoundary: Date | undefined;
  departureDateUpperBoundary: Date | undefined;
  workItemTypes: string[] | undefined;
  workItemLevels: string[] | undefined;
  customFields: string[] | undefined;
  normalization: string[] | undefined;
  workflowSteps: string[] | undefined;
  currentDataAggregation: any | undefined;
  dateAnalysisOption: DateAnalysisOptions | undefined;
  perspective: string | undefined;
  delayedItemsSelection: string | undefined;
  contextId?: string;
  timezone?: string;
  lang?: string;
  updateType?: string;
  dashboardId?: string;
}>;

export const useFilterPanelContext = () => {
  const history = useHistory();

  const urlParamsObject = useMemo(
    () => getAppliedFilters(history.location.search),
    [history.location.search],
  );

  const { state, setState, setters, actions } = useContextSetters(
    Context,
    reducerActions,
  );

  useEffect(() => {
    actions.applyFiltersFromPanel();
  }, [actions, state.defaultRollingWindowDates]);

  const { contextId } = useContext(SelectedContextIdContext);

  const computedData = useMemo(() => {
    const appliedFilters = omit(urlParamsObject, nonPanelKeys);
    const otherApiQueryParameters = pick(urlParamsObject, nonPanelKeys);
    // User's selected context is saved in the React Context at the root level
    if (contextId !== '') {
      otherApiQueryParameters.contextId = contextId;
    }
    const initialFilters = getClearedFilters(state.defaultRollingWindowDates);
    return {
      isDirty: !isEqual(appliedFilters, state.selectedFilters),
      noFiltersSelected: isEqual(state.selectedFilters, initialFilters),
      appliedFilters,
      otherApiQueryParameters,
      apiQueryParameters: {
        ...appliedFilters,
        ...otherApiQueryParameters,
      },
    };
  }, [urlParamsObject, state.selectedFilters, state.defaultRollingWindowDates, contextId]);

  const currentDataAggregation = computedData.appliedFilters.currentDataAggregation;

  const allFilters = {
    ...computedData.appliedFilters,
    ...computedData.apiQueryParameters
  };
  const queryParamsString = getFilterUrlSearchParams(allFilters);
  const interval = Interval.fromDateTimes(
    computedData.appliedFilters.departureDateLowerBoundary ?? DateTime.now().minus({ 'days': 30 }),
    computedData.appliedFilters.departureDateUpperBoundary ?? DateTime.now()
  );
  
  return {
    ...state,
    ...actions,
    ...setters,
    ...computedData,
    setState,
    // Why add currentDataAggregation here? 
    // Its difficult to understand whats going on in this hook. That's because we've 
    // rolled our own state management with abstractions. 
    // We have to start using redux or some other global state management 
    currentDataAggregation,
    /**
     * This is meant to be a temporary property here till we do a proper redesign. 
     * This is to ensure the UI displays the data from the backend correctly. In widgets
     * where we read the snapshots data, the backends sets a "safe aggregation" to prevent
     * high load on the database. We have to do the same in the frontend too. 
     * 
     * If not, the backend will return data with a different aggregation than 
     * what is current set in the UI
     */
    safeAggregation: getSafeAggregation(currentDataAggregation ?? DataAggregations.weeks, interval),
    /**
     * Use this incase `queryParamsString` must be overriden to have extra query params
     * set at the component level
     */
    allFilters,
    /**
     * Use this directly in the hooks. 
     * 
     * Added this here to avoid code duplication in every
     */
    queryParamsString
  };
};
