import { isUndefined } from 'lodash';
import {
  parseNumber,
  parseNumberOrNullProperty,
  parseString
} from 'views/ValueStreamManagement/utils/parsing';
import { isObject } from 'views/ValueStreamManagement/utils/validation';
import { WorkItemGroupCount } from 'views/ValueStreamManagement/views/DeliveryManagement/views/AnalyticsView/interfaces/profileOfWork';
import { parseFlowItemsData } from 'views/ValueStreamManagement/views/DeliveryManagement/views/AnalyticsView/utils/parsing/parseFlowItemsData';
import { WidgetInformation } from '../../interfaces/common';
import {
  BlockersWidgetData,
  DelayedItemsWidgetData,
  DiscardedAfterStartWidgetData,
  DiscardedBeforeStartWidgetData,
  FlowDebtWidgetData,
  KeySourcesOfDelayWidgetData,
  SourceOfDelayEntry,
  SourcesOfDelayAndWasteData,
  SourcesOfDelayWidgetInformation,
  StaleWorkWidgetData,
  TargetWipWidgetData,
} from '../../interfaces/sourceOfDelay';
import { parsePattern } from './common';

const parseTargetWip = (entry: object): TargetWipWidgetData | undefined => {
  try {
    const wipExcessValue: unknown = entry['wipExcessValue'];
    const wipExcessTitle: unknown = entry['wipExcessTitle'];
    const currentWip: unknown = entry['currentWip'];
    const targetWip: unknown = entry['targetWip'];
    const pattern: unknown = entry['pattern'];

    const requiredProperties = [
      wipExcessValue,
      wipExcessTitle,
      currentWip,
      targetWip,
      pattern,
    ];

    if (requiredProperties.some(isUndefined)) {
      throw new Error(
        'Sources of Delay parsing failed. Missing TargetWipWidgetData properties.',
      );
    }

    const targetWipData: TargetWipWidgetData = {
      wipExcessValue: parseNumberOrNullProperty(entry, 'wipExcessValue'),
      wipExcessTitle: parseString(wipExcessTitle),
      currentWip: parseNumber(currentWip),
      targetWip: parseNumber(targetWip),
      pattern: parsePattern(pattern)
    };

    return targetWipData;
  } catch (error) {
    return undefined;
  }
};

const parseStaleWork = (entry: object): StaleWorkWidgetData | undefined => {
  try {
    const stalePercent: unknown = entry['stalePercent'];
    const staleCount: unknown = entry['staleCount'];
    const pattern: unknown = entry['pattern'];
    const items: unknown = entry['items'];

    const requiredProperties = [
      stalePercent,
      staleCount,
      pattern,
    ];

    if (requiredProperties.some(isUndefined)) {
      throw new Error(
        'Sources of Delay parsing failed. Missing StaleWorkWidgetData properties.',
      );
    }

    const staleWorkData: StaleWorkWidgetData = {
      stalePercent: parseNumber(stalePercent),
      staleCount: parseNumber(staleCount),
      pattern: parsePattern(pattern),
      items: parseFlowItemsData(items)
    };

    return staleWorkData;
  } catch (error) {
    return undefined;
  }
};

const parseBlockers = (entry: object): BlockersWidgetData | undefined => {
  try {
    const count: unknown = entry['count'];
    const pattern: unknown = entry['pattern'];
    const distribution: unknown = entry['distribution'];
    const items: unknown = entry['items'];

    const requiredProperties = [
      count,
      pattern,
    ];

    if (requiredProperties.some(isUndefined)) {
      throw new Error(
        'Sources of Delay parsing failed. Missing BlockersWidgetData properties.',
      );
    }

    const blockers: BlockersWidgetData = {
      count: parseNumber(count),
      pattern: parsePattern(pattern),
      items: parseFlowItemsData(items),
      distribution: distribution ? distribution as WorkItemGroupCount[] : null
    };

    return blockers;
  } catch (error) {
    return undefined;
  }
};

