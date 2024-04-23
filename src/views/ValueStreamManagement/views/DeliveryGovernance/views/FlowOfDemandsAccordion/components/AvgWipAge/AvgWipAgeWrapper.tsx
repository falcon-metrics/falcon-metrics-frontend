import { FlowOfDemandsData } from "views/ValueStreamManagement/views/DeliveryGovernance/interfaces/flowOfDemands";
import { AvgWipAge } from "./AvgWipAge";

type Props = {
  data: FlowOfDemandsData | null;
  historicalData: any;
  isLoading: boolean;
  isEmpty: boolean;
  isDashboardEdit?: boolean;
};

const AvgWipAgeWrapper = (props: Props) => {
  const { avgWipAge, widgetInformation } = props.data || {};

  return (
    <AvgWipAge
      {...props}
      data={avgWipAge}
      widgetInfo={widgetInformation?.avgWipAge}
    />
  );
};

export default AvgWipAgeWrapper;
