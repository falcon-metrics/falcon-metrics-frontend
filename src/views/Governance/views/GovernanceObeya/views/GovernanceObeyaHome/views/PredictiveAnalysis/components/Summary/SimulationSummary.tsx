import BaseDataGridStaticColumns from "components/UI/BaseDataGrid/BaseDataGridStaticColumns";

import { Box, makeStyles } from "@material-ui/core";
import ErrorIcon from "@material-ui/icons/Error";
import {
  GridColumnHeaderParams,
  GridColumns,
  GridRenderCellParams,
} from "@mui/x-data-grid-pro";

import {
  DeliveryRateSummaryEachContext,
  DeliveryRateSummaryEachContextDisplay,
  ObeyaContext,
  SettingsData,
  SimulationAdditionalInfo,
  SimulationSummaryData,
} from "../../types";
import { DeliveryRateSampling } from "./DeliveryRateSampling";
import CustomGridPanel from "components/UI/CustomGridPanel";

const useSummaryStyles = makeStyles({
  container: {
    display: "flex",
    width: "90%",
    flexDirection: "column",
    fontFamily: "Open Sans",
    marginLeft: 50
  },
  row: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    marginTop: 5
  },
  remainingWorkContainer: {
    display: "flex",
    width: "55%",
    border: "1px solid #EBECF0",
    flexDirection: "column",
  },
  description: {
    display: "flex",
    color: "rgba(68, 75, 82, 0.52)",
    fontSize: "10px",
    background: "white",
    width: "40%",
    marginBottom: "1.5em",
    marginLeft: "1em",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  negativeMargin: {
    marginTop: "-1em",
  },
  cardsContainer: {
    display: "flex",
    justifyContent: "space-evenly",
    marginBottom: "1em",
  },
  cardColumn: {
    width: "30%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  card: {
    display: "flex",
    width: "60%",
    flexDirection: "column",
    backgroundColor: "#F5F5F5",
    borderRadius: "4px",
    fontFamily: "Open Sans",
    height: "66px",
    justifyContent: "center",
    textAlign: "center",
    paddingBottom: "0.1em",
  },
  mainText: {
    fontSize: "18px",
    fontWeight: "bold",
  },
  secondaryText: {
    fontSize: "11px",
    textAlign: "center",
    marginTop: 2
  },
  footnote: {
    fontSize: "9px",
    color: "rgba(68, 75, 82, 0.54);",
  },
  simulationAmountContainer: {
    width: "42%",
    display: "flex",
    flexDirection: "column",
  },
  simulationAmountCardsContainer: {
    display: "flex",
    width: "100%",
    justifyContent: "space-evenly",
  },
  simulationAmountCard: {
    width: "30%",
    display: "flex",
    marginTop: "7%",
    flexDirection: "column",
    fontWeight: "bold",
    textAlign: "center",
  },
  simulationAmountDisplay: {
    fontSize: "24px",
    verticalAlign: "top",
    display: "flex",
    alignItems: "top",
    justifyContent: "center",
  },
  tableContainer: {
    width: "100%",
    minHeight: "200px",
  },
  dataGrid: {
    border: "0px solid #000 !important",
    width: "100%",
  },
  cell: {
    color: "#444B52",
    fontFamily: "Open Sans",
    fontSize: 12,
  },
  headerColumn: {
    fontFamily: "Open Sans",
    fontSize: 14,
    fontWeigth: "bold",
    color: "#444B52",
  },
  bold: {
    fontWeight: 600,
  },
  tableSection: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    minHeight: 250
  },
});
export interface Props {
  data: SimulationSummaryData;
  contexts: ObeyaContext[];
  simulationAdditionalInfo: SimulationAdditionalInfo;
  settingsData?: SettingsData;
  setAnalysisData?: any;
  setSettingsData?: any;
  roomId: string;
}
const HeaderFormatter = (params: GridColumnHeaderParams) => {
  return (
    <strong style={{ fontSize: 12 }}>
      {params?.colDef?.headerName || "-"}
    </strong>
  );
};
export const SimulationSummary = ({
  data,
  contexts,
  simulationAdditionalInfo,
  settingsData,
  setAnalysisData,
  setSettingsData,
  roomId
}: Props) => {
  const summaryClasses = useSummaryStyles();
  //TODO: bad practice, change it in future;
  const levelKeys = ["portfolio", "team", "individualContributor"];
  const displayRemainingWorkByLevels = (data: SimulationSummaryData) => {
    return levelKeys.map((levelKey) => {
      return (
        <Box
          className={summaryClasses.cardColumn}
          key={`display-card-${levelKey}`}
        >
          <Box className={summaryClasses.card}>
            <Box className={summaryClasses.mainText}>
              {data.adjustedRemainingWorkItemsByLevel[levelKey] || 0}
            </Box>
            <Box className={summaryClasses.secondaryText}>Adjusted</Box>
            <Box className={summaryClasses.footnote}>
              (Original: {data.originalRemainingWorkItemsByLevel[levelKey] || 0}
              )
            </Box>
          </Box>
          <Box
            className={summaryClasses.secondaryText}
            style={{ textTransform: "capitalize" }}
          >
            {levelKey === "individualContributor"
              ? "Individual Contributor"
              : levelKey}{" "}
            Level
          </Box>
        </Box>
      );
    });
  };
  const normalCellFormatter = (fieldName) => (params: GridRenderCellParams) => {
    return (
      <span className={summaryClasses.cell}>
        {`${params?.row?.[fieldName]}` || "-"}
      </span>
    );
  };
  const deliveryRateCellFormatter = (fieldName) => (
    params: GridRenderCellParams
  ) => {
    return (
      <span className={summaryClasses.cell}>
        {`${params?.row?.[fieldName]} flow items / week`}
      </span>
    );
  };
  const getColumns = (): GridColumns => {
    return [
      {
        field: "contextName",
        headerName: "Team",
        renderHeader: HeaderFormatter,
        renderCell: normalCellFormatter("contextName"),
        width: 380,
      },
      {
        field: "original",
        headerName: "Original Delivery Rate",
        renderCell: deliveryRateCellFormatter("original"),
        renderHeader: HeaderFormatter,
        width: 190,
      },
      {
        field: "adjusted",
        headerName: "Adjusted Delivery Rate",
        renderCell: deliveryRateCellFormatter("adjusted"),
        renderHeader: HeaderFormatter,
        width: 190,
      },
    ];
  };
  const flattenData = (
    data: DeliveryRateSummaryEachContext,
    contexts: ObeyaContext[]
  ): DeliveryRateSummaryEachContextDisplay[] => {
    const results: DeliveryRateSummaryEachContextDisplay[] = [];
    Object.keys(data).forEach((contextId) => {
      const context = contexts.find(
        (context) => context.contextId === contextId
      );
      if (context)
        results.push({
          contextId,
          contextName: context.contextName,
          original: data[contextId].original,
          adjusted: data[contextId].adjusted,
        });
    });
    return results;
  };

  const displayContextDeliveryRateTable = (
    data: SimulationSummaryData,
    contexts: ObeyaContext[]
  ) => {
    const tableData = flattenData(data["deliveryRateByContext"], contexts);
    return (
      <Box className={summaryClasses.tableSection}>
        <BaseDataGridStaticColumns
          className={summaryClasses.dataGrid}
          data={tableData}
          columns={getColumns()}
          getRowId={({ contextId }) => contextId}
          boxClassName={summaryClasses.tableContainer}
          customHeight={275}
          hideFooter
          components={{ Panel: CustomGridPanel }}
        // loading={tableData?.length === 0}
        />
      </Box>
    );
  };

  const SimulationAmount = (
    data: number | string,
    description: string,
    asterisk: boolean
  ) => {
    return (
      <Box className={summaryClasses.simulationAmountCard}>
        <Box className={summaryClasses.simulationAmountDisplay}>
          <span>{data} </span>{" "}
          {asterisk && <span style={{ fontSize: "10px" }}>*</span>}
        </Box>
        <Box className={summaryClasses.footnote}>{description}</Box>
      </Box>
    );
  };
  const formatSimulationCount = (simulationCount: number) => {
    if (simulationCount > 1000) {
      return Math.round(simulationCount / 1000).toString() + "K";
    }
    return simulationCount;
  };
  return (
    <Box className={summaryClasses.container}>
      <Box display="flex" flexDirection="column">
        <Box
          className={`${summaryClasses.bold}`}
          aria-label="section-title"
          style={{ fontSize: 14, display: 'flex', justifyContent: 'space-between', marginBottom: 1 }}
        >
          Delivery Rate Sampling
        </Box>
        <DeliveryRateSampling
          simulationData={simulationAdditionalInfo}
          settingsData={settingsData}
          setAnalysisData={setAnalysisData}
          setSettingsData={setSettingsData}
          roomId={roomId}
          contexts={contexts}
        />
        <Box
          className={`${summaryClasses.bold}`}
          aria-label="section-title"
          style={{ fontSize: 14, marginTop: 5 }}
        >
          Simulation Summary
        </Box>
      </Box>
      <Box
        className={summaryClasses.row}
        aria-label="simulation-amount-section"
      >
        <Box className={summaryClasses.simulationAmountContainer}>
          <Box className={summaryClasses.simulationAmountCardsContainer}>
            {SimulationAmount(
              formatSimulationCount(data.simulationCount),
              "Simulations Run",
              false
            )}
            {SimulationAmount(
              data.adjustedRemainingWork,
              "Total remaining work",
              true
            )}
            {SimulationAmount(
              data.averageWeeklyDeliveryRate,
              "Average delivery rate (weekly)",
              true
            )}
          </Box>
          <Box
            className={summaryClasses.description}
            style={{
              marginTop: "1em",
              width: "100%",
              justifyContent: "flex-end",
            }}
          >
            * Adjusted values used in simulation.
          </Box>
        </Box>
        <Box
          className={summaryClasses.remainingWorkContainer}
          aria-label="remaining-workitem-by-level"
        >
          <Box
            className={`${summaryClasses.description} ${summaryClasses.negativeMargin}`}
          >
            Remaining flow items <ErrorIcon fontSize="small" color="primary" />
          </Box>
          <Box className={summaryClasses.cardsContainer}>
            {displayRemainingWorkByLevels(data)}
          </Box>
        </Box>
      </Box>
      <Box className={summaryClasses.row} aria-label="delivery-rate-by-context">
        {displayContextDeliveryRateTable(data, contexts)}
      </Box>
    </Box>
  );
};
