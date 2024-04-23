type StepData = {
  name: string;
  type: string;
  average: number;
  '50thPercentile': number;
  '85thPercentile': number;
  '98thPercentile': number;
  totalTime: number;
  currentWipCount: number;
  totalWipTime: number;
  thresholdWeight?: number;
  items: {
      workItemId: string;
      workItemTitle: string;
      workItemType: string;
      timeInCurrentState: number;
  }[];
};

export interface Workflow {
  orgId: string;
  datasourceId: string;
  workflowId: string;
  workItemTypeId: string;
  datasourceWorkItemId: string;
  archived: boolean;
  projectId: string;
  serviceLevelExpectationInDays: number;
  level: string;
  isDistinct: boolean;
  steps: StepData[];
}

export type WorkItemTypeMapData = {
  projectName: string;
  workItemTypeName: string;
  workflowId: string;
  steps: StepData[];
};