import { isUndefined } from 'lodash';
import { parseNumber, parseNumberOrNullProperty } from 'views/ValueStreamManagement/utils/parsing';
import { isObject } from 'views/ValueStreamManagement/utils/validation';
import { WidgetInformation } from '../../interfaces/common';
import {
  AvgWipAgeWidgetData,
  CommitmentRateWidgetData,
  DemandVsCapacityWidgetData,
  FlowOfDemandsData,
  FlowOfDemandsWidgetInformation,
  InflowVsOutflowWidgetData,
  InventorySizeWidgetData,
  ThroughputWidgetData,
  TimeToCommitWidgetData,
  WipCountWidgetData,
} from '../../interfaces/flowOfDemands';
import { parsePattern } from './common';
import { parseFlowItemsData } from 'views/ValueStreamManagement/views/DeliveryManagement/views/AnalyticsView/utils/parsing/parseFlowItemsData';

const parseDemandCapacity = (entry: object): DemandVsCapacityWidgetData | undefined => {
  try {
    const demand: unknown = entry['demand'];
    const capacity: unknown = entry['capacity'];
    const demandOverCapacityPercent: unknown = entry['demandOverCapacityPercent'];
    const inventoryGrowth: unknown = entry['inventoryGrowth'];
    const pattern: unknown = entry['pattern'];

    const requiredProperties = [
      demand,
      capacity,
      demandOverCapacityPercent,
      inventoryGrowth,
      pattern,
    ];

    if (requiredProperties.some(isUndefined)) {
      throw new Error(
        'Flow of Demands parsing failed. Missing DemandVsCapacityWidgetData properties.',
      );
    }

    const parsedDemandCapacity: DemandVsCapacityWidgetData = {
      demand: parseNumber(demand),
      capacity: parseNumber(capacity),
      demandOverCapacityPercent: parseNumber(demandOverCapacityPercent),
      inventoryGrowth: parseNumber(inventoryGrowth),
      pattern: parsePattern(pattern)
    };

    return parsedDemandCapacity;
  } catch (error) {
    return undefined;
  }
};

const parseInflowVsOutflow = (entry: object): InflowVsOutflowWidgetData | undefined => {
  try {
    const inflow: unknown = entry['inflow'];
    const outflow: unknown = entry['outflow'];
    const inflowOverOutflowPercent: unknown = entry['inflowOverOutflowPercent'];
    const wipGrowth: unknown = entry['wipGrowth'];
    const pattern: unknown = entry['pattern'];

    const requiredProperties = [
      inflow,
      outflow,
      inflowOverOutflowPercent,
      wipGrowth,
      pattern,
    ];

    if (requiredProperties.some(isUndefined)) {
      throw new Error(
        'Flow of Demands parsing failed. Missing DemandVsCapacityWidgetData properties.',
      );
    }

    const parsedInflowVsOutflow: InflowVsOutflowWidgetData = {
      inflow: parseNumber(inflow),
      outflow: parseNumber(outflow),
      inflowOverOutflowPercent: parseNumber(inflowOverOutflowPercent),
      wipGrowth: parseNumber(wipGrowth),
      pattern: parsePattern(pattern)
    };

    return parsedInflowVsOutflow;
  } catch (error) {
    return undefined;
  }
};

const parseInventorySize = (entry: object): InventorySizeWidgetData | undefined => {
  try {
    const inventoryCount: unknown = entry['inventoryCount'];
    const weeksWorthCount: unknown = entry['weeksWorthCount'];
    const items: unknown = entry['items'];

    const requiredProperties = [
      inventoryCount,
      weeksWorthCount
    ];

    if (requiredProperties.some(isUndefined)) {
      throw new Error(
        'Flow of Demands parsing failed. Missing InventorySizeWidgetData properties.',
      );
    }

    const inventorySize: InventorySizeWidgetData = {
      inventoryCount: parseNumber(inventoryCount),
      weeksWorthCount: parseNumber(weeksWorthCount),
      items: parseFlowItemsData(items),
    };

    return inventorySize;
  } catch (error) {
    return undefined;
  }
};

