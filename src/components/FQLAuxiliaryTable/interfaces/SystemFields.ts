export type SystemField = {
  displayName: string;
  datasourceFieldName: string;
  description?: string;
  inputTypeOrAcceptedValues: string;
};

const systemFields: SystemField[] = [
  {
    displayName: 'Work Item Level',
    datasourceFieldName: 'workItemLevel',
    description: 'The hierarchical level that your work item belongs to.',
    inputTypeOrAcceptedValues: '"Portfolio", "Team" or "Sub-Task"',
  },
  {
    displayName: 'Work Item Type',
    datasourceFieldName: 'workItemType',
    description: 'Work Item Type. Eg: Story, Task, Bug, Epic.',
    inputTypeOrAcceptedValues: 'Text',
  },
  {
    displayName: 'Work Item Id',
    datasourceFieldName: 'workItemId',
    description: 'Work Item Id.',
    inputTypeOrAcceptedValues: 'Text',
  },
  {
    displayName: 'State',
    datasourceFieldName: 'state',
    description: 'The steps within your workflow.',
    inputTypeOrAcceptedValues: '',
  },
  {
    displayName: 'State Category',
    datasourceFieldName: 'stateCategory',
    description: 'State category of the workflow step.',
    inputTypeOrAcceptedValues: '"Proposed", "In Progress" or "Completed"',
  },
  {
    displayName: 'State Type',
    datasourceFieldName: 'stateType',
    description: 'Workflow step is considered ‘Active’ or ‘Waiting’.',
    inputTypeOrAcceptedValues: '"Active" or "Queue"',
  },
  {
    displayName: 'Assigned To',
    datasourceFieldName: 'assignedTo',
    description: 'Assignee of the work item.',
    inputTypeOrAcceptedValues: 'Text or Number',
  },
  {
    displayName: 'Service Level Expectation',
    datasourceFieldName: 'SLE',
    description: 'Service Level Expectation in Days for the Work Item Types',
    inputTypeOrAcceptedValues: 'Positive Number',
  },
  {
    displayName: 'Arrival Date',
    datasourceFieldName: 'arrivalDate',
    description:
      'When the work item was moved to a ‘Arrival’ state, as defined in the workflow configuration.',
    inputTypeOrAcceptedValues: 'Date',
  },
  {
    displayName: 'Changed Date',
    datasourceFieldName: 'changedDate',
    description: 'Date of when the work item had it’s latest change.',
    inputTypeOrAcceptedValues: 'Date',
  },
  {
    displayName: 'Commitment Date',
    datasourceFieldName: 'commitmentDate',
    description:
      'When the work item was moved to a ‘Committed’ state, as defined in the workflow configuration.',
    inputTypeOrAcceptedValues: 'Date',
  },
  {
    displayName: 'Departure Date',
    datasourceFieldName: 'departureDate',
    description:
      'When the work item was moved to a ‘Done’ state, as defined in the workflow configuration.',
    inputTypeOrAcceptedValues: 'Date',
  },
  {
    displayName: 'Parent Id',
    datasourceFieldName: 'parentId',
    description: 'The work item’s parent’s ID',
    inputTypeOrAcceptedValues: 'Text or Number',
  },
  {
    displayName: 'Project Id',
    datasourceFieldName: 'projectId',
    description: 'Project ID from your datasource',
    inputTypeOrAcceptedValues: 'Text or Number',
  },
  {
    displayName: 'Flagged',
    datasourceFieldName: 'flagged',
    description: 'If the work item is flagged, this field is true',
    inputTypeOrAcceptedValues: 'true or false',
  },
  {
    displayName: 'Resolution',
    datasourceFieldName: 'resolution',
    description: 'Resolution reason (Available for Jira only)',
    inputTypeOrAcceptedValues: 'Text',
  },
];

export default systemFields;
