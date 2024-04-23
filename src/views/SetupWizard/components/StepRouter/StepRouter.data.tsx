import { stepConfigs } from '../../interfaces/StepConfig';
import WizardPageAccessTelemetry from '../WizardPageAccessTelemetry/WizardPageAccessTelemetry';
import { RouteProps, StepRouter } from './StepRouter';

const StepRouterWithTelemetry = (props: RouteProps) => (
  <WizardPageAccessTelemetry>
    <StepRouter {...props} stepConfigs={stepConfigs} />
  </WizardPageAccessTelemetry>
);

export default StepRouterWithTelemetry;
