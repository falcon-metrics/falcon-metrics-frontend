import { AggregationPeriod } from "core/api/ApiClient/SummaryClient";
import Box from "@material-ui/core/Box";
import { FlowOfDemandsLeftWidgetData } from "../../../../hooks/useFlowOfDemandData";
import DemandCapacityGraph from "./DemandCapacityGraph";
import SkeletonBarChart from "views/ValueStreamManagement/components/SkeletonBarChart";

type Props = {
  historical?: FlowOfDemandsLeftWidgetData;
  isLoading: boolean;
  currentDataAggregation: AggregationPeriod;
};

function DemandCapacityWrapper({
  historical,
  isLoading,
  currentDataAggregation,
}: Props) {
  return (
    <Box display="flex" flexDirection="column" alignItems="flex-start">
      {/* <Box marginLeft="50px">
      <IndicatorView
        isLoading={isLoading}
        demand={data?.totalDemand || 0}
        capacity={data?.totalCapacity || 0}
        demandOverCapacityPercent={data?.demandOverCapacityPercent || 0}
        inventoryGrowth={data?.inventoryGrowth || 0}
        graphAtTheRight={true}
      />
    </Box> */}
      <div style={{ flexBasis: "100%", width: "100%" }}>
        {isLoading ? (
          <SkeletonBarChart />
        ) : (
          <DemandCapacityGraph
            demand={historical?.demandOverTime || []}
            capacity={historical?.capacityOverTime || []}
            currentDataAggregation={currentDataAggregation}
          />
        )}
      </div>
    </Box>
  );
}

export default DemandCapacityWrapper;
