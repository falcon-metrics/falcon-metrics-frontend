import { AggregationPeriod } from 'core/api/ApiClient/SummaryClient';
import Box from '@material-ui/core/Box';
import { FlowOfDemandsRightWidgetData } from "../../../../hooks/useFlowOfDemandData";
import InflowOutflowGraph from './InflowOutflowGraph';
import SkeletonBarChart from 'views/ValueStreamManagement/components/SkeletonBarChart';

type Props = {
  historical?: FlowOfDemandsRightWidgetData;
  currentDataAggregation: AggregationPeriod;
  isLoading: boolean;
}

function InflowOutflowWrapper({
  historical,
  currentDataAggregation,
  isLoading,
}: Props) {
  return (
    <Box display="flex" flexDirection="column" alignItems="flex-start">
      {/* <Box marginLeft="50px">
        <IndicatorView
          isLoading={isLoading}
          inflow={data?.totalInflow || 0}
          outflow={data?.totalOutflow || 0}
          inflowOverOutflowPercent={data?.inflowOverOutflowPercent || 0}
          wipGrowth={data?.wipGrowth || 0}
          graphAtTheRight={true}
        />
      </Box> */}
      <div style={{flexBasis:"100%", width:"100%"}}>{
        isLoading ? <SkeletonBarChart /> : <InflowOutflowGraph
          inflow={historical?.inflowOverTime || []}
          outflow={historical?.outflowOverTime || []}
          currentDataAggregation={currentDataAggregation}
        />
      }</div>
    </Box>
  )
}

export default InflowOutflowWrapper;