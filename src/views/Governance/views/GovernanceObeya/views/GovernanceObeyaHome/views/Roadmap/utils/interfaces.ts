import { RequiredKeys } from 'utils/typescript/types';
import { getTimezone } from 'utils/utils';

export enum DataAggregations {
  years = 'Years',
  quarters = 'Quarters',
  months = 'Months',
  weeks = 'Weeks',
  days = 'Days',
};

export enum DateAnalysisOptions {
  all = 'all',
  was = 'was',//used to be "active"
  became = 'became',//used to be "inactive"
}

export const initialFilters: RequiredKeys<FilterPanelQueryParameters> = {
  departureDateLowerBoundary: undefined,
  departureDateUpperBoundary: undefined,
  workItemTypes: [],
  workItemLevels: [],
  customFields: [],
  normalization: [],
  workflowSteps: [],
  currentDataAggregation: DataAggregations.weeks,
  dateAnalysisOption: DateAnalysisOptions.all,
  perspective: 'past',
  delayedItemsSelection: 'inventory',
  contextId: '',
  timezone: getTimezone(),
  lang: navigator.language,
  assignedTo: [],
  resolution: [],
  flagged: []
};

export const defaultDataAggregation = DataAggregations.weeks;

export type FilterPanelQueryParameters = {
  departureDateLowerBoundary?: Date;
  departureDateUpperBoundary?: Date;
  workItemTypes?: string[];
  workItemLevels?: string[];
  customFields?: string[];
  normalization?: string[];
  workflowSteps?: string[];
  currentDataAggregation?: DataAggregations;
  dateAnalysisOption?: DateAnalysisOptions;
  perspective?: string;
  delayedItemsSelection?: string;
  contextId?: string;
  timezone?: string;
  lang?: string;
  assignedTo?: string[];
  resolution?: string[];
  flagged?: string[];
};

export type GeneralQueryParameters = {
  contextId?: string;
};

export type ApiQueryParameters = FilterPanelQueryParameters &
  GeneralQueryParameters;

export type RollingWindowDates = Pick<
  ApiQueryParameters,
  'departureDateLowerBoundary' | 'departureDateUpperBoundary'
>;

export type State = {
  selectedFilters: FilterPanelQueryParameters;
  defaultRollingWindowDates: RollingWindowDates;
};
