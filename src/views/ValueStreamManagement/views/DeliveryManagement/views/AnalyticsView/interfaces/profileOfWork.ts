import { WidgetInformation } from "views/ValueStreamManagement/views/DeliveryGovernance/interfaces/common";

export interface WorkItemGroupCount {
  groupName: string | undefined;
  count: number;
}

export interface ProjectWorkItem {
  workItemId?: string;
  title?: string;
  assignedTo?: string;
  flomatikaWorkItemTypeName?: string;
  state?: string;
  arrivalDate?: string;
  commitmentDate?: string;
  departureDate?: string;
  serviceLevelExpectationInDays?: number | undefined;
  itemAge?: number | undefined;
  ['age%OfSLE']?: number | undefined;
  projectName?: string;
  projectId?: string;
  datasourceId?: string;
  datasourceType?: string;
  namespace?: string;
  customFields?: Record<string, string | undefined>;
}

export type AssignedToDatum = {
  name: string;
  workItems: Array<{ id: string; }>;
};

export type NormalisationFieldsRecord = {
  [normalisationCategoryId: string]: {
    distribution: {
      [valueName: string]: number;
    };
    historical: {
      dateStart: string;
      dateEnd: string;
      values: {
        [valueName: string]: number;
      };
    }[];
  };
};

export type CustomFieldsRecord = {
  [customFieldId: string]: {
    displayName: string;
    distribution: {
      [valueName: string]: number;
    };
    historical: {
      dateStart: string;
      dateEnd: string;
      values: {
        [valueName: string]: number;
      };
    }[];
  };
};

export interface ProfileOfWorkData {
  systemFields: {
    assignedTo: AssignedToDatum[];
    workItemType: WorkItemGroupCount[];
    stageOfWorkflow: WorkItemGroupCount[];
    startStatus: WorkItemGroupCount[];
  };
  customFields: CustomFieldsRecord;
  normalisationFields: NormalisationFieldsRecord;

  assignedToWidgetInfo?: WidgetInformation[];
  workItemTypeWidgetInfo?: WidgetInformation[];
  stageOfWorkflowWidgetInfo?: WidgetInformation[];
  workItemsWidgetInfo?: WidgetInformation[];
  customFieldWidgetInfo?: WidgetInformation[];
  normalisedWidgetInfo?: WidgetInformation[];
};
