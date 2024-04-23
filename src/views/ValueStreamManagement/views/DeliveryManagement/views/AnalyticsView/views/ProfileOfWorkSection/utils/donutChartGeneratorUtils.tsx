import { CustomFieldItem } from 'core/api/ApiClient/CustomFieldClient';

import { ProjectWorkItem } from '../../../interfaces/profileOfWork';
import { FieldCountGroup, FieldCount, FieldData } from '../interfaces/fieldCounts';
import { EMPTY_LABEL } from './constants';

export function generateTypeCountListFromRecord(
  data: Record<string, number>
):  FieldCount[] {
  const keys: string[] = Object.keys(data);

  const fieldCounts: FieldCount[] = keys.map(
    (key) => ({ type: key, count: data[key] }),
  );

  return fieldCounts;
}

export function calculateCustomFieldCountGroup(
  customFields: FieldData[],
  workItemList: ProjectWorkItem[]
) {
  const result: FieldCountGroup[] = [];
  for (const {workItemKey, displayName} of customFields) {
    const countDict: Record<string, number> = {};
    for (const workItem of workItemList) {
      const { customFields: workItemCustomFieldsData } = workItem || {};
      const customFieldValue = workItemCustomFieldsData
        ? workItemCustomFieldsData[workItemKey]
        : EMPTY_LABEL;

      const dictKey = customFieldValue || EMPTY_LABEL;
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
  workItemList: ProjectWorkItem[]
) {
  const fields: FieldData[] = customFields.map(
    ({ displayName }) =>
      ({
        workItemKey: displayName,
        displayName: displayName
      }),
  );
  return calculateCustomFieldCountGroup(fields, workItemList);
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
  const normalisationResult: FieldCountGroup[] = tags.map(
    (tag) => ({
      columnName: tag,
      data: generateTypeCountListFromRecord(normalisedWorkItemTagDisplaynameRecord[tag])
    })
  );

  return normalisationResult;
}
