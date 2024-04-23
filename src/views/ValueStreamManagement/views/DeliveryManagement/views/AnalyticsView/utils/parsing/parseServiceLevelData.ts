import {
  parseTrendAnalysisStructure
} from 'views/ValueStreamManagement/utils/parseValueStreamManagement';
import {
  parseNumber,
  parseNumberOrNullProperty,
  parseNumberProperty,
  parseTextProperty
} from 'views/ValueStreamManagement/utils/parsing';
import { isObject } from 'views/ValueStreamManagement/utils/validation';
import {
  ServiceLevelData,
  ServiceLevelEntry,
} from '../../interfaces/serviceLevel';

const parseMode = (entry: object): number[] | null => {
  const modeEntry = entry['mode'];

  if (!modeEntry) {
    return null;
  }

  const parsedMode: number[] | null = Array.isArray(modeEntry)
    ? modeEntry.map(parseNumber)
    : null;

  return parsedMode;
};

const parseServiceLevelEntry = (entry: unknown): ServiceLevelEntry => {

  const emptyEntry = {
    displayName: '',
    count: 0,
    serviceLevelExpectationInDays: 0,
    targetMet: 0,
    trendAnalysisSLE: {
      percentage: 0,
      text: '',
      arrowDirection: '',
      arrowColour: '',
    },
    predictability: '',
    mode: null,
    median: null,
    average: null,
    min: null,
    max: null,
    percentile85: null,
    tail: null,
    projectId: ''
  };

  if (!isObject(entry)) {
    return emptyEntry;
  }

  const parsedEntry: ServiceLevelEntry = {
    displayName: parseTextProperty(entry, 'displayName'),
    count: parseNumberProperty(entry, 'count'),
    serviceLevelExpectationInDays: parseNumberProperty(
      entry,
      'serviceLevelExpectationInDays'
    ),
    targetMet: parseNumberProperty(entry, 'targetMet'),
    trendAnalysisSLE: parseTrendAnalysisStructure(entry, 'trendAnalysisSLE'),
    predictability: parseTextProperty(entry, 'predictability'),
    mode: parseMode(entry),
    median: parseNumberOrNullProperty(entry, 'median'),
    average: parseNumberOrNullProperty(entry, 'average'),
    min: parseNumberOrNullProperty(entry, 'min'),
    max: parseNumberOrNullProperty(entry, 'max'),
    percentile85: parseNumberOrNullProperty(entry, 'percentile85'),
    tail: parseNumberOrNullProperty(entry, 'tail'),
    projectId: parseTextProperty(entry, 'projectId')
  };

  return parsedEntry;
};

const parseServiceLevelEntries = (entries: unknown): ServiceLevelEntry[] => {
  const emptyArray: ServiceLevelEntry[] = [];
  if (!Array.isArray(entries)) {
    return emptyArray;
  }

  const parsedEntries: ServiceLevelEntry[] = entries.map(
    (entry) => parseServiceLevelEntry(entry)
  );

  return parsedEntries;
};

export const parseServiceLevelData = (serviceLevelData: unknown): ServiceLevelData => {
  if (!isObject(serviceLevelData)) {
    return {
      normalisedDemands: [],
      workItemTypes: [],
    };
  }

  const normalisedDemands: unknown = serviceLevelData['normalisedDemands'];
  const parsedNormalisedDemands: ServiceLevelEntry[] = normalisedDemands
    ? parseServiceLevelEntries(normalisedDemands)
    : [];

  const workItemTypes: unknown = serviceLevelData['workItemTypes'];
  const parsedWorkItemTypes: ServiceLevelEntry[] = workItemTypes
    ? parseServiceLevelEntries(workItemTypes)
    : [];

  const parsedServiceLevelData: ServiceLevelData = {
    normalisedDemands: parsedNormalisedDemands,
    workItemTypes: parsedWorkItemTypes
  };

  return parsedServiceLevelData;
};
