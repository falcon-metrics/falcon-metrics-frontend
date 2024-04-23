import { FlowOfDemandsData } from "views/ValueStreamManagement/views/DeliveryGovernance/interfaces/flowOfDemands";
import { Throughput } from "./Throughput";

type Props = {
  data: FlowOfDemandsData | null;
  historicalData: any;
  isLoading: boolean;
  isEmpty: boolean;
  isDashboardEdit?: boolean;
};

const ThroughputWrapper = (props: Props) => {
  const { throughput, widgetInformation } = props.data || {};

  return (
    <Throughput
      {...props}
      data={throughput}
      widgetInfo={widgetInformation?.throughput}
      customProps={{
        flowItems: throughput?.items,
        isValidating: props.isLoading,
        perspective: "past",
        modalButtonDisabled: true,
      }}
    />
  );
};

export default ThroughputWrapper;
