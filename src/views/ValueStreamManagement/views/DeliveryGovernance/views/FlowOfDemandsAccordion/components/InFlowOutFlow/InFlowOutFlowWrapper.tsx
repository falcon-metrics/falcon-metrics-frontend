import { DataAggregations } from "views/Dashboard/views/Platform/views/FilterPanel/contexts/FilterPanelContext/interfaces";
import { FlowOfDemandsData } from "views/ValueStreamManagement/views/DeliveryGovernance/interfaces/flowOfDemands";
import { InFlowOutFlow } from "./InFlowOutFlow";

type Props = {
  data: FlowOfDemandsData | null;
  historicalData: any;
  isLoading: boolean;
  isEmpty: boolean;
  currentDataAggregation?: DataAggregations;
  isDashboardEdit?: boolean;
};

const InFlowVsOutFlowWrapper = (props: Props) => {
  const { inflowVsOutflow, widgetInformation } = props.data || {};

  return (
    <InFlowOutFlow
      {...props}
      data={inflowVsOutflow}
      widgetInfo={widgetInformation?.inFlowVsOutFlow}
      customProps={{
        historical: props.historicalData?.inflowVsOutflow,
        currentDataAggregation: props.currentDataAggregation,
      }}
    />
  );
};

export default InFlowVsOutFlowWrapper;
