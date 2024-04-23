import { FlowDebt } from "./FlowDebt";
import { SourcesOfDelayAndWasteData } from "views/ValueStreamManagement/views/DeliveryGovernance/interfaces/sourceOfDelay";

type Props = {
  data: SourcesOfDelayAndWasteData | null;
  isLoading: boolean;
  isEmpty: boolean;
  isDashboardEdit?: boolean;
};

const FlowDebtWrapper = (props: Props) => {
  const { flowDebt, widgetInformation } = props.data || {};

  return (
    <FlowDebt
      {...props}
      data={flowDebt}
      widgetInfo={widgetInformation?.flowDebt}
    />
  );
};

export default FlowDebtWrapper;
