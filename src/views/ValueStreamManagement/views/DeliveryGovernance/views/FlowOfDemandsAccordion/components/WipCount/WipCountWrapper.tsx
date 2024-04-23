import { FlowOfDemandsData } from "views/ValueStreamManagement/views/DeliveryGovernance/interfaces/flowOfDemands";
import { WipCount } from "./WipCount";

type Props = {
  data: FlowOfDemandsData | null;
  historicalData: any;
  isLoading: boolean;
  isEmpty: boolean;
  isDashboardEdit?: boolean;
};

const WipCountWrapper = (props: Props) => {
  const { wipCount, widgetInformation } = props.data || {};

  return (
    <WipCount
      {...props}
      data={wipCount}
      widgetInfo={widgetInformation?.wipCount}
      customProps={{
        flowItems: wipCount?.items,
        isValidating: props.isLoading,
        perspective: "present",
        modalButtonDisabled: true,
      }}
    />
  );
};

export default WipCountWrapper;
