import { DelayedItems } from "./DelayedItems";
import { SourcesOfDelayAndWasteData } from "views/ValueStreamManagement/views/DeliveryGovernance/interfaces/sourceOfDelay";

type Props = {
  data: SourcesOfDelayAndWasteData | null;
  isLoading: boolean;
  isEmpty: boolean;
  isDashboardEdit?: boolean;
};

const DelayedItemsWrapper = (props: Props) => {
  const { delayedItems, widgetInformation } = props.data || {};

  return (
    <DelayedItems
      {...props}
      data={delayedItems}
      widgetInfo={widgetInformation?.delayedItems}
      customProps={{
        flowItems: delayedItems?.items,
        isValidating: props.isLoading,
        perspective: "present",
        modalButtonDisabled: true,
      }}
    />
  );
};

export default DelayedItemsWrapper;
