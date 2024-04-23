import { useFilterPanelContext } from "views/Dashboard/views/Platform/views/FilterPanel/contexts/FilterPanelContext/useFilterPanelContext";
import { useFlowItemsData } from "../../hooks/useFlowItemsData";
import FlowItemsSection from "./FlowItemsSection";

type Props = {
  isDashboardEdit?: boolean;
  isWidgetPreview?: boolean;
};

const FlowItemsWrapper = ({ isDashboardEdit, isWidgetPreview }: Props) => {
  const {
    appliedFilters,
    selectedFilters,
    apiQueryParameters,
  } = useFilterPanelContext();

  const perspective = selectedFilters["perspective"] ?? "board";

  const {
    flowItems,
    flowItemsWidgetInfo,
  } = useFlowItemsData(appliedFilters, apiQueryParameters);

  return (
    <FlowItemsSection
      perspective={perspective}
      flowItems={flowItems}
      isValidating={false}
      widgetInfo={flowItemsWidgetInfo}
      isWidgetPreview={isWidgetPreview}
      isDashboardEdit={isDashboardEdit}
    />
  );
};

export default FlowItemsWrapper;
