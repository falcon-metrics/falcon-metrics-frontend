// import { Story, Meta } from '@storybook/react';
// import Component, { Props } from './Summary';

// export default {
//   title: 'Pages/DataSources',
//   component: Component,
// } as Meta;

// const datasource = {
//   orgId: 'acme',
//   datasourceId: 'a59e7c1820f64067aaf2f0a419446714',
//   enabled: false,
//   datasourceType: 'jira-cloud',
//   lastRunOn: null,
//   nextRunStartFrom: null,
//   nextSnapshotFillingStartFrom: null,
//   excludeItemsCompletedBeforeDate: null,
//   batchSizeStateItems: 100,
//   runDelayStateMinutes: 6,
//   accessCredentialsKey: 'JC_TOKEN',
//   accessCredentialsType: 'secretsManager',
//   runType: 'extract-jiracloud',
//   serviceUrl: 'https://example.atlassian.net/rest/api/3',
//   deletedAt: null,
//   namespace: 'your_org',
// };

// const projects = [
//   {
//     orgId: 'acme',
//     datasourceId: 'a59e7c1820f64067aaf2f0a419446714',
//     datasourceType: 'jira-cloud',
//     projectId: '10001',
//     name: 'test-project',
//     deletedAt: null,
//   },
//   {
//     orgId: 'acme',
//     datasourceId: 'a59e7c1820f64067aaf2f0a419446714',
//     datasourceType: 'jira-cloud',
//     projectId: '10000',
//     name: 'Falcon Metrics',
//     deletedAt: null,
//   },
// ];

