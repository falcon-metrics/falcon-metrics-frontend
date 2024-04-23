import { AxiosResponse } from "axios";
import fetch, { useCustomSWR } from "core/api/fetch";
import { StringUnitLength } from "luxon";
import { KeyedMutator } from "swr";
import { sortByString } from "utils/string";
import { OKRObjective } from "views/Governance/views/GovernanceObeya/utils";
import { AssociateWorkItemDependency } from "views/Governance/views/GovernanceObeya/views/GovernanceObeyaHome/views/Dependencies/types";
import { RiskItem } from "views/Governance/views/GovernanceObeya/views/GovernanceObeyaHome/views/Risk/types";
import { BoardItem } from "../interfaces";
import {
  Assumptions,
  PredictiveAnalysisResponse,
  SettingsData,
} from "../views/GovernanceObeyaHome/views/PredictiveAnalysis/types";
import { getFilterUrlSearchParams } from "views/Dashboard/views/Platform/views/FilterPanel/contexts/FilterPanelContext/utils";
import { FocusData } from "../views/GovernanceObeyaHome/views/Focus/interfaces";
import { ObeyaRoom } from "core/api/ApiClient/ObeyaGoalsClient";
import { deflate, getTimezone } from "utils/utils";

export type ScopeItem = {
  demandType: string;
  count: number;
  proposed: number;
  inProgress: number;
  completed: number;
};

export type DependencyItem = {
  dependencyId?: string;
  roomId?: string;
  orgId?: string;
  blockedContextAddress?: string;
  blockedName: string;
  blockerContextAddress?: string;
  blockerName: string;
  severity: string;
  name: string;
  summary: string;
  dateOfImpact: string;
  status: string;
  enabledAssociatedItems?: boolean;
  associateWorkItemDependencies?: AssociateWorkItemDependency[];
};

export type HighlightsResponse = Array<ScopeItem>;

export type ObeyaBurndownSeries = {
  dates: string[];
  remainingWork: (number | null)[];
  dailyTargets: number[];
};

export type ObeyaBurnupSeries = {
  dates: string[];
  accomplishedWork: (number | null)[];
  dailyTargets: number[];
  scope: number[];
};

export type ObeyaScopeBurnData = {
  burndown: ObeyaBurndownSeries;
  burnup: ObeyaBurnupSeries;
};

const fetchObeyaData = (url: StringUnitLength) => {
  return fetch.get(`${url}`);
};

export type ObeyaDummyContext = {
  contextId: string;
  positionInHierarchy: string;
};

export type RoadmapResult = {
  roadmap: BoardItem[];
};


export type PopulateResult = {
  contexts: ObeyaDummyContext[];
  syncChanges: string;
  lowerBoundaryDate: string;
  upperBoundaryDate: string;
  obeyaStart?: string;
  obeyaEnd?: string;
};

export type ObeyaResponse = {
  achieved?: boolean;
  objectives: OKRObjective[];
  highlights: HighlightsResponse;
  individualContributors: any[];
  progressBoards: BoardItem[];
  scopeBoards: BoardItem[];
  roadmapResult: RoadmapResult;
  dependencies: DependencyItem[];
  risks: RiskItem[];
  burnData: ObeyaScopeBurnData;
  predictiveAnalysis: PredictiveAnalysisResponse;
  forecastingSettings: SettingsData;
  flowMetrics: PopulateResult;
  beginDate?: Date;
  endDate?: Date;
  focus: FocusData[];
  obeyaRoom: ObeyaRoom;
};

export type MutateObeyaType = KeyedMutator<AxiosResponse<any>>;

