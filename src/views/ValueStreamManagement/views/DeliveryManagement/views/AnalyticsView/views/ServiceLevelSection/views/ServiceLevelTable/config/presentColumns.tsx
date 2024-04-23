import { GridColDef } from '@mui/x-data-grid-pro';
import { HeaderFormatter } from 'views/ValueStreamManagement/views/DeliveryGovernance/views/PerformanceCheckpointAccordion/usePerformanceCheckpoints';
import CenteredCell from 'components/UI/CenteredCell';
import CenteredSLECell from 'components/UI/CenteredSLECell';
import CenteredTargetMetCell from 'components/UI/CenteredTargetMetCell';

export const getServiceLeveLPresentColumns = (mainColumnLabel: string): GridColDef[] => {
  const serviceLevelColumns: GridColDef[] = [
    { 
      field: 'displayName',
      headerName: mainColumnLabel,
      minWidth: 300,
      renderHeader: HeaderFormatter,
      renderCell: CenteredCell
    },
    {
      field: 'count',
      headerName: 'Count',
      minWidth: 120,
      renderHeader: HeaderFormatter,
      renderCell: CenteredCell
    },
    {
      field: 'serviceLevelExpectationInDays',
      headerName: 'Expected Lead Time',
      minWidth: 220,
      renderHeader: HeaderFormatter,
      renderCell: (params) => (
        <CenteredSLECell {...params} serviceLevelExpectationInDaysByProject={params.row['serviceLevelExpectationInDaysByProject']} />
      ),
    },
    {
      field: 'targetMet',
      headerName: 'WIP within Target',
      minWidth: 200,
      renderHeader: HeaderFormatter,
      renderCell: (params) => (
        <CenteredTargetMetCell {...params} targetMetByProject={params.row['targetMetByProject']} />
      ),
    },
    {
      field: 'min',
      headerName: 'Min',
      minWidth: 135,
      renderHeader: HeaderFormatter,
      renderCell: (params) => (
        <CenteredCell {...params} unit="days" />
      ), 
    },
    {
      field: 'average',
      headerName: 'Average',
      minWidth: 135,
      renderHeader: HeaderFormatter,
      renderCell: (params) => (
        <CenteredCell {...params} unit="days" />
      ), 
    },
    {
      field: 'max',
      headerName: 'Max',
      minWidth: 135,
      renderHeader: HeaderFormatter,
      renderCell: (params) => (
        <CenteredCell {...params} unit="days" />
      ),
    },
  ];

  return serviceLevelColumns;
}
