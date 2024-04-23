import { AxiosResponse } from "axios";

import { Dependency } from "../../../components/CantDeleteWarning/interfaces/Dependency";

export enum QueueActive {
  active = "active",
  queue = "queue",
}

export type ImportedStep = {
  category: string;
  id: string;
  name: string;
};

export type ImportedWorkItemType = {
  id: string;
  name: string;
  projectNames: string[];
  projects: string[];
  steps: ImportedStep[];
};

type BaseWorkItemTypeStep = {
  type: QueueActive;
  workflowId?: string;
  category: string;
} & ImportedStep;

export type TransformedDatabaseWorkItemTypeStep = {
  isUnmapped: boolean;
  compositeId: string;
} & BaseWorkItemTypeStep;

export type DatabaseWorkItemTypeStep = BaseWorkItemTypeStep & {
  order: string;
};

export type ProjectInfo = {
  name: string;
  id: string;
  isUnmapped: boolean;
};

export type DatabaseWorkItemType = {
  arrivalPointOrder: number;
  commitmentPointOrder: number;
  departurePointOrder: number;
  datasourceWorkItemId: string;
  displayName: string;
  level?: string;
  orgId?: string;
  projectId: string;
  serviceLevelExpectationInDays: number;
  steps: DatabaseWorkItemTypeStep[];
  workItemTypeId?: string;
  workflowId: string;
  isDistinct?: boolean;
};
export type KeyWorkflowEvents = {
  arrivalId: string;
  commitmentId: string;
  departureId: string;
};

export type TransformedImportedWorkItemType = ImportedWorkItemType;
export type TransformedDatabaseWorkItemType = {
  id: string;
  name: string;
  displayName: string;
  projects: ProjectInfo[];
  steps: TransformedDatabaseWorkItemTypeStep[];
  isDistinct?: boolean;
} & Partial<KeyWorkflowEvents> &
  Omit<
    DatabaseWorkItemType,
    | "datasourceWorkItemId"
    | "arrivalPointOrder"
    | "commitmentPointOrder"
    | "departurePointOrder"
    | "steps"
  >;

export interface RawDiscontinuedSteps {
  workflowId: string;
  steps: {
    compositeId: string;
    name: string;
    id: string;
    initOrder: number;
    order: number | null;
  }[];
}

export type SubmitResponseData = { dependencies: Dependency[]; } | {};
export type SubmitResponse = Promise<AxiosResponse<SubmitResponseData>>;
