import { TimeToCommit } from "./TimeToCommit";
import { FlowOfDemandsData } from "views/ValueStreamManagement/views/DeliveryGovernance/interfaces/flowOfDemands";

type Props = {
  data: FlowOfDemandsData | null;
  historicalData: any;
  isLoading: boolean;
  isEmpty: boolean;
  isDashboardEdit?: boolean;
};

const TimeToCommitWrapper = (props: Props) => {
  const { timeToCommit, widgetInformation } = props.data || {};

  return (
    <TimeToCommit
      {...props}
      data={timeToCommit}
      widgetInfo={widgetInformation?.timeToCommit}
    />
  );
};

export default TimeToCommitWrapper;
