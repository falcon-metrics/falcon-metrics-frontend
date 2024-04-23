import { useEffect, useMemo, useState } from 'react';
import Box from '@material-ui/core/Box';

import {
  FlowEfficiencyOption,
} from '../../../../hooks/useFlowAnalysisData';
import ChoiceGroupArrivalType from './components/ChoiceGroupArrivalType';
import { ChoiceGroupPerspective } from './components/ChoiceGroupPerspective';
import { useStyles } from './FlowEfficiencyWrapper.styles';
import { FlowEfficiencyGraphPair } from './components/FlowEfficiencyGraphPair';
import ZeroState from 'components/ZeroState/ZeroState';
import { AggregationPeriod } from 'core/api/ApiClient/SummaryClient';
import { useSendTelemetry } from 'core/api/CustomerTelemetryClient';
import { DrillDownTelemetryAction } from 'core/api/telemetry/types';

type Props = {
  flowEfficiencyData?: FlowEfficiencyOption[];
  error?: Error;
  currentDataAggregation: AggregationPeriod;
  isLoading?: boolean;
  isEmpty?: boolean;
  telemetryAction?: string;
  telemetrySource?: string;
};

const FlowEfficiencyWrapper = ({
  flowEfficiencyData,
  error,
  currentDataAggregation,
  isLoading,
  isEmpty,
  telemetryAction,
  telemetrySource
}: Props) => {
  const classes = useStyles();
  const [includeArrival, setIncludeArrival] = useState<'include' | 'exclude'>('exclude');
  const [perspective, setPerspective] = useState<'inprogress' | 'completed'>('completed');

  /*
  * Telemetry Action
  */
  const sendTelemetry = useSendTelemetry();
  useEffect(() => {
    if (telemetryAction === DrillDownTelemetryAction.accessFitnessCriteriaDrillDown)
      sendTelemetry(DrillDownTelemetryAction.accessFitnessCriteriaDrillDown,
        `${telemetrySource} -> Flow Efficiency tab`, { page: "Flow Analysis - Flow Efficiency" });
  }, [sendTelemetry]);

  // Find from the list of options the currently selected flowEfficiencyData
  const selectedData: FlowEfficiencyOption | null = useMemo(() => {
    if (!flowEfficiencyData) {
      return null;
    }
    for (const option of flowEfficiencyData) {
      if (perspective === option.perspective && includeArrival === option.includeArrival) {
        return option;
      }
    }
    return null;
  }, [flowEfficiencyData, perspective, includeArrival]);


  return (
    <Box>
      <Box className={classes.choiceContainer}>
        <Box>
          <ChoiceGroupArrivalType
            defaultSelectedKey={includeArrival}
            onFilterChange={setIncludeArrival}
          />
        </Box>
        <Box marginLeft="15px">
          <ChoiceGroupPerspective
            defaultSelectedKey={perspective}
            onFilterChange={setPerspective}
          />
        </Box>
      </Box>
      {
        (isEmpty && !isLoading)
          ? <ZeroState />
          : <FlowEfficiencyGraphPair
            selectedData={selectedData}
            error={error}
            currentDataAggregation={currentDataAggregation}
            isLoading={isLoading}
          />
      }
    </Box>
  );
};

export default FlowEfficiencyWrapper;