// const workflows = [
//   {
//     id: '10000',
//     name: 'Epic',
//     steps: [
//       { id: '1', name: 'New', category: 'proposed' },
//       { id: '10006', name: 'Pool of Options', category: 'proposed' },
//       { id: '10003', name: 'Next', category: 'proposed' },
//       { id: '10004', name: 'Committed', category: 'inprogress' },
//       { id: '10007', name: 'Analysis', category: 'inprogress' },
//       { id: '10008', name: 'Design', category: 'inprogress' },
//       { id: '10009', name: 'Delivery', category: 'inprogress' },
//       { id: '10002', name: 'Done', category: 'completed' },
//       { id: '10005', name: 'Waiting', category: 'inprogress' },
//     ],
//     projects: ['10001', '10000'],
//   },
//   {
//     id: '10001',
//     name: 'Story',
//     steps: [
//       { id: '10000', name: 'Backlog', category: 'proposed' },
//       { id: '3', name: 'In Progress', category: 'inprogress' },
//       { id: '10002', name: 'Done', category: 'completed' },
//       { id: '10003', name: 'Next', category: 'proposed' },
//       { id: '10004', name: 'Committed', category: 'inprogress' },
//       { id: '10005', name: 'Waiting', category: 'inprogress' },
//       { id: '10006', name: 'Pool of Options', category: 'proposed' },
//       { id: '6', name: 'Rejected', category: 'completed' },
//     ],
//     projects: ['10001', '10000'],
//   },
//   {
//     id: '10002',
//     name: 'Task',
//     steps: [
//       { id: '10000', name: 'Backlog', category: 'proposed' },
//       { id: '3', name: 'In Progress', category: 'inprogress' },
//       { id: '10002', name: 'Done', category: 'completed' },
//       { id: '10003', name: 'Next', category: 'proposed' },
//       { id: '10004', name: 'Committed', category: 'inprogress' },
//       { id: '10005', name: 'Waiting', category: 'inprogress' },
//       { id: '10006', name: 'Pool of Options', category: 'proposed' },
//       { id: '6', name: 'Rejected', category: 'completed' },
//     ],
//     projects: ['10001', '10000'],
//   },
//   {
//     id: '10003',
//     name: 'Sub-task',
//     steps: [
//       { id: '10000', name: 'Backlog', category: 'proposed' },
//       { id: '3', name: 'In Progress', category: 'inprogress' },
//       { id: '10002', name: 'Done', category: 'completed' },
//       { id: '10003', name: 'Next', category: 'proposed' },
//       { id: '10004', name: 'Committed', category: 'inprogress' },
//       { id: '10005', name: 'Waiting', category: 'inprogress' },
//       { id: '10006', name: 'Pool of Options', category: 'proposed' },
//       { id: '6', name: 'Rejected', category: 'completed' },
//     ],
//     projects: ['10001', '10000'],
//   },
//   {
//     id: '10004',
//     name: 'Bug',
//     steps: [
//       { id: '10000', name: 'Backlog', category: 'proposed' },
//       { id: '3', name: 'In Progress', category: 'inprogress' },
//       { id: '10002', name: 'Done', category: 'completed' },
//       { id: '10003', name: 'Next', category: 'proposed' },
//       { id: '10004', name: 'Committed', category: 'inprogress' },
//       { id: '10005', name: 'Waiting', category: 'inprogress' },
//       { id: '10006', name: 'Pool of Options', category: 'proposed' },
//       { id: '6', name: 'Rejected', category: 'completed' },
//     ],
//     projects: ['10001', '10000'],
//   },
//   {
//     id: '10005',
//     name: 'Initiative',
//     steps: [
//       { id: '10000', name: 'Backlog', category: 'proposed' },
//       { id: '3', name: 'In Progress', category: 'inprogress' },
//       { id: '10002', name: 'Done', category: 'completed' },
//       { id: '10003', name: 'Next', category: 'proposed' },
//       { id: '10004', name: 'Committed', category: 'inprogress' },
//       { id: '10005', name: 'Waiting', category: 'inprogress' },
//       { id: '10006', name: 'Pool of Options', category: 'proposed' },
//       { id: '6', name: 'Rejected', category: 'completed' },
//     ],
//     projects: ['10001', '10000'],
//   },
//   {
//     id: '10006',
//     name: 'Enabler & Tech Debt',
//     steps: [
//       { id: '10000', name: 'Backlog', category: 'proposed' },
//       { id: '3', name: 'In Progress', category: 'inprogress' },
//       { id: '10002', name: 'Done', category: 'completed' },
//       { id: '10003', name: 'Next', category: 'proposed' },
//       { id: '10004', name: 'Committed', category: 'inprogress' },
//       { id: '10005', name: 'Waiting', category: 'inprogress' },
//       { id: '10006', name: 'Pool of Options', category: 'proposed' },
//       { id: '6', name: 'Rejected', category: 'completed' },
//     ],
//     projects: ['10001', '10000'],
//   },
//   {
//     id: '10007',
//     name: 'Enhancement & Optimisation',
//     steps: [
//       { id: '10000', name: 'Backlog', category: 'proposed' },
//       { id: '3', name: 'In Progress', category: 'inprogress' },
//       { id: '10002', name: 'Done', category: 'completed' },
//       { id: '10003', name: 'Next', category: 'proposed' },
//       { id: '10004', name: 'Committed', category: 'inprogress' },
//       { id: '10005', name: 'Waiting', category: 'inprogress' },
//       { id: '10006', name: 'Pool of Options', category: 'proposed' },
//       { id: '6', name: 'Rejected', category: 'completed' },
//     ],
//     projects: ['10001', '10000'],
//   },
//   {
//     id: '10008',
//     name: 'Risk & Compliance',
//     steps: [
//       { id: '10000', name: 'Backlog', category: 'proposed' },
//       { id: '3', name: 'In Progress', category: 'inprogress' },
//       { id: '10002', name: 'Done', category: 'completed' },
//       { id: '10003', name: 'Next', category: 'proposed' },
//       { id: '10004', name: 'Committed', category: 'inprogress' },
//       { id: '10005', name: 'Waiting', category: 'inprogress' },
//       { id: '10006', name: 'Pool of Options', category: 'proposed' },
//       { id: '6', name: 'Rejected', category: 'completed' },
//     ],
//     projects: ['10001', '10000'],
//   },
// ];

