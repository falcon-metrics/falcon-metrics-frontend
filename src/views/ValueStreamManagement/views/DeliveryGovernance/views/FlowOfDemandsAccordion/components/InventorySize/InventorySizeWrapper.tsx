import { FlowOfDemandsData } from "views/ValueStreamManagement/views/DeliveryGovernance/interfaces/flowOfDemands";
import { InventorySize } from "./InventorySize";

type Props = {
  data: FlowOfDemandsData | null;
  historicalData: any;
  isLoading: boolean;
  isEmpty: boolean;
  isDashboardEdit?: boolean;
};

const InventorySizeWrapper = (props: Props) => {
  const { inventorySize, widgetInformation } = props.data || {};
  
  return (
    <InventorySize
      {...props}
      data={inventorySize}
      widgetInfo={widgetInformation?.inventorySize}
      customProps={{
        flowItems: inventorySize?.items,
        isValidating: props.isLoading,
        perspective: "future",
        modalButtonDisabled: true,
      }}
    />
  );
};

export default InventorySizeWrapper;