const parseCommitmentRate = (entry: object): CommitmentRateWidgetData | undefined => {
  try {
    const commitmentRatePercent: unknown = entry['commitmentRatePercent'];
    const pattern: unknown = entry['pattern'];

    const requiredProperties = [
      commitmentRatePercent,
      pattern,
    ];

    if (requiredProperties.some(isUndefined)) {
      throw new Error(
        'Flow of Demands parsing failed. Missing CommitmentRateWidgetData properties.',
      );
    }

    const commitmentRate: CommitmentRateWidgetData = {
      commitmentRatePercent: parseNumberOrNullProperty(entry, 'commitmentRatePercent'),
      pattern: parsePattern(pattern)
    };

    return commitmentRate;
  } catch (error) {
    return undefined;
  }
};

const parseTimeToCommit = (entry: object): TimeToCommitWidgetData | undefined => {
  try {
    const timeToCommit: unknown = entry['timeToCommit'];
    const pattern: unknown = entry['pattern'];

    const requiredProperties = [
      timeToCommit,
      pattern,
    ];

    if (requiredProperties.some(isUndefined)) {
      throw new Error(
        'Flow of Demands parsing failed. Missing TimeToCommitWidgetData properties.',
      );
    }

    const timeToCommitData: TimeToCommitWidgetData = {
      timeToCommit: parseNumberOrNullProperty(entry, 'timeToCommit'),
      pattern: parsePattern(pattern)
    };

    return timeToCommitData;
  } catch (error) {
    return undefined;
  }
};

const parseWipCount = (entry: object): WipCountWidgetData | undefined => {
  try {
    const count: unknown = entry['count'];
    const assigneesCount: unknown = entry['assigneesCount'];
    const unassignedItems: unknown = entry['unassignedItems'];
    const avgWipCount: unknown = entry['avgWipCount'];
    const items: unknown = entry['items'];

    const requiredProperties = [
      count,
      assigneesCount,
      unassignedItems,
      avgWipCount,
    ];

    if (requiredProperties.some(isUndefined)) {
      throw new Error(
        'Flow of Demands parsing failed. Missing WipCountWidgetData properties.',
      );
    }

    const wipCount: WipCountWidgetData = {
      count: parseNumberOrNullProperty(entry, 'count'),
      assigneesCount: parseNumberOrNullProperty(entry, 'assigneesCount'),
      unassignedItems: parseNumberOrNullProperty(entry, 'unassignedItems'),
      avgWipCount: parseNumberOrNullProperty(entry, 'avgWipCount'),
      items: parseFlowItemsData(items),
    };

    return wipCount;
  } catch (error) {
    return undefined;
  }
};

const parseAvgWipAge = (entry: object): AvgWipAgeWidgetData | undefined => {
  try {
    const averageAge: unknown = entry['averageAge'];
    const pattern: unknown = entry['pattern'];

    const requiredProperties = [
      averageAge,
      pattern,
    ];

    if (requiredProperties.some(isUndefined)) {
      throw new Error(
        'Flow of Demands parsing failed. Missing AvgWipAgeWidgetData properties.',
      );
    }

    const avgWipAge: AvgWipAgeWidgetData = {
      averageAge: parseNumberOrNullProperty(entry, 'averageAge'),
      pattern: parsePattern(pattern)
    };

    return avgWipAge;
  } catch (error) {
    return undefined;
  }
};

