import { Box, Tabs, Tab, Divider, Grid } from "@material-ui/core";
import { useSendTelemetry } from "core/api/CustomerTelemetryClient";
import { PredictiveAnalysisTelemetryAction } from "core/api/telemetry/types";
import useAuthentication from "hooks/useAuthentication";
import _ from "lodash";
import React, { Fragment, memo, useEffect } from "react";
import ThresholdSubscription from "../Subscription/ThresholdSubscription";
import { Assumptions } from "./components/Assumptions/Assumptions";
import { DeliveryDateAnalysisHistogram } from "./components/Histogram/DeliveryDate/DeliveryDateAnalysisHistogram";
import { ThroughputAnalysisHistogram } from "./components/Histogram/Throughput/ThroughtputAnalysisHistogram";
import { DeliveryDatePredictiveAnalysisDisplay } from "./components/predictionDisplay/DeliveryDatePredictionDisplay/DeliveryDatePredictionDisplay";
import { EmptyResponse } from "./components/predictionDisplay/EmptyResponse/EmptyResponse";
import { ThroughputPredictiveAnalysisDisplay } from "./components/predictionDisplay/ThroughputPredictionDisplay/ThroughputPredictionDisplay";
// import PredictiveAnalysisDisplay from "./components/predictionDisplay";
import Settings from "./components/Settings";
import { SimulationSummary } from "./components/Summary/SimulationSummary";
import useStyles from "./predictiveAnalysis.styles";
import { ObeyaContext } from "./types";
import DashboardCard from "components/Charts/components/DashboardCard/DashboardCard";
import { ChartSizes } from "components/Charts/components/DashboardCard/interfaces/ChartSizes";

interface Props {
  obeyaRoomId?: string;
  predictiveAnalysis: any;
  progressBoards: any;
  forecastingSettings: any;
  focus: any;
  isLoadingObeyaData: boolean;
}

enum AnalysisTabs {
  whenAnalysis = 0,
  howManyAnalysis = 1,
  settings = 2
};

const telemetryTabMap = new Map<
  AnalysisTabs,
  PredictiveAnalysisTelemetryAction
>([
  [AnalysisTabs.whenAnalysis, PredictiveAnalysisTelemetryAction.accessWhen],
  [AnalysisTabs.howManyAnalysis, PredictiveAnalysisTelemetryAction.accessHowMany],
  [AnalysisTabs.settings, PredictiveAnalysisTelemetryAction.accessSettings],
]);