// const contexts = [
//   {
//     contextId: '397eb4ef-1caa-40ba-a65e-267c9c849266',
//     orgId: 'acme',
//     name: 'Portfolio A',
//     positionInHierarchy: '1',
//     contextAddress: null,
//     createdAt: '2021-06-14T21:04:29.388Z',
//     updatedAt: '2021-06-14T21:04:29.388Z',
//     datasourceId: 'a59e7c1820f64067aaf2f0a419446714',
//     projectId: null,
//   },
//   {
//     contextId: 'cf77741f-a478-4bcb-b404-7ddacf799d96',
//     orgId: 'acme',
//     name: 'Initiative AA',
//     positionInHierarchy: '1.1',
//     contextAddress: '',
//     createdAt: '2021-06-14T21:04:29.388Z',
//     updatedAt: '2021-06-14T21:04:29.388Z',
//     datasourceId: 'a59e7c1820f64067aaf2f0a419446714',
//     projectId: null,
//   },
//   {
//     contextId: '201fa9d4-f265-4171-b94f-ffabbe5e6897',
//     orgId: 'acme',
//     name: 'Team AAA',
//     positionInHierarchy: '1.1.1',
//     contextAddress: '10003',
//     createdAt: '2021-06-14T21:04:29.388Z',
//     updatedAt: '2021-06-14T21:04:29.388Z',
//     datasourceId: 'a59e7c1820f64067aaf2f0a419446714',
//     projectId: '10000',
//   },
//   {
//     contextId: '201fa9d4-f265-4171-b94f-ffabbe5e6897',
//     orgId: 'acme',
//     name: 'Team AAB',
//     positionInHierarchy: '1.1.2',
//     contextAddress: '10003',
//     createdAt: '2021-06-14T21:04:29.388Z',
//     updatedAt: '2021-06-14T21:04:29.388Z',
//     datasourceId: 'a59e7c1820f64067aaf2f0a419446714',
//     projectId: '10000',
//   },
//   {
//     contextId: 'cf77741f-a478-4bcb-b404-7ddacf799d96',
//     orgId: 'acme',
//     name: 'Initiative AB',
//     positionInHierarchy: '1.2',
//     contextAddress: '',
//     createdAt: '2021-06-14T21:04:29.388Z',
//     updatedAt: '2021-06-14T21:04:29.388Z',
//     datasourceId: 'a59e7c1820f64067aaf2f0a419446714',
//     projectId: null,
//   },
//   {
//     contextId: '201fa9d4-f265-4171-b94f-ffabbe5e6897',
//     orgId: 'acme',
//     name: 'Team ABA',
//     positionInHierarchy: '1.2.1',
//     contextAddress: '10003',
//     createdAt: '2021-06-14T21:04:29.388Z',
//     updatedAt: '2021-06-14T21:04:29.388Z',
//     datasourceId: 'a59e7c1820f64067aaf2f0a419446714',
//     projectId: '10000',
//   },

//   {
//     contextId: '397eb4ef-1caa-40ba-a65e-267c9c849266',
//     orgId: 'acme',
//     name: 'Portfolio B',
//     positionInHierarchy: '2',
//     contextAddress: null,
//     createdAt: '2021-06-14T21:04:29.388Z',
//     updatedAt: '2021-06-14T21:04:29.388Z',
//     datasourceId: 'a59e7c1820f64067aaf2f0a419446714',
//     projectId: null,
//   },
//   {
//     contextId: 'cf77741f-a478-4bcb-b404-7ddacf799d96',
//     orgId: 'acme',
//     name: 'Initiative BA',
//     positionInHierarchy: '2.1',
//     contextAddress: '',
//     createdAt: '2021-06-14T21:04:29.388Z',
//     updatedAt: '2021-06-14T21:04:29.388Z',
//     datasourceId: 'a59e7c1820f64067aaf2f0a419446714',
//     projectId: null,
//   },
//   {
//     contextId: '201fa9d4-f265-4171-b94f-ffabbe5e6897',
//     orgId: 'acme',
//     name: 'Team BAA',
//     positionInHierarchy: '2.1.1',
//     contextAddress: '10003',
//     createdAt: '2021-06-14T21:04:29.388Z',
//     updatedAt: '2021-06-14T21:04:29.388Z',
//     datasourceId: 'a59e7c1820f64067aaf2f0a419446714',
//     projectId: '10000',
//   },
//   {
//     contextId: '201fa9d4-f265-4171-b94f-ffabbe5e6897',
//     orgId: 'acme',
//     name: 'Team BAB',
//     positionInHierarchy: '2.1.2',
//     contextAddress: '10003',
//     createdAt: '2021-06-14T21:04:29.388Z',
//     updatedAt: '2021-06-14T21:04:29.388Z',
//     datasourceId: 'a59e7c1820f64067aaf2f0a419446714',
//     projectId: '10000',
//   },
//   {
//     contextId: 'cf77741f-a478-4bcb-b404-7ddacf799d96',
//     orgId: 'acme',
//     name: 'Initiative BB',
//     positionInHierarchy: '2.2',
//     contextAddress: '',
//     createdAt: '2021-06-14T21:04:29.388Z',
//     updatedAt: '2021-06-14T21:04:29.388Z',
//     datasourceId: 'a59e7c1820f64067aaf2f0a419446714',
//     projectId: null,
//   },
//   {
//     contextId: '201fa9d4-f265-4171-b94f-ffabbe5e6897',
//     orgId: 'acme',
//     name: 'Team BBA',
//     positionInHierarchy: '2.2.1',
//     contextAddress: '10003',
//     createdAt: '2021-06-14T21:04:29.388Z',
//     updatedAt: '2021-06-14T21:04:29.388Z',
//     datasourceId: 'a59e7c1820f64067aaf2f0a419446714',
//     projectId: '10000',
//   },
// ];

