import fetch, { useCustomSWR } from 'core/api/fetch';
import { generatePath } from 'react-router-dom';
import { StepConfig } from '../interfaces/StepConfig';
import {
  WizardRouteParams,
  StepKeys,
  WizardAction,
  pathParamsStructure,
} from '../interfaces/WizardRouteParams';

export const getRelativeStep = (
  orderedStepConfigs: StepConfig[],
  offset: number,
  step: StepKeys,
) => {
  const stepKeys = orderedStepConfigs.map((s) => s.step);
  const currentStepIndex = stepKeys.indexOf(step);
  const newIndex = Math.max(
    Math.min(currentStepIndex + offset, stepKeys.length - 1),
    0,
  );
  return orderedStepConfigs[newIndex];
};
export function getBackAndNextPath(
  orderedStepConfigs: StepConfig[],
  params: WizardRouteParams,
) {
  const { step = StepKeys.provider } = params;
  const relativeSteps = getRelativeSteps(orderedStepConfigs, step);
  return relativeSteps.map((stepConfig) => {
    const isValid =
      stepConfig && stepIsCompatibleWithParams(stepConfig, params);
    return isValid && stepConfig
      ? getStepPath(stepConfig.step, params)
      : undefined;
  }) as [string?, string?];
}
export const getRelativeSteps = (
  orderedStepConfigs: StepConfig[],
  currentStep: StepKeys,
) => {
  const backAndNextOffsets = [-1, 1];
  return backAndNextOffsets.map((offset) =>
    getRelativeStep(orderedStepConfigs, offset, currentStep),
  ) as [StepConfig, StepConfig];
};

export function getPreviousStepsWereConfigured(
  params: WizardRouteParams,
  i: number,
  highestValidStepVisited: number,
) {
  const isEdit = params.action === WizardAction.edit;
  const previousStepsWereConfigured = isEdit || i <= highestValidStepVisited;
  return previousStepsWereConfigured;
}

export function getStepPaths(
  orderedStepConfigs: StepConfig[],
  params: WizardRouteParams,
) {
  return orderedStepConfigs.map((stepConfig) => ({
    ...stepConfig,
    url: getStepPath(stepConfig.step, params),
  }));
}

export function getStepPath(step: StepKeys, params: WizardRouteParams) {
  const url = generatePath(pathParamsStructure, {
    action: params.action,
    namespace: params.namespace,
    provider: params.provider,
    step,
  });
  return url;
}

type RouteParamsKeys<T> = T extends undefined ? [] : Array<keyof T>;

export const SpecialCriteria = {
  MUST_BE_EMPTY: (value: any) => !value,
  MUST_NOT_BE_EMPTY: (value: any) => !!value,
};
export const stepIsCompatibleWithParams = (
  step: StepConfig,
  params: WizardRouteParams,
) => {
  const requiredKeys = Object.keys(step.routeParams ?? {}) as RouteParamsKeys<
    typeof step.routeParams
  >;
  const requiredKeysAreCompatible = !requiredKeys.some((k) => {
    const requiredValue = step.routeParams?.[k];
    const isCompatible =
      params[k] === requiredValue ||
      (typeof requiredValue === 'function' && requiredValue(params[k])) ||
      requiredValue === undefined;
    return !isCompatible;
  });
  return requiredKeysAreCompatible;
};

export const getStepIndex = (
  orderedStepConfigs: StepConfig[],
  step?: StepKeys,
) => (step ? orderedStepConfigs.map((s) => s.step).indexOf(step) : 0);


export const useSeedData = () => {
  const url = 'create-seed-data';
  const fetcher = () => fetch.post(url);
  const { error } = useCustomSWR(url, fetcher);
  if (error) {
    console.error('Error calling create-seed-data. error: ', error);
  }
};