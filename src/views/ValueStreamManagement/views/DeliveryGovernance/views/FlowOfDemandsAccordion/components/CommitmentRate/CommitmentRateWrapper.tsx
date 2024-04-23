import { FlowOfDemandsData } from "views/ValueStreamManagement/views/DeliveryGovernance/interfaces/flowOfDemands";
import { CommitmentRate } from "./CommitmentRate";

type Props = {
  data: FlowOfDemandsData | null;
  historicalData: any;
  isLoading: boolean;
  isEmpty: boolean;
  isDashboardEdit?: boolean;
};

const CommitmentRateWrapper = (props: Props) => {
  const { commitmentRate, widgetInformation } = props.data || {};
  
  return (
    <CommitmentRate
      {...props}
      data={commitmentRate}
      widgetInfo={widgetInformation?.commitmentRate}
    />
  );
};

export default CommitmentRateWrapper;
