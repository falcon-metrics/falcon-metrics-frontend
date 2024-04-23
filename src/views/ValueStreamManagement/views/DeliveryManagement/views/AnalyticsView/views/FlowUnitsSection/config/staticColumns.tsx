import { GridColumns } from '@mui/x-data-grid-pro';
import CenteredBooleanCell from 'components/UI/CenteredBooleanCell';
import CenteredCell from 'components/UI/CenteredCell/CenteredCell';
import CenteredDateCell from 'components/UI/CenteredDateCell';
import CenteredPercentCell from 'components/UI/CenteredPercentCell';
import WorkItemLink from 'components/WorkItemList/components/WorkItemLink';
import WorkItemListHeatMapCell from 'views/ValueStreamManagement/views/DeliveryManagement/components/WorkItemListHeatMapCell';

export const defaultColumns: string[] = [
  'workItemId',
  'title',
  'assignedTo',
  'flomatikaWorkItemTypeName',
  'flomatikaWorkItemTypeLevel',
  'state',
  'arrivalDate',
  'commitmentDate',
  'departureDate',
  'serviceLevelExpectationInDays',
  'itemAge',
  'age%OfSLE',
  'projectName',
  'projectId',
  'datasourceId',
  'datasourceType',
  'namespace',
  'customFields',
  'serviceUrl',
  'activeTime',
  'waitingTime',
  'flowEfficiency',
  'isDelayed',
  'isAboveSle',
  'isStale',
  'flagged'
];

export const completedWorkColumns: GridColumns = [
  {
    field: 'workItemId',
    headerName: 'ID',
    width: 150,
    renderCell: WorkItemLink,
    headerAlign: 'center'
  },
  {
    field: 'title',
    headerName: 'Title',
    width: 300,
    renderCell: CenteredCell,
    headerAlign: 'center'
  },
  {
    field: 'flomatikaWorkItemTypeName',
    headerName: 'Flow Item Type',
    width: 200,
    renderCell: CenteredCell,
    headerAlign: 'center'
  },
  {
    field: 'flomatikaWorkItemTypeLevel',
    headerName: 'Flow Item Level',
    width: 220,
    renderCell: CenteredCell,
    headerAlign: 'center'
  },
  {
    field: 'serviceLevelExpectationInDays',
    headerName: 'SLE',
    width: 150,
    renderCell: CenteredCell,
    headerAlign: 'center'
  },
  {
    field: 'itemAge',
    headerName: 'Lead Time (days)',
    width: 200,
    renderCell: CenteredCell,
    headerAlign: 'center'
  },
  // This is not displayed always. This is displayed
  // based on the parameter to generateColumns
  {
    field: 'activeTime',
    headerName: 'Active Time (days)',
    width: 200,
    renderCell: CenteredCell,
    headerAlign: 'center'
  },
  {
    field: 'age%OfSLE',
    headerName: 'Lead Time In % of SLE',
    width: 200,
    renderCell: WorkItemListHeatMapCell,
    headerAlign: 'center'
  },
  {
    field: 'flowEfficiency',
    headerName: 'Flow Efficiency %',
    width: 220,
    renderCell: CenteredPercentCell,
    headerAlign: 'center'
  },
  {
    field: 'isDelayed',
    headerName: 'Delayed',
    width: 150,
    renderCell: CenteredBooleanCell,
    headerAlign: 'center'
  },
  {
    field: 'isAboveSle',
    headerName: 'Above SLE',
    width: 150,
    renderCell: CenteredBooleanCell,
    headerAlign: 'center'
  },
  {
    field: 'isStale',
    headerName: 'Stale',
    width: 150,
    renderCell: CenteredBooleanCell,
    headerAlign: 'center'
  },
  {
    field: 'state',
    headerName: 'State',
    width: 150,
    renderCell: CenteredCell,
    headerAlign: 'center'
  },
  {
    field: 'assignedTo',
    headerName: 'Assigned To',
    width: 200,
    renderCell: CenteredCell,
    headerAlign: 'center'
  },
  {
    field: 'arrivalDate',
    headerName: 'Arrival Date',
    width: 200,
    renderCell: CenteredDateCell,
    headerAlign: 'center'
  },
  {
    field: 'commitmentDate',
    headerName: 'Commitment Date',
    width: 200,
    renderCell: CenteredDateCell,
    headerAlign: 'center'
  },
  {
    field: 'departureDate',
    headerName: 'Departure Date',
    width: 200,
    renderCell: CenteredDateCell,
    headerAlign: 'center'
  },
  {
    field: 'projectName',
    headerName: 'Project Name',
    width: 200,
    renderCell: CenteredCell,
    headerAlign: 'center'
  },
  {
    field: 'datasourceType',
    headerName: 'Datasource Type',
    width: 200,
    renderCell: CenteredCell,
    headerAlign: 'center'
  },
  {
    field: 'desiredDeliveryDate',
    headerName: 'Desired delivery date',
    width: 200,
    renderCell: CenteredCell,
    headerAlign: 'center'
  },
  {
    field: 'startStatus',
    headerName: 'Start status',
    width: 200,
    renderCell: CenteredCell,
    headerAlign: 'center'
  },
  {
    field: 'optimalStartDateRange',
    headerName: 'Optimal start date range',
    width: 200,
    renderCell: CenteredCell,
    headerAlign: 'center'
  }

];

