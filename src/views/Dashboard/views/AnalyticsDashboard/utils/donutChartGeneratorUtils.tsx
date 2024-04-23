import {
  camelCase,
  startCase,
} from 'lodash';

import { CustomFieldItem } from 'core/api/ApiClient/CustomFieldClient';

import {
  WorkItemBasicPresentationInfo,
} from 'components/WorkItemList/WorkItemList';
import { ChartSizes } from 'components/Charts/components/DashboardCard/interfaces/ChartSizes';
import DefaultDashboardCard
  from 'components/Charts/components/DefaultDashboardCard';

import { FieldCountGroup, FieldCount, FieldData } from '../interfaces/fieldCounts';

import ThroughputWorkItemTypeAnalysis from '../views/Throughput/views/WorkItemTypeAnalysis/WorkItemTypeAnalysis';

const emptyLabel = 'Empty';

export function generateTypeCountListFromRecord(
  data: Record<string, number>
):  FieldCount[] {
  const keys: string[] = Object.keys(data);

  const fieldCounts: FieldCount[] = keys.map(
    (key) => ({ type: key, count: data[key] }),
  );

  return fieldCounts;
}

export function calculateFieldCountGroup(
  fields: FieldData[],
  workItemList: WorkItemBasicPresentationInfo[]
) {
  const result: FieldCountGroup[] = [];
  for (const {workItemKey, displayName} of fields) {
    const countDict: Record<string, number> = {};
    for (const workItem of workItemList) {
      const dictKey = workItem[workItemKey] || emptyLabel;
      countDict[dictKey] = (countDict[dictKey] || 0) + 1;
    }

    const data: FieldCount[] = generateTypeCountListFromRecord(countDict);

    result.push({
      columnName: displayName,
      data,
    });
  }
  return result;
}

export function calculateFieldCountGroupByCustomFields(
  customFields: CustomFieldItem[],
  workItemList: WorkItemBasicPresentationInfo[]
) {
  const fields: FieldData[] = customFields.map(
    ({ displayName }) =>
      ({
        workItemKey: displayName,
        displayName: displayName
      }),
  );

  return calculateFieldCountGroup(fields, workItemList);
}

export function generateFieldCountGroupFromNormalisationRecord(
  normalisedWorkItemTagDisplaynameRecord: Record<string, Record<string, number>>
) {
  if (!normalisedWorkItemTagDisplaynameRecord) {
    console.warn('Cannot generate field count from invalid parameter');
    return [];
  }

  const tags = Object.keys(normalisedWorkItemTagDisplaynameRecord);
  // Generate field count group from grouped record of tags and displayName
  const normalisationResult = tags.map(
    (tag) => ({
      columnName: tag,
      data: generateTypeCountListFromRecord(normalisedWorkItemTagDisplaynameRecord[tag])
    })
  );

  return normalisationResult as FieldCountGroup[];
}

// Sort so that custom fields with one empty group are last
export const orderFieldByEmptyAndColumnName = (left: FieldCountGroup, right: FieldCountGroup) => {
  if (left.data.length === 1 && left.data[0].type === emptyLabel) {
    return 1;
  }
  if (right.data.length === 1 && right.data[0].type === emptyLabel) {
    return -1;
  }
  if (left.columnName === right.columnName) {
    return 0;
  }
  return (left.columnName?.localeCompare(right.columnName)) ? 1 : -1;
};

const selectAscending = (left: FieldCount, right: FieldCount) => right.count - left.count;

const sortFieldsByAscending = (arr: FieldCount[]) => arr.sort(selectAscending);

export const selectTopCategories = (
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
    if (allFields.length === 1 && allFields[0].type === emptyLabel) {
      return [];
    }
  }

  return allFields;
};

const isNotCompletelyEmptyGroup = ({ data }: FieldCountGroup): boolean => {
  if (data.length > 1) { 
    return true;
  }

  return data.length !== 0 && data[0].type !== emptyLabel
}

const removeEmptyFields = (group: FieldCountGroup): FieldCountGroup => {
  const { columnName, data } = group;

  const nonEmptyData: FieldCount[] = data.filter(
    ({ type }) => type !== emptyLabel
  );

  const filteredGroup: FieldCountGroup = {
    columnName,
    data: nonEmptyData,
  }

  return filteredGroup;
}

export const gatherTopCategories = (
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

export const createChartFromEntries = (
  result: FieldCountGroup[],
  isLoading = false,
  sorted = true,
  removeEmptyCards = true,
  removeEmptyCategory = true,
) => {
  const sortedResults: FieldCountGroup[] = sorted
    ? result.sort(orderFieldByEmptyAndColumnName)
    : result;

  // Remove Completely Empty Cards
  const resultsEmptyCardFilter: FieldCountGroup[] = removeEmptyCards
    ? sortedResults.filter(isNotCompletelyEmptyGroup)
    : sortedResults

  // Remove Empty Category from Donut
  const resultsEmptyCategoryFilter: FieldCountGroup[] = removeEmptyCategory
    ? resultsEmptyCardFilter.map(removeEmptyFields)
    : resultsEmptyCardFilter;
  
  // Show Limited Number of Categories on Donut Chart
  const maxCategories = 10;
  const processedResults: FieldCountGroup[] = resultsEmptyCategoryFilter.map(
    (group) => gatherTopCategories(group, maxCategories, removeEmptyCards),
  )

  const dashboardCards: JSX.Element[] = processedResults.map(
    ({ columnName, data }: FieldCountGroup, idx) => {
      return (
        <DefaultDashboardCard
          key={`donut-chart-${idx}`}
          title={startCase(camelCase(columnName))}
          Component={ThroughputWorkItemTypeAnalysis}
          data={data}
          size={ChartSizes.medium}
          isLoading={isLoading}
        />
      )
    }
  );

  return dashboardCards;
};
