import FormLocker from 'components/UI/FormLocker';
import { FormEvent, FormEventHandler, ReactNode } from 'react';
import { useHistory } from 'react-router-dom';
import { useWizardContext } from 'views/SetupWizard/contexts/useWizardContext';
import { WizardRouteParams } from 'views/SetupWizard/interfaces/WizardRouteParams';
import useSendTelemetryWizard from '../../hooks/useSendTelemetryWizard';

export type Props = {
  children: ReactNode;
  onSubmit: (
    e: FormEvent<HTMLFormElement>,
  ) => Promise<{ params?: Partial<WizardRouteParams>; data?: any } | void>;
  isInFormProvider?: boolean;
} & Omit<JSX.IntrinsicElements['form'], 'onSubmit'>;

function WizardSubmitWrapper({
  children,
  onSubmit,
  isInFormProvider,
  ...formProps
}: Props) {
  const wizardState = useWizardContext();
  const {
    stepFormId,
    isSubmitting,
    redirectOnSave,
    step,
    generateWizardPath,
    nextStep,
    setIsSubmitted,
    setIsSubmitting,
    setIsDirty,
  } = wizardState;
  const history = useHistory();
  const { sendTelemetryConfigured } = useSendTelemetryWizard(step);

  const wrappedOnSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const redirect = (params?: Partial<WizardRouteParams>) => {
      if (redirectOnSave) {
        const nextPath = generateWizardPath({ step: nextStep, ...params });
        history.push(nextPath);
      }
    };
    onSubmit(e)
      .then(
        (data = {}) => {
          if (!isInFormProvider) {
            setIsSubmitted(true);
            setIsSubmitting(false);
            setIsDirty(false);
          }
          sendTelemetryConfigured(true, data);
          redirect(data?.params);
        },
        (error) => {
          let errorMessage: string = error;
          if (error?.toJSON) {
            errorMessage = error.toJSON();
          }
          console.debug(errorMessage);
          sendTelemetryConfigured(false, errorMessage);
        },
      )
      .finally(() => {
        if (!isInFormProvider) {
          setIsSubmitting(false);
        }
      });
  };

  return (
    <form id={stepFormId} {...formProps} onSubmit={wrappedOnSubmit}>
      <FormLocker isLocked={isSubmitting}>{children}</FormLocker>
    </form>
  );
}

export default WizardSubmitWrapper;
