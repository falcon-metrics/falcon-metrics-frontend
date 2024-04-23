import { DiscardedAfterStart } from "./DiscardedAfterStart";
import { SourcesOfDelayAndWasteData } from "views/ValueStreamManagement/views/DeliveryGovernance/interfaces/sourceOfDelay";

type Props = {
  data: SourcesOfDelayAndWasteData | null;
  isLoading: boolean;
  isEmpty: boolean;
  isDashboardEdit?: boolean;
};

const DiscardedAfterStartWrapper = (props: Props) => {
  const { discardedAfterStart, widgetInformation } = props.data || {};

  return (
    <DiscardedAfterStart
      {...props}
      data={discardedAfterStart}
      widgetInfo={widgetInformation?.discardedAfterStart}
      customProps={{
        flowItems: discardedAfterStart?.items,
        isValidating: props.isLoading,
        perspective: "past",
        modalButtonDisabled: true,
        data: discardedAfterStart?.distribution,
        notConfiguredMessage:
          "Please configure the discarded reason in the datasource settings.",
        // Display active time in the flow items table. It is hidden by default
        displayActiveTime: true,
      }}
    />
  );
};

export default DiscardedAfterStartWrapper;