// const customfields = [
//   {
//     id: 'components',
//     datasourceFieldName: 'components',
//     displayName: 'Components',
//   },
//   {
//     id: 'customfield_10000',
//     datasourceFieldName: 'customfield_10000',
//     displayName: 'Development',
//   },
//   {
//     id: 'customfield_10015',
//     datasourceFieldName: 'customfield_10015',
//     displayName: 'Start date',
//   },
//   {
//     id: 'customfield_10017',
//     datasourceFieldName: 'customfield_10017',
//     displayName: 'Issue color',
//   },
//   {
//     id: 'customfield_10019',
//     datasourceFieldName: 'customfield_10019',
//     displayName: 'Rank',
//   },
//   {
//     id: 'customfield_10021',
//     datasourceFieldName: 'customfield_10021',
//     displayName: 'Flagged',
//   },
//   {
//     id: 'customfield_10029',
//     datasourceFieldName: 'customfield_10029',
//     displayName: 'Class of Service',
//   },
//   {
//     id: 'customfield_10030',
//     datasourceFieldName: 'customfield_10030',
//     displayName: 'Triage',
//   },
//   {
//     id: 'customfield_10031',
//     datasourceFieldName: 'customfield_10031',
//     displayName: 'Demand',
//   },
//   { id: 'duedate', datasourceFieldName: 'duedate', displayName: 'Due date' },
//   {
//     id: 'environment',
//     datasourceFieldName: 'environment',
//     displayName: 'Environment',
//   },
//   {
//     id: 'fixVersions',
//     datasourceFieldName: 'fixVersions',
//     displayName: 'Fix versions',
//   },
//   {
//     id: 'issuerestriction',
//     datasourceFieldName: 'issuerestriction',
//     displayName: 'Restrict to',
//   },
//   {
//     id: 'issuetype',
//     datasourceFieldName: 'issuetype',
//     displayName: 'Issue Type',
//   },
//   { id: 'labels', datasourceFieldName: 'labels', displayName: 'Labels' },
//   { id: 'priority', datasourceFieldName: 'priority', displayName: 'Priority' },
//   { id: 'project', datasourceFieldName: 'project', displayName: 'Project' },
//   { id: 'reporter', datasourceFieldName: 'reporter', displayName: 'Reporter' },
//   {
//     id: 'versions',
//     datasourceFieldName: 'versions',
//     displayName: 'Affects versions',
//   },
// ];

// const settings = {
//   excludeExpression: "workItemType = 'removed'",
//   initialDate: '2021-08-10T11:22:00.000Z',
// };

