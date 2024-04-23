import Box from '@material-ui/core/Box';
import { ChartSizes } from 'components/Charts/components/DashboardCard/interfaces/ChartSizes';
import DashboardCard from 'components/Charts/components/DashboardCard/DashboardCard';
import InflowOutflowWrapper from './components/InflowOutflow/InflowOutflowWrapper';
import DemandCapacityWrapper from './components/DemandCapacity/DemandCapacityWrapper';
import { FlowOfDemandsBodyResponse } from '../../hooks/useFlowOfDemandData';
import 'components/Charts/components/DashboardCard/DashboardCardSizes.css';
import { AggregationPeriod } from 'core/api/ApiClient/SummaryClient';
import NoDataPanel from 'views/ValueStreamManagement/components/NoDataPanel/NoDataPanel';
import ExtendedTooltip from 'views/ValueStreamManagement/components/ExtendedTooltip';

type Props = {
  historical: FlowOfDemandsBodyResponse | null;
  isLoading: boolean;
  currentDataAggregation: AggregationPeriod;
  error?: Error;
  isEmpty?: boolean;
};

const isDevelopmentEnv = process.env.NODE_ENV === 'development';

const FlowOfDemandsAccordionContent = ({
  historical,
  error,
  isLoading,
  currentDataAggregation,
  isEmpty,
}: Props) => {
  const demandVsCapacityWidgetInfo = historical?.demandVsCapacityWidgetInfo;
  const inflowVsOutflowWidgetInfo = historical?.inflowVsOutflowWidgetInfo;

  if (error) {
    if (isDevelopmentEnv) {
      return <Box display="flex" justifyContent="center" width="100%" padding="100px 0px">
        <div style={{ color: 'darkred' }}>Error: {error.message}</div>
      </Box>;
    }
    return <Box display="flex" justifyContent="center" width="100%" padding="100px 0px">
      <div style={{ color: 'darkred' }}>There was an error while fetching data for this widget</div>
    </Box>;
  }
  return (
    <Box className="full-width-chart">
      <Box className="obeya-container charts-page-grid" style={{ padding: '13px 4px' }}>
        <DashboardCard
          title="Demand vs Capacity"
          modalButtonDisabled={false}
          size={ChartSizes.fixed2}
        >{
            isEmpty ? <Box height={500} display="flex" alignItems="center"><NoDataPanel /></Box> : (
              <DemandCapacityWrapper
                historical={historical && historical.demandVsCapacity ? historical.demandVsCapacity : undefined}
                isLoading={isLoading}
                currentDataAggregation={currentDataAggregation}
              />
            )
          }

          {!isLoading && demandVsCapacityWidgetInfo?.length !== 0 ?
            <ExtendedTooltip maxWidth="md" content={demandVsCapacityWidgetInfo} /> : <></>}

        </DashboardCard>
        <DashboardCard
          title="Work Started vs Work Completed"
          modalButtonDisabled={false}
          size={ChartSizes.fixed2}
        >{
            isEmpty ? <Box height={500} display="flex" alignItems="center"><NoDataPanel /></Box> : (
              <InflowOutflowWrapper
                historical={historical && historical.inflowVsOutflow ? historical.inflowVsOutflow : undefined}
                isLoading={isLoading}
                currentDataAggregation={currentDataAggregation}
              />
            )
          }

          {!isLoading && inflowVsOutflowWidgetInfo?.length !== 0 ?
            <ExtendedTooltip maxWidth="md" content={inflowVsOutflowWidgetInfo} /> : <></>}
        </DashboardCard>
      </Box>
    </Box>
  );
};

export default FlowOfDemandsAccordionContent;