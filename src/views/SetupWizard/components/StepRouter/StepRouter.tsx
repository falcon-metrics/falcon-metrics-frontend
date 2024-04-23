import { Redirect, RouteComponentProps } from 'react-router-dom';

import { useEffect } from 'react';
import { WizardRouteParams } from '../../interfaces/WizardRouteParams';
import { StepConfig } from '../../interfaces/StepConfig';
import { useWizardContext } from '../../contexts/useWizardContext';
import {
  stepIsCompatibleWithParams,
  getPreviousStepsWereConfigured,
} from '../../utils/utils';

export type RouteProps = RouteComponentProps<WizardRouteParams>;

type Props = RouteProps & {
  stepConfigs: Readonly<StepConfig[]>;
};

export const StepRouter = ({ match, stepConfigs }: Props) => {
  const {
    generateWizardPath,
    highestValidStepVisited,
    setIsSubmitted,
    setIsDirty,
    setIsSubmitting,
    ...params
  } = useWizardContext();

  useEffect(() => {
    setIsSubmitted(false);
    setIsDirty(false);
    setIsSubmitting(false);
  }, [params.step, setIsSubmitted, setIsDirty, setIsSubmitting]);

  const selectedStep = stepConfigs.find(({ step }) => step === params.step);

  if (!selectedStep) {
    return null;
  }

  const stepIndex = stepConfigs.indexOf(selectedStep);

  const isValidStep =
    stepIsCompatibleWithParams(selectedStep, params) &&
    getPreviousStepsWereConfigured(params, stepIndex, highestValidStepVisited);

  if (isValidStep) {
    const Component = selectedStep?.component;
    return <Component key={params.step} match={match} />;
  }

  const stepToRedirect =
    selectedStep?.stepToRedirectIfIncompatible ??
    stepConfigs[highestValidStepVisited].step;
  const path = generateWizardPath({ step: stepToRedirect });
  return <Redirect to={path} />;
};
