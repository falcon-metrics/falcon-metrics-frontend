import { FlowEfficiencyPageQueryParameters } from 'views/Dashboard/views/AnalyticsDashboard/views/FlowEfficiency/FlowEfficiency.data';
import { APIClient, ApiQueryParameters } from './ApiClient';

export type StateCumulativeFlowData = {
  stateName: string;
  cumulativeFlowData: Array<{ sampleDate: Date; numberOfItems: number }>;
};

type weeklyCount = { weekStartingOn: string; count: number };

export type InOutFlowData = {
  weeklyCumulativeFlow: {
    inflowItems: Array<weeklyCount>;
    outflowItems: Array<weeklyCount>;
  };

  weeklyFlow: {
    inflowItems: Array<weeklyCount>;
    outflowItems: Array<weeklyCount>;
  };
};

export type EfficiencyAnalysisData = {
  valueAddingTimeDays: number;
  waitingTimeDays: number;
};

export type FlowEfficiencyResponse = {
  cumulativeFlowData?: Array<StateCumulativeFlowData>;
  inOutFlowData?: InOutFlowData;
  efficiencyAnalysisData?: EfficiencyAnalysisData;
  timeInStateData?: Array<{ state: string; totalDays: number }>;
};

export class FlowEfficiencyClient extends APIClient<
  Promise<FlowEfficiencyResponse>
> {
  constructor() {
    super('flowefficiency');
  }
  async getData(
    demoDataIsSelected: boolean,
    queryParameters: ApiQueryParameters & FlowEfficiencyPageQueryParameters,
  ): Promise<FlowEfficiencyResponse> {
    const response: FlowEfficiencyResponse = await super.get({
      queryParameters,
      dataKey: 'FlowEfficiencyData',
      demoDataIsSelected,
    });

    const {
      stateTypeFilter,
      timeInStateInProgressFilterToggle: inProgress,
    } = queryParameters;
    const { timeInStateData } = response;

    if (inProgress && stateTypeFilter === 'active' && timeInStateData) {
      response.timeInStateData = timeInStateData.filter(
        ({ state }) => state.toLowerCase() !== 'waiting',
      );
    }

    return response;
  }
}
