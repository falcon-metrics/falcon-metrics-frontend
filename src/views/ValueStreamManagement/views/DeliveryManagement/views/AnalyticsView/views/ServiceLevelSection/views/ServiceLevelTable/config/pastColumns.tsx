
import { GridColDef } from '@mui/x-data-grid-pro';
import CenteredCell from 'components/UI/CenteredCell';
import { HeaderFormatter } from 'views/ValueStreamManagement/views/DeliveryGovernance/views/PerformanceCheckpointAccordion/usePerformanceCheckpoints';
import CenteredTrendCell from 'components/UI/CenteredTrendCell';
import CenteredSLECell from 'components/UI/CenteredSLECell';
import CenteredTextCell from 'components/UI/CenteredTextCell';
import CenteredTargetMetCell from 'components/UI/CenteredTargetMetCell';
import CenteredArrayCell from 'components/UI/CenteredArrayCell';

export const getServiceLevelPastColumns = (mainColumnLabel: string): GridColDef[] => {
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
      headerName: 'Lead Time Target Met',
      minWidth: 220,
      renderHeader: HeaderFormatter,
      renderCell: (params) => (
        <CenteredTargetMetCell {...params} targetMetByProject={params.row['targetMetByProject']} />
      ),
    },
    {
      field: 'trendAnalysisSLE',
      headerName: 'Trend',
      minWidth: 135,
      renderHeader: HeaderFormatter,
      renderCell: CenteredTrendCell
    },
    {
      field: 'predictability',
      headerName: 'Predictability',
      minWidth: 160,
      renderHeader: HeaderFormatter,
      renderCell:  CenteredTextCell
    },
    {
      field: 'mode',
      headerName: 'Mode(s)',
      minWidth: 135,
      renderHeader: HeaderFormatter,
      renderCell: CenteredArrayCell
    },
    {
      field: 'median',
      headerName: 'Median',
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
      field: 'percentile85',
      headerName: '85th %ile',
      minWidth: 135,
      renderHeader: HeaderFormatter,
      renderCell: (params) => (
        <CenteredCell {...params} unit="days" />
      ), 
    },
    {
      field: 'tail',
      headerName: '98th %ile',
      minWidth: 135,
      renderHeader: HeaderFormatter,
      renderCell: (params) => (
        <CenteredCell {...params} unit="days" />
      ), 
    },
  ];

  return serviceLevelColumns;
}
