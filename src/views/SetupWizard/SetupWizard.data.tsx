import { Route, Switch } from 'react-router-dom';
import { WizardProvider } from './contexts/useWizardContext';
import { pathParamsStructure } from './interfaces/WizardRouteParams';
import SetupWizard from './SetupWizard';
import { kanbanizeStepConfigs, stepConfigs } from './interfaces/StepConfig';
import DataSourcesPage from './views/DataSourcesPage';
import KanbanizeSetupWizard from './KanbanizeSetupWizard';

const DatasourcesWithWizardProvider = () => (
  <WizardProvider steps={stepConfigs}>
    <SetupWizard />
  </WizardProvider>
);

const DatasourcesWithWizardProviderForKanbanize = () => (
  <WizardProvider steps={kanbanizeStepConfigs}>
    <KanbanizeSetupWizard />
  </WizardProvider>
);

const Main = () => (
  <Switch>
    <Route
      path={pathParamsStructure}
      component={window.location.pathname.includes("kanbanize") ? DatasourcesWithWizardProviderForKanbanize : DatasourcesWithWizardProvider}
    />
    <Route component={DataSourcesPage} />
  </Switch>
);

export default Main;