const parseDiscardedBeforeStart = (entry: object): DiscardedBeforeStartWidgetData | undefined => {
  try {
    const discarded: unknown = entry['discardedCount'];
    const distribution: unknown = entry['distribution'];
    const items: unknown = entry['items'];

    if (discarded === undefined) {
      throw new Error(
        'Sources of Delay parsing failed. Missing DiscardedBeforeStartWidgetData properties.',
      );
    }

    const discardedBeforeStart: DiscardedBeforeStartWidgetData = {
      discardedCount: parseNumber(discarded),
      items: parseFlowItemsData(items),
      distribution: distribution ? distribution as WorkItemGroupCount[] : null
    };

    return discardedBeforeStart;
  } catch (error) {
    return undefined;
  }
};

const parseDiscardedAfterStart = (entry: object): DiscardedAfterStartWidgetData | undefined => {
  try {
    const discardedCount: unknown = entry['discardedCount'];
    const activeDaysSpent: unknown = entry['activeDaysSpent'];
    const distribution: unknown = entry['distribution'];
    const items: unknown = entry['items'];

    const requiredProperties = [
      discardedCount,
      activeDaysSpent,
    ];

    if (requiredProperties.some(isUndefined)) {
      throw new Error(
        'Sources of Delay parsing failed. Missing DiscardedAfterStartWidgetData properties.',
      );
    }

    const discardedAfterStart: DiscardedAfterStartWidgetData = {
      discardedCount: parseNumber(discardedCount),
      activeDaysSpent: parseNumber(activeDaysSpent),
      items: parseFlowItemsData(items),
      distribution: distribution ? distribution as WorkItemGroupCount[] : null
    };

    return discardedAfterStart;
  } catch (error) {
    return undefined;
  }
};

const parseFlowDebt = (entry: object): FlowDebtWidgetData | undefined => {
  try {
    const value: unknown = entry['value'];
    const leadtimePercentile85th: unknown = entry['leadtimePercentile85th'];
    const wipAgePercentile85th: unknown = entry['wipAgePercentile85th'];
    const pattern: unknown = entry['pattern'];

    const requiredProperties = [
      value,
      leadtimePercentile85th,
      wipAgePercentile85th,
      pattern,
    ];

    if (requiredProperties.some(isUndefined)) {
      throw new Error(
        'Sources of Delay parsing failed. Missing FlowDebtWidgetData properties.',
      );
    }

    const flowDebt: FlowDebtWidgetData = {
      value: parseNumber(value),
      leadtimePercentile85th: parseNumber(leadtimePercentile85th),
      wipAgePercentile85th: parseNumber(wipAgePercentile85th),
      pattern: parsePattern(pattern)
    };

    return flowDebt;
  } catch (error) {
    return undefined;
  }
};

const parseDelayedItems = (entry: object): DelayedItemsWidgetData | undefined => {
  try {
    const count: unknown = entry['count'];
    const items: unknown = entry['items'];

    if (count === undefined) {
      throw new Error(
        'Sources of Delay parsing failed. Missing DelayedItemsWidgetData properties.',
      );
    }

    const delayedItems: DelayedItemsWidgetData = {
      count: parseNumber(count),
      items: parseFlowItemsData(items)
    };

    return delayedItems;
  } catch (error) {
    return undefined;
  }
};

// May throw errors when given invalid data. Handle appropriately.
const parseSourceOfDelayEntry = (entry: object): SourceOfDelayEntry => {
  const state: unknown = entry['state'];
  const count: unknown = entry['count'];
  const countOfDelays: unknown = entry['countOfDelays'];
  const averageOfDays: unknown = entry['averageOfDays'];
  const percentage: unknown = entry['percentage'];

  const requiredProperties = [
    state,
    count,
    countOfDelays,
    averageOfDays,
    percentage,
  ];

  if (requiredProperties.some(isUndefined)) {
    throw new Error(
      'Sources of Delay parsing failed. Missing SourceOfDelayEntry properties.',
    );
  }

  const parsedEntry: SourceOfDelayEntry = {
    state: parseString(state),
    count: parseNumber(count),
    countOfDelays: parseNumber(countOfDelays),
    averageOfDays: parseNumber(averageOfDays),
    percentage: parseNumber(percentage)
  };

  return parsedEntry;
};