const parseThroughput = (entry: object): ThroughputWidgetData | undefined => {
  try {
    const count: unknown = entry['count'];
    const avgThroughput: unknown = entry['avgThroughput'];
    const items: unknown = entry['items'];

    const requiredProperties = [
      count,
      avgThroughput,
    ];

    if (requiredProperties.some(isUndefined)) {
      throw new Error(
        'Flow of Demands parsing failed. Missing ThroughputWidgetData properties.',
      );
    }

    const throughput: ThroughputWidgetData = {
      count: parseNumberOrNullProperty(entry, 'count'),
      avgThroughput: parseNumberOrNullProperty(entry, 'avgThroughput'),
      items: parseFlowItemsData(items),
    };

    return throughput;
  } catch (error) {
    return undefined;
  }
};

const parseWidgetInformation = (entry: WidgetInformation): FlowOfDemandsWidgetInformation | undefined => {
  try {
    const demandVsCapacity: WidgetInformation[] = entry['demandVsCapacity'];
    const inFlowVsOutFlow: WidgetInformation[] = entry['inFlowVsOutFlow'];
    const inventorySize: WidgetInformation[] = entry['inventorySize'];
    const commitmentRate: WidgetInformation[] = entry['commitmentRate'];
    const timeToCommit: WidgetInformation[] = entry['timeToCommit'];
    const wipCount: WidgetInformation[] = entry['wipCount'];
    const avgWipAge: WidgetInformation[] = entry['avgWipAge'];
    const throughput: WidgetInformation[] = entry['throughput'];

    const widgetInfo: FlowOfDemandsWidgetInformation = {
      demandVsCapacity,
      inFlowVsOutFlow,
      inventorySize,
      commitmentRate,
      timeToCommit,
      wipCount,
      avgWipAge,
      throughput
    };

    return widgetInfo;
  } catch (error) {
    return undefined;
  }
};

export const parseFlowOfDemandsData = (data: unknown): FlowOfDemandsData | null => {
  if (!isObject(data)) {
    return null;
  }

  const demandCapacity: unknown = data['demandVsCapacity'];
  const parsedDemandCapacity = isObject(demandCapacity)
    ? parseDemandCapacity(demandCapacity)
    : undefined;

  const inflowVsOutflow: unknown = data['inflowVsOutflow'];
  const parsedInflowVsOutflow = isObject(inflowVsOutflow)
    ? parseInflowVsOutflow(inflowVsOutflow)
    : undefined;

  const inventorySize: unknown = data['inventorySize'];
  const parsedInventorySize = isObject(inventorySize)
    ? parseInventorySize(inventorySize)
    : undefined;

  const commitmentRate: unknown = data['commitmentRate'];
  const parsedCommitmentRate = isObject(commitmentRate)
    ? parseCommitmentRate(commitmentRate)
    : undefined;

  const timeToCommit: unknown = data['timeToCommit'];
  const parsedTimeToCommit = isObject(timeToCommit)
    ? parseTimeToCommit(timeToCommit)
    : undefined;

  const wipCount: unknown = data['wipCount'];
  const parsedWipCount = isObject(wipCount)
    ? parseWipCount(wipCount)
    : undefined;

  const avgWipAge: unknown = data['avgWipAge'];
  const parsedAvgWipAge = isObject(avgWipAge)
    ? parseAvgWipAge(avgWipAge)
    : undefined;

  const throughput: unknown = data['throughput'];
  const parsedThroughput = isObject(throughput)
    ? parseThroughput(throughput)
    : undefined;

  const widgetInformation: WidgetInformation = data['widgetInformation'];
  const parsedWidgetInformation = isObject(widgetInformation)
    ? parseWidgetInformation(widgetInformation)
    : undefined;


  const parsedData: FlowOfDemandsData = {
    demandVsCapacity: parsedDemandCapacity,
    inflowVsOutflow: parsedInflowVsOutflow,
    inventorySize: parsedInventorySize,
    commitmentRate: parsedCommitmentRate,
    timeToCommit: parsedTimeToCommit,
    wipCount: parsedWipCount,
    avgWipAge: parsedAvgWipAge,
    throughput: parsedThroughput,
    widgetInformation: parsedWidgetInformation
  };

  return parsedData;
};
