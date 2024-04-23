import {
  useSendTelemetry,
} from 'core/api/CustomerTelemetryClient';
import { TelemetryActions } from 'core/api/telemetry/types';
import { useCallback } from 'react';
import { StepKeys } from '../interfaces/WizardRouteParams';

type WizardTelemetryData = {
  configuredAction?: TelemetryActions;
  accessedAction?: TelemetryActions;
};

const wizardTelemetryKeys: Record<StepKeys, WizardTelemetryData | undefined> = {
  [StepKeys.provider]: undefined,
  [StepKeys.datasource]: {
    configuredAction: 'ConfiguredDatasource',
    accessedAction: 'AccessedDatasource',
  },
  [StepKeys.workItemTypes]: {
    configuredAction: 'ConfiguredWorkItemTypes',
    accessedAction: 'AccessedWorkItemTypes',
  },
  [StepKeys.projects]: {
    configuredAction: 'ConfiguredProjects',
    accessedAction: 'AccessedProjects',
  },
  [StepKeys.contexts]: {
    configuredAction: 'ConfiguredBoardsAndAggregations',
    accessedAction: 'AccessedBoardsAndAggregations',
  },
  [StepKeys.customfields]: {
    configuredAction: 'ConfiguredCustomFields',
    accessedAction: 'AccessedCustomFields',
  },
  [StepKeys.settings]: {
    configuredAction: 'ConfiguredDatasourceSettings',
    accessedAction: 'AccessedDatasourceSettings',
  },
  [StepKeys.normalisation]: {
    configuredAction: 'ConfiguredNormalization',
    accessedAction: 'AccessedNormalization',
  },
  [StepKeys.summary]: {
    configuredAction: 'ConfirmedSummaryPage',
    accessedAction: 'AccessedSummaryPage',
  },
  [StepKeys.success]: {
    accessedAction: 'FinishedCreateDatasource',
  },
  [StepKeys.cardTypes]: {
    configuredAction: 'ConfiguredCardTypes',
    accessedAction: 'AccessedCardTypes',
  },
  [StepKeys.workflows]: {
    configuredAction: 'ConfiguredWorkflows',
    accessedAction: 'AccessedWorkflows',
  },
  [StepKeys.redirect]: undefined,
};

const useSendTelemetryWizard = (step: StepKeys) => {
  const sendTelemetry = useSendTelemetry();
  const telemetryKeys = wizardTelemetryKeys[step];

  const actions = {
    sendTelemetryAccessed: useCallback(() => {
      if (telemetryKeys?.accessedAction) {
        sendTelemetry(telemetryKeys.accessedAction, `User accessed ${step}`, {
          page: 'settings-wizard',
          widget: step,
        });
      }
    }, [telemetryKeys, sendTelemetry, step]),
    sendTelemetryConfigured: useCallback(
      (wasSuccessful: boolean, data?: any) => {
        if (telemetryKeys?.configuredAction) {
          const message = `User configured ${step}${
            wasSuccessful
              ? ` with data ${JSON.stringify(data)}`
              : ` unsuccessfully: ${data}`
          }`;
          sendTelemetry(telemetryKeys.configuredAction, message, {
            page: 'settings-wizard',
            widget: step,
          });
        }
      },
      [telemetryKeys, sendTelemetry, step],
    ),
  };

  return actions;
};

export default useSendTelemetryWizard;