// const normalization = [
//   {
//     id: 1,
//     orgId: 'acme',
//     datasourceId: '216c6602-197f-408b-ad7b-580e039cab95',
//     contextId: null,
//     displayName: 'Enhancement & Optimization',
//     flomatikaQuery:
//       "flomatikaWorkItemTypeName = 'FEO Work Items' OR flomatikaWorkItemTypeName = 'FEO Features Collection'",
//     parsedQuery:
//       'LOWER("flomatikaWorkItemTypeName") = \'feo work items\' OR LOWER("flomatikaWorkItemTypeName") = \'feo features collection\'',
//     tags: 'normalisation',
//     isFavorite: false,
//     SLE: 30,
//     Target: 10,
//   },
//   {
//     id: 2,
//     orgId: 'acme',
//     datasourceId: '216c6602-197f-408b-ad7b-580e039cab95',
//     contextId: null,
//     displayName: 'Risks & Compliance',
//     flomatikaQuery:
//       "flomatikaWorkItemTypeName = 'Project Risk' OR flomatikaWorkItemTypeName = 'Project Issue'",
//     parsedQuery:
//       'LOWER("flomatikaWorkItemTypeName") = \'project risk\' OR LOWER("flomatikaWorkItemTypeName") = \'project issue\'',
//     tags: 'normalisation',
//     isFavorite: false,
//     SLE: 30,
//     Target: 10,
//   },
//   {
//     id: 3,
//     orgId: 'acme',
//     datasourceId: '216c6602-197f-408b-ad7b-580e039cab95',
//     contextId: null,
//     displayName: 'Feature',
//     flomatikaQuery:
//       "flomatikaWorkItemTypeName = 'Squad Backlog Item' OR flomatikaWorkItemTypeName = 'Feature' OR flomatikaWorkItemTypeName = 'Release' OR flomatikaWorkItemTypeName = 'Epic'",
//     parsedQuery:
//       'LOWER("flomatikaWorkItemTypeName") = \'squad backlog item\' OR LOWER("flomatikaWorkItemTypeName") = \'feature\' OR LOWER("flomatikaWorkItemTypeName") = \'release\' OR LOWER("flomatikaWorkItemTypeName") = \'epic\'',
//     tags: 'normalisation',
//     isFavorite: false,
//     SLE: 30,
//     Target: 60,
//   },
//   {
//     id: 4,
//     orgId: 'acme',
//     datasourceId: '216c6602-197f-408b-ad7b-580e039cab95',
//     contextId: null,
//     displayName: 'Defect & Incident',
//     flomatikaQuery: "flomatikaWorkItemTypeName = 'Bug'",
//     parsedQuery: 'LOWER("flomatikaWorkItemTypeName") = \'bug\'',
//     tags: 'normalisation',
//     isFavorite: false,
//     SLE: 30,
//     Target: 20,
//   },
//   {
//     id: 5,
//     orgId: 'acme',
//     datasourceId: '216c6602-197f-408b-ad7b-580e039cab95',
//     contextId: null,
//     displayName: 'Failure Demand',
//     flomatikaQuery: "flomatikaWorkItemTypeName = 'Bug'",
//     parsedQuery: 'LOWER("flomatikaWorkItemTypeName") = \'bug\'',
//     tags: 'quality',
//     isFavorite: false,
//     SLE: 30,
//     Target: 20,
//   },
//   {
//     id: 6,
//     orgId: 'acme',
//     datasourceId: '216c6602-197f-408b-ad7b-580e039cab95',
//     contextId: null,
//     displayName: 'Non-value Demand',
//     flomatikaQuery:
//       "flomatikaWorkItemTypeName = 'project risk' OR flomatikaWorkItemTypeName = 'project issue'",
//     parsedQuery:
//       'LOWER("flomatikaWorkItemTypeName") = \'project risk\' OR LOWER("flomatikaWorkItemTypeName") = \'project issue\'',
//     tags: 'quality',
//     isFavorite: false,
//     SLE: 30,
//     Target: 10,
//   },
//   {
//     id: 7,
//     orgId: 'acme',
//     datasourceId: '216c6602-197f-408b-ad7b-580e039cab95',
//     contextId: null,
//     displayName: 'Value Demand',
//     flomatikaQuery:
//       "flomatikaWorkItemTypeName = 'epic' OR flomatikaWorkItemTypeName = 'feature' OR flomatikaWorkItemTypeName = 'feo work items' OR flomatikaWorkItemTypeName = 'feo features collection' OR flomatikaWorkItemTypeName = 'feo features collection' OR flomatikaWorkItemTypeName = 'squad backlog item' OR flomatikaWorkItemTypeName = 'release'",
//     parsedQuery:
//       'LOWER("flomatikaWorkItemTypeName") = \'epic\' OR LOWER("flomatikaWorkItemTypeName") = \'feature\' OR LOWER("flomatikaWorkItemTypeName") = \'feo work items\' OR LOWER("flomatikaWorkItemTypeName") = \'feo features collection\' OR LOWER("flomatikaWorkItemTypeName") = \'feo features collection\' OR LOWER("flomatikaWorkItemTypeName") = \'squad backlog item\' OR LOWER("flomatikaWorkItemTypeName") = \'release\'',
//     tags: 'quality',
//     isFavorite: false,
//     SLE: 30,
//     Target: 70,
//   },
// ];

// const Template: Story<Props> = (args) => <Component {...args} />;

// export const SummaryPage = Template.bind({});
// SummaryPage.args = {
//   data: {
//     datasource,
//     projects,
//     workflows,
//     contexts,
//     customfields,
//     settings,
//     normalization,
//   },
// };
export default null;