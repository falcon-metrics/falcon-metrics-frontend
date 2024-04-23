import { Box, Button, Snackbar, Grid } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { useForecastingSettings } from "views/Governance/views/GovernanceObeya/hooks/useForecastingSettings";
import {
  ObeyaContext,
  PredictiveAnalysisResponse,
  SettingsData,
  TeamFocusRowData,
} from "../../types";
import TeamFocus from "./components/teamFocus";
import TeamPerformance from "./components/teamPerformance";
import WorkExpansion from "./components/WorkExpansion";
import WorkItemLevel from "./components/WorkItemLevel";
import useSettingsStyles from "./settings.styles";
import { usePredctiveAnalysis } from "views/Governance/views/GovernanceObeya/hooks/usePredictiveAnalysis";
import useAuthentication from "hooks/useAuthentication";
import { useSendTelemetry } from "core/api/CustomerTelemetryClient";
import { PredictiveAnalysisTelemetryAction } from "core/api/telemetry/types";
import PredictiveAnalysisPrecision from "./components/PredictiveAnalysisPrecision";
export interface Props {
  data: SettingsData;
  focus: any;
  contexts: ObeyaContext[];
  roomId: string;
  setAnalysisData: React.Dispatch<
    React.SetStateAction<PredictiveAnalysisResponse>
  >;
  setSettingsData: React.Dispatch<React.SetStateAction<SettingsData>>;
}
//TODO: improve this method
const mergeContextCapacity = (
  validContexts: ObeyaContext[],
  contextCapacitySetting: SettingsData["contextCapacity"]
): SettingsData["contextCapacity"] => {
  //merge context capacity with context passed in
  const mergedContextCapacity = validContexts.map(
    (context: ObeyaContext): TeamFocusRowData => {
      let capacityPercentage =
        contextCapacitySetting.find(
          (capacity) => capacity.contextId === context.contextId
        )?.capacityPercentage;
      if (capacityPercentage === null || capacityPercentage === undefined) {
        capacityPercentage = 75;
      }
      return {
        ...context,
        capacityPercentage,
      };
    }
  );
  return mergedContextCapacity;
};
const settingsDataAreEqual = (a: SettingsData, b: SettingsData) => {
  const settingsEqual = _.isEqual(a, b);
  const contextCapacityEqual = _.isEqual(a.contextCapacity, b.contextCapacity);
  return settingsEqual && contextCapacityEqual;
};
export default function Settings({
  data,
  contexts,
  roomId,
  setAnalysisData,
  setSettingsData,
  focus
}: Props) {
  const defaultData = {
    ...data,
    contextCapacity: mergeContextCapacity(contexts, data.contextCapacity),
  };

  const [settingData, setSettings] = React.useState<SettingsData>({
    ...defaultData,
  });
  const [edited, setEdited] = React.useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [successAlertOpen, setSuccessAlertOpen] = useState<boolean>(false);
  const [errorAlertOpen, setErrorAlertOpen] = useState<boolean>(false);
  const [infoAlertOpen, setInfoAlertOpen] = useState<boolean>(false);
  const settingsClasses = useSettingsStyles();
  
  const sendTelemetry = useSendTelemetry();
  useEffect(() => {
    if (!settingsDataAreEqual(defaultData, settingData)) {
      setEdited(true);
    }
  }, [settingData]);
  const handleShowSuccessAlert = () => setSuccessAlertOpen(true);
  const handleShowInfoAlert = () => setInfoAlertOpen(true);
  const handleShowErrorAlert = () => setErrorAlertOpen(true);
  const { isAdmin, isPowerUser } = useAuthentication();
  const restrictedToApply = !(isAdmin || isPowerUser);
  const handleCloseAlert = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setSuccessAlertOpen(false);
    setErrorAlertOpen(false);
  };

  const { postAndMutateSettings } = useForecastingSettings(roomId);
  const { getPredictiveAnalysis } = usePredctiveAnalysis(roomId);
  const onSave = async () => {
    setSubmitting(true);
    try {
      setMessage("Your changes are being saved...");
      handleShowInfoAlert();
      const newSettingsData = await postAndMutateSettings(settingData);
      setInfoAlertOpen(false);
      setMessage("Settings saved, applying to analysis");
      handleShowSuccessAlert();
      setSettingsData(newSettingsData as SettingsData);
      const data = await getPredictiveAnalysis();
      sendTelemetry(
        PredictiveAnalysisTelemetryAction.updateSettings,
        `User updated forecasting settings to ${JSON.stringify(
          newSettingsData
        )}`,
        { page: 'obeya', widget: 'predictive-analysis', item: 'settings' }
      );
      setAnalysisData(data);
      setMessage("New settings applied on analysis");
      handleShowSuccessAlert();
      setSubmitting(false);
      setEdited(false);
    } catch (error) {
      setSubmitting(false);
      setMessage("Updating forecasting settings encountered an error");
      handleShowErrorAlert();
    }
  };

  return (
    <Box className={settingsClasses.settingContainer}>
      <Box className={settingsClasses.settingDataContainer}>
        <Box
          className={`${settingsClasses.settingPanelContainer}`}
        >
          <WorkItemLevel
            settings={settingData}
            onSettingsChange={setSettings}
          />
          <Box
            className={`${settingsClasses.heading} ${settingsClasses.heading1} `}
          >
            What-If analysis
          </Box>

          <Box display="flex" flexDirection="row">
            {/* <Grid xs={12} md={6}> */}
              <PredictiveAnalysisPrecision
                settings={settingData}
                onSettingsChange={setSettings}
              />
            {/* </Grid>
            <Grid xs={12} md={6}> */}
              <WorkExpansion
                settings={settingData}
                onSettingsChange={setSettings}
              />
            {/* </Grid> */}
          </Box>
          <Grid xs={12}>
            <TeamPerformance
              onSettingsChange={setSettings}
              teamPerformance={settingData.teamPerformancePercentage}
            />
          </Grid>
        </Box>

        <TeamFocus
          data={settingData.contextCapacity.sort((a, b) =>
            a.contextName <= b.contextName ? -1 : 1
          )}
          onSettingsChange={setSettings}
          focus={focus}
        />
      </Box>
      <Box className={settingsClasses.buttonRow}>
        <Button
          variant="contained"
          color="primary"
          onClick={onSave}
          disabled={restrictedToApply || !edited || submitting}
        >
          {" "}
          APPLY{" "}
        </Button>
      </Box>
      <Snackbar
        open={infoAlertOpen}
        autoHideDuration={4000}
        onClose={handleCloseAlert}
      >
        <Alert onClose={handleCloseAlert} severity="info">
          {message}
        </Alert>
      </Snackbar>
      <Snackbar
        open={successAlertOpen}
        autoHideDuration={4000}
        onClose={handleCloseAlert}
      >
        <Alert onClose={handleCloseAlert} severity="success">
          {message}
        </Alert>
      </Snackbar>
      <Snackbar
        open={errorAlertOpen}
        autoHideDuration={4000}
        onClose={handleCloseAlert}
      >
        <Alert onClose={handleCloseAlert} severity="error">
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
