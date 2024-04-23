import { StaleWork } from "./StaleWork";
import { SourcesOfDelayAndWasteData } from "views/ValueStreamManagement/views/DeliveryGovernance/interfaces/sourceOfDelay";

type Props = {
  data: SourcesOfDelayAndWasteData | null;
  isLoading: boolean;
  isEmpty: boolean;
  isDashboardEdit?: boolean;
};

const StaleWorkWrapper = (props: Props) => {
  const { staleWork, widgetInformation } = props.data || {};

  return (
    <StaleWork
      {...props}
      data={staleWork}
      widgetInfo={widgetInformation?.staleWork}
      customProps={{
        flowItems: staleWork?.items,
        isValidating: props.isLoading,
        perspective: "present",
        modalButtonDisabled: true,
      }}
    />
  );
};

export default StaleWorkWrapper;
