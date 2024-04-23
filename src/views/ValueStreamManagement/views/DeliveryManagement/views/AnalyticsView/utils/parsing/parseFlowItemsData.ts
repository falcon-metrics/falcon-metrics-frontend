import { chain, isObject } from 'lodash';
import {
  parseBooleanProperty,
  parseNumberOrUndefinedProperty,
  parseTextProperty
} from 'views/ValueStreamManagement/utils/parsing';
import { isObjectArray } from 'views/ValueStreamManagement/utils/validation';
import { FlowItemsEntry } from '../../interfaces/flowItems';

const parseKeyValuePair = (
  [key, value]: [string, any]
): [string, string | undefined] => {
  if (value === undefined) {
    return [key, undefined];
  }

  const formattedValue = value?.toString() ?? '';
  return [key, formattedValue];
};

const parseCustomFields = (flowItem: object): Record<string, string | undefined> => {
  const customFields = flowItem['customFields'];

  if (!customFields || !isObject(customFields)) {
    return {};
  }

  const parsedCustomFields: Record<string, string | undefined> =
    chain(customFields)
      .toPairs()
      .map(parseKeyValuePair)
      .fromPairs()
      .value();

  return parsedCustomFields;
};

const parseFlowItemsEntry = (
  flowItem: object,
): FlowItemsEntry => {
  const parsedItem: FlowItemsEntry = {
    workItemId: parseTextProperty(flowItem, 'workItemId'),
    title: parseTextProperty(flowItem, 'title'),
    assignedTo: parseTextProperty(flowItem, 'assignedTo'),
    flomatikaWorkItemTypeName: parseTextProperty(
      flowItem,
      'flomatikaWorkItemTypeName',
    ),
    state: parseTextProperty(flowItem, 'state'),
    arrivalDate: parseTextProperty(flowItem, 'arrivalDate'),
    commitmentDate: parseTextProperty(flowItem, 'commitmentDate'),
    departureDate: parseTextProperty(flowItem, 'departureDate'),
    serviceLevelExpectationInDays: parseNumberOrUndefinedProperty(
      flowItem,
      'serviceLevelExpectationInDays',
    ),
    itemAge: parseNumberOrUndefinedProperty(flowItem, 'itemAge'),
    ['age%OfSLE']: parseNumberOrUndefinedProperty(flowItem, 'age%OfSLE'),
    projectName: parseTextProperty(flowItem, 'projectName'),
    projectId: parseTextProperty(flowItem, 'projectId'),
    datasourceId: parseTextProperty(flowItem, 'datasourceId'),
    datasourceType: parseTextProperty(flowItem, 'datasourceType'),
    namespace: parseTextProperty(flowItem, 'namespace'),
    serviceUrl: parseTextProperty(flowItem, 'serviceUrl'),
    customFields: parseCustomFields(flowItem),
    activeTime: parseNumberOrUndefinedProperty(flowItem, 'activeTime'),
    flowEfficiency: parseNumberOrUndefinedProperty(flowItem, 'flowEfficiency'),
    waitingTime: parseNumberOrUndefinedProperty(flowItem, 'waitingTime'),
    flomatikaWorkItemTypeLevel: parseTextProperty(flowItem, 'flomatikaWorkItemTypeLevel'),
    isDelayed: parseBooleanProperty(flowItem, 'isDelayed'),
    isAboveSle: parseBooleanProperty(flowItem, 'isAboveSle'),
    isStale: parseBooleanProperty(flowItem, 'isStale'),
    flagged: parseBooleanProperty(flowItem, 'flagged'),
    desiredDeliveryDate: parseTextProperty(flowItem, 'desiredDeliveryDate'),
    startStatus: parseTextProperty(flowItem, 'startStatus'),
    optimalStartDateRange: parseTextProperty(flowItem, 'optimalStartDateRange'),
    expectedDeliveryDate: parseTextProperty(flowItem, 'expectedDeliveryDate'),
    suggestedClassOfService: parseTextProperty(flowItem, 'suggestedClassOfService')
  };

  return parsedItem;
};

export const parseFlowItemsData = (entries: unknown): FlowItemsEntry[] => {

  if (!entries || !isObjectArray(entries)) {
    return [];
  }

  const parsedFlowItems: FlowItemsEntry[] = entries.map(parseFlowItemsEntry);

  return parsedFlowItems;
};
