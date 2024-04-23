import {
  DiscardedAfterStartTabComponents,
  DiscardedAfterStartTabComponentsWithoutReason,
  DiscardedAfterStartTabs,
  DiscardedAfterStartTabsWithoutReason,
} from "views/ValueStreamManagement/components/DrillDown/TabSettings";
import IndicatorCard from "views/ValueStreamManagement/views/DeliveryGovernance/components/IndicatorCard/IndicatorCard";
import { WidgetInformation } from "views/ValueStreamManagement/views/DeliveryGovernance/interfaces/common";
import { DiscardedAfterStartWidgetData } from "views/ValueStreamManagement/views/DeliveryGovernance/interfaces/sourceOfDelay";

import KPIView from "./components/KPIView";
import { Box } from "@material-ui/core";

type Props = {
  isLoading: boolean;
  data?: DiscardedAfterStartWidgetData;
  widgetInfo?: WidgetInformation[];
  isEmpty?: boolean;
  customProps?: any;
  isDashboardEdit?: boolean;
  isWidgetPreview?: boolean;
};

export const DiscardedAfterStart = ({
  isLoading,
  data,
  widgetInfo,
  isEmpty,
  customProps,
  isDashboardEdit,
  isWidgetPreview,
}: Props) => {
  if (!isWidgetPreview) {
    const tabComponents: React.ReactNode[] = customProps.data
      ? DiscardedAfterStartTabComponents
      : DiscardedAfterStartTabComponentsWithoutReason;
    const tabViewTitles = customProps.data
      ? DiscardedAfterStartTabs
      : DiscardedAfterStartTabsWithoutReason;

    return (
      <IndicatorCard
        title="Discontinued Work"
        isWideCard={true}
        isEmpty={!isLoading && (isEmpty || data === undefined)}
        widgetInfo={!isLoading ? widgetInfo : []}
        isVisible={true}
        tabComponents={tabComponents}
        tabViewTitles={tabViewTitles}
        customProps={customProps}
        isLoading={isLoading}
        isDashboardEdit={isDashboardEdit}
      >
        <KPIView
          isLoading={isLoading}
          discardedAfterCommitment={data?.discardedCount}
          activeDaysSpent={data?.activeDaysSpent}
        />
      </IndicatorCard>
    );
  } else {
    return (
      <IndicatorCard title="Discontinued Work" hideWidgetInfo isWideCard={true}>
        <Box width={540}>
          <KPIView
            isLoading={isLoading}
            discardedAfterCommitment={0}
            activeDaysSpent={0}
          />
        </Box>
      </IndicatorCard>
    );
  }
};
