import { useEffect, useState, useRef } from "react";
import { Box } from "@material-ui/core";
import {
  DataGridPro,
  GridColumns,
  GridRowsProp,
  GridToolbarExport,
} from "@mui/x-data-grid-pro";

import DashboardCard from "components/Charts/components/DashboardCard/DashboardCard";
import { ChartSizes } from "components/Charts/components/DashboardCard/interfaces/ChartSizes";
import { ErrorMessageInfo } from "components/Charts/components/DashboardCard/views/Content/components/ErrorMessage";
import { DEFAULT_EMPTY_DATA_TEXT } from "views/ValueStreamManagement/utils/constants";

import { isFlowItemsDataEmpty } from "../../utils/validation/isFlowItemsDataEmpty";
import { FlowItemsEntry } from "../../interfaces/flowItems";
import { generateColumns } from "./config/generateColumns";
import { convertFlowItemToRow, reorderColumns } from "./utils/utils";
import { useStyles } from "./FlowItemsSection.styles";
import ExtendedTooltip from "views/ValueStreamManagement/components/ExtendedTooltip";
import FlowItemsTableSkeleton from "./components/FlowItemsTableSkeleton/FlowItemsTableSkeleton";
import { WidgetInformation } from "views/ValueStreamManagement/views/DeliveryGovernance/interfaces/common";
import { DrillDownTelemetryAction } from "core/api/telemetry/types";
import { useSendTelemetry } from "core/api/CustomerTelemetryClient";
import ExtendedCardDialog from "views/ValueStreamManagement/components/ExtendedCardDialog";
import _ from "lodash";
import CustomGridPanel from "components/UI/CustomGridPanel";

export const flowItemPreviewData = [
  {
    "Class of Service": "Standard",
    "Test Data": "null",
    "Test Data 2": "null",
    "Test Data 3": "Yes",
    "Blocked Reason": "null",
    "Discarded Reason": "null",
    Triage: "F3",
    "Feature Set": "null",
    "Falcon Metrics Container": "null",
    "Test Data 4": "null",
    "Due date": "null",
    workItemId: "FLO-2377",
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    assignedTo: "John Doe",
    flomatikaWorkItemTypeName: "Feature",
    state: "Done",
    arrivalDate: "2023-10-16T11:26:48.632+11:00",
    commitmentDate: "2024-01-08T22:01:11.277+11:00",
    departureDate: "2024-01-30T13:35:42.633+11:00",
    serviceLevelExpectationInDays: 14,
    itemAge: 16,
    "age%OfSLE": 1.1428571428571428,
    activeTime: 7.0938246759259265,
    flowEfficiency: 32.76748665698359,
    waitingTime: 14.555149351851853,
    flomatikaWorkItemTypeLevel: "Team",
    isDelayed: false,
    isAboveSle: true,
    isStale: false,
    flagged: false,
  },
  {
    "Class of Service": "Standard",
    "Test Data": "null",
    "Test Data 2": "null",
    "Test Data 3": "null",
    "Blocked Reason": "null",
    "Discarded Reason": "null",
    Triage: "F0",
    "Feature Set": "null",
    "Falcon Metrics Container": "null",
    "Test Data 4": "null",
    "Due date": "null",
    workItemId: "FLO-4571",
    title:
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
    assignedTo: "Jane Doe",
    flomatikaWorkItemTypeName: "Initiative",
    state: "Done",
    arrivalDate: "2023-10-04T11:45:18.247+11:00",
    commitmentDate: "2023-10-16T09:31:39.861+11:00",
    departureDate: "2024-01-15T10:37:49.989+11:00",
    serviceLevelExpectationInDays: 120,
    itemAge: 66,
    "age%OfSLE": 0.55,
    activeTime: 14.442939687500001,
    flowEfficiency: 100,
    flomatikaWorkItemTypeLevel: "Portfolio",
    isDelayed: false,
    isAboveSle: false,
    isStale: false,
    flagged: true,
    suggestedClassOfService: "Lorem ipsum",
  },
];

export interface FlowItemsProps {
  flowItems: FlowItemsEntry[];
  isValidating: boolean;
  changeLoading?: (_: boolean) => void;
  perspective: string;
  widgetInfo?: WidgetInformation[];
  error?: Error;
  modalButtonDisabled?: boolean;
  telemetryAction?: string;
  telemetrySource?: string;
  isWidgetPreview?: boolean;
  isDashboardEdit?: boolean;
  displayActiveTime?: boolean;
}

const isDevelopmentEnv = process.env.NODE_ENV === "development";

const isSameArray = (oldColumns: string[], newColumns: string[]) =>
  _.zip(oldColumns, newColumns).every(
    (pair) => pair.length === 2 && pair[0] === pair[1]
  );

