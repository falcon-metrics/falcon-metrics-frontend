import {
  parseTextProperty,
  parsePropertyToDate,
  parsePropertyToDateTime,
  parseBooleanProperty
} from 'views/ValueStreamManagement/utils/parsing';
import { isObject, isObjectArray } from '../../../../../utils/validation';
import {
  KanbanBoardData,
  KanbanBoardGroup,
  KanbanBoardItem
} from '../interfaces/kanbanBoard';

const parseKanbanBoardItem = (
  workItem: object
): KanbanBoardItem => {
  const parsedItem: KanbanBoardItem = {
    workItemId: parseTextProperty(workItem, 'workItemId'),
    title: parseTextProperty(workItem, 'title'),
    workItemType: parseTextProperty(workItem, 'workItemType'),
    state: parseTextProperty(workItem, 'state'),
    changedDate: parsePropertyToDate(workItem, 'changedDate'),
    arrivalDate: parsePropertyToDate(workItem, 'arrivalDate'),
    arrivalDateTime: parsePropertyToDateTime(workItem, 'arrivalDateTime'),
    commitmentDate: parsePropertyToDate(workItem, 'commitmentDate'),
    commitmentDateTime: parsePropertyToDateTime(
      workItem,
      'commitmentDateTime'
    ),
    departureDate: parsePropertyToDate(workItem, 'departureDate'),
    departureDateTime: parsePropertyToDateTime(
      workItem,
      'departureDateTime'
    ),
    isBlocked: parseBooleanProperty(workItem, 'isBlocked'),
    isStale: parseBooleanProperty(workItem, 'isStale'),
    isDelayed: parseBooleanProperty(workItem, 'isDelayed'),
    isAboveSle: parseBooleanProperty(workItem, 'isAboveSle'),
    isExpedited: parseBooleanProperty(workItem, 'isExpedited'),
    isUnassigned: parseBooleanProperty(workItem, 'isUnassigned'),
    flagged: parseBooleanProperty(workItem, 'flagged'),
  };

  return parsedItem;
}

const parseKanbanBoardItems = (workItems: unknown): KanbanBoardItem[] => {
  if (!workItems || !isObjectArray(workItems)) {
    return [];
  }

  const parsedEntries: KanbanBoardItem[] =
    workItems.map(parseKanbanBoardItem);

  return parsedEntries;
}

const parseKanbanBoardStateGroup = (
  entry: object
): KanbanBoardGroup => {
  const parsedStateGroup: KanbanBoardGroup = {
    groupName: parseTextProperty(entry, 'groupName'),
    workItems: parseKanbanBoardItems(entry['workItems']),
  }

  return parsedStateGroup;
}

export const parseKanbanBoardCategory = (
  stateGroups: unknown
): KanbanBoardGroup[] => {
  if (!stateGroups || !Array.isArray(stateGroups)) {
    return [];
  }

  const parsedStateGroups: KanbanBoardGroup[] = stateGroups.map(
    parseKanbanBoardStateGroup
  );

  return parsedStateGroups;
}

export const parseKanbanBoardData = (data: unknown): KanbanBoardData => {
  if (!data || !isObject(data)) {
    return {
      proposed: [],
      inProgress: [],
      completed: [],
    };
  }

  const parsedData: KanbanBoardData = {
    proposed: parseKanbanBoardCategory(data['proposed']),
    inProgress: parseKanbanBoardCategory(data['inProgress']),
    completed: parseKanbanBoardCategory(data['completed']),
  }
    
  return parsedData;
}
