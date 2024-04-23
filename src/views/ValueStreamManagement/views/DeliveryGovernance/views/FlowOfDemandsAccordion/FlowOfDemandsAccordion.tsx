import { ReactNode } from 'react';

import {
  useValueStreamManagementStyles
} from 'views/ValueStreamManagement/ValueStreamManagement.styles';

import Box from '@material-ui/core/Box';

import { useFilterPanelContext } from 'views/Dashboard/views/Platform/views/FilterPanel/contexts/FilterPanelContext/useFilterPanelContext';
import { useFlowOfDemandsContinuousImprovements } from 'views/ValueStreamManagement/views/ContinuousImprovements/hooks/useFlowOfDemandData';
import { useFlowOfDemandsDeliveryGovernance } from '../../hooks/useFlowOfDemands';
import DemandVsCapacityWrapper from './components/DemandVsCapacity/DemandVsCapacityWrapper';
import InFlowVsOutFlowWrapper from './components/InFlowOutFlow/InFlowOutFlowWrapper';
import InventorySizeWrapper from './components/InventorySize/InventorySizeWrapper';
import CommitmentRateWrapper from './components/CommitmentRate/CommitmentRateWrapper';
import TimeToCommitWrapper from './components/TimeToCommit/TimeToCommitWrapper';
import WipCountWrapper from './components/WipCount/WipCountWrapper';
import AvgWipAgeWrapper from './components/AvgWipAge/AvgWipAgeWrapper';
import ThroughputWrapper from './components/Throughput/ThroughputWrapper';

type IndicatorsGroupProps = {
  children: ReactNode;
};

const IndicatorsGroup = ({ children }: IndicatorsGroupProps) => {
  return <Box >{children}</Box>;
};

const FlowOfDemandsAccordion = () => {

  const globalStyles = useValueStreamManagementStyles();
  const { safeAggregation: currentDataAggregation } = useFilterPanelContext();
  const { data: flowOfDemandsData, isLoading: isFlowOfDemandsLoading, isEmptyData } = useFlowOfDemandsDeliveryGovernance();
  const widgetInformation = flowOfDemandsData?.widgetInformation;
  const { data: flowOfDemandsHistoricalData, isLoading: flowOfDemandsHistoricalLoading } = useFlowOfDemandsContinuousImprovements();
  const isLoading = isFlowOfDemandsLoading || flowOfDemandsHistoricalLoading;
  const isEmpty = !isLoading && isEmptyData;
  // TODO: Implement the error screen
  // const _error = (error1 !== undefined) || (error2 !== undefined);

  const props = {
    data: flowOfDemandsData,
    historicalData: flowOfDemandsHistoricalData,
    isLoading: isFlowOfDemandsLoading,
    isEmpty,
    currentDataAggregation,
    widgetInformation,
  };

  return (
    <Box>
      <Box className={`fitness-criteria-page-grid ${globalStyles.threeColumns}}`}>
        <DemandVsCapacityWrapper {...props} />
        <InFlowVsOutFlowWrapper {...props} />
      </Box>
      <Box className={`fitness-criteria-page-grid ${globalStyles.threeColumns}}`}>
        <IndicatorsGroup>
          <InventorySizeWrapper {...props} />
        </IndicatorsGroup>
        <IndicatorsGroup>
          <CommitmentRateWrapper {...props} />
        </IndicatorsGroup>
        <IndicatorsGroup>
          <TimeToCommitWrapper {...props} />
        </IndicatorsGroup>
        <IndicatorsGroup>
          <WipCountWrapper {...props} />
        </IndicatorsGroup>
        <IndicatorsGroup>
          <AvgWipAgeWrapper {...props} />
        </IndicatorsGroup>
        <IndicatorsGroup>
          <ThroughputWrapper {...props} />
        </IndicatorsGroup>
      </Box>
    </Box>
  );
};

export default FlowOfDemandsAccordion;