export interface WorkItemBasicPresentationInfo {
  workItemId: string;
  title: string;
  assignedTo: string;
  workItemType: string;
  serviceLevelExpectationInDays: string;
  itemAge: string;
  'age%OfSLE': string;
};
