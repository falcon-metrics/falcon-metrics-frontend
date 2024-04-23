import { GridColDef } from '@mui/x-data-grid-pro';
import { HeaderFormatter } from 'views/ValueStreamManagement/views/DeliveryGovernance/views/PerformanceCheckpointAccordion/usePerformanceCheckpoints';
import CenteredCell from 'components/UI/CenteredCell';

export const getServiceLevelFutureColumns = (mainColumnLabel: string): GridColDef[] => {
  const serviceLevelColumns: GridColDef[] = [
    { 
      field: 'displayName',
      headerName: mainColumnLabel,
      minWidth: 700,
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
