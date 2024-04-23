import Box from '@material-ui/core/Box';
import { FlowEfficiencyOption } from '../../../../../hooks/useFlowAnalysisData';
import { FlowEfficiencyLeftGraph } from './FlowEfficiencyLeftGraph';
import { FlowEfficiencyRightGraph } from './FlowEfficiencyRightGraph';
import { useStyles } from '../FlowEfficiencyWrapper.styles';
import DonutChartSkeleton from 'views/ValueStreamManagement/views/DeliveryManagement/views/AnalyticsView/views/ProfileOfWorkSection/components/DonutChartSkeleton';
import SkeletonBarChart from 'views/ValueStreamManagement/components/SkeletonBarChart';
import { AggregationPeriod } from 'core/api/ApiClient/SummaryClient';
import { useMemo } from 'react';

const isDevelopmentEnv = process.env.NODE_ENV === 'development';

type Props = {
  selectedData: FlowEfficiencyOption | null;
  error?: Error;
  currentDataAggregation: AggregationPeriod;
  isLoading?: boolean;
};

export const FlowEfficiencyGraphPair = ({
  selectedData,
  error,
  currentDataAggregation,
  isLoading,
}: Props) => {
  const classes = useStyles();

  const memorizedTotals = useMemo(() => {
    if (!selectedData || !selectedData.aggregated) {
      return undefined;
    }
    if (selectedData && selectedData.totals && selectedData.totals.activeTime !== 0 && selectedData.totals.activeTime !== null && selectedData.totals.activeTime !== undefined) {
      return selectedData.totals;
    }
    const acc = {
      activeTime: 0,
      waitingTime: 0
    };
    for (const { waitingCount, activeCount } of selectedData.aggregated) {
      acc.waitingTime += typeof waitingCount === 'number' ? waitingCount : 0;
      acc.activeTime += typeof activeCount === 'number' ? activeCount : 0;
    }
    return acc;
  }, [selectedData]);

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

  const leftGraph = isLoading ? <DonutChartSkeleton /> : (
    <FlowEfficiencyLeftGraph
      data={memorizedTotals}
    />
  );

  const rightGraph = isLoading ? <SkeletonBarChart /> : (
    <FlowEfficiencyRightGraph
      data={!selectedData ? undefined : selectedData.aggregated}
      currentDataAggregation={currentDataAggregation}
    />
  );

  return <>
    <Box className={classes.graphContainer}>
      <Box flexBasis="40%">{leftGraph}</Box>
      <Box flexBasis="60%">{rightGraph}</Box>
    </Box>
    <Box className={classes.labelFooter} style={{ display: isLoading ? 'none' : 'flex' }}>
      <div className={classes.label}>
        <div className={classes.circle} style={{ backgroundColor: '#2AD2C9' }}></div>
        <div>Value-adding time</div>
      </div>
      <div className={classes.label}>
        <div className={classes.circle} style={{ backgroundColor: '#E1523E' }}></div>
        <div>Waiting time</div>
      </div>
    </Box>
  </>;
};

