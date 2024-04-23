import { useEffect } from 'react';

import {
  FormProvider,
  UseFormReturn,
} from 'react-hook-form';
import { useWizardContext } from 'views/SetupWizard/contexts/useWizardContext';

import WizardSubmitWrapper, {
  Props as WizardFormProps,
} from '../WizardSubmitWrapper/WizardSubmitWrapper';

type Props<T> = {
  hookFormMethods: UseFormReturn<T>;
} & WizardFormProps;

function WizardFormProvider<T>({ hookFormMethods, ...formProps }: Props<T>) {
  const {
    formState: { isSubmitting, isDirty, isSubmitSuccessful, dirtyFields },
    reset,
  } = hookFormMethods;
  const { setIsSubmitting, setIsDirty } = useWizardContext();

  useEffect(() => {
    setIsSubmitting(isSubmitting);
  }, [isSubmitting, setIsSubmitting]);

  const dirtyFieldsHasValues = !!Object.keys(dirtyFields).length;

  useEffect(() => {
    setIsDirty(!!Object.keys(dirtyFields).length);
  }, [isDirty, dirtyFields, dirtyFieldsHasValues, setIsDirty, isDirty]);

  useEffect(() => {
    reset(undefined, { keepValues: true });
  }, [isSubmitSuccessful, reset]);

  return (
    <FormProvider {...hookFormMethods}>
      <WizardSubmitWrapper {...formProps} isInFormProvider />
    </FormProvider>
  );
}

export default WizardFormProvider;
