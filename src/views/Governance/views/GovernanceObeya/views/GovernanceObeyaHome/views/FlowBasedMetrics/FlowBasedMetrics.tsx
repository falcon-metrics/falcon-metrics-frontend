import { memo } from 'react';
import useSummaryTable, {
  summaryTableComponentByPeriod,
} from 'hooks/useSummaryTable';
import Box from '@material-ui/core/Box';
import PeriodSelector from 'components/PeriodSelectorProvider/components/PeriodSelector';
import {
  defaultPeriod,
  useSelectedPeriod,
} from 'components/PeriodSelectorProvider/PeriodSelectorProvider';
import DashboardCard from 'components/Charts/components/DashboardCard/DashboardCard';

const CustomSummaryChoice = () => {
  const { currentPeriodType, setSelectedPeriod } = useSelectedPeriod();
  return (
    <Box
      display="flex"
      alignItems="flext-start"
      justifyContent="flex-start"
      ml={3}
      mt={1}
      mb={-2}
    >
      <PeriodSelector
        setSelectedPeriod={setSelectedPeriod}
        selectedPeriod={currentPeriodType}
      />
    </Box>
  );
};

interface Props {
  obeyaRoomId?: string;
  demoDataIsSelected?: boolean;
}

const FlowBasedMetrics = memo(({ obeyaRoomId, demoDataIsSelected }: Props) => {
  const { currentPeriodType } = useSelectedPeriod();
  const { data, loading } = useSummaryTable(
    obeyaRoomId,
    currentPeriodType || defaultPeriod,
  );

  const TableComponent = summaryTableComponentByPeriod[currentPeriodType];
  const tableData = data?.summaryTable?.[currentPeriodType] || [];

  return (
    <DashboardCard
      title="Flow-based Metrics"
      isLoading={loading}
      fixedContent={<CustomSummaryChoice />}
    >
      <TableComponent
        data={tableData}
        demoDataIsSelected={demoDataIsSelected}
      />
    </DashboardCard>
  );
});

export default FlowBasedMetrics;
