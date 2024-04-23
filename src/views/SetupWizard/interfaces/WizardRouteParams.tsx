import Providers from 'views/SetupWizard/interfaces/Providers';

export enum StepKeys {
  provider = 'provider',
  datasource = 'datasource',
  projects = 'projects',
  workItemTypes = 'work-item-types',
  contexts = 'contexts',
  customfields = 'customfields',
  settings = 'settings',
  normalisation = 'normalisation',
  summary = 'summary',
  success = 'success',
  redirect = 'redirect',

  // Kanbanize
  cardTypes = 'cardTypes',
  workflows = 'workflows'
}

export enum WizardAction {
  setup = 'setup',
  edit = 'edit',
}

export const pathParamsStructure =
  '/datasources/:action/:provider?/:namespace?/:step';

export interface WizardRouteParams {
  namespace?: string;
  provider?: Providers;
  action: WizardAction;
  step: StepKeys;
}

export const defaultWizardRouteParams: WizardRouteParams = {
  action: WizardAction.setup,
  step: StepKeys.provider,
  provider: undefined,
  namespace: undefined,
};
