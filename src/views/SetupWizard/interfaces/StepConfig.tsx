import React from 'react';
import { ComponentType, LazyExoticComponent } from 'react';
import { Redirect } from 'react-router-dom';
import { SpecialCriteria } from '../utils/utils';
import { StepKeys, WizardAction, WizardRouteParams } from './WizardRouteParams';

export type StepConfig = {
  label?: string;
  component: LazyExoticComponent<any> | ComponentType<any>;
  step: StepKeys;
  routeParams?: Partial<
    {
      [K in keyof Omit<WizardRouteParams, 'step'>]:
      | WizardRouteParams[K]
      | ((value: any) => boolean);
    }
  >;
  stepToRedirectIfIncompatible?: StepKeys;
};

const ProvidersPage = React.lazy(
  () => import('../views/Providers/ProvidersPage'),
);
const ProviderConnectionPage = React.lazy(
  () => import('../views/Providers/ProviderConnections'),
);
const ProjectsPage = React.lazy(() => import('../views/Projects'));
const WorkItemTypePage = React.lazy(() => import('../views/WorkItemTypes'));
const ContextsPage = React.lazy(() => import('../views/Contexts'));
const CustomFields = React.lazy(() => import('../views/CustomFields'));
const SettingsPage = React.lazy(() => import('../views/Settings'));
const NormalizationPage = React.lazy(() => import('../views/Normalization/Normalization'));
const SummaryPage = React.lazy(() => import('../views/Summary'));
const SuccessPage = React.lazy(() => import('../views/Success'));

// Kanbanize Pages
const BoardsPage = React.lazy(() => import('../../../views/KanbanizeWizard/BoardsPage'));
const CardTypesPage = React.lazy(() => import('../../../views/KanbanizeWizard/CardTypePage'));
const WorkFlowsPage = React.lazy(() => import('../../../views/KanbanizeWizard/WorkFlowsPage'));
const KanbanizeSummaryPage = React.lazy(() => import('../../../views/KanbanizeWizard/SummaryPage'));
const KanbanizeContextsPage = React.lazy(() => import('../../../views/KanbanizeWizard/ContextPage'));


const namespaceAndProviderRequired: Pick<StepConfig, 'routeParams'> = {
  routeParams: {
    namespace: SpecialCriteria.MUST_NOT_BE_EMPTY,
    provider: SpecialCriteria.MUST_NOT_BE_EMPTY,
  },
};

export const stepConfigs: StepConfig[] = [
  {
    label: 'Provider',
    component: ProvidersPage,
    step: StepKeys.provider,
    routeParams: {
      action: WizardAction.setup,
      namespace: SpecialCriteria.MUST_BE_EMPTY,
    },
    stepToRedirectIfIncompatible: StepKeys.datasource,
  },
  {
    label: 'Datasource',
    component: ProviderConnectionPage,
    step: StepKeys.datasource,
    routeParams: {
      provider: SpecialCriteria.MUST_NOT_BE_EMPTY,
    },
  },
  {
    label: 'Projects',
    component: ProjectsPage,
    step: StepKeys.projects,
    ...namespaceAndProviderRequired,
  },
  {
    label: 'Work Item Types',
    component: WorkItemTypePage,
    step: StepKeys.workItemTypes,
    ...namespaceAndProviderRequired,
  },
  {
    label: 'Boards & Aggregations',
    component: ContextsPage,
    step: StepKeys.contexts,
    ...namespaceAndProviderRequired,
  },
  {
    label: 'Custom Fields',
    component: CustomFields,
    step: StepKeys.customfields,
    ...namespaceAndProviderRequired,
  },
  {
    label: 'Settings',
    component: SettingsPage,
    step: StepKeys.settings,
    ...namespaceAndProviderRequired,
  },
  {
    label: 'Custom Views',
    component: NormalizationPage,
    step: StepKeys.normalisation,
    ...namespaceAndProviderRequired,
  },
  {
    component: SummaryPage,
    step: StepKeys.summary,
    ...namespaceAndProviderRequired,
  },
  {
    component: SuccessPage,
    step: StepKeys.success,
  },
  {
    component: () => <Redirect to="/" />,
    step: StepKeys.redirect,
  },
];

export const kanbanizeStepConfigs: StepConfig[] = [
  {
    label: 'Provider',
    component: ProvidersPage,
    step: StepKeys.provider,
    routeParams: {
      action: WizardAction.setup,
      namespace: SpecialCriteria.MUST_BE_EMPTY,
    },
    stepToRedirectIfIncompatible: StepKeys.datasource,
  },
  {
    label: 'Datasource',
    component: ProviderConnectionPage,
    step: StepKeys.datasource,
    routeParams: {
      provider: SpecialCriteria.MUST_NOT_BE_EMPTY,
    },
  },
  {
    label: 'Workspaces and Boards',
    component: BoardsPage,
    step: StepKeys.projects,
    ...namespaceAndProviderRequired,
  },
  {
    label: 'Card Types',
    component: CardTypesPage,
    step: StepKeys.workItemTypes,
    ...namespaceAndProviderRequired,
  },
  {
    label: 'Workflows',
    component: WorkFlowsPage,
    step: StepKeys.workflows,
    ...namespaceAndProviderRequired,
  },
  {
    label: 'Boards & Aggregations',
    component: KanbanizeContextsPage,
    step: StepKeys.contexts,
    ...namespaceAndProviderRequired,
  },
  {
    label: 'Custom Fields',
    component: CustomFields,
    step: StepKeys.customfields,
    ...namespaceAndProviderRequired,
  },
  {
    label: 'Settings',
    component: SettingsPage,
    step: StepKeys.settings,
    ...namespaceAndProviderRequired,
  },
  {
    label: 'Custom Views',
    component: NormalizationPage,
    step: StepKeys.normalisation,
    ...namespaceAndProviderRequired,
  },
  {
    component: KanbanizeSummaryPage,
    step: StepKeys.summary,
    ...namespaceAndProviderRequired,
  },
  {
    component: SuccessPage,
    step: StepKeys.success,
  },
  {
    component: () => <Redirect to="/" />,
    step: StepKeys.redirect,
  },
];
