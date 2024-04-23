import { useHistory } from "react-router";
import { useValueStreamManagementTab } from "views/ValueStreamManagement/hooks/useValueStreamManagementTab";

import { Pivot, PivotItem } from "@fluentui/react";

import { ValueStreamManagementPages } from "../../ValueStreamManagementRoute";
import {
  useSendTelemetry,
} from "core/api/CustomerTelemetryClient";
import { ValueStreamManagementIndexes } from "utils/routes";
import { TelemetryValueStreamManagementNavigationActions } from "core/api/telemetry/types";

export function getTabId(itemKey: string) {
  return `ShapeColorPivot_${itemKey}`;
}

const pageKeyActionMap: Map<
  ValueStreamManagementIndexes,
  TelemetryValueStreamManagementNavigationActions
> = new Map<
  ValueStreamManagementIndexes,
  TelemetryValueStreamManagementNavigationActions
>([
  [
    ValueStreamManagementIndexes.ValueStreamManagementContinuousImprovements,
    TelemetryValueStreamManagementNavigationActions.accessContinuousImprovements,
  ],
  [
    ValueStreamManagementIndexes.ValueStreamManagementDeliveryGovernance,
    TelemetryValueStreamManagementNavigationActions.accessDeliveryGovernance,
  ],
  [
    ValueStreamManagementIndexes.ValueStreamManagementDeliveryManagement,
    TelemetryValueStreamManagementNavigationActions.accessDeliveryManagement,
  ],
]);

const NavigationBar = () => {
  const sendTelemetry = useSendTelemetry();
  const history = useHistory();
  const handleLinkClick = (item?: PivotItem) => {
    if (!item) {
      return;
    }
    history.push(item.props.itemKey + history.location.search);
    if(item.props.itemKey){
      const telemetryAction = pageKeyActionMap.get(item.props.itemKey as ValueStreamManagementIndexes)
      telemetryAction && sendTelemetry(telemetryAction, `User accessed ${item.props.headerText}`, {page: item.props.itemKey});
    }
  };
  const tab = useValueStreamManagementTab();

  return (
    <div className="navigation-container" data-tour="perspective-of-flow">
      <Pivot
        aria-label="Separately Rendered Content Pivot Example"
        selectedKey={tab}
        onLinkClick={handleLinkClick}
        headersOnly={true}
        getTabId={getTabId}
        linkFormat="links"
        linkSize="normal"
      >
        {ValueStreamManagementPages.map(([name, key]) => (
          <PivotItem key={key} headerText={name} itemKey={key} />
        ))}
      </Pivot>
    </div>
  );
};

export default NavigationBar;
