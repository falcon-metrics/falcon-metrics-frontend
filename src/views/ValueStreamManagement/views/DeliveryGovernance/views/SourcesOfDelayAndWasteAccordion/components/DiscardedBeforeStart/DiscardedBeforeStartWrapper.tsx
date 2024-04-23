import { DiscardedBeforeStart } from "./DiscardedBeforeStart";
import { SourcesOfDelayAndWasteData } from "views/ValueStreamManagement/views/DeliveryGovernance/interfaces/sourceOfDelay";

type Props = {
  data: SourcesOfDelayAndWasteData | null;
  isLoading: boolean;
  isEmpty: boolean;
  isDashboardEdit?: boolean;
};

const DiscardedBeforeStartWrapper = (props: Props) => {
  const { discardedBeforeStart, widgetInformation } = props.data || {};

  return (
    <DiscardedBeforeStart
      {...props}
      data={discardedBeforeStart}
      widgetInfo={widgetInformation?.discardedBeforeStart}
      customProps={{
        flowItems: discardedBeforeStart?.items,
        isValidating: props.isLoading,
        perspective: "past",
        modalButtonDisabled: true,
        data: discardedBeforeStart?.distribution,
        notConfiguredMessage:
          "Please configure the discarded reason in the datasource settings.",
      }}
    />
  );
};

export default DiscardedBeforeStartWrapper;
