import { FieldCount, FieldCountGroup } from 'views/Dashboard/views/AnalyticsDashboard/interfaces/fieldCounts';
import { EMPTY_LABEL, MAX_DONUT_CHART_CATEGORIES } from './constants';

export interface DonutGeneratorOptions { 
  sortByNonEmpty?: boolean;
  removeEmptyCards?: boolean;
  removeEmptyCategory?: boolean;
  matchNormalizationColor?: boolean;
}

// Sort so that custom fields with one empty group are last
const orderFieldByEmptyAndColumnName = (left: FieldCountGroup, right: FieldCountGroup) => {
  if (left.data.length === 1 && left.data[0].type === EMPTY_LABEL) {
    return 1;
  }
  if (right.data.length === 1 && right.data[0].type === EMPTY_LABEL) {
    return -1;
  }
  if (left.columnName === right.columnName) {
    return 0;
  }
  return (left.columnName?.localeCompare(right.columnName)) ? 1 : -1;
};

const isNotCompletelyEmptyGroup = ({ data }: FieldCountGroup): boolean => {
  if (data.length > 1) { 
    return true;
  }

  if (data.length === 0) {
    return false;
  }

  // In case of one element, consider empty if it is the "Empty" label
  return data[0].type !== EMPTY_LABEL;
}

const removeEmptyFields = (group: FieldCountGroup): FieldCountGroup => {
  const { columnName, data } = group;

  const nonEmptyData: FieldCount[] = data.filter(
    ({ type }) => type !== EMPTY_LABEL
  );

  const filteredGroup: FieldCountGroup = {
    columnName,
    data: nonEmptyData,
  }

  return filteredGroup;
}

const selectAscending = (left: FieldCount, right: FieldCount) => right.count - left.count;
const sortFieldsByAscending = (arr: FieldCount[]) => arr.sort(selectAscending);

const selectTopCategories = (
  fields: FieldCount[],
  maxCategories: number,
  removeEmptyCards = true,
): FieldCount[] => {
  const sortedData: FieldCount[] = sortFieldsByAscending(fields)

  const topItems: FieldCount[] = sortedData.slice(0, maxCategories - 1);
  const remainingItems: FieldCount[] = sortedData.slice(maxCategories - 1);

  const sumCounts = (sum: number, currentField: FieldCount) =>
    sum + currentField.count;
  const otherItemsSum: number = remainingItems.reduce(sumCounts, 0);
  const otherField: FieldCount = {
    type: 'Other',
    count: otherItemsSum,
  };

  const allFields: FieldCount[] = otherItemsSum > 0
    ? [...topItems, otherField]
    : topItems;

  if (removeEmptyCards) {
    if (allFields.length === 1 && allFields[0].type === EMPTY_LABEL) {
      return [];
    }
  }

  return allFields;
};

const gatherTopCategories = (
  group: FieldCountGroup,
  maxCategories: number,
  removeEmptyCards: boolean
): FieldCountGroup => {
  const { columnName, data } = group;

  const processedData: FieldCount[] = selectTopCategories(
    data,
    maxCategories,
    removeEmptyCards,
  );

  const processedGroup: FieldCountGroup = {
    columnName,
    data: processedData,
  }

  return processedGroup;
}

/**
 * Adjusts and filters data in work item groups according to selected options.
 * @param fieldGroups Work item groups with count per category.
 * @param options Work item group filtering options.
 */
export const processFieldGroups = (
  fieldGroups: FieldCountGroup[],
  options?: DonutGeneratorOptions
): FieldCountGroup[] => {
  const {
    sortByNonEmpty = true,
    removeEmptyCards = true,
    removeEmptyCategory = true,
  } = options || {};

  // Sort Categories in Groups by Column Name
  const resultsSorting: FieldCountGroup[] = sortByNonEmpty
    ? fieldGroups.sort(orderFieldByEmptyAndColumnName)
    : fieldGroups;

  // Remove Completely Empty Groups
  const resultsEmptyCardFilter: FieldCountGroup[] = removeEmptyCards
    ? resultsSorting.filter(isNotCompletelyEmptyGroup)
    : resultsSorting

  // Remove "Empty" Category from Groups
  const resultsEmptyCategoryFilter: FieldCountGroup[] = removeEmptyCategory
    ? resultsEmptyCardFilter.map(removeEmptyFields)
    : resultsEmptyCardFilter;
  
  // Determine Top Categories and Gather Smaller Categories into One
  const processedResults: FieldCountGroup[] = resultsEmptyCategoryFilter.map(
    (group) => gatherTopCategories(
      group,
      MAX_DONUT_CHART_CATEGORIES,
      removeEmptyCards,
    ),
  )

  return processedResults;
}
