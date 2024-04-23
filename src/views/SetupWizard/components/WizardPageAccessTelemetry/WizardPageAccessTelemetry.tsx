import { ReactNode, useEffect } from 'react';
import { useWizardContext } from 'views/SetupWizard/contexts/useWizardContext';
import useSendTelemetryWizard from 'views/SetupWizard/hooks/useSendTelemetryWizard';

type Props = {
  children: ReactNode;
};

function WizardPageAccessTelemetry({ children }: Props) {
  const { step } = useWizardContext();
  const { sendTelemetryAccessed } = useSendTelemetryWizard(step);

  useEffect(() => {
    sendTelemetryAccessed();
  }, [sendTelemetryAccessed]);

  return <>{children}</>;
}

export default WizardPageAccessTelemetry;
