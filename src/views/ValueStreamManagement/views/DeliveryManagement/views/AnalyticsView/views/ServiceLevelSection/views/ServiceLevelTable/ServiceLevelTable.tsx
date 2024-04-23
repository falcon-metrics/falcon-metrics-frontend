import { ChangeEvent, useContext, useEffect, useState } from "react";
import { Box } from "@material-ui/core";
import { v4 as uuidv4 } from 'uuid';

import {
  AntTab,
  AntTabs,
} from "views/ValueStreamManagement/components/TabView/TabView";
import { ServiceLevelData } from "../../../../interfaces/serviceLevel";

import ServiceLevelTableSkeleton from "./components/ServiceLevelTableSkeleton";
import { useStyles } from "./ServiceLevelTable.styles";
import { getServiceLevelColumns } from "./config/columns";
import { WidgetInformation } from "views/ValueStreamManagement/views/DeliveryGovernance/interfaces/common";
import { SelectedTabInAccordionContext } from "components/UserStateProvider/UserStateProvider";
import { useSendTelemetry } from "core/api/CustomerTelemetryClient";
import { DrillDownTelemetryAction } from "core/api/telemetry/types";
import { DataGridPro, GridColDef } from "@mui/x-data-grid-pro";
import _ from "lodash";

export interface TableRow {
  [key: string]: any;
}

export interface ServiceLevelTableProps {
  perspective: string;
  data: ServiceLevelData;
  isValidating: boolean;
  widgetInfo?: WidgetInformation[];
  flowLens: ServiceLevelData;
  telemetryAction?: string;
  telemetrySource?: string;
  isObeya?: boolean;
  isFullScreen?: boolean;
}

const ServiceLevelTable = ({
  perspective,
  data,
  isValidating,
  flowLens,
  telemetryAction,
  telemetrySource,
  isObeya,
  isFullScreen,
}: ServiceLevelTableProps) => {
  const classes = useStyles();

  const tabTitles = ["Normalised Demands", "Flow Item Types"];

  const { selectedTab, setSelectedTab: setSelectedTabInUserState } = useContext(
    SelectedTabInAccordionContext
  );
  const FLOW_LENS = "flow-lens";
  let savedValue = 0;
  if (!isObeya) {
    savedValue = selectedTab[FLOW_LENS];
  }

  const [tab, setTab] = useState(savedValue ?? 0);
  const handleTabChange = (_event: ChangeEvent<{}>, newValue: number): void => {
    setTab(newValue);
    if (!isObeya) {
      setSelectedTabInUserState(FLOW_LENS, newValue);
    }
  };

  const { normalisedDemands, workItemTypes } = data || flowLens;
  const isNormalisedDemandsSelected = tab === 0;

  const selectedData = isNormalisedDemandsSelected
    ? (normalisedDemands || []).map(item => ({ ...item, id: uuidv4() })) // If normalisedDemands already contains IDs
    : (workItemTypes || []).filter(x => x.projectId === '').map(x => {
      const matchingWorkItemTypes = workItemTypes.filter(
        i => i.displayName === x.displayName && i.projectId !== ''
      );
      x.serviceLevelExpectationInDaysByProject = matchingWorkItemTypes.map(i => i.serviceLevelExpectationInDays);
      x.targetMetByProject = matchingWorkItemTypes.map(i => i.targetMet);

      // Generate UUID for each object and add it as an 'id' property
      return { ...x, id: uuidv4() };
    });

  const sortedData = _.orderBy(selectedData, obj => obj.displayName);

  const mainColumnLabel = isNormalisedDemandsSelected
    ? "Type of Demand"
    : "Flow Item Type";

  const columns: GridColDef[] = getServiceLevelColumns(
    perspective,
    mainColumnLabel
  );

  /*
   * Telemetry Action
   */
  const sendTelemetry = useSendTelemetry();
  useEffect(() => {
    if (
      telemetryAction ===
      DrillDownTelemetryAction.accessFitnessCriteriaDrillDown
    )
      sendTelemetry(
        DrillDownTelemetryAction.accessFitnessCriteriaDrillDown,
        `${telemetrySource} -> Flow Lens tab`,
        { page: "Flow Lens" }
      );
  }, [sendTelemetry]);

  // Render this component only if the saved value changes.
  // We need a useMemo because this context is used by multiple accordions
  // We dont want this component to re-render when the value required
  // by this accordion doesnt change
  return (
    <Box>
      <Box className={classes.tabsContainer}>
        <AntTabs value={tab} onChange={handleTabChange}>
          {tabTitles.map((title: string, key: number) => (
            <AntTab key={key} label={title} />
          ))}
        </AntTabs>
      </Box>
      <Box
        className={
          classes.tableContainer +
          (isFullScreen ? " " + classes.tableContainerFullScreen : " ")
        }
      >
        {isValidating ? (
          <ServiceLevelTableSkeleton />
        ) : (
          <DataGridPro
            rows={sortedData}
            columns={columns}
            disableColumnReorder={true}
          />
        )}
      </Box>
    </Box>
  );
};

export default ServiceLevelTable;