export const emptyState = {
  objectives: [],
  highlights: [],
  individualContributors: [],
  progressBoards: [],
  scopeBoards: [],
  roadmapResult: [],
  dependencies: [],
  risks: [],
  predictiveAnalysis: {
    deliveryDateAnalysis: {
      "50Percentile": "",
      "85Percentile": "",
      "98Percentile": "",
      desiredDeliveryDate: "",
      desiredDeliveryDateConfidenceLevelPercentage: 0,
      histogramData: [],
    },
    throughputAnalysis: {
      "50Percentile": 0,
      "85Percentile": 0,
      "98Percentile": 0,
      obeyaRemainingItem: 0,
      obeyaRemainingItemConfidenceLevelPercentage: 0,
      histogramData: [],
    },
    simulationSummary: {
      adjustedRemainingWork: 0,
      averageWeeklyDeliveryRate: 0,
      originalRemainingWorkItemsByLevel: {
        portfolio: 0,
        team: 0,
        individualContributor: 0,
      },
      adjustedRemainingWorkItemsByLevel: {
        portfolio: 0,
        team: 0,
        individualContributor: 0,
      },
      deliveryRateByContext: {},
      simulationCount: 0,
    },
    simulationAdditionalInfo: {
      dateRangeValue: "",
      duration: 0,
      dataSetSize: "",
      throughputDays: 0,
    },
    assumptions: {
      teamPerformance: "",
      workItemLevel: "",
      workExpansion: "",
      fullFocus: "",
      precision: "",
    } as Assumptions,
  },
  forecastingSettings: {
    contextCapacity: [],
    teamPerformancePercentage: 100,
    forecastPortfolio: false,
    forecastTeam: false,
    forecastIndividualContributor: false,
    predictiveAnalysisPrecision: "day",
  } as SettingsData,
  burnData: {
    burndown: {
      dates: [],
      remainingWork: [],
      dailyTargets: [],
    },
    burnup: {
      dates: [],
      accomplishedWork: [],
      dailyTargets: [],
      scope: [],
    },
  },
  flowMetrics: {
    contexts: [] as ObeyaDummyContext[],
    syncChanges: "",
    lowerBoundaryDate: "",
    upperBoundaryDate: "",
  },
  focus: []
};


export const emptyObeyaResponse = {
  objectives: [],
  highlights: [],
  individualContributors: [],
  progressBoards: [],
  scopeBoards: [],
  roadmapResult: {
    roadmap: []
  },
  dependencies: [],
  risks: [],
  predictiveAnalysis: {
    deliveryDateAnalysis: {
      "50Percentile": "",
      "85Percentile": "",
      "98Percentile": "",
      desiredDeliveryDate: "",
      desiredDeliveryDateConfidenceLevelPercentage: 0,
      histogramData: [],
    },
    throughputAnalysis: {
      "50Percentile": 0,
      "85Percentile": 0,
      "98Percentile": 0,
      obeyaRemainingItem: 0,
      obeyaRemainingItemConfidenceLevelPercentage: 0,
      histogramData: [],
    },
    simulationSummary: {
      adjustedRemainingWork: 0,
      averageWeeklyDeliveryRate: 0,
      originalRemainingWorkItemsByLevel: {
        portfolio: 0,
        team: 0,
        individualContributor: 0,
      },
      adjustedRemainingWorkItemsByLevel: {
        portfolio: 0,
        team: 0,
        individualContributor: 0,
      },
      deliveryRateByContext: {},
      simulationCount: 0,
    },
    simulationAdditionalInfo: {
      dateRangeValue: "",
      duration: 0,
      dataSetSize: "",
      throughputDays: 0,
    },
    assumptions: {
      teamPerformance: "",
      workItemLevel: "",
      workExpansion: "",
      fullFocus: "",
      precision: "",
    } as Assumptions,
  },
  forecastingSettings: {
    contextCapacity: [],
    teamPerformancePercentage: 100,
    forecastPortfolio: false,
    forecastTeam: false,
    forecastIndividualContributor: false,
    predictiveAnalysisPrecision: "day",
  } as SettingsData,
  burnData: {
    burndown: {
      dates: [],
      remainingWork: [],
      dailyTargets: [],
    },
    burnup: {
      dates: [],
      accomplishedWork: [],
      dailyTargets: [],
      scope: [],
    },
  },
  flowMetrics: {
    contexts: [] as ObeyaDummyContext[],
    syncChanges: "",
    lowerBoundaryDate: "",
    upperBoundaryDate: "",
  },
  focus: [],
  obeyaRoom: {
    path: '',
    displayName: '',
    roomId: '',
    roomName: ''
  }
};