export const workInProcessColumns: GridColumns = [
  {
    field: 'workItemId',
    headerName: 'ID',
    width: 150,
    renderCell: WorkItemLink,
    headerAlign: 'center'
  },
  {
    field: 'title',
    headerName: 'Title',
    width: 300,
    renderCell: CenteredCell,
    headerAlign: 'center'
  },
  {
    field: 'flomatikaWorkItemTypeName',
    headerName: 'Flow Item Type',
    width: 200,
    renderCell: CenteredCell,
    headerAlign: 'center'
  },
  {
    field: 'flomatikaWorkItemTypeLevel',
    headerName: 'Flow Item Level',
    width: 220,
    renderCell: CenteredCell,
    headerAlign: 'center'
  },
  {
    field: 'serviceLevelExpectationInDays',
    headerName: 'SLE',
    width: 150,
    renderCell: CenteredCell,
    headerAlign: 'center'
  },
  {
    field: 'itemAge',
    headerName: 'WIP Age (days)',
    width: 200,
    renderCell: CenteredCell,
    headerAlign: 'center'
  },
  {
    field: 'age%OfSLE',
    headerName: 'WIP Age In % of SLE',
    width: 200,
    renderCell: WorkItemListHeatMapCell,
    headerAlign: 'center'
  },
  {
    field: 'flowEfficiency',
    headerName: 'Flow Efficiency %',
    width: 220,
    renderCell: CenteredPercentCell,
    headerAlign: 'center'
  },
  {
    field: 'isDelayed',
    headerName: 'Delayed',
    width: 150,
    renderCell: CenteredBooleanCell,
    headerAlign: 'center'
  },
  {
    field: 'flagged',
    headerName: 'Blocked',
    width: 150,
    renderCell: CenteredBooleanCell,
    headerAlign: 'center'
  },
  {
    field: 'isAboveSle',
    headerName: 'Above SLE',
    width: 150,
    renderCell: CenteredBooleanCell,
    headerAlign: 'center'
  },
  {
    field: 'isStale',
    headerName: 'Stale',
    width: 150,
    renderCell: CenteredBooleanCell,
    headerAlign: 'center'
  },
  {
    field: 'state',
    headerName: 'State',
    width: 150,
    renderCell: CenteredCell,
    headerAlign: 'center'
  },
  {
    field: 'assignedTo',
    headerName: 'Assigned To',
    width: 200,
    renderCell: CenteredCell,
    headerAlign: 'center'
  },
  {
    field: 'arrivalDate',
    headerName: 'Arrival Date',
    width: 200,
    renderCell: CenteredDateCell,
    headerAlign: 'center'
  },
  {
    field: 'commitmentDate',
    headerName: 'Commitment Date',
    width: 200,
    renderCell: CenteredDateCell,
    headerAlign: 'center'
  },
  {
    field: 'projectName',
    headerName: 'Project Name',
    width: 200,
    renderCell: CenteredCell,
    headerAlign: 'center'
  },
  {
    field: 'datasourceType',
    headerName: 'Datasource Type',
    width: 200,
    renderCell: CenteredCell,
    headerAlign: 'center'
  },
  {
    field: 'desiredDeliveryDate',
    headerName: 'Desired delivery date',
    width: 200,
    renderCell: CenteredCell,
    headerAlign: 'center'
  },
  {
    field: 'startStatus',
    headerName: 'Start status',
    width: 200,
    renderCell: CenteredCell,
    headerAlign: 'center'
  },
  {
    field: 'optimalStartDateRange',
    headerName: 'Optimal start date range',
    width: 200,
    renderCell: CenteredCell,
    headerAlign: 'center'
  },
  {
    field: 'expectedDeliveryDate',
    headerName: 'Expected delivery date',
    width: 200,
    renderCell: CenteredCell,
    headerAlign: 'center'
  },
  {
    field: 'suggestedClassOfService',
    headerName: 'Suggested Class Of Service',
    width: 200,
    renderCell: CenteredCell,
    headerAlign: 'center'
  }
];

