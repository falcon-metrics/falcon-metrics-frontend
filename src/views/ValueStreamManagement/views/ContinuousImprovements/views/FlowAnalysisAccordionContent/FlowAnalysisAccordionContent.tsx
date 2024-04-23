import Box from '@material-ui/core/Box';
import DashboardCard from 'components/Charts/components/DashboardCard/DashboardCard';
import 'components/Charts/components/DashboardCard/DashboardCardSizes.css';
import { ChartSizes } from 'components/Charts/components/DashboardCard/interfaces/ChartSizes';
import useFilterPanelContext from 'views/Dashboard/views/Platform/views/FilterPanel/contexts/FilterPanelContext';
import ExtendedTooltip from 'views/ValueStreamManagement/components/ExtendedTooltip';
import { useFlowAnalysisData } from '../../hooks/useFlowAnalysisData';
import FlowEfficiencyWrapper from './components/FlowEfficiency/FlowEfficiencyWrapper';
import TimeInStageWrapper from './components/TimeInStage/TimeInStageWrapper';


const FlowAnalysisAccordionContent = () => {
  const { safeAggregation: currentDataAggregation } = useFilterPanelContext();
  const { data, error, isLoading, isEmptyData } = useFlowAnalysisData();
  const flowEfficiencyWidgetInfo = data?.flowEfficiencyWidgetInfo;
  const timeInStageWidgetInfo = data?.timeInStageWidgetInfo;

  return (
    <Box className="full-width-chart">
      <Box className="obeya-container charts-page-grid" style={{ padding: '13px 4px', gridTemplateColumns: 'repeat(3, 1fr)' }}>
        <DashboardCard
          title="Efficiency Analysis by Completed Work and Work in Progress"
          modalButtonDisabled={false}
          size={ChartSizes.fixed2}
        >
          <FlowEfficiencyWrapper
            flowEfficiencyData={!data ? undefined : data.flowEfficiency}
            isLoading={isLoading}
            error={error}
            currentDataAggregation={(currentDataAggregation?.toLowerCase() || 'weeks') as any}
            isEmpty={isEmptyData}
          />
          {!isLoading && flowEfficiencyWidgetInfo?.length !== 0 ?
            <ExtendedTooltip maxWidth="md" content={flowEfficiencyWidgetInfo} /> : <></>}
        </DashboardCard>
        <DashboardCard
          title="Time in Stage Analytics"
          modalButtonDisabled={false}
          size={ChartSizes.fixed1}
        >
          <TimeInStageWrapper
            isLoading={isLoading}
            timeInStageData={!data ? undefined : data.timeInStage}
            error={error}
            isEmpty={isEmptyData}
          />
          {!isLoading && timeInStageWidgetInfo?.length !== 0 ?
            <ExtendedTooltip maxWidth="md" content={timeInStageWidgetInfo} /> : <></>}
        </DashboardCard>
      </Box>
    </Box>
  );
};

export default FlowAnalysisAccordionContent;