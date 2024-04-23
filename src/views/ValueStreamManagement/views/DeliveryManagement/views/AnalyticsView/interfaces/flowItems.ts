import { WidgetInformation } from "views/ValueStreamManagement/views/DeliveryGovernance/interfaces/common";

export interface FlowItemsEntry {
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
  serviceUrl?: string;
  activeTime?: number | undefined;
  waitingTime?: number | undefined;
  flowEfficiency?: number | undefined;
  flomatikaWorkItemTypeLevel?: string;
  isDelayed?: boolean | undefined;
  isAboveSle?: boolean | undefined;
  isStale?: boolean | undefined;
  customFields?: Record<string, string | undefined>;
  widgetInfo?: WidgetInformation[];
  flagged?: boolean | undefined;
  desiredDeliveryDate?: string;
  startStatus?: string;
  optimalStartDateRange?: string;
  expectedDeliveryDate?: string;
  suggestedClassOfService?: string;

}