export const upcomingWorkColumns: GridColumns = [
  {
    field: 'workItemId',
    headerName: 'ID',
    width: 150,
    renderCell: WorkItemLink,
    headerAlign: 'center'
  },
  {
    field: 'title',
    headerName: 'Title',
    width: 300,
    renderCell: CenteredCell,
    headerAlign: 'center'
  },
  {
    field: 'flomatikaWorkItemTypeName',
    headerName: 'Flow Item Type',
    width: 200,
    renderCell: CenteredCell,
    headerAlign: 'center'
  },
  {
    field: 'flomatikaWorkItemTypeLevel',
    headerName: 'Flow Item Level',
    width: 220,
    renderCell: CenteredCell,
    headerAlign: 'center'
  },
  {
    field: 'itemAge',
    headerName: 'Inventory Age (days)',
    width: 250,
    renderCell: CenteredCell,
    headerAlign: 'center'
  },
  {
    field: 'isDelayed',
    headerName: 'Delayed',
    width: 150,
    renderCell: CenteredBooleanCell,
    headerAlign: 'center'
  },
  {
    field: 'flagged',
    headerName: 'Blocked',
    width: 150,
    renderCell: CenteredBooleanCell,
    headerAlign: 'center'
  },
  {
    field: 'isAboveSle',
    headerName: 'Above SLE',
    width: 150,
    renderCell: CenteredBooleanCell,
    headerAlign: 'center'
  },
  {
    field: 'isStale',
    headerName: 'Stale',
    width: 150,
    renderCell: CenteredBooleanCell,
    headerAlign: 'center'
  },
  {
    field: 'state',
    headerName: 'State',
    width: 150,
    renderCell: CenteredCell,
    headerAlign: 'center'
  },
  {
    field: 'assignedTo',
    headerName: 'Assigned To',
    width: 200,
    renderCell: CenteredCell,
    headerAlign: 'center'
  },
  {
    field: 'arrivalDate',
    headerName: 'Arrival Date',
    width: 200,
    renderCell: CenteredDateCell,
    headerAlign: 'center'
  },
  {
    field: 'projectName',
    headerName: 'Project Name',
    width: 200,
    renderCell: CenteredCell,
    headerAlign: 'center'
  },
  {
    field: 'datasourceType',
    headerName: 'Datasource Type',
    width: 200,
    renderCell: CenteredCell,
    headerAlign: 'center'
  },
  {
    field: 'desiredDeliveryDate',
    headerName: 'Desired delivery date',
    width: 200,
    renderCell: CenteredCell,
    headerAlign: 'center'
  },
  {
    field: 'startStatus',
    headerName: 'Start status',
    width: 200,
    renderCell: CenteredCell,
    headerAlign: 'center'
  },
  {
    field: 'optimalStartDateRange',
    headerName: 'Optimal start date range',
    width: 200,
    renderCell: CenteredCell,
    headerAlign: 'center'
  },
  {
    field: 'suggestedClassOfService',
    headerName: 'Suggested Class Of Service',
    width: 200,
    renderCell: CenteredCell,
    headerAlign: 'center'
  }
];
