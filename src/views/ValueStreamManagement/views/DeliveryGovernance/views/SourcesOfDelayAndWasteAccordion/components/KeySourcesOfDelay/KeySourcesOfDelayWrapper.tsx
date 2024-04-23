import { KeySourcesOfDelay } from "./KeySourcesOfDelay";
import { SourcesOfDelayAndWasteData } from "views/ValueStreamManagement/views/DeliveryGovernance/interfaces/sourceOfDelay";

type Props = {
  data: SourcesOfDelayAndWasteData | null;
  isLoading: boolean;
  isEmpty: boolean;
  isDashboardEdit?: boolean;
};

const KeySourcesOfDelayWrapper = (props: Props) => {
  const { keySourcesOfDelay, widgetInformation } = props.data || {};

  return (
    <KeySourcesOfDelay
      {...props}
      data={keySourcesOfDelay}
      widgetInfo={widgetInformation?.keySourcesOfDelay}
    />
  );
};

export default KeySourcesOfDelayWrapper;
