import { kanbanizeStepConfigs } from '../../interfaces/StepConfig';
import WizardPageAccessTelemetry from '../WizardPageAccessTelemetry/WizardPageAccessTelemetry';
import { RouteProps, StepRouter } from './KanbanizeStepRouter';

const StepRouterWithTelemetry = (props: RouteProps) => (
  <WizardPageAccessTelemetry>
    <StepRouter {...props} stepConfigs={kanbanizeStepConfigs} />
  </WizardPageAccessTelemetry>
);

export default StepRouterWithTelemetry;
