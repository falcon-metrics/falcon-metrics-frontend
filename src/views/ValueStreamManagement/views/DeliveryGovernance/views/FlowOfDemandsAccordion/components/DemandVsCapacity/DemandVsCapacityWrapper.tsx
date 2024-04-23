import { FlowOfDemandsData } from "views/ValueStreamManagement/views/DeliveryGovernance/interfaces/flowOfDemands";
import { DemandVsCapacity } from "./DemandVsCapacity";
import { DataAggregations } from "views/Dashboard/views/Platform/views/FilterPanel/contexts/FilterPanelContext/interfaces";

type Props = {
  data: FlowOfDemandsData | null;
  historicalData: any;
  isLoading: boolean;
  isEmpty: boolean;
  currentDataAggregation?: DataAggregations;
  isDashboardEdit?: boolean;
};

const DemandVsCapacityWrapper = (props: Props) => {
  const { demandVsCapacity, widgetInformation } = props.data || {};

  return (
    <DemandVsCapacity
      {...props}
      data={demandVsCapacity}
      widgetInfo={widgetInformation?.demandVsCapacity}
      customProps={{
        historical: props.historicalData?.demandVsCapacity,
        currentDataAggregation: props.currentDataAggregation,
      }}
    />
  );
};

export default DemandVsCapacityWrapper;
