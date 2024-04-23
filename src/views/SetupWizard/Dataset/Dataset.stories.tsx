import { Story, Meta } from '@storybook/react';
import {
  DataGridPro,
  DataGridProProps,
  GridColDef,
  GridValueGetterParams,
} from '@mui/x-data-grid-pro';
// import flatten from 'flat';
import flattenDeep from 'lodash/flattenDeep';

import rows from './statuses.json';

export default {
  title: 'Pages/Dataset',
  component: DataGridPro,
} as Meta;

const projectId = '10000';
const orgId = 'falcon-metrics';
const datasourceId = 'jira';

const Template: Story<DataGridProProps> = (args) => (
  <div style={{ height: '100vh', width: '100%' }}>
    <DataGridPro {...args} />
  </div>
);

export const WorkItemTypes = Template.bind({});

const WorkItemTypesColumns: GridColDef[] = [
  {
    field: 'orgId',
    headerName: 'orgId',
    valueGetter: () => orgId,
  },
  {
    field: 'id',
    headerName: 'workItemTypeId',
    width: 200,
    valueGetter: (params: GridValueGetterParams) =>
      `${projectId}.${params.value}`,
  },
  { field: 'name', headerName: 'displayName', width: 250 },
  {
    field: 'level',
    headerName: 'level',
    width: 150,
    valueGetter: () => 'Requirement',
  },
  {
    field: 'serviceLevelExpectationInDays',
    headerName: 'serviceLevelExpectationInDays',
    type: 'number',
    width: 250,
    valueGetter: () => 14,
  },
];

WorkItemTypes.args = {
  columns: WorkItemTypesColumns,
  rows,
};

export const WorkItemTypeMaps = Template.bind({});

const WorkItemTypeMapsColumns: GridColDef[] = [
  {
    field: 'orgId',
    headerName: 'orgId',
    valueGetter: () => orgId,
  },
  {
    field: 'datasourceId',
    headerName: 'datasourceId',
    width: 150,
    valueGetter: () => datasourceId,
  },
  {
    field: 'name',
    headerName: 'workflowId',
    width: 200,
    valueGetter: (params: GridValueGetterParams) =>
      `${projectId}.${params.value}`,
  },
  {
    field: 'name',
    headerName: 'workItemTypeId',
    width: 200,
    valueGetter: (params: GridValueGetterParams) =>
      `${projectId}.${params.value}`,
  },
  {
    field: 'name',
    headerName: 'datasourceWorkItemId',
    width: 300,
    valueGetter: (params: GridValueGetterParams) =>
      `${projectId}.${params.value}`,
  },
];

WorkItemTypeMaps.args = {
  columns: WorkItemTypeMapsColumns,
  rows,
};

export const Workflows = Template.bind({});

const WorkflowsColumns: GridColDef[] = [
  {
    field: 'orgId',
    headerName: 'orgId',
    valueGetter: () => orgId,
  },
  {
    field: 'datasourceId',
    headerName: 'datasourceId',
    width: 150,
    valueGetter: () => datasourceId,
  },
  {
    field: 'id',
    headerName: 'workItemTypeId',
    width: 250,
    valueGetter: (params: GridValueGetterParams) => `example.${params.value}`,
  },
  {
    field: 'name',
    headerName: 'displayName',
    width: 300,
    valueGetter: (params: GridValueGetterParams) => `example.${params.value}`,
  },
];

Workflows.args = {
  columns: WorkflowsColumns,
  rows,
};

export const WorkflowSteps = Template.bind({});

const WorkflowStepsColumns: GridColDef[] = [
  { field: 'id', headerName: 'id', width: 150 },
  {
    field: 'orgId',
    headerName: 'orgId',
    valueGetter: () => orgId,
  },
  {
    field: 'datasourceId',
    headerName: 'datasourceId',
    valueGetter: () => datasourceId,
  },
  { field: 'workflowId', headerName: 'workflowId', width: 200 },
  { field: 'workflowName', headerName: 'workflowName', width: 250 },
  { field: 'name', headerName: 'name', width: 250 },
];

// const fletted = flatten(rows);
// const steps = Object.keys(fletted).map(key => fletted[])
const statuses = rows.map(({ statuses, ...row }) =>
  statuses.map((status) => ({
    ...status,
    workflowId: row.id,
    workflowName: row.name,
    id: `${row.id}#${status.id}`,
  })),
);
const steps = flattenDeep(statuses);

WorkflowSteps.args = {
  columns: WorkflowStepsColumns,
  rows: steps,
};