const FlowItemsSection = ({
  flowItems,
  isValidating,
  changeLoading,
  perspective,
  widgetInfo,
  error,
  modalButtonDisabled = false,
  telemetryAction,
  telemetrySource,
  isWidgetPreview,
  isDashboardEdit,
  displayActiveTime
}: FlowItemsProps) => {
  const demoDataIsSelected = false;
  const SAVED_COLUMNS_KEY = `flow-items-columns-perspective-${perspective}`;

  const classes = useStyles();

  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
  useEffect(() => {
    if (!changeLoading) return;
    changeLoading(isValidating ?? false);
  }, [isValidating]);

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
        `${telemetrySource} -> Flow Items tab`,
        { page: "Flow Items" }
      );
  }, [sendTelemetry]);

  // Prepare Chart Data
  const chartRows: GridRowsProp = flowItems.map(convertFlowItemToRow);
  const originalColumns: GridColumns = generateColumns(flowItems, perspective, displayActiveTime);

  const isDataEmpty: boolean = !isValidating && isFlowItemsDataEmpty(flowItems);

  const noDataErrorInfo = new ErrorMessageInfo(
    DEFAULT_EMPTY_DATA_TEXT,
    isDataEmpty
  );
  const serverErrorInfo = new ErrorMessageInfo(
    isDevelopmentEnv
      ? error
        ? error.message
        : "Unknown error loading the data"
      : "Something went wrong while loading the data on this accordion",
    !!error
  );
  const errorMessages: ErrorMessageInfo[] = [noDataErrorInfo, serverErrorInfo];

  const itemCount =
    !isValidating && flowItems && !isDataEmpty
      ? `${flowItems.length} flow items`
      : "";

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedWorkItemId, setSelectedWorkItemId] = useState<any>();
  const columnsRef = useRef<undefined | string[]>(undefined);

  let columns = [...originalColumns];
  // Check if the order is saved. If saved, use that order
  if (localStorage.getItem(SAVED_COLUMNS_KEY) !== null) {
    columns = reorderColumns(
      columns,
      JSON.parse(localStorage.getItem(SAVED_COLUMNS_KEY) as string)
    );
  }

  if (!isWidgetPreview) {
    return (
      <Box className="full-width-chart">
        <DashboardCard
          title={itemCount}
          size={ChartSizes.full}
          waterMarkIsVisible={demoDataIsSelected}
          errorMessagesInfo={errorMessages}
          isLoading={isValidating}
          hideDefaultLoadingAnimation={true}
          modalButtonDisabled={modalButtonDisabled}
          fullScreen={true}
          useModalOpenProps={true}
          isModalOpenProps={isFullScreen}
          setIsModalOpenProps={setIsFullScreen}
          isDashboardEdit={isDashboardEdit}
        >
          {!isValidating && flowItems ? (
            <Box
              className={
                classes.container +
                (isFullScreen ? " " + classes.containerFullScreen : " ")
              }
            >
              <DataGridPro
                rows={chartRows}
                columns={columns}
                getRowId={({ workItemId }) => workItemId}
                onCellClick={(params) => {
                  if (params.field === "workItemId") {
                    setSelectedWorkItemId(params.value || null);
                    setModalIsOpen(true);
                  } else {
                    setSelectedWorkItemId(null);
                    setModalIsOpen(false);
                  }
                }}
                components={{
                  Footer: (props) => {
                    return (
                      <div className={classes.gridToolbarExport}>
                        <GridToolbarExport {...props} />
                      </div>
                    );
                  },
                  Panel: CustomGridPanel,
                }}
                onStateChange={(gridState) => {
                  if (
                    !gridState.isScrolling &&
                    gridState.columnReorder.dragCol !== ""
                  ) {
                    const oldColumns = columnsRef.current;
                    const newColumns = gridState.columns.all;
                    const originalColumnNames = originalColumns.map(
                      (c) => c.field
                    );

                    if (oldColumns === undefined) {
                      columnsRef.current = newColumns;
                    } else if (
                      !isSameArray(oldColumns, newColumns) &&
                      !isSameArray(originalColumnNames, newColumns)
                    ) {
                      columnsRef.current = newColumns;
                      localStorage.setItem(
                        SAVED_COLUMNS_KEY,
                        JSON.stringify(newColumns)
                      );
                    }
                  }
                }}
              />
            </Box>
          ) : (
            <FlowItemsTableSkeleton />
          )}

          {!isDashboardEdit &&
            !isValidating &&
            (widgetInfo?.length !== 0 && widgetInfo !== undefined ? (
              <ExtendedTooltip maxWidth="md" content={widgetInfo} />
            ) : (
              <></>
            ))}
        </DashboardCard>

        {selectedWorkItemId && perspective && (
          <ExtendedCardDialog
            perspective={perspective}
            open={modalIsOpen}
            setOpen={setModalIsOpen}
            selectedWorkItemId={selectedWorkItemId}
          />
        )}
      </Box>
    );
  } else {
    return (
      <DashboardCard title={"1 flow item"} isWidgetPreview>
        <Box width={875} height={350}>
          <DataGridPro
            rows={flowItemPreviewData}
            columns={columns}
            getRowId={({ workItemId }) => workItemId}
            onStateChange={(gridState) => {
              if (
                !gridState.isScrolling &&
                gridState.columnReorder.dragCol !== ""
              ) {
                const oldColumns = columnsRef.current;
                const newColumns = gridState.columns.all;
                const originalColumnNames = originalColumns.map((c) => c.field);

                if (oldColumns === undefined) {
                  columnsRef.current = newColumns;
                } else if (
                  !isSameArray(oldColumns, newColumns) &&
                  !isSameArray(originalColumnNames, newColumns)
                ) {
                  columnsRef.current = newColumns;
                  localStorage.setItem(
                    SAVED_COLUMNS_KEY,
                    JSON.stringify(newColumns)
                  );
                }
              }
            }}
          />
        </Box>
      </DashboardCard>
    );
  }
};

export default FlowItemsSection;