export function useObeya(
  obeyaRoomId,
  disabled = false,
  resource = "obeya"
): {
  data: ObeyaResponse;
  isValidating: boolean;
  isLoadingObeyaData: boolean;
  error?: unknown;
  mutateObeyaData: any;
  response: any;
  params: any;
} {
  const params = getFilterUrlSearchParams({
    obeyaRoomId: obeyaRoomId,
    timezone: getTimezone(),
  });

  const url = !disabled && obeyaRoomId ? `${resource}?${params}` : null;

  const { data: response, error, isValidating, mutate } = useCustomSWR<any>(
    url,
    fetchObeyaData,
    { revalidateOnFocus: false }
  );

  const data = {
    objectives: [],
    highlights: [],
    individualContributors: [],
    progressBoards: [],
    scopeBoards: [],
    roadmapResult: {
      obeyaStart: undefined,
      obeyaEnd: undefined,
      roadmap: []
    },
    dependencies: [],
    risks: [],
    predictiveAnalysis: {
      deliveryDateAnalysis: {
        "50Percentile": "",
        "85Percentile": "",
        "98Percentile": "",
        desiredDeliveryDate: "",
        desiredDeliveryDateConfidenceLevelPercentage: 0,
        histogramData: [],
      },
      throughputAnalysis: {
        "50Percentile": 0,
        "85Percentile": 0,
        "98Percentile": 0,
        obeyaRemainingItem: 0,
        obeyaRemainingItemConfidenceLevelPercentage: 0,
        histogramData: [],
      },
      simulationSummary: {
        adjustedRemainingWork: 0,
        averageWeeklyDeliveryRate: 0,
        originalRemainingWorkItemsByLevel: {
          portfolio: 0,
          team: 0,
          individualContributor: 0,
        },
        adjustedRemainingWorkItemsByLevel: {
          portfolio: 0,
          team: 0,
          individualContributor: 0,
        },
        deliveryRateByContext: {},
        simulationCount: 0,
      },
      simulationAdditionalInfo: {
        dateRangeValue: "",
        duration: 0,
        dataSetSize: "",
        throughputDays: 0,
      },
      assumptions: {
        teamPerformance: "",
        workItemLevel: "",
        workExpansion: "",
        fullFocus: "",
        precision: "",
      } as Assumptions,
    },
    forecastingSettings: {
      contextCapacity: [],
      teamPerformancePercentage: 100,
      forecastPortfolio: false,
      forecastTeam: false,
      forecastIndividualContributor: false,
      predictiveAnalysisPrecision: "day",
    } as SettingsData,
    burnData: {
      burndown: {
        dates: [],
        remainingWork: [],
        dailyTargets: [],
      },
      burnup: {
        dates: [],
        accomplishedWork: [],
        dailyTargets: [],
        scope: [],
      },
    },
    flowMetrics: {
      contexts: [] as ObeyaDummyContext[],
      syncChanges: "",
      lowerBoundaryDate: "",
      upperBoundaryDate: "",
    },
    focus: [],
    obeyaRoom: {
      path: '',
      displayName: '',
      roomId: '',
      roomName: ''
    }
  };

  if (response?.data) {
    if (
      typeof response.data.objectives === "object" &&
      response.data.objectives.error
    ) {
      const error: { error: true; message: string; obeyaRoomId?: string; } =
        response.data.objectives;
      console.error(
        `Server failed to retrieve objective list for obeya room of id '${error.obeyaRoomId}'': ${error.message}`
      );
      data.objectives = [];
    } else if (response.data && response.data.OKRs) {
      // get data from /obeya/objectives resource
      data.objectives = sortByString(response.data.OKRs || [], "createdAt");
    } else {
      data.objectives = sortByString(
        response.data.objectives || [],
        "createdAt"
      );
    }

    // Sort each key result inside each objective
    data.objectives.forEach(
      (objective: OKRObjective) =>
      (objective.keyResults = sortByString(
        objective.keyResults ?? [],
        "createdAt"
      ))
    );

    data.highlights = response.data.highlights;
    data.individualContributors = response.data.individualContributors;
    data.progressBoards = response.data.progressBoards;
    data.scopeBoards = typeof response.data.scopeBoards === 'string'
      ? deflate(response.data.scopeBoards)
      : response.data.scopeBoards;
    data.roadmapResult = response.data.roadmapResult;
    data.dependencies = response.data.dependencies;
    data.risks = response.data.risks;
    data.burnData = response.data.burnData;
    data.predictiveAnalysis = response.data.predictiveAnalysis;
    data.forecastingSettings = response.data.forecastingSettings;
    data.flowMetrics = response.data.flowMetrics;
    data.focus = response.data.focus;
    data.obeyaRoom = response.data.obeyaRoom;
  }

  return {
    params,
    data,
    response,
    mutateObeyaData: mutate,
    isValidating,
    isLoadingObeyaData: !response?.data,
    error,
  };
}

export const useObeyaSelectedData = (obeyaRoomId: string, enabled = false) => {
  const { data: obeyaData, isValidating } = useObeya(obeyaRoomId, !enabled);

  return {
    predictiveAnalysis: obeyaData.predictiveAnalysis,
    highlights: obeyaData.highlights,
    isLoading: isValidating,
  };
};

export const useObeyaScopeData = (obeyaRoomId: string | undefined) => {
  if (!obeyaRoomId) {
    return {
      roadmapResult: [],
      objectives: [],
      isLoading: false,
    };
  }

  const { data: obeyaData, isValidating } = useObeya(obeyaRoomId);

  return {
    objectives: obeyaData.objectives,
    roadmapResult: obeyaData.roadmapResult,
    isLoading: isValidating,
  };
};