const parseKeySourcesOfDelay = (entry: object): KeySourcesOfDelayWidgetData | undefined => {
  try {
    const keySourcesOfDelay: SourceOfDelayEntry[] = entry['keySourcesOfDelay'];
    const parsedEntries: SourceOfDelayEntry[] = keySourcesOfDelay?.map(
      parseSourceOfDelayEntry
    );

    const keySourcesOfDelayData: KeySourcesOfDelayWidgetData = {
      keySourcesOfDelayData: parsedEntries
    };

    return keySourcesOfDelayData;
  } catch (error) {
    return undefined;
  }
};

const parseWidgetInformation = (entry: WidgetInformation): SourcesOfDelayWidgetInformation | undefined => {
  try {
    const wipExcess: WidgetInformation[] = entry['wipExcess'];
    const staleWork: WidgetInformation[] = entry['staleWork'];
    const blockers: WidgetInformation[] = entry['blockers'];
    const discardedBeforeStart: WidgetInformation[] = entry['discardedBeforeStart'];
    const discardedAfterStart: WidgetInformation[] = entry['discardedAfterStart'];
    const flowDebt: WidgetInformation[] = entry['flowDebt'];
    const delayedItems: WidgetInformation[] = entry['delayedItems'];
    const keySourcesOfDelay: WidgetInformation[] = entry['keySourcesOfDelay'];

    const widgetInfo: SourcesOfDelayWidgetInformation = {
      wipExcess,
      staleWork,
      blockers,
      discardedBeforeStart,
      discardedAfterStart,
      flowDebt,
      delayedItems,
      keySourcesOfDelay
    };

    return widgetInfo;
  } catch (error) {
    return undefined;
  }
};

export const parseSourcesOfDelayData = (data: unknown): SourcesOfDelayAndWasteData | null => {
  if (!isObject(data)) {
    return null;
  }

  const targetWip: unknown = data['targetWip'];
  const parsedTargetWip = isObject(targetWip)
    ? parseTargetWip(targetWip)
    : undefined;

  const staleWork: unknown = data['staleWork'];
  const parsedStaleWork = isObject(staleWork)
    ? parseStaleWork(staleWork)
    : undefined;

  const blockers: unknown = data['blockers'];
  const parsedBlockers = isObject(blockers)
    ? parseBlockers(blockers)
    : undefined;

  const discardedBeforeStart: unknown = data['discardedBeforeStart'];
  const parsedDiscardedBeforeStart = isObject(discardedBeforeStart)
    ? parseDiscardedBeforeStart(discardedBeforeStart)
    : undefined;

  const discardedAfterStart: unknown = data['discardedAfterStart'];
  const parsedDiscardedAfterStart = isObject(discardedAfterStart)
    ? parseDiscardedAfterStart(discardedAfterStart)
    : undefined;

  const flowDebt: unknown = data['flowDebt'];
  const parsedFlowDebt = isObject(flowDebt)
    ? parseFlowDebt(flowDebt)
    : undefined;

  const delayedItems: unknown = data['delayedItems'];
  const parsedDelayedItems = isObject(delayedItems)
    ? parseDelayedItems(delayedItems)
    : undefined;

  const keySourcesOfDelay: unknown = data['keySourcesOfDelay'];
  const parsedKeySourcesOfDelay = isObject(keySourcesOfDelay)
    ? parseKeySourcesOfDelay(keySourcesOfDelay)
    : undefined;

  const widgetInformation: WidgetInformation = data['widgetInformation'];
  const parsedWidgetInformation = isObject(widgetInformation)
    ? parseWidgetInformation(widgetInformation)
    : undefined;

  const parsedData: SourcesOfDelayAndWasteData = {
    targetWip: parsedTargetWip,
    staleWork: parsedStaleWork,
    blockers: parsedBlockers,
    discardedBeforeStart: parsedDiscardedBeforeStart,
    discardedAfterStart: parsedDiscardedAfterStart,
    flowDebt: parsedFlowDebt,
    delayedItems: parsedDelayedItems,
    keySourcesOfDelay: parsedKeySourcesOfDelay,
    widgetInformation: parsedWidgetInformation
  };

  return parsedData;
};