export const PredictiveAnalysis = memo(({ obeyaRoomId,
  predictiveAnalysis,
  progressBoards,
  forecastingSettings,
  focus,
  isLoadingObeyaData }: Props) => {
  const classes = useStyles();

  // const mockData: PredictiveAnalysisResponse = {
  //   "50Percentile": "2021-11-01",
  //   "85Percentile": "2022-01-24",
  //   "98Percentile": "2022-04-13",
  //   desiredDeliveryDate: "2021-12-31",
  //   desiredDeliveryDateConfidenceLevelPercentage: 72,
  // };
  // const mockSettings: SettingsData = {
  //   teamFocusSetting: [
  //     {contextId: 'test-context-1', contextName: 'test-1', focusPercentage: 100},
  //     {contextId: 'test-context-2', contextName: 'test-2', focusPercentage: 100},
  //     {contextId: 'test-context-3', contextName: 'test-3', focusPercentage: 100},
  //     {contextId: 'test-context-4', contextName: 'test-4', focusPercentage: 100},
  //   ]
  // }

  const { isAdmin, isPowerUser } = useAuthentication();

  const sendTelemetry = useSendTelemetry();

  const contexts: ObeyaContext[] = progressBoards.map((board) => ({
    contextId: board.contextId,
    contextName: board.boardName,
  }));

  const [tabValue, setSetValue] = React.useState(0);

  const [analysisData, setAnalysisData] = React.useState(predictiveAnalysis);

  const [settingsData, setSettingsData] = React.useState(forecastingSettings);

  useEffect(() => {
    setAnalysisData(predictiveAnalysis);
    if (!_.isEqual(settingsData, forecastingSettings)) {
      setSettingsData(forecastingSettings);
    }
  }, [predictiveAnalysis, isLoadingObeyaData, forecastingSettings]);

  const handleTabChange = (newValue: number) => {

    setSetValue(newValue);
    const telemetryAction = telemetryTabMap.get(newValue);
    const tabName = Object.keys(AnalysisTabs)[Object.values(AnalysisTabs).indexOf(newValue)];
    if (telemetryAction && tabName)
      sendTelemetry(telemetryAction, `User accessed ${tabName}`, { page: 'obeya', widget: 'predictive-analysis', item: tabName });
  };

  function a11yProps(index: number) {
    return {
      id: `analysis-tab-${index}`,
    };
  }

  return (

    <Box display="flex" flexDirection="column" flexGrow={1}>
      <DashboardCard title={''} size={ChartSizes.full} fullScreen={false} useModalOpenProps={false}>

        <Box className={classes.SelectionBar}>
          <Tabs
            value={tabValue}
            onChange={(_event, value) => handleTabChange(value)}
            aria-label="basic tabs example"
            indicatorColor="primary"
            textColor="primary"
          >
            <Tab label="When - Forecast" {...a11yProps(AnalysisTabs.whenAnalysis)} />
            <Tab label="How many - Forecast" {...a11yProps(AnalysisTabs.howManyAnalysis)} />

            {
              (isAdmin || isPowerUser) && (
                <Tab label="Simulation Settings" {...a11yProps(AnalysisTabs.settings)} />
              )
            }
          </Tabs>
        </Box>
        {tabValue === AnalysisTabs.whenAnalysis && (
          <Box>
            {!isLoadingObeyaData ? (
              <Box className={classes.AnalysisContainer}>
                <Box className={classes.analysisDisplay}>
                  {!analysisData.isEmpty === true ? (
                    <Fragment>
                      <DeliveryDatePredictiveAnalysisDisplay
                        data={analysisData.deliveryDateAnalysis}
                        settingsData={settingsData}
                      />
                      <Assumptions analysisData={analysisData} />
                    </Fragment>
                  ) : (
                    <EmptyResponse message={analysisData.message} />
                  )}
                </Box>

                <Box className={classes.dividerContainer}>
                  <Divider
                    orientation="vertical"
                    className={classes.tallDivider}
                  />
                </Box>
                <Box className={classes.HistogramContainer}>
                  <DeliveryDateAnalysisHistogram
                    histogramData={
                      analysisData.deliveryDateAnalysis.histogramData
                    }
                  />
                  {obeyaRoomId && (
                    <ThresholdSubscription
                      obeyaRoomId={obeyaRoomId}
                      analysisData={analysisData}
                    />
                  )}
                </Box>
              </Box>
            ) : null}
          </Box>
        )}
        {tabValue === AnalysisTabs.howManyAnalysis && (
          <Box>
            {!isLoadingObeyaData ? (
              <Box className={classes.AnalysisContainer}>
                <Box className={classes.analysisDisplay}>
                  {!analysisData.isEmpty === true ? (
                    <Fragment>
                      <ThroughputPredictiveAnalysisDisplay
                        data={analysisData.throughputAnalysis}
                      />
                      <Assumptions analysisData={analysisData} />
                    </Fragment>
                  ) : (
                    <EmptyResponse message={analysisData.message} />
                  )}
                </Box>

                <Box className={classes.dividerContainer}>
                  <Divider
                    orientation="vertical"
                    className={classes.tallDivider}
                  />
                </Box>
                <Box className={classes.HistogramContainer}>
                  <ThroughputAnalysisHistogram
                    histogramData={analysisData.throughputAnalysis.histogramData}
                    obeyaEndDate={analysisData.deliveryDateAnalysis.desiredDeliveryDate}
                  />
                </Box>
              </Box>
            ) : null}
          </Box>
        )}
        {tabValue === AnalysisTabs.settings && (
          <Box className={classes.settingsContainer}>
            {!isLoadingObeyaData && obeyaRoomId ? (
              <Grid container>
                <Grid xs={12} md={6}>

                  <Settings
                    data={settingsData}
                    contexts={contexts}
                    roomId={obeyaRoomId}
                    setAnalysisData={setAnalysisData}
                    setSettingsData={setSettingsData}
                    focus={focus}
                  />

                  {/* <Divider
                    orientation="vertical"
                    className={classes.tallDivider}
                  /> */}
                </Grid>
                {/* <Grid xs={12} md={1}>
                  <Box className={classes.dividerContainer}>
                    <Divider
                      orientation="vertical"
                      className={classes.tallDivider}
                    />
                  </Box>
                </Grid> */}

                <Grid xs={12} md={6} style={{ marginLeft: "-2%", width: "98%" }}>

                  <SimulationSummary
                    data={analysisData.simulationSummary}
                    settingsData={settingsData}
                    setAnalysisData={setAnalysisData}
                    setSettingsData={setSettingsData}
                    roomId={obeyaRoomId}
                    contexts={contexts}
                    simulationAdditionalInfo={analysisData.simulationAdditionalInfo}
                  />
                </Grid>
              </Grid>
            ) : null}
          </Box>
        )}
      </DashboardCard>
    </Box>
  );
});
