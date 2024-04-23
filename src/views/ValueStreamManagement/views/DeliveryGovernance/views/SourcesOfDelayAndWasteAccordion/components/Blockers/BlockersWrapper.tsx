import { Blockers } from "./Blockers";
import { SourcesOfDelayAndWasteData } from "views/ValueStreamManagement/views/DeliveryGovernance/interfaces/sourceOfDelay";

type Props = {
  data: SourcesOfDelayAndWasteData | null;
  isLoading: boolean;
  isEmpty: boolean;
  isDashboardEdit?: boolean;
};

const BlockersWrapper = (props: Props) => {
  const { blockers, widgetInformation } = props.data || {};

  return (
    <Blockers
      {...props}
      data={blockers}
      widgetInfo={widgetInformation?.blockers}
      customProps={{
        flowItems: blockers?.items,
        isValidating: props.isLoading,
        perspective: "present",
        modalButtonDisabled: true,
        data: blockers?.distribution,
        notConfiguredMessage:
          "Please configure the blocked reason in the datasource settings.",
      }}
    />
  );
};

export default BlockersWrapper;
