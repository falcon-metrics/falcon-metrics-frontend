import { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Stepper from '@material-ui/core/Stepper';

import { useWizardContext } from './contexts/useWizardContext';
import {
  pathParamsStructure,
  StepKeys,
  WizardAction,
} from './interfaces/WizardRouteParams';
import PageHeader from 'components/PageHeader';
import NextLoading, { Loading } from 'components/UI/LinearProgress';
import StepRouter from './components/StepRouter/StepRouter.data';
import WizardLink from './components/WizardLink/WizardLink';
import {
  getPreviousStepsWereConfigured,
  getStepPaths,
  stepIsCompatibleWithParams,
  getStepIndex,
} from './utils/utils';
import { stepConfigs } from './interfaces/StepConfig';
import React from 'react';
import useAuthentication from 'hooks/useAuthentication';

const Unavailable = React.lazy(() => import('./../UnavailablePage'));

const SetupWizard = () => {
  const { isAdmin } = useAuthentication();
  const {
    highestValidStepVisited,
    isSubmitting,
    isDirty,
    ...params
  } = useWizardContext();

  const activeStep = getStepIndex(stepConfigs, params.step);

  if (activeStep === -1) {
    return <Redirect to="/datasources" />;
  }

  if (!isAdmin) {
    return <Unavailable />;
  }

  const labels = getStepPaths(stepConfigs, params)
    .filter((stepConfig) => stepConfig.label)
    .map((stepConfig, i) => {
      const { step, label, url } = stepConfig;
      const activeStep = getStepIndex(stepConfigs, params.step);
      const previousStepsWereConfigured = getPreviousStepsWereConfigured(
        params,
        i,
        highestValidStepVisited,
      );
      const isCurrentStep = i === activeStep;
      const isIncompatible = !stepIsCompatibleWithParams(stepConfig, params);
      const isLinkDisabled =
        !previousStepsWereConfigured || isCurrentStep || isIncompatible;

      return (
        <Step key={step}>
          <StepLabel>
            <WizardLink label={label} url={isLinkDisabled ? '' : url} />
          </StepLabel>
        </Step>
      );
    });

  return (
    <>
      <Stepper activeStep={activeStep} data-cy="wizard-stepper">
        {labels}
      </Stepper>
      <PageHeader
        shouldRequestConfirmation={
          isDirty ||
          (params.step !== StepKeys.success &&
            params.action === WizardAction.setup)
        }
        disabled={isSubmitting}
      />
      <NextLoading isSubmitting={isSubmitting} />
      <Suspense fallback={<Loading />}>
        <Switch>
          <Route
            component={StepRouter}
            path={pathParamsStructure}
            exact={true}
          />
        </Switch>
      </Suspense>
    </>
  );
};

export default SetupWizard;
