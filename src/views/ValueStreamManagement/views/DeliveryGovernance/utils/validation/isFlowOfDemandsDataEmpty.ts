import { isNil, isUndefined, values } from 'lodash';
import {
  AvgWipAgeWidgetData,
  CommitmentRateWidgetData,
  DemandVsCapacityWidgetData,
  FlowOfDemandsData,
  InflowVsOutflowWidgetData,
  InventorySizeWidgetData,
  ThroughputWidgetData,
  TimeToCommitWidgetData,
  WipCountWidgetData,
} from '../../interfaces/flowOfDemands';

export const isDemandVsCapacityEmpty = (data: DemandVsCapacityWidgetData | undefined) => {
  return !data;
}

export const isInflowVsOutflowEmpty = (data: InflowVsOutflowWidgetData | undefined) => {
  return !data;
}

export const isInventorySizeEmpty = (data: InventorySizeWidgetData | undefined) => {
  return !data;
}

export const isThroughputEmpty = (data: ThroughputWidgetData | undefined) => {
  if (!data || isNil(data.count)) { 
    return true;
  }

  return false;
}

export const isAvgWipAgeEmpty = (data: AvgWipAgeWidgetData | undefined) => {
  if (!data || isNil(data.averageAge)) { 
    return true;
  }

  return false;
}

export const isWipCountEmpty = (data: WipCountWidgetData | undefined) => {
  if (!data || isNil(data.count)) { 
    return true;
  }

  return false;
}

export const isTimeToCommitEmpty = (data: TimeToCommitWidgetData | undefined) => {
  if (!data || isNil(data.timeToCommit)) { 
    return true;
  }

  return false;
}

export const isCommitmentRateEmpty = (data: CommitmentRateWidgetData | undefined) => {
  if (!data || isNil(data.commitmentRatePercent)) { 
    return true;
  }

  return false;
}

export const isFlowOfDemandsDataEmpty = (data: FlowOfDemandsData | null): boolean => {
  if (!data || values(data).every(isUndefined)) {
    return true;
  }

  const {
    demandVsCapacity,
    inflowVsOutflow,
    inventorySize,
    commitmentRate,
    timeToCommit,
    wipCount,
    avgWipAge,
    throughput,
  } = data;

  const emptyFlags: boolean[] = [
    isDemandVsCapacityEmpty(demandVsCapacity),
    isInflowVsOutflowEmpty(inflowVsOutflow),
    isInventorySizeEmpty(inventorySize),
    isCommitmentRateEmpty(commitmentRate),
    isTimeToCommitEmpty(timeToCommit),
    isWipCountEmpty(wipCount),
    isAvgWipAgeEmpty(avgWipAge),
    isThroughputEmpty(throughput),
  ];

  const isEmpty: boolean = values(emptyFlags).every(
    (flag: boolean) => flag === true
  );

  return isEmpty;
}
